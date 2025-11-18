import type { Block } from 'payload'

import { link } from '@/fields/link'

export const VideoCard: Block = {
  slug: 'videoCard',
  interfaceName: 'VideoCardBlock',
  fields: [
    {
      name: 'video',
      type: 'relationship',
      relationTo: 'mux-video',
      required: true,
      admin: {
        description: 'Select a video from Mux',
      },
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
      type: 'group',
      label: 'Footer Meta Information',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableFooter)
        },
        description: 'Add meta information to display in the footer.',
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
    singularName: 'VideoCardBlock',
  },
  labels: {
    plural: 'Video Cards',
    singular: 'Video Card',
  },
}

