import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps, ContentCardBlock } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { ContentCardBlock as ContentCardBlockComponent } from '@/blocks/ContentCard/Component'

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
            const contentCard = (col as any).contentCard as ContentCardBlock[] | undefined

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
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
