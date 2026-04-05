import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PostsPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      readTime: true,
      tags: true,
      publishedAt: true,
      meta: true,
    },
  })

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-16">
      <p className="font-mono text-sm text-text-prompt mb-2">
        jamjam~$ ls posts/ | sort -r
      </p>
      <p className="font-mono text-sm text-text-muted mb-8">
        {posts.totalDocs} entries
      </p>

      <div className="space-y-px bg-divider">
        {posts.docs.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="bg-page p-4 flex justify-between items-start hover:bg-card transition-colors"
          >
            <div>
              <p className="text-text-heading font-medium">{post.title}</p>
              {post.excerpt && (
                <p className="text-text-secondary text-sm mt-1">{post.excerpt}</p>
              )}
            </div>
            <span className="text-text-prompt font-mono text-sm shrink-0 ml-4">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Posts — jamjam.dev',
    description: 'Blog posts about web development, AI, and building things.',
  }
}
