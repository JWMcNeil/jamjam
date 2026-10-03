import type { PublicBoardKind } from './query'

export const boardKindHash: Record<PublicBoardKind, string> = {
  photography: '#photography',
  video: '#film',
  graphics: '#graphics',
}

export const gallerySubjectLabel: Record<string, string> = {
  motorcycles: '#motorcycles',
  tractors: '#tractors',
  cars: '#cars',
  other: '#other',
}
