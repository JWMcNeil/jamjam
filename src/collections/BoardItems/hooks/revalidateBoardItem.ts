import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { BoardItem } from '../../../payload-types'

function revalidateBoardPaths(slug: string | null | undefined) {
  revalidatePath('/board', 'page')
  if (slug) {
    revalidatePath(`/board/${slug}`, 'page')
  }
  revalidateTag('pages-sitemap', 'max')
}

export const revalidateBoardItem: CollectionAfterChangeHook<BoardItem> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating board item at /board/${doc.slug}`)
      revalidateBoardPaths(doc.slug)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating unpublished board item at /board/${previousDoc.slug}`)
      revalidateBoardPaths(previousDoc.slug)
    }

    if (
      previousDoc._status === 'published' &&
      doc._status === 'published' &&
      previousDoc.slug !== doc.slug
    ) {
      revalidateBoardPaths(previousDoc.slug)
    }
  }
  return doc
}

export const revalidateDeleteBoardItem: CollectionAfterDeleteHook<BoardItem> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateBoardPaths(doc?.slug)
  }
  return doc
}
