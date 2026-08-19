'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { BoardItem, Media } from '@/payload-types'

import { Media as MediaEl } from '@/components/Media'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { boardKindHash } from '@/lib/board/labels'
import { boardCarouselStills, boardCover, boardExtraStills } from '@/lib/board/media'
import { isPublicBoardKind } from '@/lib/board/query'
import { getClientSideURL } from '@/utilities/getURL'

type CloseMode = 'intercept' | 'page'

export function BoardModal({ item, closeMode }: { item: BoardItem; closeMode: CloseMode }) {
  const router = useRouter()
  const extras = boardExtraStills(item)
  const hasSet = extras.length > 0
  const layout = hasSet && item.setLayout === 'coverModal' ? 'coverModal' : 'carousel'
  const carousel = useMemo(() => boardCarouselStills(item), [item])
  const cover = boardCover(item)

  const [index, setIndex] = useState(0)
  const [shareLabel, setShareLabel] = useState('Share')

  const slides: Media[] = layout === 'coverModal' ? (cover ? [cover, ...extras] : extras) : carousel
  const current = slides[index] ?? cover
  const kindLabel = isPublicBoardKind(item.kind) ? boardKindHash[item.kind] : `#${item.kind}`

  const close = useCallback(() => {
    if (closeMode === 'intercept') {
      router.back()
      return
    }
    router.push('/board')
  }, [closeMode, router])

  const step = useCallback(
    (delta: number) => {
      if (slides.length < 2) return
      setIndex((i) => (i + delta + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  const share = useCallback(async () => {
    const url = `${getClientSideURL()}/board/${item.slug}`
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: item.title, url })
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }

    try {
      await navigator.clipboard.writeText(url)
      setShareLabel('Copied')
      window.setTimeout(() => setShareLabel('Share'), 1600)
    } catch {
      setShareLabel('Share')
    }
  }, [item.slug, item.title])

  return (
    <Dialog open onOpenChange={(next) => { if (!next) close() }}>
      <DialogContent
        className="p-0"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
          <DialogTitle className="min-w-0 truncate font-mono text-xs text-text-heading">
            <span className="text-text-prompt">{kindLabel}</span>
            <span className="text-text-muted"> / </span>
            {item.title}
          </DialogTitle>
          <div className="flex shrink-0 items-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => void share()}
              className="cursor-pointer text-text-muted transition-colors hover:text-text-heading"
            >
              {shareLabel}
            </button>
            <button
              type="button"
              onClick={close}
              className="cursor-pointer text-text-muted transition-colors hover:text-text-heading"
            >
              close
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto">
          {current ? (
            <MediaEl
              resource={current}
              htmlElement={null}
              imgClassName="mx-auto h-auto max-h-[70vh] w-full object-contain"
              size="90vw"
              priority
            />
          ) : null}

          {layout === 'carousel' && slides.length > 1 ? (
            <div className="pointer-events-none absolute inset-y-0 flex w-full items-center justify-between px-2">
              <button
                type="button"
                aria-label="Previous still"
                onClick={() => step(-1)}
                className="pointer-events-auto cursor-pointer rounded-sm border border-border bg-page/80 px-2 py-1 font-mono text-xs text-text-heading transition-colors hover:bg-card"
              >
                <ChevronLeft className="size-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Next still"
                onClick={() => step(1)}
                className="pointer-events-auto cursor-pointer rounded-sm border border-border bg-page/80 px-2 py-1 font-mono text-xs text-text-heading transition-colors hover:bg-card"
              >
                <ChevronRight className="size-4" strokeWidth={2} />
              </button>
            </div>
          ) : null}

          {layout === 'coverModal' && extras.length > 0 ? (
            <ul className="mt-3 flex gap-2 overflow-x-auto px-3 pb-3">
              {slides.map((still, i) => (
                <li key={still.id ?? i} className="shrink-0">
                  <button
                    type="button"
                    aria-label={`Still ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`block w-16 overflow-hidden rounded-sm border ${
                      i === index ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <MediaEl
                      resource={still}
                      htmlElement={null}
                      imgClassName="h-16 w-16 object-cover"
                      size="64px"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {item.context ? (
          <DialogDescription className="border-t border-border px-3 py-3 text-sm leading-relaxed text-text-secondary">
            {item.context}
          </DialogDescription>
        ) : (
          <DialogDescription className="sr-only">Board still</DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  )
}
