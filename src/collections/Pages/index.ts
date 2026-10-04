import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { WHAT_I_DO_DEFAULTS } from '../../lib/whatIDo'
import { revalidateDeletePage, revalidatePage } from './hooks/revalidatePage'
import { generatePreviewPath } from './lib/generatePreviewPath'

const D = WHAT_I_DO_DEFAULTS

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Content',
    description:
      'Standalone pages. Today the only layout is /what-i-do (slug "what-i-do"): heading, lede, reel, capability rows and closing block. The portrait, bio and status in the aside come from Identity > About.',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          slug: data?.slug as string,
          collection: 'pages',
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: D.title,
              admin: { description: 'The page heading (H1).' },
            },
            {
              name: 'lede',
              type: 'textarea',
              defaultValue: D.lede,
              admin: { description: 'Sentence under the heading.' },
            },
            {
              type: 'collapsible',
              label: 'Reel',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'reelVideo',
                  type: 'relationship',
                  relationTo: 'mux-video',
                  admin: {
                    description: 'The reel clip (Mux). Plays muted and looped under the heading.',
                  },
                },
                {
                  name: 'reelPoster',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Poster still shown before the clip loads and under reduced motion. Crop wide (about 21:9).',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'reelTag',
                      type: 'text',
                      defaultValue: D.reelTag,
                      admin: { width: '25%', description: 'Mono tag in the caption strip.' },
                    },
                    {
                      name: 'reelCaption',
                      type: 'text',
                      defaultValue: D.reelCaption,
                      admin: { width: '75%', description: 'Caption under the reel.' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'indexLabel',
              type: 'text',
              defaultValue: D.indexLabel,
              admin: { description: 'Small mono label above the capability rows.' },
            },
            {
              name: 'rows',
              type: 'array',
              label: 'Capability rows',
              defaultValue: D.rows.map((row) => ({ ...row })),
              admin: {
                description:
                  'One row per thing you do. Drag to reorder. Leave empty to fall back to the built-in rows.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { description: 'One word works best, e.g. web, content, ai.' },
                },
                {
                  name: 'line',
                  type: 'text',
                  admin: { description: 'Short description shown beside the name.' },
                },
                {
                  name: 'body',
                  type: 'textarea',
                  admin: { description: 'The paragraph shown when the row is open.' },
                },
                {
                  name: 'tags',
                  type: 'text',
                  admin: { description: 'Comma separated, e.g. next.js, cms. Shown as #tags.' },
                },
                {
                  name: 'openByDefault',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: { description: 'Open on first load. If none is ticked, the first row opens.' },
                },
                {
                  name: 'proof',
                  type: 'array',
                  maxRows: 3,
                  labels: { singular: 'Proof item', plural: 'Proof items' },
                  admin: {
                    description:
                      'Up to three stills or clips shown when the row is open. The first also follows the cursor on hover.',
                  },
                  validate: (rows: unknown) => {
                    if (!rows || !Array.isArray(rows)) return true
                    for (const row of rows) {
                      if (!row || typeof row !== 'object') continue
                      const r = row as { slideType?: string; image?: unknown; video?: unknown }
                      if (r.slideType === 'mux') {
                        if (!r.video) return 'Each video item needs a Mux video.'
                      } else if (!r.image) {
                        return 'Each image item needs a Media upload.'
                      }
                    }
                    return true
                  },
                  fields: [
                    {
                      name: 'slideType',
                      type: 'select',
                      required: true,
                      defaultValue: 'media',
                      options: [
                        { label: 'Image (Media)', value: 'media' },
                        { label: 'Video (Mux)', value: 'mux' },
                      ],
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        condition: (_, siblingData) => siblingData?.slideType !== 'mux',
                      },
                    },
                    {
                      name: 'video',
                      type: 'relationship',
                      relationTo: 'mux-video',
                      admin: {
                        description:
                          'Short clip. Plays muted and looped when the row is open; previews on hover when closed.',
                        condition: (_, siblingData) => siblingData?.slideType === 'mux',
                      },
                    },
                    {
                      name: 'poster',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        description: 'Optional poster still. Empty uses the Mux poster frame.',
                        condition: (_, siblingData) => siblingData?.slideType === 'mux',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Closing block',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'closingHeadline',
                  type: 'text',
                  defaultValue: D.closingHeadline,
                },
                {
                  name: 'closingLine',
                  type: 'text',
                  defaultValue: D.closingLine,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'closingCtaLabel',
                      type: 'text',
                      defaultValue: D.closingCtaLabel,
                      admin: { width: '40%', description: 'Button text.' },
                    },
                    {
                      name: 'closingCtaHref',
                      type: 'text',
                      defaultValue: D.closingCtaHref,
                      admin: { width: '60%', description: 'Internal path or full URL.' },
                    },
                  ],
                },
              ],
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
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ hasGenerateFn: true, relationTo: 'media' }),
            MetaDescriptionField({ hasGenerateFn: true }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      defaultValue: D.slug,
      admin: {
        position: 'sidebar',
        description: 'URL path. Only "what-i-do" has a layout today, so leave it as is.',
      },
      validate: (value: string | null | undefined) =>
        value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : 'Use lowercase letters, numbers and dashes only.',
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDeletePage],
  },
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
