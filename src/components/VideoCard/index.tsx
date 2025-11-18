'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { useMemo } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxVideo } from '@/payload-types'

export type FooterMeta = {
  title?: string | null
  description?: string | null
  location?: string | null
  customText?: string | null
}

export type VideoCardProps = {
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto'
  className?: string
  enableFooter?: boolean
  enableLink?: boolean
  footerMeta?: FooterMeta
  href?: string
  linkNewTab?: boolean
  video: MuxVideo | null
  videoAutoplay?: boolean
}

const aspectRatioClasses = {
  square: 'aspect-square',
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  auto: '',
}

export const VideoCard: React.FC<VideoCardProps> = (props) => {
  const {
    aspectRatio = 'auto',
    className,
    enableFooter = false,
    enableLink = false,
    footerMeta,
    href,
    linkNewTab = false,
    video,
    videoAutoplay = false,
  } = props

  const { card, link } = useClickableCard({
    external: linkNewTab,
    newTab: linkNewTab,
  })

  // Extract playback options from mux-video
  const playbackOptions = useMemo(() => {
    if (!video || typeof video !== 'object') {
      return null
    }

    if (
      'playbackOptions' in video &&
      Array.isArray(video.playbackOptions) &&
      video.playbackOptions.length > 0
    ) {
      return video.playbackOptions[0]
    }

    return null
  }, [video])

  const playbackId = playbackOptions?.playbackId || null
  const posterUrl = playbackOptions?.posterUrl ?? undefined

  // Calculate aspect ratio from video dimensions when 'auto'
  const dynamicAspectRatio = useMemo(() => {
    if (aspectRatio !== 'auto' || !video || typeof video !== 'object') {
      return undefined
    }

    if ('aspectRatio' in video && video.aspectRatio && typeof video.aspectRatio === 'string') {
      // aspectRatio is stored as a string like "16:9", convert to number
      const ratio = video.aspectRatio.split(':')
      if (ratio.length === 2) {
        return parseFloat(ratio[0]) / parseFloat(ratio[1])
      }
    }

    return undefined
  }, [aspectRatio, video])

  if (!video || !playbackId) {
    return null
  }

  const aspectRatioClass = aspectRatioClasses[aspectRatio]
  const containerStyle = dynamicAspectRatio ? { aspectRatio: dynamicAspectRatio } : undefined

  const cardContent = (
    <article
      className={cn(
        'relative border border-border rounded-lg overflow-hidden bg-card',
        enableLink && 'hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden transition-[aspect-ratio] duration-500 ease-in-out',
          aspectRatioClass,
        )}
        style={containerStyle}
      >
        <div className="relative w-full h-full">
          <MuxPlayer
            playbackId={playbackId}
            autoPlay={videoAutoplay}
            loop
            muted={videoAutoplay}
            playsInline
            poster={posterUrl}
            streamType="on-demand"
            className="w-full h-full object-cover"
            title={video.title || undefined}
            accentColor="hsl(127.66, 19.34%, 47.65%)"
            primaryColor="hsl(0, 0%, 100%)"
            secondaryColor="hsl(217.2, 32.6%, 17.5%)"
          />
        </div>
      </div>

      {enableFooter && footerMeta && (
        <div className="p-4">
          {footerMeta.title && (
            <div className="font-semibold text-foreground mb-1">{footerMeta.title}</div>
          )}
          {footerMeta.description && (
            <div className="text-sm text-muted-foreground mb-1">{footerMeta.description}</div>
          )}
          {footerMeta.location && (
            <div className="text-xs text-muted-foreground mb-1">{footerMeta.location}</div>
          )}
          {footerMeta.customText && (
            <div className="text-sm text-foreground">{footerMeta.customText}</div>
          )}
        </div>
      )}

      {enableLink && href && (
        <Link
          className="absolute inset-0 z-[1] pointer-events-auto text-transparent outline-none"
          href={href}
          ref={link.ref}
          aria-label="View video"
          tabIndex={0}
          {...(linkNewTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        >
          <span className="sr-only">View video</span>
        </Link>
      )}
    </article>
  )

  return cardContent
}
