import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

import type { Post } from '@/payload-types'
import { formatPostListDate } from '@/utilities/formatPostListDate'
import { tagPillClasses } from '@/utilities/tagPillClasses'

import { cn } from '@/utilities/ui'

export type LatestPostsItem = Pick<Post, 'id' | 'slug' | 'title' | 'publishedAt' | 'tags'>

export const LatestPosts: React.FC<{
  posts: LatestPostsItem[]
  totalDocs: number
}> = ({ posts, totalDocs }) => {
  const remaining = Math.max(0, totalDocs - posts.length)

  return (
    <section className="py-8 lg:py-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted lg:text-sm">// latest posts</p>
        <Button href="/posts" variant="outline" size="default">
          posts
        </Button>
      </div>

      <div className="overflow-hidden rounded-sm border border-border bg-page">
        {posts.length === 0 ? (
          <p className="p-4 font-mono text-sm text-text-muted">No posts yet</p>
        ) : (
          <>
            <div className="space-y-px bg-divider">
              {posts.map((post) => {
                const formatted = formatPostListDate(post.publishedAt)

                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className={cn(
                      'group flex flex-row items-stretch gap-3 bg-page px-4 py-4 transition-colors hover:bg-card sm:items-center sm:gap-4',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    )}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      {formatted ? (
                        <time
                          className="flex shrink-0 flex-row items-baseline gap-2 font-mono text-xs leading-tight text-text-prompt sm:w-18 sm:flex-col sm:items-start sm:gap-0"
                          dateTime={formatted.iso}
                        >
                          <span>{formatted.line1}</span>
                          <span>{formatted.line2}</span>
                        </time>
                      ) : null}

                      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:min-h-0 sm:gap-0">
                        <p className="truncate text-base font-medium text-text-heading lg:text-lg">
                          {post.title}
                        </p>
                        {post.tags && post.tags.length > 0 ? (
                          <div className="mt-auto flex flex-wrap gap-2 sm:mt-2">
                            {post.tags.map((tag) => {
                              if (typeof tag !== 'object' || tag === null) return null
                              const { label, colour, id } = tag
                              const text = label ? `#${label}` : '#tag'
                              return (
                                <span key={id} className={tagPillClasses(colour)}>
                                  {text}
                                </span>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="flex shrink-0 items-center justify-center font-mono text-sm text-text-prompt"
                      aria-hidden
                    >
                      →
                    </div>
                  </Link>
                )
              })}
            </div>

            {remaining > 0 ? (
              <div className="border-t border-border px-4 py-3 font-mono text-sm text-text-muted">
                {remaining} more {remaining === 1 ? 'post' : 'posts'}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
