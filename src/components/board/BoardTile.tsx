import Link from 'next/link'

import type { BoardItem } from '@/payload-types'

import { Media } from '@/components/Media'
import { boardKindHash } from '@/lib/board/labels'
import { boardCover } from '@/lib/board/media'
import { isPublicBoardKind } from '@/lib/board/query'
import { boardVideo, boardVideoGifUrl, formatDuration } from '@/lib/board/video'

import { TileHoverPreview } from './TileHoverPreview'

export function BoardTile({ item, priority = false }: { item: BoardItem; priority?: boolean }) {
  const cover = boardCover(item)
  const kindLabel = isPublicBoardKind(item.kind) ? boardKindHash[item.kind] : `#${item.kind}`
  const video = boardVideo(item)
  const duration = formatDuration(video?.duration)

  return (
    <article className="mb-4 break-inside-avoid">
      <Link
        href={`/gallery/${item.slug}`}
        scroll={false}
        className="group block overflow-hidden rounded-sm border border-border bg-card transition-colors hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {cover ? (
          <TileHoverPreview gifUrl={boardVideoGifUrl(video)}>
            <Media
              resource={cover}
              htmlElement={null}
              imgClassName="h-auto w-full"
              size="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
            />
            {duration ? (
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-black/65 px-1.5 py-0.5 font-mono text-[11px] text-white tabular-nums">
                {duration}
              </span>
            ) : null}
          </TileHoverPreview>
        ) : (
          <div className="flex aspect-[3/4] items-center justify-center bg-muted font-mono text-xs text-text-muted">
            no still
          </div>
        )}
        <p className="flex items-baseline justify-between gap-3 px-2.5 py-2 font-mono text-xs">
          <span className="shrink-0 text-text-prompt">{kindLabel}</span>
          <span className="min-w-0 truncate text-text-muted group-hover:text-text-secondary">{item.title}</span>
        </p>
      </Link>
    </article>
  )
}
