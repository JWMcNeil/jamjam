import type { Block } from 'payload'

export const DraggableCards: Block = {
  slug: 'draggableCards',
  interfaceName: 'DraggableCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Block Title',
      admin: {
        description: 'Optional title to display above the draggable cards',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description to display above the draggable cards',
      },
    },
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
          name: 'initialX',
          type: 'number',
          label: 'Initial X Position (px)',
          admin: {
            description:
              'Initial horizontal position in pixels (optional, will be randomized if not set). For responsive layouts, use Normalized X instead.',
          },
          min: 0,
        },
        {
          name: 'initialY',
          type: 'number',
          label: 'Initial Y Position (px)',
          admin: {
            description:
              'Initial vertical position in pixels (optional, will be randomized if not set). For responsive layouts, use Normalized Y instead.',
          },
          min: 0,
        },
        {
          name: 'normalizedX',
          type: 'number',
          label: 'Normalized X Position (Legacy)',
          admin: {
            description:
              'Horizontal position as a value between 0-1 (0 = left edge, 1 = right edge). Deprecated: Use breakpoint-specific positions instead.',
          },
          min: 0,
          max: 1,
          step: 0.01,
        },
        {
          name: 'normalizedY',
          type: 'number',
          label: 'Normalized Y Position (Legacy)',
          admin: {
            description:
              'Vertical position as a value between 0-1 (0 = top edge, 1 = bottom edge). Deprecated: Use breakpoint-specific positions instead.',
          },
          min: 0,
          max: 1,
          step: 0.01,
        },
        {
          name: 'positions',
          type: 'group',
          label: 'Responsive Positions',
          admin: {
            description:
              'Set positions for different screen sizes. Positions are stored as normalized values (0-1) for responsiveness.',
          },
          fields: [
            {
              name: 'xs',
              type: 'group',
              label: 'Mobile (XS) - < 640px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: 'sm',
              type: 'group',
              label: 'Small (SM) - ≥ 640px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: 'md',
              type: 'group',
              label: 'Medium (MD) - ≥ 768px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: 'lg',
              type: 'group',
              label: 'Large (LG) - ≥ 1024px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: 'xl',
              type: 'group',
              label: 'Extra Large (XL) - ≥ 1280px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: '2xl',
              type: 'group',
              label: '2X Large (2XL) - ≥ 1536px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
            {
              name: '3xl',
              type: 'group',
              label: '3X Large (3XL) - ≥ 1920px',
              fields: [
                {
                  name: 'normalizedX',
                  type: 'number',
                  label: 'Normalized X',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
                {
                  name: 'normalizedY',
                  type: 'number',
                  label: 'Normalized Y',
                  min: 0,
                  max: 1,
                  step: 0.01,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'containerWidth',
      type: 'select',
      label: 'Container Width',
      defaultValue: 'full',
      options: [
        {
          label: 'Full Width',
          value: 'full',
        },
        {
          label: 'Container',
          value: 'container',
        },
      ],
    },
    {
      name: 'containerHeight',
      type: 'number',
      label: 'Container Height (px)',
      defaultValue: 600,
      admin: {
        description: 'Minimum height of the draggable container in pixels',
      },
      min: 300,
      max: 2000,
    },
  ],
  graphQL: {
    singularName: 'DraggableCardsBlock',
  },
  labels: {
    plural: 'Draggable Cards',
    singular: 'Draggable Cards',
  },
}
