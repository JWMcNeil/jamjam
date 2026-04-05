import type { Block } from 'payload'

export const ImageMasonryGrid: Block = {
  slug: 'imageMasonryGrid',
  interfaceName: 'ImageMasonryGridBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ],
      admin: {
        description: 'Gap size between images',
      },
    },
  ],
  graphQL: {
    singularName: 'ImageMasonryGridBlock',
  },
  labels: {
    plural: 'Image Masonry Grids',
    singular: 'Image Masonry Grid',
  },
}

