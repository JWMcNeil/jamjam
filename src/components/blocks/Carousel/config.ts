import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'Optional caption for this slide',
          },
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically advance slides',
      },
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      defaultValue: 5000,
      admin: {
        condition: (_, siblingData) => siblingData?.autoplay === true,
        description: 'Time in milliseconds between slide changes',
      },
    },
    {
      name: 'showNavigation',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show previous/next navigation arrows',
      },
    },
    {
      name: 'showIndicators',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show dot indicators for slide position',
      },
    },
  ],
  graphQL: {
    singularName: 'CarouselBlock',
  },
  labels: {
    plural: 'Carousels',
    singular: 'Carousel',
  },
}

