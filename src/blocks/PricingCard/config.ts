import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { iconOptions } from '@/utilities/icons'

export const PricingCard: Block = {
  slug: 'pricingCard',
  interfaceName: 'PricingCardBlock',
  fields: [
    {
      name: 'costIndicator',
      type: 'text',
      admin: {
        description: 'Optional cost indicator (e.g., "$", "€", "A$")',
      },
      label: 'Cost Indicator',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [...iconOptions],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'startingPrice',
      type: 'text',
      label: 'Starting Price',
      admin: {
        description: 'Price text (e.g., "A$450", "$450", "450€")',
      },
      required: true,
    },
    {
      name: 'includes',
      type: 'richText',
      label: 'Includes',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
          ]
        },
      }),
    },
    {
      name: 'linkButtonText',
      type: 'text',
      label: 'Link Button Text',
      defaultValue: 'Ask for Quote',
      admin: {
        description: 'Text displayed on the link button',
      },
    },
    link({
      appearances: ['default', 'outline'],
      sizes: ['default', 'lg'],
    }),
  ],
  labels: {
    plural: 'Pricing Cards',
    singular: 'Pricing Card',
  },
}
