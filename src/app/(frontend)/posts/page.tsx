import type { Metadata } from 'next/types'

import { PostsIndexView } from '@/components/PostsIndexView'
import { pageMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PostsPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
      featured: true,
    },
  })

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-16 md:px-10">
      <p className="mb-2 font-mono text-sm text-text-prompt">
        jamjam:~$ ls posts/ | <span className="text-accent">sort -r</span>
      </p>
      <p className="mb-8 font-mono text-sm text-text-muted">{posts.totalDocs} entries</p>

      <PostsIndexView posts={posts.docs} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    path: '/posts',
    title: 'Posts — jamjam.dev',
    description: 'Blog posts about web development, AI, and building things.',
    imageTitle: 'Posts',
    imageType: 'post',
  })
}
