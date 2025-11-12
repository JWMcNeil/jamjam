import React from 'react'

import type { GridBlock as GridBlockProps, ContentCardBlock } from '@/payload-types'

import { ContentCardBlock as ContentCardBlockComponent } from '@/blocks/ContentCard/Component'

export const GridBlock: React.FC<GridBlockProps> = (props) => {
  const { contentCards, columns = '3' } = props

  if (!contentCards || contentCards.length === 0) {
    return null
  }

  // Map column values to Tailwind grid classes
  const gridColsClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  const gridClass = gridColsClasses[columns as keyof typeof gridColsClasses] || gridColsClasses['3']

  return (
    <div className="container my-16">
      <div className={`grid ${gridClass} gap-8`}>
        {contentCards.map((card: ContentCardBlock, index: number) => {
          return (
            <div key={card.id || index}>
              <ContentCardBlockComponent {...card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
