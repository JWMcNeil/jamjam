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
        { label: 'Indigo', value: 'indigo' },
        { label: 'Blue Slate', value: 'blueSlate' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Teal', value: 'teal' },
        { label: 'Amber', value: 'amber' },
        { label: 'Rose', value: 'rose' },
        { label: 'Brown', value: 'brown' },
        { label: 'Olive', value: 'olive' },
        { label: 'Purple', value: 'purple' },
        { label: 'Cyan', value: 'cyan' },
        { label: 'Grey', value: 'grey' },
        { label: 'Green', value: 'green' },
        { label: 'Violet', value: 'violet' },
      ],
    },
    slugField({
      fieldToUse: 'label',
    }),
  ],
}
