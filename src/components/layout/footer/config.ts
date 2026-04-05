import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'Full URL to your GitHub profile (e.g. https://github.com/username).',
      },
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      admin: {
        description: 'Full URL to your LinkedIn profile.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
