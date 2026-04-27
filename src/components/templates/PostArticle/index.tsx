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

function buildPostArticleGridTemplates({
  hasHero,
  hasChapters,
}: {
  hasHero: boolean
  hasChapters: boolean
}) {
  const mobileAreas: string[] = ['back', 'title', 'meta']
  if (hasHero) mobileAreas.push('hero')
  if (hasChapters) mobileAreas.push('chapters')
  mobileAreas.push('body')

  const mobileTemplate = mobileAreas.map((a) => `"${a}"`).join(' ')

  const desktopRows: string[][] = [['back', 'back']]
  if (hasHero) desktopRows.push(['hero', 'hero'])
  desktopRows.push(['title', 'aside'])
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
    <div className="mx-auto w-full max-w-[1100px] px-4 py-2 md:py-16 md:px-10">
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

        <div className="[grid-area:title] min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-text-heading md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {hasExcerpt ? (
            <p className="mt-4 max-w-3xl border-l-2 border-border pl-4 text-base leading-relaxed text-text-mid md:text-lg">
              {excerptText}
            </p>
          ) : null}
        </div>

        <div className="[grid-area:meta] lg:hidden">
          <PostMetaAside post={post} />
        </div>

        {hasHero && hero && typeof hero !== 'string' ? (
          <div className="[grid-area:hero] relative aspect-square w-full overflow-hidden border border-border bg-black md:aspect-2/1">
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
          <div className="[grid-area:chapters] lg:hidden">
            <PostContentsAside outline={outline} />
          </div>
        ) : null}

        <PostBodyRichText
          className="[grid-area:body] min-w-0"
          data={post.content}
          headingIds={headingIds}
          enableGutter={false}
          enableProse
          proseLayout="flush"
        />

        <aside className="[grid-area:aside] hidden min-w-0 flex-col gap-6 lg:flex lg:sticky lg:top-24 lg:self-start">
          <PostMetaAside post={post} />
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
