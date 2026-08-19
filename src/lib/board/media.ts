import type { BoardItem, Media } from '@/payload-types'

export function isMedia(value: unknown): value is Media {
  return Boolean(value && typeof value === 'object' && 'url' in value)
}

export function boardCover(item: Pick<BoardItem, 'cover'>): Media | null {
  return isMedia(item.cover) ? item.cover : null
}

export function boardExtraStills(item: Pick<BoardItem, 'stills'>): Media[] {
  if (!item.stills?.length) return []
  return item.stills.map((row) => row.image).filter(isMedia)
}

export function boardCarouselStills(item: Pick<BoardItem, 'cover' | 'stills'>): Media[] {
  const cover = boardCover(item)
  const extras = boardExtraStills(item)
  return cover ? [cover, ...extras] : extras
}
