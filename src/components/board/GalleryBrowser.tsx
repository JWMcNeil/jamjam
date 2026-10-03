'use client'

import { useMemo, useState } from 'react'

import type { BoardItem } from '@/payload-types'

import { boardKindHash, gallerySubjectLabel } from '@/lib/board/labels'
import { isPublicBoardKind } from '@/lib/board/query'
import { cn } from '@/utilities/ui'

import { BoardGrid } from './BoardGrid'

type Filter = { type: 'kind' | 'subject'; value: string } | null

const chipBase =
  'cursor-pointer rounded-sm border px-2 py-0.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function GalleryBrowser({ items }: { items: BoardItem[] }) {
  const [filter, setFilter] = useState<Filter>(null)

  const kinds = useMemo(
    () => [...new Set(items.map((i) => i.kind))].filter(isPublicBoardKind),
    [items],
  )
  const subjects = useMemo(
    () => [...new Set(items.flatMap((i) => i.subjects ?? []))],
    [items],
  )

  const visible = useMemo(() => {
    if (!filter) return items
    if (filter.type === 'kind') return items.filter((i) => i.kind === filter.value)
    return items.filter((i) => (i.subjects ?? []).includes(filter.value as never))
  }, [items, filter])

  const chips: { type: 'kind' | 'subject'; value: string; label: string }[] = [
    ...kinds.map((k) => ({ type: 'kind' as const, value: k, label: boardKindHash[k] })),
    ...subjects.map((s) => ({
      type: 'subject' as const,
      value: s,
      label: gallerySubjectLabel[s] ?? `#${s}`,
    })),
  ]

  return (
    <>
      <p className="mb-4 font-mono text-sm text-text-muted">
        {visible.length} {visible.length === 1 ? 'item' : 'items'}
      </p>
      {chips.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          <button
            type="button"
            aria-pressed={filter === null}
            onClick={() => setFilter(null)}
            className={cn(
              chipBase,
              filter === null
                ? 'border-accent text-text-heading'
                : 'border-border text-text-muted hover:text-text-heading',
            )}
          >
            all
          </button>
          {chips.map((chip) => {
            const active = filter?.type === chip.type && filter.value === chip.value
            return (
              <button
                key={`${chip.type}-${chip.value}`}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(active ? null : { type: chip.type, value: chip.value })}
                className={cn(
                  chipBase,
                  active
                    ? 'border-accent text-text-heading'
                    : 'border-border text-text-muted hover:text-text-heading',
                )}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="mb-8" />
      )}
      <BoardGrid items={visible} />
    </>
  )
}
