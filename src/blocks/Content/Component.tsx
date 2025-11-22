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
  PricingCardBlock,
} from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { ContentCardBlock as ContentCardBlockComponent } from '@/blocks/ContentCard/Component'
import { TechStackCanvasBlock as TechStackCanvasBlockComponent } from '@/blocks/TechStackCanvas/Component'
import { Carousel } from '@/blocks/Carousel/Component'
import { VideoCardBlock as VideoCardBlockComponent } from '@/blocks/VideoCard/Component'
import { VideoPlayer } from '@/blocks/VideoPlayer/Component'
import { FormBlock as FormBlockComponent } from '@/blocks/Form/Component'
import { DraggableCardsBlock as DraggableCardsBlockComponent } from '@/blocks/DraggableCards/Component'
import { PricingCardBlock as PricingCardBlockComponent } from '@/blocks/PricingCard/Component'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <>
      <style>{`
        .content-block-container {
          container-type: inline-size;
        }
        /* Container queries: Only apply column spans when container is wide enough */
        /* For half columns: need space for 2x 320px cards + gap (16px) = ~700px minimum */
        /* Works with 4-column grid: span 2 = half */
        @container (min-width: 700px) {
          .content-col-half {
            grid-column: span 2 / span 2;
          }
        }
        /* When viewport is xl (1280px+), grid becomes 12 columns, so adjust spans */
        @media (min-width: 1280px) {
          @container (min-width: 700px) {
            .content-col-half {
              grid-column: span 6 / span 6;
            }
          }
        }
        @container (min-width: 500px) {
          .content-col-oneThird {
            grid-column: span 2 / span 2;
          }
        }
        @media (min-width: 1280px) {
          @container (min-width: 500px) {
            .content-col-oneThird {
              grid-column: span 4 / span 4;
            }
          }
        }
        @container (min-width: 900px) {
          .content-col-twoThirds {
            grid-column: span 3 / span 3;
          }
        }
        @media (min-width: 1280px) {
          @container (min-width: 900px) {
            .content-col-twoThirds {
              grid-column: span 8 / span 8;
            }
          }
        }
        @container (min-width: 400px) {
          .content-col-full {
            grid-column: span 4 / span 4;
          }
        }
        @media (min-width: 1280px) {
          @container (min-width: 400px) {
            .content-col-full {
              grid-column: span 12 / span 12;
            }
          }
        }
      `}</style>
      <div className="container my-16">
        {columns && columns.length > 0 && (
          <div className="@container content-block-container grid grid-cols-4 xl:grid-cols-12 gap-y-8 gap-x-16">
            {columns.map((col, index) => {
              const { enableLink, link, richText, size, children } = col

              const sizeClassMap = {
                half: 'content-col-half',
                oneThird: 'content-col-oneThird',
                twoThirds: 'content-col-twoThirds',
                full: 'content-col-full',
              }

              return (
                <div
                  className={cn(
                    // Base: full width on mobile and when container is too narrow
                    'col-span-4',
                    // Viewport breakpoints (fallback for browsers without container query support)
                    // Only apply at xl breakpoint to avoid forcing columns when container is narrow
                    {
                      'xl:col-span-4': size === 'oneThird',
                      'xl:col-span-6': size === 'half',
                      'xl:col-span-8': size === 'twoThirds',
                      'xl:col-span-12': size === 'full',
                    },
                    // Container query classes (for browsers with container query support)
                    // These take precedence and will stack columns when container is too narrow
                    size && sizeClassMap[size],
                  )}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {children && children.length > 0 && (
                    <div className="">
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
                            <div key={(block as CarouselBlock).id || blockIndex} className="">
                              <Carousel {...(block as CarouselBlock)} disableInnerContainer />
                            </div>
                          )
                        }

                        if (blockType === 'videoCard') {
                          return (
                            <div key={(block as VideoCardBlock).id || blockIndex} className="">
                              <VideoCardBlockComponent {...(block as VideoCardBlock)} />
                            </div>
                          )
                        }

                        if (blockType === 'videoPlayer') {
                          return (
                            <div key={(block as VideoPlayerBlock).id || blockIndex} className="">
                              <VideoPlayer {...(block as VideoPlayerBlock)} disableInnerContainer />
                            </div>
                          )
                        }

                        if (blockType === 'formBlock') {
                          const formBlock = block as FormBlock
                          // Skip if form is not populated (just an ID)
                          if (typeof formBlock.form === 'number') {
                            return null
                          }
                          const { id, blockName, enableIntro, form, introContent, ...rest } =
                            formBlock
                          const props = {
                            ...rest,
                            form: form as unknown as Parameters<
                              typeof FormBlockComponent
                            >[0]['form'],
                            ...(id != null ? { id } : {}),
                            ...(blockName != null ? { blockName } : {}),
                            ...(introContent != null ? { introContent } : {}),
                            enableIntro: enableIntro ?? false,
                          }
                          return (
                            <div key={id || blockIndex} className="">
                              <FormBlockComponent {...props} />
                            </div>
                          )
                        }

                        if (blockType === 'draggableCards') {
                          return (
                            <div key={(block as DraggableCardsBlock).id || blockIndex} className="">
                              <DraggableCardsBlockComponent {...(block as DraggableCardsBlock)} />
                            </div>
                          )
                        }

                        if (blockType === 'pricingCard') {
                          return (
                            <div key={(block as PricingCardBlock).id || blockIndex} className="">
                              <PricingCardBlockComponent {...(block as PricingCardBlock)} />
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
    </>
  )
}
