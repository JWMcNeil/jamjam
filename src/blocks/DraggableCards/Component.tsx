'use client'

import React from 'react'
import type { DraggableCardsBlock as DraggableCardsBlockProps } from '@/payload-types'
import { DraggableZoneClientWrapper } from '@/components/DraggableZone/ClientWrapper'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

export const DraggableCardsBlock: React.FC<DraggableCardsBlockProps> = (props) => {
  const { title, description, cards, containerWidth = 'full', containerHeight = 600 } = props

  if (!cards || cards.length === 0) {
    return null
  }

  // Transform Payload data to DraggableCardData format
  const draggableCards: DraggableCardData[] = cards
    .map((card, index) => {
      if (!card || !card.title) {
        return null
      }

      // Get image URL from media upload
      let imageUrl: string | undefined
      if (card.image) {
        let media: MediaType | string | number | null = null

        // Handle different media structures
        if (typeof card.image === 'object') {
          // Could be direct media object or nested structure
          if ('value' in card.image) {
            media = card.image.value as MediaType
          } else {
            media = card.image as MediaType
          }
        } else {
          media = card.image
        }

        // Extract URL from media object
        if (media && typeof media === 'object' && 'url' in media) {
          const url = typeof media.url === 'string' ? media.url : null
          imageUrl = getMediaUrl(url, media.updatedAt as string | null)
        }
      }

      // Use card.id if available, otherwise create deterministic ID from title and index
      const cardId = card.id || `card-${card.title}-${index}`.toLowerCase().replace(/\s+/g, '-')

      // Extract breakpoint positions if they exist
      const positions = card.positions
        ? {
            ...(card.positions.xs && {
              xs: {
                normalizedX: card.positions.xs.normalizedX ?? undefined,
                normalizedY: card.positions.xs.normalizedY ?? undefined,
              },
            }),
            ...(card.positions.sm && {
              sm: {
                normalizedX: card.positions.sm.normalizedX ?? undefined,
                normalizedY: card.positions.sm.normalizedY ?? undefined,
              },
            }),
            ...(card.positions.md && {
              md: {
                normalizedX: card.positions.md.normalizedX ?? undefined,
                normalizedY: card.positions.md.normalizedY ?? undefined,
              },
            }),
            ...(card.positions.lg && {
              lg: {
                normalizedX: card.positions.lg.normalizedX ?? undefined,
                normalizedY: card.positions.lg.normalizedY ?? undefined,
              },
            }),
            ...(card.positions.xl && {
              xl: {
                normalizedX: card.positions.xl.normalizedX ?? undefined,
                normalizedY: card.positions.xl.normalizedY ?? undefined,
              },
            }),
            ...(card.positions['2xl'] && {
              '2xl': {
                normalizedX: card.positions['2xl'].normalizedX ?? undefined,
                normalizedY: card.positions['2xl'].normalizedY ?? undefined,
              },
            }),
            ...(card.positions['3xl'] && {
              '3xl': {
                normalizedX: card.positions['3xl'].normalizedX ?? undefined,
                normalizedY: card.positions['3xl'].normalizedY ?? undefined,
              },
            }),
          }
        : undefined

      const cardData: DraggableCardData = {
        id: cardId,
        title: card.title,
        ...(imageUrl && { image: imageUrl }),
        ...(card.initialX !== null && card.initialX !== undefined && { initialX: card.initialX }),
        ...(card.initialY !== null && card.initialY !== undefined && { initialY: card.initialY }),
        ...(card.normalizedX !== null &&
          card.normalizedX !== undefined && { normalizedX: card.normalizedX }),
        ...(card.normalizedY !== null &&
          card.normalizedY !== undefined && { normalizedY: card.normalizedY }),
        ...(positions && Object.keys(positions).length > 0 && { positions }),
      }
      return cardData
    })
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
      <DraggableZoneClientWrapper
        cards={draggableCards}
        width="w-full"
        height={`min-h-[${containerHeight}px]`}
        className="bg-background"
      />
    </div>
  )
}
