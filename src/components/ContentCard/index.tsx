'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type FooterMeta = {
  title?: string | null
  description?: string | null
  location?: string | null
  customText?: string | null
}

export type ContentCardProps = {
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto'
  className?: string
  cycleInterval?: number
  enableFooter?: boolean
  enableLink?: boolean
  footerMeta?: FooterMeta[]
  href?: string
  linkNewTab?: boolean
  media: (MediaType | string | number | null)[]
  videoAutoplay?: boolean
}

const aspectRatioClasses = {
  square: 'aspect-square',
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  auto: '',
}

export const ContentCard: React.FC<ContentCardProps> = (props) => {
  const {
    aspectRatio = 'auto',
    className,
    cycleInterval = 3,
    enableFooter = false,
    enableLink = false,
    footerMeta = [],
    href,
    linkNewTab = false,
    media,
    videoAutoplay = false,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const { card, link } = useClickableCard({
    external: linkNewTab,
    newTab: linkNewTab,
  })

  // Filter out null/undefined media items
  const validMedia = useMemo(
    () => media.filter((item) => item !== null && item !== undefined),
    [media],
  )

  // Calculate aspect ratio from image dimensions when 'auto' to prevent layout shift
  // This must be called before any early returns
  const currentMedia = validMedia.length > 0 ? validMedia[currentIndex] : null
  const dynamicAspectRatio = useMemo(() => {
    if (aspectRatio !== 'auto' || !currentMedia) return undefined

    if (
      typeof currentMedia === 'object' &&
      currentMedia !== null &&
      currentMedia.width &&
      currentMedia.height
    ) {
      return currentMedia.width / currentMedia.height
    }

    return undefined
  }, [aspectRatio, currentMedia])

  // Initialize video refs array size and reset index when media changes
  useEffect(() => {
    videoRefs.current = new Array(validMedia.length).fill(null)
    setCurrentIndex(0)
  }, [validMedia.length])

  // Auto-cycle through images (not videos)
  useEffect(() => {
    if (validMedia.length <= 1) return

    const imageCount = validMedia.filter((item) => {
      if (typeof item === 'object' && item !== null) {
        return !item.mimeType?.includes('video')
      }
      return true // Assume string/number are images or handle separately
    }).length

    if (imageCount <= 1) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        // Find next image index
        let nextIndex = prev + 1
        let attempts = 0

        while (attempts < validMedia.length) {
          if (nextIndex >= validMedia.length) {
            nextIndex = 0
          }

          const mediaItem = validMedia[nextIndex]
          const isVideo =
            typeof mediaItem === 'object' &&
            mediaItem !== null &&
            mediaItem.mimeType?.includes('video')

          if (!isVideo) {
            return nextIndex
          }

          nextIndex++
          attempts++
        }

        return prev
      })
    }, cycleInterval * 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [validMedia, cycleInterval])

  // Handle video hover autoplay
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex]
    if (!currentVideo) return

    const currentMediaItem = validMedia[currentIndex]
    const isCurrentVideo =
      typeof currentMediaItem === 'object' &&
      currentMediaItem !== null &&
      currentMediaItem.mimeType?.includes('video')

    if (!isCurrentVideo) return

    if (isHovered) {
      if (videoAutoplay) {
        // If autoplay is enabled, video should already be playing
        currentVideo.play().catch(() => {
          // Autoplay failed, likely due to browser policy
        })
      } else {
        // On hover, play video even if autoplay is disabled
        currentVideo.play().catch(() => {
          // Play failed
        })
      }
    } else {
      // Pause when not hovered (only if autoplay is disabled)
      if (!videoAutoplay) {
        currentVideo.pause()
        currentVideo.currentTime = 0
      }
    }
  }, [isHovered, currentIndex, validMedia, videoAutoplay])

  if (validMedia.length === 0) {
    return null
  }

  const currentMeta = footerMeta[currentIndex] || {}

  const isVideo =
    typeof currentMedia === 'object' &&
    currentMedia !== null &&
    currentMedia.mimeType?.includes('video')

  const aspectRatioClass = aspectRatioClasses[aspectRatio]

  const containerStyle = dynamicAspectRatio ? { aspectRatio: dynamicAspectRatio } : undefined

  const cardContent = (
    <article
      className={cn(
        'relative border border-border rounded-lg overflow-hidden bg-card',
        enableLink && 'hover:cursor-pointer',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={card.ref}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden transition-[aspect-ratio] duration-500 ease-in-out',
          enableLink && 'transition-transform duration-300 ease-in-out',
          enableLink && isHovered && 'scale-[1.02]',
          aspectRatioClass,
        )}
        style={containerStyle}
      >
        {isVideo && typeof currentMedia === 'object' && currentMedia !== null ? (
          <div className="relative w-full h-full">
            {videoAutoplay ? (
              <video
                autoPlay
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="none"
                ref={(el) => {
                  if (el) {
                    videoRefs.current[currentIndex] = el
                  }
                }}
              >
                <source src={getMediaUrl(`/media/${currentMedia.filename}`)} />
              </video>
            ) : (
              <div className="relative w-full h-full">
                {/* Show thumbnail/poster when not autoplaying */}
                {currentMedia.url && (
                  <Media fill imgClassName="object-cover" resource={currentMedia} size="100vw" />
                )}
                {/* Overlay video that plays on hover */}
                <video
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
                    isHovered ? 'opacity-100' : 'opacity-0',
                  )}
                  loop
                  muted
                  playsInline
                  preload="none"
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[currentIndex] = el
                    }
                  }}
                >
                  <source src={getMediaUrl(`/media/${currentMedia.filename}`)} />
                </video>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Render all images with fade transitions */}
            {validMedia.map((mediaItem, index) => {
              const itemIsVideo =
                typeof mediaItem === 'object' &&
                mediaItem !== null &&
                mediaItem.mimeType?.includes('video')

              // Skip videos in image rendering
              if (itemIsVideo) return null

              const isActive = index === currentIndex

              return (
                <div
                  key={index}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500 ease-in-out',
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0',
                  )}
                >
                  <Media
                    fill
                    imgClassName="object-cover"
                    loading={index === 0 ? undefined : 'lazy'}
                    priority={index === 0}
                    resource={mediaItem}
                    size="100vw"
                  />
                </div>
              )
            })}
          </>
        )}

        {/* Image cycle indicators */}
        {validMedia.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {validMedia.map((_, index) => {
              const mediaItem = validMedia[index]
              const itemIsVideo =
                typeof mediaItem === 'object' &&
                mediaItem !== null &&
                mediaItem.mimeType?.includes('video')

              // Only show indicators for images (or if it's the current video)
              if (itemIsVideo && index !== currentIndex) return null

              return (
                <button
                  key={index}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === currentIndex ? 'w-6 bg-foreground' : 'w-1.5 bg-foreground/40',
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  type="button"
                />
              )
            })}
          </div>
        )}
      </div>

      {enableFooter && (
        <div className="p-4">
          {currentMeta.title && (
            <div className="font-semibold text-foreground mb-1">{currentMeta.title}</div>
          )}
          {currentMeta.description && (
            <div className="text-sm text-muted-foreground mb-1">{currentMeta.description}</div>
          )}
          {currentMeta.location && (
            <div className="text-xs text-muted-foreground mb-1">{currentMeta.location}</div>
          )}
          {currentMeta.customText && (
            <div className="text-sm text-foreground">{currentMeta.customText}</div>
          )}
        </div>
      )}

      {enableLink && href && (
        <Link
          className="absolute inset-0 z-[1] pointer-events-auto text-transparent outline-none"
          href={href}
          ref={link.ref}
          aria-label="View content"
          tabIndex={0}
          {...(linkNewTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        >
          <span className="sr-only">View content</span>
        </Link>
      )}
    </article>
  )

  return cardContent
}
