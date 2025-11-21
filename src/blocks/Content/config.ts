import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { ContentCard } from '@/blocks/ContentCard/config'
import { TechStackCanvas } from '@/blocks/TechStackCanvas/config'
import { Carousel } from '@/blocks/Carousel/config'
import { VideoCard } from '@/blocks/VideoCard/config'
import { VideoPlayer } from '@/blocks/VideoPlayer/config'
import { FormBlock } from '@/blocks/Form/config'
import { DraggableCards } from '@/blocks/DraggableCards/config'
import { Banner } from '@/blocks/Banner/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Code } from '@/blocks/Code/config'
import { BlocksFeature } from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          UnorderedListFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
  {
    name: 'children',
    type: 'blocks',
    label: 'Add Blocks',
    blocks: [
      ContentCard,
      TechStackCanvas,
      Carousel,
      VideoCard,
      VideoPlayer,
      FormBlock,
      DraggableCards,
    ],
    admin: {
      initCollapsed: true,
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
