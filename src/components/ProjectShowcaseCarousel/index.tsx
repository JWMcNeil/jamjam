'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getMuxPlayback } from '@/utilities/muxPlayback'
import type { ProjectShowcaseSlide } from '@/types/projectShowcase'
import type { Media as MediaDoc, MuxVideo } from '@/payload-types'
import MuxPlayer from '@mux/mux-player-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  slides: ProjectShowcaseSlide[]
  className?: string
}

const SWIPE_MIN_PX = 50

export const ProjectShowcaseCarousel: React.FC<Props> = ({ slides, className }) => {
  const list = slides.filter((s) => {
    if (s.kind === 'media') return Boolean(s.media)
    return Boolean(s.video && getMuxPlayback(s.video).playbackId)
  })
  const [index, setIndex] = useState(0)
  const [lightboxMedia, setLightboxMedia] = useState<MediaDoc | null>(null)
  const count = list.length

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  /** Blocks the synthetic click right after a horizontal swipe (carousel + mux slides). */
  const suppressNextClickRef = useRef(false)
  const suppressClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIndex(0)
  }, [count])

  useEffect(() => {
    return () => {
      if (suppressClickTimeoutRef.current) {
        clearTimeout(suppressClickTimeoutRef.current)
      }
    }
  }, [])

  const go = useCallback(
    (delta: number) => {
      if (count <= 1) return
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  const onMediaActivate = useCallback((media: MediaDoc) => {
    if (suppressNextClickRef.current) return
    setLightboxMedia(media)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    if (count <= 1) return
    const t = e.touches[0]
    if (!t) return
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (count <= 1) {
      touchStartRef.current = null
      return
    }
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_MIN_PX) {
      go(dx < 0 ? 1 : -1)
      suppressNextClickRef.current = true
      if (suppressClickTimeoutRef.current) {
        clearTimeout(suppressClickTimeoutRef.current)
      }
      suppressClickTimeoutRef.current = setTimeout(() => {
        suppressNextClickRef.current = false
        suppressClickTimeoutRef.current = null
      }, 350)
    }
  }

  if (count === 0) {
    return null
  }

  if (count === 1) {
    const slide = list[0]
    return (
      <>
        <ShowcaseLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
        <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
          {slide.kind === 'media' ? (
            <MediaLightboxTrigger media={slide.media} onActivate={onMediaActivate} imagePriority />
          ) : (
            <div className="relative aspect-video w-full bg-page">
              <MuxSlideActive video={slide.video} />
            </div>
          )}
        </div>
      </>
    )
  }

  const segmentPct = 100 / count

  return (
    <>
      <ShowcaseLightbox media={lightboxMedia} onClose={() => setLightboxMedia(null)} />
      <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
        <div
          className="relative aspect-video w-full touch-pan-y bg-page"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
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
                <MediaLightboxTrigger
                  media={slide.media}
                  onActivate={onMediaActivate}
                  imagePriority={i === 0}
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
    </>
  )
}

function MediaLightboxTrigger({
  media,
  onActivate,
  imagePriority,
}: {
  media: MediaDoc
  onActivate: (m: MediaDoc) => void
  imagePriority?: boolean
}) {
  return (
    <button
      type="button"
      className="absolute inset-0 block h-full w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border focus-visible:ring-inset"
      aria-label="View image larger"
      onClick={() => onActivate(media)}
    >
      <Media
        fill
        imgClassName="object-contain pointer-events-none"
        resource={media}
        priority={imagePriority}
      />
    </button>
  )
}

function ShowcaseLightbox({
  media,
  onClose,
}: {
  media: MediaDoc | null
  onClose: () => void
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!media) return
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0)

    return () => {
      html.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [media, onClose])

  if (typeof document === 'undefined' || !media) {
    return null
  }

  const src = getMediaUrl(media.url, media.updatedAt)
  if (!src || src.trim() === '') {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="absolute right-4 top-4 z-overlay rounded border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-sm text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        onClick={onClose}
      >
        close
      </button>
      <div
        className="flex min-h-0 flex-1 flex-col overflow-auto p-4 pt-14"
        onClick={onClose}
        role="presentation"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={media.alt || ''}
          className="mx-auto mb-8 block max-w-full"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>,
    document.body,
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
