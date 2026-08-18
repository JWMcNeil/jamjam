'use client'

import type { LexicalHeadingOutlineItem } from '@/utilities/extractLexicalHeadings'
import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'

/** Matches heading `scroll-mt-28` so the active item tracks the visible chapter. */
const HEADING_OFFSET_PX = 112

function useActiveHeadingId(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)
  const idsKey = ids.join('\0')

  useEffect(() => {
    const headingIds = idsKey.length > 0 ? idsKey.split('\0') : []
    if (headingIds.length === 0) return

    const compute = () => {
      let current = headingIds[0] ?? null
      for (const id of headingIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= HEADING_OFFSET_PX) {
          current = id
        }
      }
      setActiveId(current)
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('hashchange', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('hashchange', compute)
    }
  }, [idsKey])

  return activeId
}

/** First-line center: row padding (py-2.5) + half of text-sm/leading-snug. */
const RAIL_Y = 'calc(0.625rem + 0.6875em)'
const BRANCH_PX = 12

function ContentsTree({
  outline,
  activeId,
}: {
  outline: LexicalHeadingOutlineItem[]
  activeId: string | null
}) {
  const minLevel = Math.min(...outline.map((item) => item.level))

  return (
    <ul
      className="relative m-0 list-none overflow-visible p-0"
      style={{ ['--toc-rail-y' as string]: RAIL_Y }}
    >
      {outline.map((item) => {
        const isActive = item.id === activeId
        const depth = Math.max(0, item.level - minLevel)
        const branch = BRANCH_PX + depth * BRANCH_PX

        return (
          <li
            key={item.id}
            className="relative list-none py-2.5 after:pointer-events-none after:absolute after:bottom-[calc(-1*var(--toc-rail-y))] after:left-0 after:top-[var(--toc-rail-y)] after:w-px after:bg-border after:content-[''] last:after:hidden [list-style:none]"
            style={{ paddingLeft: branch }}
          >
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute left-0 h-px',
                isActive ? 'bg-accent' : 'bg-border',
              )}
              style={{ top: 'var(--toc-rail-y)', width: branch }}
            />
            <a
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'relative block pl-2.5 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                isActive
                  ? 'text-text-heading'
                  : 'text-text-muted hover:text-text-heading',
              )}
            >
              {item.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function PostContentsAside({ outline }: { outline: LexicalHeadingOutlineItem[] }) {
  const ids = outline.map((item) => item.id)
  const activeId = useActiveHeadingId(ids)

  if (outline.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="border border-border bg-card p-4">
      <p className="mb-2 font-mono text-xs text-text-muted">// contents</p>
      <ContentsTree outline={outline} activeId={activeId} />
    </nav>
  )
}

export function PostContentsMobile({ outline }: { outline: LexicalHeadingOutlineItem[] }) {
  const ids = outline.map((item) => item.id)
  const activeId = useActiveHeadingId(ids)

  if (outline.length === 0) return null

  return (
    <details className="group border border-border bg-card lg:hidden">
      <summary className="cursor-pointer list-none px-4 py-3 font-mono text-sm text-text-muted marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-text-secondary transition-colors group-open:text-text-heading">
          // contents
        </span>
        <span className="ml-2 text-text-dim">({outline.length})</span>
      </summary>
      <nav aria-label="Table of contents" className="border-t border-border px-4 pb-3 pt-1">
        <ContentsTree outline={outline} activeId={activeId} />
      </nav>
    </details>
  )
}
