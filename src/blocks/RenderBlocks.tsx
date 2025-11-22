import React, { Fragment } from 'react'

import type { Page, Project } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ContentCardBlock } from '@/blocks/ContentCard/Component'
import { DraggableCardsBlock } from '@/blocks/DraggableCards/Component'
import { TechStackCanvasBlock } from '@/blocks/TechStackCanvas/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageMasonryGrid } from '@/blocks/ImageMasonryGrid/Component'
import { RichTextBlockComponent } from '@/blocks/RichTextBlock/Component'
import { VideoPlayer } from '@/blocks/VideoPlayer/Component'
import { VideoCardBlock } from '@/blocks/VideoCard/Component'
import { Carousel } from '@/blocks/Carousel/Component'
import { PricingCardBlock } from '@/blocks/PricingCard/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  contentCard: ContentCardBlock,
  cta: CallToActionBlock,
  draggableCards: DraggableCardsBlock,
  techStackCanvas: TechStackCanvasBlock,
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
  blocks: Page['layout'][0][] | Project['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
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
