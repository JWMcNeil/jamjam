import { describe, expect, it } from 'vitest'

import { isPublicBoardKind, PUBLIC_BOARD_KINDS, publishedBoardWhere } from '@/lib/board/query'

describe('publishedBoardWhere', () => {
  it('limits the public Board to published photography and graphics', () => {
    expect(PUBLIC_BOARD_KINDS).toEqual(['photography', 'graphics'])
    expect(publishedBoardWhere).toEqual({
      and: [{ _status: { equals: 'published' } }, { kind: { in: ['photography', 'graphics'] } }],
    })
    expect(isPublicBoardKind('photography')).toBe(true)
    expect(isPublicBoardKind('video')).toBe(false)
  })
})
