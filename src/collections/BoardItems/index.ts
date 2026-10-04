import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from './lib/generatePreviewPath'
import { revalidateBoardItem, revalidateDeleteBoardItem } from './hooks/revalidateBoardItem'

export const BoardItems: CollectionConfig<'board-items'> = {
  slug: 'board-items',
  orderable: true,
  labels: {
    singular: 'Gallery item',
    plural: 'Gallery items',
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
    kind: true,
    video: true,
    subjects: true,
    featured: true,
    cover: true,
    stills: true,
    setLayout: true,
    context: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Content',
    description:
      'Photography, film and graphics tiles on /gallery. Drag rows in the list to set the order they appear. Context shows in a modal, not a case study.',
    defaultColumns: ['title', 'kind', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          slug: data?.slug as string,
          collection: 'board-items',
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'board-items',
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tile',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Shown as the quiet caption under the tile, and used for the share URL slug.',
              },
            },
            {
              name: 'kind',
              type: 'select',
              required: true,
              options: [
                { label: 'Photography', value: 'photography' },
                { label: 'Video', value: 'video' },
                { label: 'Graphics', value: 'graphics' },
              ],
              admin: {
                description: 'Gallery kind. Music comes later; it is not selectable here.',
              },
            },
            {
              name: 'video',
              type: 'relationship',
              relationTo: 'mux-video',
              admin: {
                description: 'Mux-hosted clip. Plays in the modal; the tile shows the cover still and previews on hover.',
                condition: (_, siblingData) => siblingData?.kind === 'video',
              },
              validate: (value: unknown, { siblingData }: { siblingData?: { kind?: string } }) => {
                if (siblingData?.kind === 'video' && !value) {
                  return 'Pick a Mux video for a Video item.'
                }
                return true
              },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'The still on the Gallery tile and the Open Graph image when shared. For video, use a strong poster frame.',
              },
            },
            {
              name: 'subjects',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Motorcycles', value: 'motorcycles' },
                { label: 'Tractors', value: 'tractors' },
                { label: 'Cars', value: 'cars' },
                { label: 'Other', value: 'other' },
              ],
              admin: {
                description: 'What it shows. Used to filter the Gallery.',
              },
            },
            {
              name: 'stills',
              type: 'array',
              labels: {
                singular: 'Still',
                plural: 'Stills',
              },
              admin: {
                description: 'Optional extra stills for this tile. Empty means a single still.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'setLayout',
              type: 'select',
              defaultValue: 'carousel',
              options: [
                { label: 'Carousel in the modal', value: 'carousel' },
                { label: 'Cover first, rest in the modal', value: 'coverModal' },
              ],
              admin: {
                description: 'How extra stills open. Ignored when there are no extra stills.',
                condition: (_, siblingData) =>
                  Array.isArray(siblingData?.stills) && siblingData.stills.length > 0,
              },
            },
            {
              name: 'context',
              type: 'textarea',
              maxLength: 400,
              admin: {
                description: 'A short scrap of context in the modal. Not a case study.',
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        description: 'Auto-set on first publish. Can be overridden.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the home page selection, in the same order as the gallery (drag rows in the list to reorder).',
      },
    },
    slugField({
      fieldToUse: 'title',
    }),
  ],
  hooks: {
    afterChange: [revalidateBoardItem],
    afterDelete: [revalidateDeleteBoardItem],
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
