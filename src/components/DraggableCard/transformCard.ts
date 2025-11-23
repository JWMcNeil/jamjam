import type { DraggableCardData } from './types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

type PayloadCard = {
  title: string
  image?: (number | null) | MediaType
  category?:
    | (
        | 'frontend'
        | 'backend'
        | 'database'
        | 'infrastructure'
        | 'tooling'
        | 'design'
        | 'ai-automation'
        | 'devops'
        | 'security'
        | 'mobile'
        | 'analytics'
        | 'e-commerce'
        | 'email-comm'
      )
    | null
  size?: ('sm' | 'md' | 'lg') | null
  description?: string | null
  websiteUrl?: string | null
  positions?: {
    mobile?: {
      normalizedX?: number | null
      normalizedY?: number | null
    }
    tablet?: {
      normalizedX?: number | null
      normalizedY?: number | null
    }
    desktop?: {
      normalizedX?: number | null
      normalizedY?: number | null
    }
  }
  id?: string | null
}

/**
 * Transform a Payload CMS card to DraggableCardData format
 * Handles media URL extraction, ID generation, and position mapping
 */
export function transformPayloadCardToDraggableCard(
  card: PayloadCard,
  index: number,
): DraggableCardData | null {
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
}

