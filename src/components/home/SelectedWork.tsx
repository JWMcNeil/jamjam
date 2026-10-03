import Link from 'next/link'
import React from 'react'

import { TileHoverPreview } from '@/components/board/TileHoverPreview'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { Button } from '@/components/ui/button'
import { boardKindHash, gallerySubjectLabel } from '@/lib/board/labels'
import { boardCover } from '@/lib/board/media'
import { isPublicBoardKind } from '@/lib/board/query'
import { boardVideo, boardVideoGifUrl, formatDuration } from '@/lib/board/video'
import type { BoardItem } from '@/payload-types'
import { cn } from '@/utilities/ui'

/** Slots for four items: lead 2x2, tall, then two singles. */
const fourSlots = ['col-span-2 row-span-2', 'row-span-2', '', '']

function gridFor(count: number): string {
  if (count >= 4) return 'grid-cols-2 lg:grid-cols-4'
  if (count === 3) return 'grid-cols-2 lg:grid-cols-3'
  if (count === 2) return 'grid-cols-2'
  return 'grid-cols-1'
}

function slotFor(count: number, index: number): string {
  if (count >= 4) return fourSlots[index] ?? ''
  if (count === 3) return index === 0 ? 'col-span-2 row-span-2 lg:col-span-2' : ''
  return ''
}

function WorkTile({
  item,
  className,
  priority,
}: {
  item: BoardItem
  className?: string
  priority: boolean
}) {
  const cover = boardCover(item)
  const video = boardVideo(item)
  const duration = formatDuration(video?.duration)
  const kindLabel = isPublicBoardKind(item.kind) ? boardKindHash[item.kind] : `#${item.kind}`
  const subject = item.subjects?.[0] ? gallerySubjectLabel[item.subjects[0]] : null

  return (
    <Link
      href={`/gallery/${item.slug}`}
      className={cn(
        'group flex min-h-0 flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      )}
    >
      <div className="relative min-h-0 flex-1 bg-divider">
        {cover ? (
          <TileHoverPreview gifUrl={boardVideoGifUrl(video)} className="absolute inset-0">
            <ImageMedia
              resource={cover}
              fill
              pictureClassName="absolute inset-0 block h-full w-full"
              imgClassName="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:motion-safe:scale-[1.03]"
              size="(min-width: 1024px) 40vw, 100vw"
              priority={priority}
            />
          </TileHoverPreview>
        ) : null}
        {duration ? (
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-black/65 px-1.5 py-0.5 font-mono text-[11px] text-white tabular-nums">
            {duration}
          </span>
        ) : null}
      </div>
      <p className="flex items-baseline justify-between gap-3 px-2.5 py-2 font-mono text-xs">
        <span className="shrink-0 text-text-prompt">{subject ?? kindLabel}</span>
        <span className="min-w-0 truncate text-text-muted group-hover:text-text-secondary">
          {item.title}
        </span>
      </p>
    </Link>
  )
}

export function SelectedWork({ items }: { items: BoardItem[] }) {
  const list = items.slice(0, 4)

  if (list.length === 0) {
    if (process.env.NODE_ENV === 'production') return null
    return (
      <section className="py-2 lg:py-8">
        <p className="mb-6 font-mono text-xs text-text-muted lg:text-sm">// selected work</p>
        <p className="rounded-sm border border-dashed border-border bg-card p-4 font-mono text-sm text-text-muted">
          dev placeholder: tick &quot;featured&quot; on Gallery items in the admin to fill this.
        </p>
      </section>
    )
  }

  return (
    <section className="py-2 lg:py-8" aria-label="Selected work">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted lg:text-sm">// selected work</p>
        <Button href="/gallery" variant="outline" size="default">
          gallery
        </Button>
      </div>
      <div
        className={cn(
          'grid auto-rows-[170px] gap-3 lg:auto-rows-[clamp(150px,17vw,230px)]',
          gridFor(list.length),
        )}
      >
        {list.map((item, index) => (
          <WorkTile
            key={item.id}
            item={item}
            className={slotFor(list.length, index)}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  )
}
