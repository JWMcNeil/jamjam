'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

/**
 * Wraps a video's still. On a hover-capable pointer, swaps in the Mux animated preview on hover.
 * With `autoPlayOnTouch`, touch devices show the animated preview straight away.
 * The animated image is only requested when needed, and never under reduced motion.
 */
export function TileHoverPreview({
  gifUrl,
  children,
  className,
  autoPlayOnTouch = false,
}: {
  gifUrl: string | null
  children: React.ReactNode
  className?: string
  autoPlayOnTouch?: boolean
}) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!gifUrl || !autoPlayOnTouch) return
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.matchMedia('(hover: none)').matches
    if (touch && !noMotion) setActive(true)
  }, [gifUrl, autoPlayOnTouch])

  const enter = () => {
    if (!gifUrl) return
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return
    setActive(true)
  }

  const leave = () => {
    if (!window.matchMedia('(hover: none)').matches) setActive(false)
  }

  return (
    <div className={cn('relative', className)} onMouseEnter={enter} onMouseLeave={leave}>
      {children}
      {active && gifUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gifUrl}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </div>
  )
}
