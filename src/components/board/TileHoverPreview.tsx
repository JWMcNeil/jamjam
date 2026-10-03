'use client'

import { useState } from 'react'

/**
 * Wraps a video tile's still. On a hover-capable pointer, swaps in the Mux animated preview.
 * The animated image is only requested on first hover, and never under reduced motion.
 */
export function TileHoverPreview({
  gifUrl,
  children,
}: {
  gifUrl: string | null
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)

  const enter = () => {
    if (!gifUrl) return
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return
    setActive(true)
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={() => setActive(false)}>
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
