import type { GlobalConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Identity',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Site',
    description:
      'Name, contact, and status under General; optional home intro under Home; about card under About.',
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          admin: {
            description: 'How you appear across the site: hero, footer, and contact details.',
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
          ],
        },
        {
          label: 'Contact',
          admin: {
            description: 'Copy for the /contact page hero and meta details.',
          },
          fields: [
            {
              name: 'contactHeadline',
              type: 'text',
              required: true,
              defaultValue: 'Reach out about a project or role.',
              admin: {
                description: 'Main headline on the contact page.',
              },
            },
            {
              name: 'contactIntro',
              type: 'textarea',
              required: true,
              defaultValue:
                'Freelance builds, full-time roles, and one-off questions all start here. Use the form or email me directly; I read every message.',
              admin: {
                description: 'Supporting paragraph under the headline.',
              },
            },
            {
              name: 'contactResponseTime',
              type: 'text',
              required: true,
              defaultValue: 'Usually within one business day',
              admin: {
                description: 'Shown next to // typical reply on the contact page.',
              },
            },
          ],
        },
        {
          label: 'Home',
          admin: {
            description: 'Optional copy on the home page below the terminal status line.',
          },
          fields: [
            {
              name: 'homeIntro',
              type: 'richText',
              required: false,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              admin: {
                description:
                  'Optional intro paragraph on the home page, shown below jamjam:~$ and the status.',
              },
            },
          ],
        },
        {
          label: 'About',
          admin: {
            description: 'The about card on the home page: label, headline, bio, and portrait.',
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
                description:
                  'Portrait shown in the about card. Set alt text on the media for accessibility.',
              },
            },
          ],
        },
      ],
    },
  ],
}
