import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateSidebar } from './hooks/revalidateSidebar'

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: ['default', 'outline', 'secondary', 'miniOutline', 'link'],
          sizes: ['default', 'icon'],
        }),
        {
          name: 'showOnPages',
          type: 'array',
          label: 'Show on pages',
          admin: {
            description:
              'Leave empty to show on all pages. Add path patterns (e.g., "/posts", "/about") to only show this link on specific pages.',
          },
          fields: [
            {
              name: 'path',
              type: 'text',
              required: true,
              admin: {
                placeholder: '/posts or /about',
              },
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Sidebar/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSidebar],
  },
}
