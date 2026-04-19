import type { Media, MuxVideo } from '@/payload-types'

export type ProjectShowcaseSlide =
  | { kind: 'media'; media: Media }
  | { kind: 'mux'; video: MuxVideo }
