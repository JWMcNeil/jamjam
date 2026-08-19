import type { Where } from 'payload'

export const PUBLIC_BOARD_KINDS = ['photography', 'graphics'] as const

export type PublicBoardKind = (typeof PUBLIC_BOARD_KINDS)[number]

export function isPublicBoardKind(value: string): value is PublicBoardKind {
  return (PUBLIC_BOARD_KINDS as readonly string[]).includes(value)
}

export const publishedBoardWhere: Where = {
  and: [{ _status: { equals: 'published' } }, { kind: { in: [...PUBLIC_BOARD_KINDS] } }],
}

export const boardItemSelect = {
  slug: true,
  title: true,
  kind: true,
  cover: true,
  stills: true,
  setLayout: true,
  context: true,
  publishedAt: true,
  meta: true,
} as const
