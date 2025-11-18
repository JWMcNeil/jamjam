import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { Eyebrow } from '@/components/Eyebrow'
import { CMSLink } from '@/components/Link'
import { ContentCard } from '@/components/ContentCard'
import { DraggableZoneClientWrapper } from '@/components/DraggableZone/ClientWrapper'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

type CustomHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      links?: never
      contentCard?: never
      draggableCards?: never
    }
  | (Omit<Page['hero'], 'richText' | 'links' | 'contentCard' | 'draggableCards'> & {
      children?: never
      richText?: Page['hero']['richText']
      links?: Page['hero']['links']
      contentCard?: Page['hero']['contentCard']
      draggableCards?: Page['hero']['draggableCards']
    })

export const CustomHero: React.FC<CustomHeroType> = ({
  children,
  richText,
  links,
  contentCard,
  draggableCards,
}) => {
  // Extract media items from the contentCard array structure
  const mediaItems =
    contentCard?.media
      ?.map((item) => {
        if (item && typeof item === 'object' && 'item' in item) {
          return item.item
        }
        return item
      })
      .filter((item) => item !== null && item !== undefined) || []

  // Extract footer meta from array structure
  const footerMetaItems =
    contentCard?.footerMeta
      ?.map((item) => {
        if (item && typeof item === 'object') {
          return {
            title: item.title || null,
            description: item.description || null,
            location: item.location || null,
            customText: item.customText || null,
          }
        }
        return null
      })
      .filter((item) => item !== null) || []

  // Build href from link data
  let href: string | undefined
  let linkNewTab = false

  if (contentCard?.enableLink && contentCard?.link) {
    const linkData = contentCard.link
    if (linkData.type === 'reference' && linkData.reference) {
      const reference = linkData.reference
      if (typeof reference === 'object' && reference.value) {
        const value = reference.value
        const relationTo = reference.relationTo || 'pages'
        if (typeof value === 'object' && 'slug' in value) {
          href = relationTo === 'pages' ? `/${value.slug}` : `/${relationTo}/${value.slug}`
        }
      }
    } else if (linkData.type === 'custom' && linkData.url) {
      href = linkData.url
    }
    linkNewTab = linkData.newTab || false
  }

  const hasContentCard = contentCard && mediaItems.length > 0

  // Transform draggableCards data to DraggableCardData format
  const draggableCardsData: DraggableCardData[] =
    draggableCards?.cards
      ?.map((card, index) => {
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
        // Type assertion needed until Payload types are regenerated
        const cardWithPositions = card as typeof card & {
          positions?: {
            mobile?: { normalizedX?: number | null; normalizedY?: number | null }
            tablet?: { normalizedX?: number | null; normalizedY?: number | null }
            desktop?: { normalizedX?: number | null; normalizedY?: number | null }
          }
          size?: 'sm' | 'md' | 'lg' | null
          description?: string | null
          websiteUrl?: string | null
        }

        const positions = cardWithPositions.positions && typeof cardWithPositions.positions === 'object'
          ? {
              ...(cardWithPositions.positions.mobile && typeof cardWithPositions.positions.mobile === 'object' && {
                mobile: {
                  normalizedX: cardWithPositions.positions.mobile.normalizedX ?? undefined,
                  normalizedY: cardWithPositions.positions.mobile.normalizedY ?? undefined,
                },
              }),
              ...(cardWithPositions.positions.tablet && typeof cardWithPositions.positions.tablet === 'object' && {
                tablet: {
                  normalizedX: cardWithPositions.positions.tablet.normalizedX ?? undefined,
                  normalizedY: cardWithPositions.positions.tablet.normalizedY ?? undefined,
                },
              }),
              ...(cardWithPositions.positions.desktop && typeof cardWithPositions.positions.desktop === 'object' && {
                desktop: {
                  normalizedX: cardWithPositions.positions.desktop.normalizedX ?? undefined,
                  normalizedY: cardWithPositions.positions.desktop.normalizedY ?? undefined,
                },
              }),
            }
          : undefined

        const cardData: DraggableCardData = {
          id: cardId,
          title: card.title,
          ...(imageUrl && { image: imageUrl }),
          ...(cardWithPositions.size && { size: cardWithPositions.size as DraggableCardData['size'] }),
          ...(positions && Object.keys(positions).length > 0 && { positions }),
          ...(cardWithPositions.description && { description: cardWithPositions.description }),
          ...(cardWithPositions.websiteUrl && { websiteUrl: cardWithPositions.websiteUrl }),
        }
        return cardData
      })
      .filter((card): card is DraggableCardData => card !== null) || []

  const hasDraggableCards = draggableCardsData.length > 0
  const containerHeight = draggableCards?.containerHeight || 400

  return (
    <div className="container mt-16">
      <Eyebrow TextLeft="Web Dev" TextRight="Photo + Video" />
      <div
        className={`gap-8 flex flex-col ${
          hasContentCard ? 'lg:flex-row lg:items-start' : 'max-w-[40rem]'
        }`}
      >
        <div className={`flex flex-col gap-8 ${hasContentCard ? 'flex-1 lg:max-w-[40rem]' : ''}`}>
          {children || (richText && <RichText data={richText} enableGutter={false} />)}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
          {hasDraggableCards && (
            <div className="mt-8">
              <DraggableZoneClientWrapper
                cards={draggableCardsData}
                width="w-full"
                height={`min-h-[${containerHeight}px]`}
                className="bg-background"
              />
            </div>
          )}
        </div>
        {hasContentCard && (
          <div className="flex-1 lg:max-w-[40rem]">
            <ContentCard
              aspectRatio={
                contentCard.aspectRatio as 'square' | 'landscape' | 'portrait' | 'auto' | undefined
              }
              cycleInterval={contentCard.cycleInterval || 3}
              enableFooter={contentCard.enableFooter || false}
              enableLink={contentCard.enableLink || false}
              footerMeta={footerMetaItems}
              href={href}
              linkNewTab={linkNewTab}
              media={mediaItems as (MediaType | string | number | null)[]}
              videoAutoplay={contentCard.videoAutoplay || false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
