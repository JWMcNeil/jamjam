import type { Block } from 'payload'

import { iconOptions } from '@/utilities/icons'
import { link } from '@/fields/link'

export const BentoCTA: Block = {
  slug: 'bentoCTA',
  interfaceName: 'BentoCTABlock',
  fields: [
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The main image displayed in the left BentoBox',
      },
    },
    {
      name: 'quotes',
      type: 'array',
      minRows: 1,
      required: true,
      admin: {
        description: 'Quotes to display in the carousel',
      },
      fields: [
        {
          name: 'quote',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [...iconOptions],
          admin: {
            description: 'Optional icon to display next to the quote',
          },
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Automatically advance through quotes',
      },
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      defaultValue: 5000,
      admin: {
        condition: (_, siblingData) => siblingData?.autoplay === true,
        description: 'Time in milliseconds between quote changes',
      },
    },
    {
      name: 'showIndicators',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show dot indicators for quote position',
      },
    },
    link({
      appearances: ['default', 'outline', 'white'],
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
        admin: {
          description: 'Call-to-action button displayed below the quotes',
        },
      },
    }),
  ],
  labels: {
    plural: 'Bento CTAs',
    singular: 'Bento CTA',
  },
}
