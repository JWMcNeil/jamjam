import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { StaticPage } from '../../../payload-types'

export const revalidateStaticPage: CollectionAfterChangeHook<StaticPage> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Static pages don't have routes, but we can revalidate the sitemap
    payload.logger.info(`Revalidating static page: ${doc.slug}`)

    revalidateTag('static-pages-sitemap')
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

