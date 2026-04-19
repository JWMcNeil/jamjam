import type { MuxVideo } from '@/payload-types'

export function getMuxPlayback(video: MuxVideo | null | undefined): {
  playbackId: string | null
  posterUrl: string | undefined
} {
  if (!video || typeof video !== 'object') {
    return { playbackId: null, posterUrl: undefined }
  }

  const first = video.playbackOptions?.[0]
  return {
    playbackId: first?.playbackId ?? null,
    posterUrl: first?.posterUrl ?? undefined,
  }
}
