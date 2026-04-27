import type { Block } from 'payload'

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'provider',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto detect', value: 'auto' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'CodePen', value: 'codepen' },
        { label: 'Figma', value: 'figma' },
        { label: 'Generic iframe', value: 'iframe' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
}
