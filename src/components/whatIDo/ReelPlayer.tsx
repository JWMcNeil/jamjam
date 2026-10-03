'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false })

/**
 * The reel clip. Poster first, then a muted looping Mux player. Under reduced motion the poster
 * stays and the player is not loaded.
 */
export function ReelPlayer({
  playbackId,
  posterUrl,
  poster,
  title,
}: {
  playbackId: string | null
  posterUrl?: string
  poster: Media | null
  title: string
}) {
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    setMotionOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="relative aspect-[21/9] bg-page">
      {poster ? (
        <ImageMedia
          resource={poster}
          fill
          pictureClassName="absolute inset-0 block h-full w-full"
          imgClassName="h-full w-full object-cover"
          size="(min-width: 1280px) 1200px, 100vw"
          priority
          alt=""
        />
      ) : null}
      {playbackId && motionOk ? (
        <MuxPlayer
          playbackId={playbackId}
          poster={posterUrl}
          streamType="on-demand"
          autoPlay="muted"
          loop
          muted
          playsInline
          title={title}
          accentColor="hsl(127.66, 19.34%, 47.65%)"
          className="absolute inset-0 h-full w-full [&::part(media)]:object-cover"
        />
      ) : null}
    </div>
  )
}
