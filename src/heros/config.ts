import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline', 'secondary', 'miniOutline', 'link', 'white'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'contentCard',
      type: 'group',
      label: 'Content Card',
      admin: {
        condition: (_, { type } = {}) => type === 'custom',
        description: 'Add a content card to display on the right side of the hero (desktop only).',
      },
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
    },
    {
      name: 'draggableCards',
      type: 'group',
      label: 'Draggable Cards',
      admin: {
        condition: (_, { type } = {}) => type === 'custom',
        description: 'Add draggable cards to display in the left column under the CTA links.',
      },
      fields: [
        {
          name: 'cards',
          type: 'array',
          label: 'Cards',
          required: true,
          minRows: 1,
          admin: {
            description:
              'Add draggable cards. Each card can have a title and an image (SVG or regular image).',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image/Icon',
              admin: {
                description: 'Upload an image or SVG file. This will be displayed in the card.',
              },
            },
            {
              name: 'positions',
              type: 'group',
              label: 'Responsive Positions',
              admin: {
                description:
                  'Set positions for different screen sizes. Positions are stored as normalized values (0-1) for responsiveness. Cards without positions will be automatically spaced.',
              },
              fields: [
                {
                  name: 'mobile',
                  type: 'group',
                  label: 'Mobile - < 768px',
                  fields: [
                    {
                      name: 'normalizedX',
                      type: 'number',
                      label: 'Normalized X',
                      min: 0,
                      max: 1,
                    },
                    {
                      name: 'normalizedY',
                      type: 'number',
                      label: 'Normalized Y',
                      min: 0,
                      max: 1,
                    },
                  ],
                },
                {
                  name: 'tablet',
                  type: 'group',
                  label: 'Tablet - 768px - 1023px',
                  fields: [
                    {
                      name: 'normalizedX',
                      type: 'number',
                      label: 'Normalized X',
                      min: 0,
                      max: 1,
                    },
                    {
                      name: 'normalizedY',
                      type: 'number',
                      label: 'Normalized Y',
                      min: 0,
                      max: 1,
                    },
                  ],
                },
                {
                  name: 'desktop',
                  type: 'group',
                  label: 'Desktop - ≥ 1024px',
                  fields: [
                    {
                      name: 'normalizedX',
                      type: 'number',
                      label: 'Normalized X',
                      min: 0,
                      max: 1,
                    },
                    {
                      name: 'normalizedY',
                      type: 'number',
                      label: 'Normalized Y',
                      min: 0,
                      max: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'containerHeight',
          type: 'number',
          label: 'Container Height (px)',
          defaultValue: 400,
          admin: {
            description: 'Minimum height of the draggable container in pixels',
          },
          min: 200,
          max: 1000,
        },
      ],
    },
  ],
  label: false,
}
