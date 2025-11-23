'use client'

import React from 'react'
import type { TechStackCanvasBlock as TechStackCanvasBlockProps } from '@/payload-types'
import { TechStackCanvasClientWrapper } from '@/components/TechStackCanvas/ClientWrapper'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

export const TechStackCanvasBlock: React.FC<TechStackCanvasBlockProps> = (props) => {
  const { title, description, cards, containerWidth = 'container', containerHeight = 600 } = props

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
        card.mobile || card.tablet || card.desktop
          ? {
              ...(card.mobile && {
                mobile: {
                  normalizedX: card.mobile.normalizedX ?? undefined,
                  normalizedY: card.mobile.normalizedY ?? undefined,
                },
              }),
              ...(card.tablet && {
                tablet: {
                  normalizedX: card.tablet.normalizedX ?? undefined,
                  normalizedY: card.tablet.normalizedY ?? undefined,
                },
              }),
              ...(card.desktop && {
                desktop: {
                  normalizedX: card.desktop.normalizedX ?? undefined,
                  normalizedY: card.desktop.normalizedY ?? undefined,
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

  const widthClass = containerWidth === 'container' ? 'container' : 'w-full'

  return (
    <div className={`${widthClass} py-16`}>
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <TechStackCanvasClientWrapper
        cards={draggableCards}
        width="w-full"
        height={`min-h-[${containerHeight}px]`}
        className="bg-background"
      />
    </div>
  )
}
