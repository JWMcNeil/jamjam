import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export type PublishedProjectNav = {
  slug: string
  title: string
}

const loadPublishedProjectsOrdered = cache(async (): Promise<PublishedProjectNav[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    sort: 'order',
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      title: true,
    },
  })

  return result.docs as PublishedProjectNav[]
})

/** Next project in manual `order` among published docs. Published-only (draft preview may omit). */
export async function getNextPublishedProject(
  currentSlug: string,
): Promise<PublishedProjectNav | null> {
  const docs = await loadPublishedProjectsOrdered()
  const i = docs.findIndex((p) => p.slug === currentSlug)
  if (i < 0 || i >= docs.length - 1) {
    return null
  }
  return docs[i + 1] ?? null
}
