import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Hearts: GlobalConfig = {
  slug: 'hearts',
  label: 'Hearts',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    hidden: true,
    description: 'Anonymous post heart counts. Edited by the public heart endpoint, not by hand.',
  },
  fields: [
    {
      name: 'counts',
      type: 'json',
      defaultValue: {},
      admin: {
        readOnly: true,
        description: 'Map of post id to heart count.',
      },
    },
  ],
}
