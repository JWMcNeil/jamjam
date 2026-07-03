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

function PostInlineMeta({ post }: { post: Post }) {
  const { tags, publishedAt, readTime } = post
  const dateLabel = formatPostDateLong(publishedAt)
  const readLabel =
    typeof readTime === 'number' && readTime > 0 ? `~ ${readTime} min read` : null
  const metaLine = [dateLabel, readLabel].filter(Boolean).join(' · ')

  if (!metaLine && (!tags || tags.length === 0)) return null

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      {metaLine ? (
        <p className="font-mono text-sm text-text-muted tabular-nums">{metaLine}</p>
      ) : null}
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 lg:hidden">
          {tags.map((tag: number | Tag, index: number) => {
            if (typeof tag !== 'object' || tag === null) return null
            const label = tag.label?.trim() || 'untitled'
            return (
              <span key={tag.id ?? index} className={tagPillClasses(tag.colour)}>
                #{label}
              </span>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function PostTagsAside({ post }: { post: Post }) {
  const { tags } = post
  if (!tags || tags.length === 0) return null

  return (
    <div className="border border-border bg-card p-4">
      <p className="mb-3 font-mono text-xs text-text-muted">// tags</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: number | Tag, index: number) => {
          if (typeof tag !== 'object' || tag === null) return null
          const label = tag.label?.trim() || 'untitled'
          return (
            <span key={tag.id ?? index} className={tagPillClasses(tag.colour)}>
              #{label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function PostContentsAside({ outline }: { outline: LexicalHeadingOutlineItem[] }) {
  if (outline.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="border border-border bg-card p-4">
      <p className="mb-3 font-mono text-xs text-text-muted">// contents</p>
      <ul className="space-y-2.5 p-0 text-sm leading-snug">
        {outline.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-text-secondary transition-colors hover:text-text-heading"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function PostContentsMobile({ outline }: { outline: LexicalHeadingOutlineItem[] }) {
  if (outline.length === 0) return null

  return (
    <details className="group border border-border bg-card lg:hidden">
      <summary className="cursor-pointer list-none px-4 py-3 font-mono text-sm text-text-muted marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-text-secondary transition-colors group-open:text-text-heading">
          // contents
        </span>
        <span className="ml-2 text-text-dim">({outline.length})</span>
      </summary>
      <nav aria-label="Table of contents" className="border-t border-border px-4 pb-4 pt-3">
        <ul className="space-y-2.5 text-sm leading-snug">
          {outline.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-text-secondary transition-colors hover:text-text-heading"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}

function PostAuthorSection({ siteSettings }: { siteSettings: SiteSetting }) {
  const photo: MediaType | null =
    siteSettings.aboutPhoto && typeof siteSettings.aboutPhoto === 'object'
      ? siteSettings.aboutPhoto
      : null

  return (
    <section
      className="mt-16 border-t border-border pt-10"
      aria-labelledby="post-author-heading"
    >
      <p id="post-author-heading" className="mb-5 font-mono text-xs text-text-muted">
        // author
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-black">
          {photo ? (
            <ImageMedia resource={photo} fill imgClassName="object-cover" />
          ) : null}
        </div>
        <div className="min-w-0 max-w-prose">
          <p className="text-lg font-semibold text-text-heading">{siteSettings.name}</p>
          <p className="mt-1 text-text-primary">{siteSettings.aboutHeadline}</p>
          <p className="mt-2 text-sm leading-[1.75] text-text-secondary">{siteSettings.aboutBio}</p>
        </div>
      </div>
    </section>
  )
}

function buildPostArticleGridTemplates({
  hasHero,
  hasChapters,
}: {
  hasHero: boolean
  hasChapters: boolean
}) {
  const mobileAreas: string[] = ['back', 'title']
  if (hasHero) mobileAreas.push('hero')
  if (hasChapters) mobileAreas.push('toc')
  mobileAreas.push('body')

  const mobileTemplate = mobileAreas.map((a) => `"${a}"`).join(' ')

  // Aside must occupy contiguous rows — never place a full-width row between title and body
  // when both rows reference `aside`, or grid-template-areas becomes invalid.
  const desktopRows: string[][] = [['back', 'back'], ['title', 'title']]
  if (hasHero) desktopRows.push(['hero', 'hero'])
  desktopRows.push(['body', 'aside'])

  const desktopTemplate = desktopRows.map((row) => `"${row.join(' ')}"`).join(' ')

  return { mobileTemplate, desktopTemplate }
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
  const excerptText = post.excerpt?.trim() ?? ''
  const hasExcerpt = Boolean(excerptText)
  const hasHero = Boolean(hero && typeof hero !== 'string')
  const hasChapters = outline.length > 0
  const headingIds = outline.map((h) => h.id)
  const related = post.relatedPosts?.filter((p): p is Post => typeof p === 'object') ?? []

  const { mobileTemplate, desktopTemplate } = buildPostArticleGridTemplates({
    hasHero,
    hasChapters,
  })

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-6 md:py-14 md:px-10">
      <div
        className="post-article-layout"
        style={
          {
            '--post-mobile-areas': mobileTemplate,
            '--post-desktop-areas': desktopTemplate,
          } as React.CSSProperties
        }
      >
        <Link
          href="/posts"
          className="[grid-area:back] inline-block font-mono text-sm text-text-prompt transition-colors hover:text-text-heading"
        >
          ← ls posts/
        </Link>

        <header className="[grid-area:title] min-w-0">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-text-heading md:text-3xl lg:text-[2.125rem] lg:leading-[1.2]">
            {post.title}
          </h1>
          <PostInlineMeta post={post} />
          {hasExcerpt ? (
            <p className="mt-5 text-pretty text-lg leading-[1.75] text-text-secondary md:text-[1.125rem]">
              {excerptText}
            </p>
          ) : null}
        </header>

        {hasHero && hero && typeof hero !== 'string' ? (
          <div className="[grid-area:hero] relative aspect-[16/10] w-full overflow-hidden border border-border bg-black md:aspect-[21/9]">
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

        {hasChapters ? (
          <div className="[grid-area:toc] lg:hidden">
            <PostContentsMobile outline={outline} />
          </div>
        ) : null}

        <PostBodyRichText
          className="[grid-area:body] min-w-0 pt-2 md:pt-4"
          data={post.content}
          headingIds={headingIds}
          enableGutter={false}
          enableProse
          proseLayout="flush"
        />

        <aside className="[grid-area:aside] hidden min-w-0 flex-col gap-5 lg:flex lg:sticky lg:top-24 lg:self-start">
          <PostTagsAside post={post} />
          <PostContentsAside outline={outline} />
        </aside>
      </div>

      <PostAuthorSection siteSettings={siteSettings} />

      {related.length > 0 ? (
        <RelatedPosts className="mt-12" docs={related} sectionLabel="// related posts" variant="postRelated" />
      ) : null}
    </div>
  )
}
