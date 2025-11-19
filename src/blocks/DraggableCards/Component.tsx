'use client'

import React from 'react'
import type { DraggableCardsBlock as DraggableCardsBlockProps } from '@/payload-types'
import { DraggableZoneClientWrapper } from '@/components/DraggableZone/ClientWrapper'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { transformPayloadCardToDraggableCard } from '@/components/DraggableCard/transformCard'

export const DraggableCardsBlock: React.FC<DraggableCardsBlockProps> = (props) => {
  const { title, description, cards, containerWidth = 'full' } = props

  if (!cards || cards.length === 0) {
    return null
  }

  // Transform Payload data to DraggableCardData format
  const draggableCards: DraggableCardData[] = cards
    .map((card, index) => transformPayloadCardToDraggableCard(card, index))
    .filter((card): card is DraggableCardData => card !== null)

  const widthClass = containerWidth === 'container' ? 'container' : 'w-full'

  return (
    <div className={`${widthClass} py-16`}>
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <DraggableZoneClientWrapper cards={draggableCards} width="w-full" className="bg-background" />
    </div>
  )
}
