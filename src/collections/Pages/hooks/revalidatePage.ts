import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

function revalidatePagePaths(slug: string | null | undefined) {
  if (slug) revalidatePath(`/${slug}`, 'page')
  revalidateTag('pages-sitemap', 'max')
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating page at /${doc.slug}`)
      revalidatePagePaths(doc.slug)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating unpublished page at /${previousDoc.slug}`)
      revalidatePagePaths(previousDoc.slug)
    }

    if (
      previousDoc._status === 'published' &&
      doc._status === 'published' &&
      previousDoc.slug !== doc.slug
    ) {
      revalidatePagePaths(previousDoc.slug)
    }
  }
  return doc
}

export const revalidateDeletePage: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePagePaths(doc?.slug)
  }
  return doc
}
