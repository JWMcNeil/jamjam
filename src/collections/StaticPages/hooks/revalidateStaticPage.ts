import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { StaticPage } from '../../../payload-types'

export const revalidateStaticPage: CollectionAfterChangeHook<StaticPage> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // Static pages don't have routes, but we can revalidate the sitemap
      payload.logger.info(`Revalidating static page: ${doc.slug}`)

      revalidateTag('static-pages-sitemap')
    }

    // If the page was previously published, revalidate
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old static page: ${previousDoc.slug}`)

      revalidateTag('static-pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<StaticPage> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('static-pages-sitemap')
  }

  return doc
}

