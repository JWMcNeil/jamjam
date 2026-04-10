import { RelatedPosts } from '@/components/blocks/RelatedPosts/Component'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { Media } from '@/components/Media'
import { PostBodyRichText } from '@/components/RichText/PostBodyRichText'
import type { LexicalHeadingOutlineItem } from '@/utilities/extractLexicalHeadings'
import { formatPostDateLong } from '@/utilities/formatPostDate'
import { tagPillClasses } from '@/utilities/tagPillClasses'
import type { Media as MediaType, Post, SiteSetting, Tag } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

function PostMetaAside({ post }: { post: Post }) {
  const { tags, publishedAt, readTime } = post
  const dateLabel = formatPostDateLong(publishedAt)

  return (
    <div className="border border-border bg-card p-4">
      <p className="mb-3 font-mono text-xs text-text-muted">// meta</p>
      <dl className="space-y-3 text-sm">
        {dateLabel ? (
          <div>
            <dt className="font-mono text-xs text-text-muted">Date</dt>
            <dd className="text-text-heading">{dateLabel}</dd>
          </div>
        ) : null}
        {typeof readTime === 'number' && readTime > 0 ? (
          <div>
            <dt className="font-mono text-xs text-text-muted">Read time</dt>
            <dd className="text-text-heading tabular-nums">~ {readTime} min</dd>
          </div>
        ) : null}
        {tags && tags.length > 0 ? (
          <div>
            <dt className="mb-2 font-mono text-xs text-text-muted">Tags</dt>
            <dd className="flex flex-wrap gap-2">
              {tags.map((tag: number | Tag, index: number) => {
                if (typeof tag !== 'object' || tag === null) return null
                const label = tag.label?.trim() || 'untitled'
                return (
                  <span key={tag.id ?? index} className={tagPillClasses(tag.colour)}>
                    #{label}
                  </span>
                )
              })}
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  )
}

function PostContentsAside({ outline }: { outline: LexicalHeadingOutlineItem[] }) {
  if (outline.length === 0) return null

  return (
    <div className="border border-border bg-card p-4">
      <p className="mb-3 font-mono text-xs text-text-muted">// contents</p>
      <ol className="list-none space-y-2 p-0 font-mono text-sm">
        {outline.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex gap-2 text-text-secondary transition-colors hover:text-text-heading"
            >
              <span className="w-6 shrink-0 tabular-nums text-text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

function PostAuthorSection({ siteSettings }: { siteSettings: SiteSetting }) {
  const photo: MediaType | null =
    siteSettings.aboutPhoto && typeof siteSettings.aboutPhoto === 'object'
      ? siteSettings.aboutPhoto
      : null

  return (
    <section className="mt-12 border border-border bg-card p-6" aria-labelledby="post-author-heading">
      <p id="post-author-heading" className="mb-4 font-mono text-xs text-text-muted">
        // author
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-black">
          {photo ? (
            <ImageMedia resource={photo} fill imgClassName="object-cover" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-text-heading">{siteSettings.name}</p>
          <p className="mt-1 text-text-primary">{siteSettings.aboutHeadline}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{siteSettings.aboutBio}</p>
        </div>
      </div>
    </section>
  )
}

export function PostArticle({
  post,
  siteSettings,
  outline,
}: {
  post: Post
  siteSettings: SiteSetting
  outline: LexicalHeadingOutlineItem[]
}) {
  const hero = post.heroImage
  const headingIds = outline.map((h) => h.id)
  const related = post.relatedPosts?.filter((p): p is Post => typeof p === 'object') ?? []

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-16 md:px-10">
      <Link
        href="/posts"
        className="mb-2 inline-block font-mono text-sm text-text-prompt transition-colors hover:text-text-heading"
      >
        ← ls posts/
      </Link>
      <p className="mb-10 font-mono text-sm text-text-prompt">
        jamjam:~$ <span className="text-accent">cat posts/{post.slug}.md</span>
      </p>

      {hero && typeof hero !== 'string' ? (
        <div className="relative mb-8 aspect-2/1 w-full overflow-hidden border border-border bg-black lg:mb-10">
          <Media
            fill
            priority
            resource={hero}
            htmlElement="div"
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover"
          />
        </div>
      ) : null}

      {outline.length > 0 ? (
        <div className="mb-10 lg:hidden">
          <PostContentsAside outline={outline} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-12">
        <div className="min-w-0">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-text-heading md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <PostBodyRichText
            data={post.content}
            headingIds={headingIds}
            enableGutter={false}
            enableProse
            proseLayout="flush"
          />
        </div>

        <aside className="hidden min-w-0 flex-col gap-6 lg:flex lg:sticky lg:top-24 lg:self-start">
          <PostMetaAside post={post} />
          <PostContentsAside outline={outline} />
        </aside>
      </div>

      <div className="mt-10 lg:hidden">
        <PostMetaAside post={post} />
      </div>

      <PostAuthorSection siteSettings={siteSettings} />

      {related.length > 0 ? (
        <RelatedPosts className="mt-12" docs={related} sectionLabel="// related posts" variant="postRelated" />
      ) : null}
    </div>
  )
}
