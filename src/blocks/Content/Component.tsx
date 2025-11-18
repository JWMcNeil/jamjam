import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type {
  ContentBlock as ContentBlockProps,
  ContentCardBlock,
  TechStackCanvasBlock,
  CarouselBlock,
  VideoCardBlock,
  VideoPlayerBlock,
  DraggableCardsBlock,
  FormBlock,
} from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { ContentCardBlock as ContentCardBlockComponent } from '@/blocks/ContentCard/Component'
import { TechStackCanvasBlock as TechStackCanvasBlockComponent } from '@/blocks/TechStackCanvas/Component'
import { Carousel } from '@/blocks/Carousel/Component'
import { VideoCardBlock as VideoCardBlockComponent } from '@/blocks/VideoCard/Component'
import { VideoPlayer } from '@/blocks/VideoPlayer/Component'
import { FormBlock as FormBlockComponent } from '@/blocks/Form/Component'
import { DraggableCardsBlock as DraggableCardsBlockComponent } from '@/blocks/DraggableCards/Component'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      {columns && columns.length > 0 && (
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns.map((col, index) => {
            const { enableLink, link, richText, size, children } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}
                {children && children.length > 0 && (
                  <div className="mt-4">
                    {children.map((block, blockIndex: number) => {
                      const { blockType } = block as {
                        blockType?: string
                        id?: string | null
                      }

                      if (blockType === 'contentCard') {
                        return (
                          <div key={(block as ContentCardBlock).id || blockIndex}>
                            <ContentCardBlockComponent {...(block as ContentCardBlock)} />
                          </div>
                        )
                      }

                      if (blockType === 'techStackCanvas') {
                        return (
                          <div
                            key={(block as TechStackCanvasBlock).id || blockIndex}
                            className="mt-8 md:mt-0"
                          >
                            <TechStackCanvasBlockComponent {...(block as TechStackCanvasBlock)} />
                          </div>
                        )
                      }

                      if (blockType === 'carousel') {
                        return (
                          <div key={(block as CarouselBlock).id || blockIndex} className="mt-4">
                            <Carousel {...(block as CarouselBlock)} disableInnerContainer />
                          </div>
                        )
                      }

                      if (blockType === 'videoCard') {
                        return (
                          <div key={(block as VideoCardBlock).id || blockIndex} className="mt-4">
                            <VideoCardBlockComponent {...(block as VideoCardBlock)} />
                          </div>
                        )
                      }

                      if (blockType === 'videoPlayer') {
                        return (
                          <div key={(block as VideoPlayerBlock).id || blockIndex} className="mt-4">
                            <VideoPlayer {...(block as VideoPlayerBlock)} disableInnerContainer />
                          </div>
                        )
                      }

                      if (blockType === 'formBlock') {
                        return (
                          <div key={(block as FormBlock).id || blockIndex} className="mt-4">
                            <FormBlockComponent {...(block as FormBlock)} />
                          </div>
                        )
                      }

                      if (blockType === 'draggableCards') {
                        return (
                          <div
                            key={(block as DraggableCardsBlock).id || blockIndex}
                            className="mt-4"
                          >
                            <DraggableCardsBlockComponent {...(block as DraggableCardsBlock)} />
                          </div>
                        )
                      }

                      return null
                    })}
                  </div>
                )}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
