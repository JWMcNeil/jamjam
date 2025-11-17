import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type {
  ContentBlock as ContentBlockProps,
  ContentCardBlock,
  TechStackCanvasBlock,
} from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { ContentCardBlock as ContentCardBlockComponent } from '@/blocks/ContentCard/Component'
import { TechStackCanvasBlock as TechStackCanvasBlockComponent } from '@/blocks/TechStackCanvas/Component'

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
            const { enableLink, link, richText, size } = col
            const contentCard = (
              col as typeof col & {
                contentCard?: ContentCardBlock[]
              }
            ).contentCard
            const techStackCanvas = (
              col as typeof col & {
                techStackCanvas?: TechStackCanvasBlock[]
              }
            ).techStackCanvas

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}
                {contentCard && contentCard.length > 0 && (
                  <div className="mt-4">
                    {contentCard.map((block: ContentCardBlock, blockIndex: number) => {
                      return (
                        <div key={block.id || blockIndex}>
                          <ContentCardBlockComponent {...block} />
                        </div>
                      )
                    })}
                  </div>
                )}
                {techStackCanvas && techStackCanvas.length > 0 && (
                  <div className="mt-8 md:mt-0">
                    {techStackCanvas.map((block: TechStackCanvasBlock, blockIndex: number) => {
                      return (
                        <div key={block.id || blockIndex}>
                          <TechStackCanvasBlockComponent {...block} />
                        </div>
                      )
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
