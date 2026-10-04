'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { CapabilityRow, ProofItem } from '@/lib/whatIDo'
import { cn } from '@/utilities/ui'

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false })

const PREVIEW_W = 260

/** A still, or a video's poster, filling its frame. */
function ProofStill({ item, size }: { item: ProofItem; size: string }) {
  if (item.still) {
    return (
      <ImageMedia
        resource={item.still}
        fill
        pictureClassName="absolute inset-0 block h-full w-full"
        imgClassName="h-full w-full object-cover"
        size={size}
        alt=""
      />
    )
  }
  if (item.posterUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.posterUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
  }
  return null
}

function ProofFrame({ item, active, motionOk }: { item: ProofItem; active: boolean; motionOk: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-divider">
      <ProofStill item={item} size="(min-width: 768px) 30vw, 90vw" />
      {item.kind === 'video' && item.playbackId && active && motionOk ? (
        <MuxPlayer
          playbackId={item.playbackId}
          poster={item.posterUrl ?? undefined}
          streamType="on-demand"
          autoPlay="muted"
          loop
          muted
          playsInline
          accentColor="hsl(127.66, 19.34%, 47.65%)"
          className="absolute inset-0 h-full w-full [&::part(media)]:object-cover"
        />
      ) : null}
    </div>
  )
}

/**
 * Terminal-style index of what Jamie does. One row open at a time. On hover-capable pointers a
 * closed row shows a small media preview that follows the cursor; open rows never do. Videos play
 * (muted, looped) only while their row is open, and never under reduced motion.
 */
export function CapabilityIndex({ rows }: { rows: CapabilityRow[] }) {
  const [openId, setOpenId] = useState<string | null>(rows.find((r) => r.open)?.id ?? null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [motionOk, setMotionOk] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const canHover = useRef(false)

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover)').matches
    setMotionOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const move = (event: React.MouseEvent) => {
    const el = previewRef.current
    if (!el) return
    el.style.transform = `translate(${event.clientX + 24}px, ${event.clientY - 90}px)`
  }

  const hovered = rows.find((r) => r.id === hoverId && r.id !== openId)
  const previewItem = hovered?.proof[0] ?? null
  const previewGif = previewItem?.gifUrl && motionOk ? previewItem.gifUrl : null

  return (
    <>
      <ul className="border-t border-border">
        {rows.map((row, index) => {
          const isOpen = row.id === openId
          const panelId = `capability-${row.id}`
          return (
            <li key={row.id} className="border-b border-border">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenId(isOpen ? null : row.id)
                  setHoverId(null)
                }}
                onMouseEnter={() => canHover.current && setHoverId(row.id)}
                onMouseLeave={() => setHoverId(null)}
                onMouseMove={move}
                className="group grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-baseline gap-4 px-1 py-5 text-left font-mono focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid-cols-[3rem_clamp(11rem,21vw,18.5rem)_minmax(0,1fr)_1.5rem]"
              >
                <span className="text-xs text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                <span
                  className={cn(
                    'font-sans text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-none tracking-[-0.03em] transition-colors',
                    isOpen ? 'text-white' : 'text-text-heading group-hover:text-white',
                  )}
                >
                  {row.name}
                </span>
                <span className="hidden text-sm text-text-muted transition-colors group-hover:text-text-secondary md:block">
                  {row.line}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'text-text-muted transition-transform duration-200 ease-out motion-reduce:transition-none',
                    isOpen ? 'rotate-90' : 'group-hover:translate-x-0.5 group-hover:text-primary',
                  )}
                >
                  →
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-label={row.name}
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pl-9 pr-1 md:pl-[3.25rem]">
                    {row.line ? (
                      <p className="mb-3 font-mono text-sm text-text-muted md:hidden">{row.line}</p>
                    ) : null}
                    {row.body ? (
                      <p className="max-w-2xl text-pretty text-text-secondary">{row.body}</p>
                    ) : null}
                    {row.tags.length > 0 ? (
                      <p className="mt-3 font-mono text-xs text-text-muted">
                        {row.tags.map((t) => `#${t}`).join(' · ')}
                      </p>
                    ) : null}
                    {row.proof.length > 0 ? (
                      <div
                        className={cn(
                          'mt-4 grid grid-cols-1 gap-3',
                          row.proof.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
                        )}
                      >
                        {row.proof.map((item) => (
                          <ProofFrame key={item.id} item={item} active={isOpen} motionOk={motionOk} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div
        ref={previewRef}
        aria-hidden
        style={{ width: PREVIEW_W, transform: 'translate(-9999px, -9999px)' }}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-modal aspect-[4/3] overflow-hidden rounded-sm border border-border bg-card transition-opacity duration-150',
          previewItem ? 'opacity-100' : 'opacity-0',
        )}
      >
        {previewItem ? (
          previewGif ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewGif} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ProofStill item={previewItem} size="260px" />
          )
        ) : null}
      </div>
    </>
  )
}
