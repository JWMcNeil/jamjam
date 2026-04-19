'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getMuxPlayback } from '@/utilities/muxPlayback'
import type { ProjectShowcaseSlide } from '@/types/projectShowcase'
import type { MuxVideo } from '@/payload-types'
import MuxPlayer from '@mux/mux-player-react'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
  slides: ProjectShowcaseSlide[]
  className?: string
}

export const ProjectShowcaseCarousel: React.FC<Props> = ({ slides, className }) => {
  const list = slides.filter((s) => {
    if (s.kind === 'media') return Boolean(s.media)
    return Boolean(s.video && getMuxPlayback(s.video).playbackId)
  })
  const [index, setIndex] = useState(0)
  const count = list.length

  useEffect(() => {
    setIndex(0)
  }, [count])

  const go = useCallback(
    (delta: number) => {
      if (count <= 1) return
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  if (count === 0) {
    return null
  }

  if (count === 1) {
    const slide = list[0]
    return (
      <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
        {slide.kind === 'media' ? (
          <Media resource={slide.media} />
        ) : (
          <div className="relative aspect-video w-full bg-page">
            <MuxSlideActive video={slide.video} />
          </div>
        )}
      </div>
    )
  }

  const segmentPct = 100 / count

  return (
    <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
      <div className="relative aspect-video w-full bg-page">
        {list.map((slide, i) => (
          <div
            key={slideKey(slide, i)}
            className={cn('absolute inset-0 transition-opacity duration-500', {
              'opacity-100 z-1': i === index,
              'opacity-0 z-0': i !== index,
            })}
            aria-hidden={i !== index}
          >
            {slide.kind === 'media' ? (
              <Media
                fill
                imgClassName="object-contain"
                resource={slide.media}
                priority={i === 0}
              />
            ) : (
              <MuxSlideCarousel video={slide.video} isActive={i === index} />
            )}
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-3 px-2 py-3 border-t border-border font-mono text-sm text-text-secondary"
        role="group"
        aria-label="Project screenshots"
      >
        <button
          type="button"
          className="shrink-0 px-1 py-1 hover:text-text-heading focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border rounded cursor-pointer"
          aria-label="Previous screenshot"
          onClick={() => go(-1)}
        >
          &lt;
        </button>

        <div className="flex-1 h-px bg-divider relative min-w-0" aria-hidden>
          <div
            className="absolute top-0 left-0 h-full bg-text-secondary/60 transition-[width,left] duration-300 ease-out"
            style={{
              width: `${segmentPct}%`,
              left: `${index * segmentPct}%`,
            }}
          />
        </div>

        <button
          type="button"
          className="shrink-0 px-1 py-1 hover:text-text-heading focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border rounded cursor-pointer"
          aria-label="Next screenshot"
          onClick={() => go(1)}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

function slideKey(slide: ProjectShowcaseSlide, i: number): string {
  if (slide.kind === 'media') {
    return `media-${slide.media.id}-${i}`
  }
  return `mux-${slide.video.id}-${i}`
}

function MuxSlideCarousel({ video, isActive }: { video: MuxVideo; isActive: boolean }) {
  const { playbackId, posterUrl } = getMuxPlayback(video)

  if (!playbackId) {
    return null
  }

  if (!isActive) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-page">
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={posterUrl} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>
    )
  }

  return <MuxSlideActive video={video} />
}

function MuxSlideActive({ video }: { video: MuxVideo }) {
  const { playbackId, posterUrl } = getMuxPlayback(video)
  if (!playbackId) {
    return null
  }

  return (
    <MuxPlayer
      playbackId={playbackId}
      autoPlay
      loop
      muted
      playsInline
      poster={posterUrl}
      streamType="on-demand"
      className="absolute inset-0 h-full w-full [&::part(media)]:object-contain"
      title={video.title || undefined}
      accentColor="hsl(127.66, 19.34%, 47.65%)"
      primaryColor="hsl(0, 0%, 100%)"
      secondaryColor="hsl(217.2, 32.6%, 17.5%)"
    />
  )
}
