'use client'

import React from 'react'
import type { RichTextBlock, DraggableCardsBlock } from '@/payload-types'
import { RichTextBlockComponent } from '@/blocks/RichTextBlock/Component'
import { DraggableZoneClientWrapper } from '@/components/DraggableZone/ClientWrapper'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

type HeroCanvasProps = {
  heroBlock?: RichTextBlock | null
  cardsBlock?: DraggableCardsBlock | null
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ heroBlock, cardsBlock }) => {
  // Transform cards from DraggableCardsBlock to DraggableCardData format
  const draggableCards: DraggableCardData[] = React.useMemo(() => {
    if (!cardsBlock?.cards || cardsBlock.cards.length === 0) {
      return []
    }

    return cardsBlock.cards
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
        const positions =
          card.positions && typeof card.positions === 'object'
            ? {
                ...(card.positions.mobile &&
                  typeof card.positions.mobile === 'object' && {
                    mobile: {
                      normalizedX: card.positions.mobile.normalizedX ?? undefined,
                      normalizedY: card.positions.mobile.normalizedY ?? undefined,
                    },
                  }),
                ...(card.positions.tablet &&
                  typeof card.positions.tablet === 'object' && {
                    tablet: {
                      normalizedX: card.positions.tablet.normalizedX ?? undefined,
                      normalizedY: card.positions.tablet.normalizedY ?? undefined,
                    },
                  }),
                ...(card.positions.desktop &&
                  typeof card.positions.desktop === 'object' && {
                    desktop: {
                      normalizedX: card.positions.desktop.normalizedX ?? undefined,
                      normalizedY: card.positions.desktop.normalizedY ?? undefined,
                    },
                  }),
              }
            : undefined

        const cardData: DraggableCardData = {
          id: cardId,
          title: card.title,
          ...(imageUrl && { image: imageUrl }),
          ...(card.category && { category: card.category as DraggableCardData['category'] }),
          ...(card.size && { size: card.size as DraggableCardData['size'] }),
          ...(positions && Object.keys(positions).length > 0 && { positions }),
          ...(card.description && { description: card.description }),
          ...(card.websiteUrl && { websiteUrl: card.websiteUrl }),
        }
        return cardData
      })
      .filter((card): card is DraggableCardData => card !== null)
  }, [cardsBlock])

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Draggable Cards Canvas - Background Layer */}
      {draggableCards.length > 0 && (
        <div className="absolute inset-0 z-0">
          <DraggableZoneClientWrapper
            cards={draggableCards}
            width="w-full"
            height="h-full"
            className="bg-transparent mt-0"
            style={{ minHeight: '100vh', height: '100%' }}
          />
        </div>
      )}

      {/* Hero Text Content - Overlay Layer */}
      {heroBlock && (
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-[40rem] text-center px-4 pointer-events-auto">
            <RichTextBlockComponent {...heroBlock} />
          </div>
        </div>
      )}
    </div>
  )
}

