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
          name: 'category',
          type: 'select',
          label: 'Category',
          admin: {
            description: 'Optional category for organizing cards. Used for filtering and grouping.',
          },
          options: [
            {
              label: 'Frontend',
              value: 'frontend',
            },
            {
              label: 'Backend/CMS',
              value: 'backend',
            },
            {
              label: 'Database',
              value: 'database',
            },
            {
              label: 'Infrastructure/Hosting',
              value: 'infrastructure',
            },
            {
              label: 'Tooling',
              value: 'tooling',
            },
          ],
        },
        {
          name: 'size',
          type: 'select',
          label: 'Card Size',
          defaultValue: 'md',
          admin: {
            description: 'Select the size of the card (small, medium, or large).',
          },
          options: [
            {
              label: 'Small',
              value: 'sm',
            },
            {
              label: 'Medium',
              value: 'md',
            },
            {
              label: 'Large',
              value: 'lg',
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description that appears when the card is expanded.',
          },
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Website URL',
          admin: {
            description: 'Optional URL to the app/website. A link button will appear when the card is expanded.',
          },
        },
        {
          type: 'collapsible',
          label: 'Responsive Positions',
          admin: {
            initCollapsed: true,
            description:
              'Set positions for different screen sizes. Positions are stored as normalized values (0-1) for responsiveness. Cards without positions will be automatically spaced.',
          },
          fields: [
            {
              name: 'positions',
              type: 'group',
              label: false,
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
