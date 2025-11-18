import React from 'react'

import type { VideoCardBlock as VideoCardBlockProps } from '@/payload-types'

import { VideoCard } from '@/components/VideoCard'

export const VideoCardBlock: React.FC<VideoCardBlockProps> = (props) => {
  const {
    aspectRatio,
    enableFooter,
    enableLink,
    footerMeta,
    link: linkData,
    video,
    videoAutoplay,
  } = props

  // Extract footer meta from group structure
  const footerMetaData =
    footerMeta && typeof footerMeta === 'object'
      ? {
          title: footerMeta.title || null,
          description: footerMeta.description || null,
          location: footerMeta.location || null,
          customText: footerMeta.customText || null,
        }
      : undefined

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

  if (!video) {
    return null
  }

  // Ensure video is populated (not just an ID)
  const videoData =
    typeof video === 'object' && 'id' in video && Object.keys(video).length > 1 ? video : null

  if (!videoData) {
    return null
  }

  return (
    <VideoCard
      aspectRatio={aspectRatio as 'square' | 'landscape' | 'portrait' | 'auto' | undefined}
      enableFooter={enableFooter || false}
      enableLink={enableLink || false}
      footerMeta={footerMetaData}
      href={href}
      linkNewTab={linkNewTab}
      video={videoData}
      videoAutoplay={videoAutoplay || false}
    />
  )
}

