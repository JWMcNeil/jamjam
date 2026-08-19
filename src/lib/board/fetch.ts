import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { boardItemSelect, PUBLIC_BOARD_KINDS, publishedBoardWhere } from './query'
import type { BoardItem } from '@/payload-types'

export const queryPublishedBoardItems = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'board-items',
    draft,
    overrideAccess: draft,
    depth: 1,
    limit: 1000,
    pagination: false,
    sort: '-publishedAt',
    where: draft ? { kind: { in: [...PUBLIC_BOARD_KINDS] } } : publishedBoardWhere,
    select: boardItemSelect,
  })

  return result.docs as BoardItem[]
})

export const queryBoardItemBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'board-items',
    draft,
    overrideAccess: draft,
    depth: 1,
    limit: 1,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' as const } }]),
        { kind: { in: [...PUBLIC_BOARD_KINDS] } },
      ],
    },
    select: boardItemSelect,
  })

  return (result.docs[0] as BoardItem | undefined) ?? null
})
