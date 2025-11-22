import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardData, CardDataWithRelation } from '@/components/Card'

export type Props = {
  posts: CardData[] | CardDataWithRelation[]
  relationTo?: 'posts' | 'web' | 'content'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo: defaultRelationTo = 'posts' } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              // Extract relationTo from card data if present, otherwise use default
              const cardRelationTo =
                'relationTo' in result && result.relationTo
                  ? result.relationTo
                  : defaultRelationTo
              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo={cardRelationTo}
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
