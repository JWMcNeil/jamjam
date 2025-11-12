import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ContentCard: Block = {
  slug: 'contentCard',
  interfaceName: 'ContentCardBlock',
  fields: [
    {
      name: 'media',
      type: 'array',
      label: 'Media Items',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Note: For best results, use images with the same dimensions/aspect ratio to prevent layout shifts during transitions. Different sized images will still work but may cause the container to resize smoothly.',
      },
      fields: [
        {
          name: 'item',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto (Natural)',
          value: 'auto',
        },
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Landscape (16:9)',
          value: 'landscape',
        },
        {
          label: 'Portrait (3:4)',
          value: 'portrait',
        },
      ],
    },
    {
      name: 'cycleInterval',
      type: 'number',
      label: 'Cycle Interval (seconds)',
      defaultValue: 3,
      admin: {
        description: 'How long each image displays before cycling to the next (in seconds)',
      },
      min: 1,
      max: 60,
    },
    {
      name: 'videoAutoplay',
      type: 'checkbox',
      label: 'Enable Video Autoplay',
      defaultValue: false,
      admin: {
        description:
          'When enabled, videos will autoplay. When disabled, videos show as thumbnails and play on hover.',
      },
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Enable Link',
      defaultValue: false,
    },
    link({
      appearances: false,
      sizes: false,
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableLink)
          },
        },
      },
    }),
    {
      name: 'enableFooter',
      type: 'checkbox',
      label: 'Enable Footer',
      defaultValue: false,
    },
    {
      name: 'footerMeta',
      type: 'array',
      label: 'Footer Meta Information',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableFooter)
        },
        description:
          'Add meta information for each media item. The order should match your media items.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
        {
          name: 'customText',
          type: 'text',
          label: 'Custom Text',
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'ContentCardBlock',
  },
  labels: {
    plural: 'Content Cards',
    singular: 'Content Card',
  },
}
