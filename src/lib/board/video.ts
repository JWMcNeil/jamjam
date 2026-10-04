import type { BoardItem, MuxVideo } from '@/payload-types'

export function isMuxVideo(value: unknown): value is MuxVideo {
  return Boolean(value && typeof value === 'object' && 'playbackOptions' in value)
}

export function boardVideo(item: Pick<BoardItem, 'kind' | 'video'>): MuxVideo | null {
  if (item.kind !== 'video') return null
  return isMuxVideo(item.video) ? item.video : null
}

export function boardVideoGifUrl(video: MuxVideo | null): string | null {
  const option = video?.playbackOptions?.find((o) => o?.gifUrl)
  return option?.gifUrl ?? null
}

/** 72 -> "1:12", 8 -> "0:08". */
export function formatDuration(seconds: number | null | undefined): string | null {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds <= 0) return null
  const total = Math.round(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
