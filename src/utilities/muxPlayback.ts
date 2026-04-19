import type { MuxVideo } from '@/payload-types'

export function getMuxPlayback(video: MuxVideo | null | undefined): {
  playbackId: string | null
  posterUrl: string | undefined
} {
  if (!video || typeof video !== 'object') {
    return { playbackId: null, posterUrl: undefined }
  }

  const options = video.playbackOptions
  if (!options?.length) {
    return { playbackId: null, posterUrl: undefined }
  }

  const best = options.find((o) => o?.playbackId)
  return {
    playbackId: best?.playbackId ?? null,
    posterUrl: best?.posterUrl ?? undefined,
  }
}
