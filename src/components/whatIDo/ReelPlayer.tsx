'use client'

import dynamic from 'next/dynamic'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { useEffect, useRef, useState } from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false })

/** Plays this many times, then rests on the poster. Keeps Mux delivery minutes bounded. */
const MAX_PLAYS = 3

/**
 * The reel clip. Poster first. The muted Mux player only loads once the reel scrolls into view,
 * pauses when it leaves, and stops after MAX_PLAYS plays. Under reduced motion the poster stays
 * and the player is not loaded.
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
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<MuxPlayerRefAttributes>(null)
  const plays = useRef(1)
  const inView = useRef(false)

  useEffect(() => {
    setMotionOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = frameRef.current
    if (!el || !motionOk) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        if (entry.isIntersecting) {
          setStarted(true)
          void playerRef.current?.play().catch(() => {})
        } else {
          playerRef.current?.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [motionOk])

  const handleEnded = () => {
    if (plays.current >= MAX_PLAYS) {
      setDone(true)
      return
    }
    plays.current += 1
    const player = playerRef.current
    if (!player) return
    player.currentTime = 0
    if (inView.current) void player.play().catch(() => {})
  }

  return (
    <div ref={frameRef} className="relative aspect-[21/9] bg-page">
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
      {playbackId && motionOk && started && !done ? (
        <MuxPlayer
          ref={playerRef}
          onEnded={handleEnded}
          playbackId={playbackId}
          poster={posterUrl}
          streamType="on-demand"
          autoPlay="muted"
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
