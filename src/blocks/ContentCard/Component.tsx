import React from 'react'

import type { ContentCardBlock as ContentCardBlockProps } from '@/payload-types'

import { ContentCard } from '@/components/ContentCard'

export const ContentCardBlock: React.FC<ContentCardBlockProps> = (props) => {
  const {
    aspectRatio,
    cycleInterval,
    enableFooter,
    enableLink,
    footerMeta,
    link: linkData,
    media: mediaArray,
    videoAutoplay,
  } = props

  // Extract media items from the array structure
  const mediaItems =
    mediaArray
      ?.map((item) => {
        if (item && typeof item === 'object' && 'item' in item) {
          return item.item
        }
        return item
      })
      .filter((item) => item !== null && item !== undefined) || []

  // Extract footer meta from array structure
  const footerMetaItems =
    footerMeta
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

  if (enableLink && linkData) {
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

  if (mediaItems.length === 0) {
    return null
  }

  return (
    <ContentCard
      aspectRatio={aspectRatio as 'square' | 'landscape' | 'portrait' | 'auto' | undefined}
      cycleInterval={cycleInterval || 3}
      enableFooter={enableFooter || false}
      enableLink={enableLink || false}
      footerMeta={footerMetaItems}
      href={href}
      linkNewTab={linkNewTab}
      media={mediaItems}
      videoAutoplay={videoAutoplay || false}
    />
  )
}

