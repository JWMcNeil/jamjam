'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
  resources: MediaType[]
  className?: string
}

export const ProjectShowcaseCarousel: React.FC<Props> = ({ resources, className }) => {
  const slides = resources.filter(Boolean)
  const [index, setIndex] = useState(0)
  const count = slides.length

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
    const resource = slides[0]
    return (
      <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
        <Media resource={resource} />
      </div>
    )
  }

  const segmentPct = 100 / count

  return (
    <div className={cn('mb-10 border border-border bg-card overflow-hidden', className)}>
      <div className="relative aspect-video w-full bg-page">
        {slides.map((resource, i) => (
          <div
            key={`${resource.id}-${i}`}
            className={cn('absolute inset-0 transition-opacity duration-500', {
              'opacity-100 z-1': i === index,
              'opacity-0 z-0': i !== index,
            })}
            aria-hidden={i !== index}
          >
            <Media fill imgClassName="object-contain" resource={resource} priority={i === 0} />
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
