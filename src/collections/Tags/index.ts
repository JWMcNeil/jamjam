import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Tags: CollectionConfig<'tags'> = {
  slug: 'tags',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'colour'],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for the tag, e.g. "Next.js", "AI", "Design".',
      },
    },
    {
      name: 'colour',
      type: 'select',
      required: true,
      admin: {
        description: 'Colour scheme for the tag. Maps to design token colours.',
      },
      options: [
        { label: 'Next.js (purple)', value: 'nextjs' },
        { label: 'Webdev (blue-grey)', value: 'webdev' },
        { label: 'AI (green)', value: 'ai' },
        { label: 'Webflow (teal)', value: 'webflow' },
        { label: 'JS (yellow)', value: 'js' },
        { label: 'Design (pink)', value: 'design' },
        { label: 'Opinion (brown)', value: 'opinion' },
        { label: 'Tools (olive)', value: 'tools' },
        { label: 'Experiment (olive)', value: 'experiment' },
        { label: 'Freelance (purple)', value: 'freelance' },
        { label: 'UX (cyan)', value: 'ux' },
        { label: 'Career (grey)', value: 'career' },
        { label: 'Tutorial (green)', value: 'tutorial' },
        { label: 'WordPress (violet)', value: 'wordpress' },
      ],
    },
    slugField({
      fieldToUse: 'label',
    }),
  ],
}
