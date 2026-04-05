import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

async function revalidatePostListAndHome(payload: Payload) {
  revalidatePath('/', 'page')
  revalidatePath('/posts', 'page')

  const { totalPages } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
    draft: false,
    pagination: true,
  })

  for (let p = 2; p <= totalPages; p++) {
    revalidatePath(`/posts/page/${p}`, 'page')
  }
}

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path, 'page')
      revalidateTag('posts-sitemap', 'max')
      await revalidatePostListAndHome(payload)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath, 'page')
      revalidateTag('posts-sitemap', 'max')
      await revalidatePostListAndHome(payload)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path, 'page')
    revalidateTag('posts-sitemap', 'max')
    await revalidatePostListAndHome(payload)
  }

  return doc
}
