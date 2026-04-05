import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Identity',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site',
    description: 'Your public profile, about section, and site-wide contact details.',
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Jamie McNeil',
      admin: {
        description: 'Your full name. Used in the about section and author bios.',
      },
    },
    {
      name: 'statusText',
      type: 'text',
      required: true,
      defaultValue: 'available for work',
      admin: {
        description:
          'Free text status shown with the green dot across the site. e.g. "available for work", "open to freelance", "happily employed".',
      },
    },
    {
      name: 'statusNote',
      type: 'text',
      admin: {
        description: 'Optional additional context. e.g. "open to fully remote roles".',
      },
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'jamie@jamjam.dev',
      admin: {
        description: 'Contact email shown on the contact page and footer.',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Melbourne, Australia',
      admin: {
        description: 'Your location shown on the contact page and about section.',
      },
    },
    {
      name: 'footerNote',
      type: 'text',
      admin: {
        description: 'Optional text shown in the footer.',
      },
    },
    {
      type: 'collapsible',
      label: 'About section',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'aboutSectionLabel',
          type: 'text',
          required: true,
          defaultValue: '// about',
          admin: {
            description: 'Small label shown above the about card (e.g. // about).',
          },
        },
        {
          name: 'aboutHeadline',
          type: 'text',
          required: true,
          defaultValue: 'Full-stack developer based in Melbourne.',
          admin: {
            description: 'Main headline inside the about card.',
          },
        },
        {
          name: 'aboutBio',
          type: 'textarea',
          required: true,
          defaultValue:
            'I build websites, web apps, and AI-powered tools. Comfortable across the stack — from design systems to deployment. Currently looking for my next role.',
          admin: {
            description: 'Supporting paragraph below the headline.',
          },
        },
        {
          name: 'aboutPhoto',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Portrait shown in the about card. Set alt text on the media for accessibility.',
          },
        },
      ],
    },
  ],
}
