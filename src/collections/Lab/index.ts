import type { CollectionConfig } from 'payload'
import { slugField, ValidationError } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { defaultLexical } from '@/fields/defaultLexical'
import { labRegistry } from '@/lib/lab/registry'

const labToolOptions = labRegistry
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((tool) => ({
    label: tool.name,
    value: tool.slug,
  }))

function normalizeSelectToString(raw: unknown): string {
  if (typeof raw === 'string') return raw.trim()
  if (!raw || typeof raw !== 'object') return ''
  const o = raw as Record<string, unknown>
  if (typeof o.value === 'string') return o.value.trim()
  if (typeof o.id === 'string') return o.id.trim()
  return ''
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function ensureUniqueLabSlug(args: {
  slug: string
  req: {
    payload: {
      find: (args: Record<string, unknown>) => Promise<{ docs: unknown[] }>
    }
  }
  currentId?: number | string
}): Promise<string> {
  const { slug, req, currentId } = args

  const slugTaken = async (candidate: string): Promise<boolean> => {
    const andClauses: Array<Record<string, unknown>> = [{ slug: { equals: candidate } }]
    if (currentId !== undefined && currentId !== null) {
      andClauses.push({ id: { not_equals: currentId } })
    }

    const result = await req.payload.find({
      collection: 'lab',
      depth: 0,
      limit: 1,
      pagination: false,
      overrideAccess: true,
      where: {
        and: andClauses,
      },
    })

    return result.docs.length > 0
  }

  if (!(await slugTaken(slug))) {
    return slug
  }

  let suffix = 2
  while (suffix < 500) {
    const candidate = `${slug}-${suffix}`
    if (!(await slugTaken(candidate))) {
      return candidate
    }
    suffix += 1
  }

  return `${slug}-${Date.now()}`
}

export const Lab: CollectionConfig = {
  slug: 'lab',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['slug', 'toolKey', 'title', 'kind', 'group', 'enabled', 'order', 'updatedAt'],
    useAsTitle: 'title',
    description: 'Display controls for /lab tools. Tool identity comes from code, route slug from CMS.',
  },
  hooks: {
    beforeValidate: [
      async ({ data, originalDoc, req }) => {
        if (!data) return data

        const normalizedIncomingToolKey = normalizeSelectToString(data.toolKey)
        if (normalizedIncomingToolKey) {
          data.toolKey = normalizedIncomingToolKey
        }

        const maybeSlug = data.slug as unknown
        if (
          maybeSlug &&
          typeof maybeSlug === 'object' &&
          'value' in (maybeSlug as Record<string, unknown>) &&
          typeof (maybeSlug as Record<string, unknown>).value === 'string'
        ) {
          data.slug = (maybeSlug as { value: string }).value
        }

        const currentSlug = typeof data.slug === 'string' ? data.slug.trim() : ''
        if (!currentSlug) {
          const toolKey = typeof data.toolKey === 'string' ? data.toolKey.trim() : ''
          const title = typeof data.title === 'string' ? data.title.trim() : ''
          data.slug = toSlug(toolKey || title)
        } else {
          data.slug = toSlug(currentSlug)
        }

        if (typeof data.slug === 'string' && data.slug) {
          const currentId =
            (originalDoc && typeof originalDoc.id !== 'undefined' ? originalDoc.id : undefined) ??
            (typeof data.id !== 'undefined' ? data.id : undefined)

          data.slug = await ensureUniqueLabSlug({
            slug: data.slug,
            req: req as unknown as {
              payload: {
                find: (args: Record<string, unknown>) => Promise<{ docs: unknown[] }>
              }
            },
            currentId,
          })
        }

        const normalizedToolKeyForDuplicateCheck =
          typeof data.toolKey === 'string' ? data.toolKey.trim() : ''
        if (normalizedToolKeyForDuplicateCheck) {
          const duplicateResult = await req.payload.find({
            collection: 'lab',
            depth: 0,
            limit: 10,
            pagination: false,
            overrideAccess: true,
            where: {
              and: [
                { toolKey: { equals: normalizedToolKeyForDuplicateCheck } },
                ...(typeof originalDoc?.id !== 'undefined'
                  ? [{ id: { not_equals: originalDoc.id } }]
                  : typeof data.id !== 'undefined'
                    ? [{ id: { not_equals: data.id } }]
                    : []),
              ],
            },
          })

          if (duplicateResult.docs.length > 0) {
            const firstDuplicate = duplicateResult.docs[0] as {
              id: number | string
              slug?: string | null
              _status?: 'draft' | 'published' | null
            }
            const dupStatus = firstDuplicate._status ?? null

            if (dupStatus === 'draft') {
              await req.payload.delete({
                collection: 'lab',
                id: firstDuplicate.id,
                overrideAccess: true,
                req,
              })
            } else {
              throw new ValidationError({
                collection: 'lab',
                req,
                errors: [
                  {
                    path: 'toolKey',
                    message: `This tool is already configured in Lab document #${String(firstDuplicate.id)} (${String(firstDuplicate.slug ?? 'no-slug')}, status: ${String(dupStatus ?? 'unknown')}). Remove or change that entry first.`,
                  },
                ],
              })
            }
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity & Routing',
          fields: [
            {
              name: 'toolKey',
              type: 'select',
              options: labToolOptions,
              required: true,
              index: true,
              validate: (value: unknown) => {
                const normalizedValue = normalizeSelectToString(value)

                if (!normalizedValue) {
                  return 'Tool key is required.'
                }

                const isKnownTool = labToolOptions.some((option) => option.value === normalizedValue)

                if (!isKnownTool) {
                  return 'Tool key must match a registered lab tool slug.'
                }

                return true
              },
              admin: {
                description: 'Stable code key from src/lib/lab/registry.ts used to map this entry.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'order',
                  type: 'number',
                  defaultValue: 100,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'kind',
                  type: 'select',
                  defaultValue: 'tool',
                  options: [
                    { label: 'Tool', value: 'tool' },
                    { label: 'App', value: 'app' },
                    { label: 'AI', value: 'ai' },
                  ],
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'group',
                  type: 'select',
                  options: [
                    { label: 'AI', value: 'ai' },
                    { label: 'Apps', value: 'apps' },
                    { label: 'Tools', value: 'tools' },
                  ],
                  admin: {
                    width: '25%',
                    description: 'Optional sidebar section override.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Display',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Display title shown in the lab sidebar and tool header.',
              },
            },
            {
              name: 'primaryTag',
              type: 'relationship',
              relationTo: 'tags',
              required: true,
              admin: {
                description: 'Badge tag shown in the lab sidebar for this tool.',
              },
            },
            slugField({
              fieldToUse: 'title',
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    width: '67%',
                    description: 'Short one-liner shown under the tool title.',
                  },
                },
                {
                  name: 'model',
                  type: 'text',
                  admin: {
                    width: '33%',
                    description: 'Optional model label shown in tool header.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'writeUp',
              type: 'richText',
              editor: defaultLexical,
              admin: {
                description: 'Optional expandable write-up shown below the tool.',
              },
            },
            {
              name: 'blogPostUrl',
              type: 'text',
              admin: {
                description: 'Optional URL for a deeper blog post.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
