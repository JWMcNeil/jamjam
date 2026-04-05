import React, { Fragment } from 'react'

import { ArchiveBlock } from '@/components/blocks/ArchiveBlock/Component'
import { BentoCTABlock } from '@/components/blocks/BentoCTA/Component'
import { CallToActionBlock } from '@/components/blocks/CallToAction/Component'
import { ContentBlock } from '@/components/blocks/Content/Component'
import { ContentCardBlock } from '@/components/blocks/ContentCard/Component'
import { FormBlock } from '@/components/blocks/Form/Component'
import { GridBlock } from '@/components/blocks/Grid/Component'
import { MediaBlock } from '@/components/blocks/MediaBlock/Component'
import { ImageMasonryGrid } from '@/components/blocks/ImageMasonryGrid/Component'
import { RichTextBlockComponent } from '@/components/blocks/RichTextBlock/Component'
import { VideoPlayer } from '@/components/blocks/VideoPlayer/Component'
import { VideoCardBlock } from '@/components/blocks/VideoCard/Component'
import { Carousel } from '@/components/blocks/Carousel/Component'
import { PricingCardBlock } from '@/components/blocks/PricingCard/Component'

const blockComponents = {
  archive: ArchiveBlock,
  bentoCTA: BentoCTABlock,
  content: ContentBlock,
  contentCard: ContentCardBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  grid: GridBlock,
  mediaBlock: MediaBlock,
  imageMasonryGrid: ImageMasonryGrid,
  richTextBlock: RichTextBlockComponent,
  videoPlayer: VideoPlayer,
  videoCard: VideoCardBlock,
  carousel: Carousel,
  pricingCard: PricingCardBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Record<string, unknown>[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const blockType = typeof block.blockType === 'string' ? block.blockType : null

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              const BlockComponent = Block as React.ComponentType<Record<string, unknown>>
              return (
                <div className="my-16" key={index}>
                  <BlockComponent {...(block as Record<string, unknown>)} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
