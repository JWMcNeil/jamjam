import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublic } from '../../access/authenticatedOrPublic'
import {
  Carousel,
  Content,
  DraggableCards,
  FormBlock,
  Grid,
  MediaBlock,
  RichTextBlock,
  TechStackCanvas,
  VideoCard,
  VideoPlayer,
} from '../../blocks'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateDelete, revalidateStaticPage } from './hooks/revalidateStaticPage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const StaticPages: CollectionConfig<'static-pages'> = {
  slug: 'static-pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublic,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                RichTextBlock,
                Content,
                MediaBlock,
                VideoPlayer,
                VideoCard,
                Carousel,
                FormBlock,
                DraggableCards,
                TechStackCanvas,
                Grid,
              ],
              admin: {
                initCollapsed: true,
                description: 'Optional blocks to include in code-built pages',
              },
            },
          ],
          label: 'Content',
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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Used for reference only, not routing',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateStaticPage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
}
