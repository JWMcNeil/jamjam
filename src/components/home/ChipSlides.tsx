'use client'

import { useEffect, useState } from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

const SLIDE_MS = 2600

/** Cross-fades a few stills inside a hero chip. Holds the first still under reduced motion. */
export function ChipSlides({ stills }: { stills: Media[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (stills.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % stills.length), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [stills.length])

  return (
    <>
      {stills.map((still, i) => (
        <span
          key={still.id}
          className={cn(
            'absolute inset-0 block transition-opacity duration-700 motion-reduce:transition-none',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <ImageMedia
            resource={still}
            fill
            pictureClassName="absolute inset-0 block h-full w-full"
            imgClassName="h-full w-full object-cover"
            size="320px"
            alt=""
          />
        </span>
      ))}
    </>
  )
}
