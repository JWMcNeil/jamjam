'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import MuxPlayer from '@mux/mux-player-react'

import type { VideoPlayerBlock as VideoPlayerBlockProps } from '@/payload-types'

type Props = VideoPlayerBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const VideoPlayer: React.FC<Props> = (props) => {
  const {
    autoplay = false,
    className,
    controls = true,
    externalUrl,
    loop = false,
    muxAssetId,
    muted = false,
    poster,
    videoType = 'mux',
    disableInnerContainer,
  } = props

  if (videoType === 'mux' && !muxAssetId) {
    return null
  }

  if (videoType === 'external' && !externalUrl) {
    return null
  }

  const posterUrl =
    poster && typeof poster === 'object' && 'url' in poster && poster.url ? poster.url : undefined

  // Convert YouTube/Vimeo URLs to embed URLs
  const getEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url)
      
      // YouTube
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        const videoId = urlObj.hostname.includes('youtu.be')
          ? urlObj.pathname.slice(1)
          : urlObj.searchParams.get('v')
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`
        }
      }
      
      // Vimeo
      if (urlObj.hostname.includes('vimeo.com')) {
        const videoId = urlObj.pathname.slice(1)
        if (videoId) {
          return `https://player.vimeo.com/video/${videoId}`
        }
      }
      
      // If already an embed URL or can't parse, return as-is
      return url
    } catch {
      // If URL parsing fails, return as-is
      return url
    }
  }

  const embedUrl = videoType === 'external' && externalUrl ? getEmbedUrl(externalUrl) : undefined

  return (
    <div
      className={cn(
        'my-16',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        {videoType === 'mux' && muxAssetId ? (
          <MuxPlayer
            playbackId={muxAssetId}
            autoPlay={autoplay ?? false}
            controls={controls ?? true}
            loop={loop ?? false}
            muted={muted ?? false}
            poster={posterUrl}
            streamType="on-demand"
            className="w-full h-full"
          />
        ) : videoType === 'external' && embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        ) : null}
      </div>
    </div>
  )
}

