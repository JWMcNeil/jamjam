import type { Block } from 'payload'

import { Content } from '@/blocks/Content/config'
import { ContentCard } from '@/blocks/ContentCard/config'

export const Grid: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  fields: [
    {
      name: 'contentCards',
      type: 'blocks',
      label: 'Content Cards',
      required: true,
      minRows: 1,
      blocks: [ContentCard, Content],
      admin: {
        description: 'Add multiple content cards or content blocks to display in a grid layout',
      },
    },

    {
      name: 'columns',
      type: 'select',
      label: 'Number of Columns',
      defaultValue: '3',
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
      admin: {
        description: 'Number of columns in the grid (responsive: fewer columns on smaller screens)',
      },
    },
  ],
  graphQL: {
    singularName: 'GridBlock',
  },
  labels: {
    plural: 'Grids',
    singular: 'Grid',
  },
}
