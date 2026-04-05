import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

async function getDocumentById(collection: Collection, id: string | number, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  return payload.findByID({
    collection,
    id,
    depth,
    disableErrors: true,
    overrideAccess: false,
    draft: false,
  })
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })

/**
 * For relation fields stored as IDs (e.g. redirect targets). Cache key/tag uses document id.
 */
export const getCachedDocumentById = (collection: Collection, id: string | number) =>
  unstable_cache(async () => getDocumentById(collection, id), [collection, 'id', String(id)], {
    tags: [`${collection}_${String(id)}`],
  })
