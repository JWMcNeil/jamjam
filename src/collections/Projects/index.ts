import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from './lib/generatePreviewPath'
import { revalidateProject, revalidateDeleteProject } from './hooks/revalidateProject'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    type: true,
    lifecycle: true,
    year: true,
    excerpt: true,
    heroImage: true,
    gallery: true,
    tags: true,
    featured: true,
    order: true,
    liveUrl: true,
    codeUrl: true,
    role: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Content',
    description: 'Portfolio projects shown on /projects.',
    defaultColumns: ['title', 'type', 'lifecycle', 'featured', 'order', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'projects',
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Project name. Used in cards, OG images, and the browser tab.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 120,
      admin: {
        description: '120 characters max. Shown on the project card.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Demo', value: 'demo' },
            { label: 'Client', value: 'client' },
            { label: 'Experiment', value: 'experiment' },
            { label: 'Personal', value: 'personal' },
          ],
          admin: {
            width: '33%',
            description: 'The kind of project this is.',
          },
        },
        {
          name: 'lifecycle',
          type: 'select',
          required: true,
          defaultValue: 'live',
          options: [
            { label: 'Live', value: 'live' },
            { label: 'In progress', value: 'in-progress' },
            { label: 'Archived', value: 'archived' },
          ],
          admin: {
            width: '33%',
            description: 'Whether the external project/app is live, archived, etc.',
          },
        },
        {
          name: 'year',
          type: 'number',
          admin: {
            width: '33%',
            description: 'Year the project was built or launched.',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main screenshot or cover image for the project.',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description:
                  'Additional slides: images, GIFs (Media), or Mux-hosted video. Drag to reorder.',
              },
              validate: (rows) => {
                if (!rows || !Array.isArray(rows)) return true
                for (const row of rows) {
                  if (!row || typeof row !== 'object') continue
                  const r = row as {
                    slideType?: string
                    image?: unknown
                    muxVideo?: unknown
                  }
                  const slideType = r.slideType === 'mux' ? 'mux' : 'media'
                  if (slideType === 'media') {
                    if (!r.image) {
                      return 'Each image or GIF slide must have a Media upload.'
                    }
                  } else if (!r.muxVideo) {
                    return 'Each Mux video slide must have a Mux video selected.'
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
                    { label: 'Image / GIF (Media)', value: 'media' },
                    { label: 'Video (Mux)', value: 'mux' },
                  ],
                  admin: {
                    description: 'Use Media for screenshots and GIFs; use Mux for hosted video.',
                  },
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
                  name: 'muxVideo',
                  type: 'relationship',
                  relationTo: 'mux-video',
                  admin: {
                    condition: (_, siblingData) => siblingData?.slideType === 'mux',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              admin: {
                description: 'Optional longer write-up about the project.',
              },
            },
          ],
        },
        {
          label: 'Tech & Links',
          fields: [
            {
              name: 'techStack',
              type: 'array',
              admin: {
                description: 'Technologies used. Each entry has a name and its role in the project.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'role',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '50%',
                        description: 'e.g. "framework", "styling", "deployment"',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'liveUrl',
              type: 'text',
              admin: {
                description: 'URL to the live project.',
              },
              validate: (value: string | undefined | null) => {
                if (value && !value.startsWith('http')) {
                  return 'Must be a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'codeUrl',
              type: 'text',
              admin: {
                description: 'URL to the source code. Only shown for demo/experiment projects.',
                condition: (data) =>
                  data?.type === 'demo' ||
                  data?.type === 'experiment' ||
                  data?.type === 'personal',
              },
              validate: (value: string | undefined | null) => {
                if (value && !value.startsWith('http')) {
                  return 'Must be a valid URL starting with http:// or https://'
                }
                return true
              },
            },
            {
              name: 'role',
              type: 'text',
              admin: {
                description:
                  'Shown on the project page as // role (e.g. Development & deployment).',
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
              hasGenerateFn: true,
              relationTo: 'media',
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
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
      name: 'tags',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        description: 'Tags for filtering on the projects page.',
      },
      hasMany: true,
      relationTo: 'tags',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured projects appear on the homepage.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Manual sort order. Lower numbers appear first.',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDeleteProject],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
