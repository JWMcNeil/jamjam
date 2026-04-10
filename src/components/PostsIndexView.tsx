'use client'

import type { Post } from '@/payload-types'
import { formatPostListDate } from '@/utilities/formatPostListDate'
import { formatPostPinnedMonthYear } from '@/utilities/formatPostPinnedMonthYear'
import { tagPillClasses } from '@/utilities/tagPillClasses'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

export type PostsIndexItem = Pick<
  Post,
  'id' | 'slug' | 'title' | 'excerpt' | 'publishedAt' | 'tags' | 'featured'
>

function postHasTag(post: PostsIndexItem, tagId: number): boolean {
  const tags = post.tags
  if (!tags?.length) return false
  return tags.some((t) => (typeof t === 'object' && t !== null ? t.id === tagId : t === tagId))
}

function deriveTagsFromPosts(posts: PostsIndexItem[]): { id: number; label: string }[] {
  const map = new Map<number, string>()
  for (const p of posts) {
    if (!p.tags) continue
    for (const t of p.tags) {
      if (typeof t === 'object' && t !== null && 'id' in t && typeof t.label === 'string') {
        map.set(t.id, t.label)
      }
    }
  }
  return [...map.entries()]
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

function sortByPublishedDesc(a: PostsIndexItem, b: PostsIndexItem): number {
  const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
  const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
  return tb - ta
}

const pillBase =
  'rounded-md border px-3 py-1.5 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
const pillInactive = 'border-border bg-page text-text-heading hover:bg-card'
const pillActive = 'border-border-subtle bg-grey-150 text-text-heading hover:bg-grey-200'

export const PostsIndexView: React.FC<{
  posts: PostsIndexItem[]
}> = ({ posts }) => {
  const tagOptions = useMemo(() => deriveTagsFromPosts(posts), [posts])
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (selectedTagId === null) return posts
    return posts.filter((p) => postHasTag(p, selectedTagId))
  }, [posts, selectedTagId])

  const { pinned, archive } = useMemo(() => {
    const featuredCandidates = filtered
      .filter((p) => p.featured === true)
      .sort(sortByPublishedDesc)
      .slice(0, 2)
    const pinnedIds = new Set(featuredCandidates.map((p) => p.id))
    const rest = filtered.filter((p) => !pinnedIds.has(p.id)).sort(sortByPublishedDesc)
    return { pinned: featuredCandidates, archive: rest }
  }, [filtered])

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="toolbar" aria-label="Filter by tag">
        <button
          type="button"
          aria-pressed={selectedTagId === null}
          className={cn(pillBase, selectedTagId === null ? pillActive : pillInactive)}
          onClick={() => setSelectedTagId(null)}
        >
          all
        </button>
        {tagOptions.map((tag) => {
          const active = selectedTagId === tag.id
          return (
            <button
              key={tag.id}
              type="button"
              aria-pressed={active}
              className={cn(pillBase, active ? pillActive : pillInactive)}
              onClick={() => setSelectedTagId(tag.id)}
            >
              #{tag.label}
            </button>
          )
        })}
      </div>

      {pinned.length > 0 ? (
        <div className="mb-12">
          <p className="mb-4 font-mono text-xs text-text-muted lg:text-sm">// pinned</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {pinned.map((post) => {
              const monthYear = formatPostPinnedMonthYear(post.publishedAt)
              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className={cn(
                    'flex flex-col gap-5 rounded-md border border-border bg-card p-6 md:p-7',
                    'transition-colors hover:bg-page',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  )}
                >
                  <p className="text-lg font-semibold leading-snug text-text-heading md:text-xl">
                    {post.title}
                  </p>
                  {post.excerpt ? (
                    <p className="flex-1 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border-subtle pt-5">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => {
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
                    {monthYear ? (
                      <time
                        className="shrink-0 font-mono text-xs text-text-muted"
                        dateTime={post.publishedAt ?? undefined}
                      >
                        {monthYear}
                      </time>
                    ) : null}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}

      <p className="mb-4 font-mono text-xs text-text-muted lg:text-sm">// archive</p>
      {archive.length === 0 ? (
        <p className="text-sm text-text-secondary">No posts with this tag.</p>
      ) : (
        <div className="overflow-hidden rounded-sm border border-border bg-page">
          <div className="space-y-px bg-divider">
            {archive.map((post) => {
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
        </div>
      )}
    </>
  )
}
