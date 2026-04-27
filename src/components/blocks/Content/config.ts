import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { ContentCard } from '@/components/blocks/ContentCard/config'
import { Carousel } from '@/components/blocks/Carousel/config'
import { VideoCard } from '@/components/blocks/VideoCard/config'
import { VideoPlayer } from '@/components/blocks/VideoPlayer/config'
import { FormBlock } from '@/components/blocks/Form/config'
import { PricingCard } from '@/components/blocks/PricingCard/config'
import { Banner } from '@/components/blocks/Banner/config'
import { MediaBlock } from '@/components/blocks/MediaBlock/config'
import { Code } from '@/components/blocks/Code/config'
import { Embed } from '@/components/blocks/Embed/config'
import { BlocksFeature } from '@payloadcms/richtext-lexical'
import { BentoCTA } from '@/components/blocks/BentoCTA/config'

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
          BlocksFeature({ blocks: [Banner, Code, Embed, MediaBlock] }),
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
      Carousel,
      VideoCard,
      VideoPlayer,
      FormBlock,
      PricingCard,
      BentoCTA,
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
