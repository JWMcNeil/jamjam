'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Media as MediaType, Post, Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPostMonthYear } from '@/utilities/formatPostDate'

export type CardPostData = Pick<Post, 'slug' | 'tags' | 'meta' | 'title' | 'heroImage' | 'publishedAt'>
export type CardProjectData = Pick<Project, 'slug' | 'tags' | 'meta' | 'title' | 'heroImage'>
export type CardData = CardPostData | CardProjectData
export type CardDataWithRelation = CardData & { relationTo?: 'posts' | 'projects' }

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'projects'
  showCategories?: boolean
  title?: string
  /** Prefix tag line with `//` (post detail related cards). */
  terminalCommentTags?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
    terminalCommentTags,
  } = props

  const { slug, tags, meta, title, heroImage } = doc || {}
  const publishedAt =
    doc && relationTo === 'posts' && 'publishedAt' in doc ? doc.publishedAt : undefined
  const { description, image: metaImage } = meta || {}

  const displayImage =
    (heroImage && typeof heroImage === 'object' ? heroImage : null) ||
    (metaImage && typeof metaImage === 'object' ? metaImage : null)

  const hasTags = tags && Array.isArray(tags) && tags.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden rounded-sm border border-border bg-card transition-colors hover:cursor-pointer hover:bg-card-hover',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-video w-full shrink-0 bg-muted">
        {displayImage && typeof displayImage !== 'string' ? (
          <Media
            htmlElement={null}
            fill
            pictureClassName="absolute inset-0 block h-full w-full"
            imgClassName="object-cover"
            resource={displayImage as MediaType}
            size="33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-5">
        {showCategories && hasTags && (
          <div
            className={cn(
              'font-mono text-xs text-text-secondary',
              !terminalCommentTags && 'text-sm uppercase',
            )}
          >
            <div>
              {tags?.map((tag, index) => {
                if (typeof tag === 'object') {
                  const tagLabel = tag.label || 'Untitled tag'
                  const isLast = index === tags.length - 1

                  return (
                    <Fragment key={index}>
                      {terminalCommentTags && index === 0 ? '// ' : null}
                      {terminalCommentTags ? tagLabel : tagLabel.toUpperCase()}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          </div>
        )}
        {titleToUse ? (
          <h3 className="text-lg font-semibold leading-snug text-text-heading">
            <Link
              className="transition-colors hover:text-text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        ) : null}
        {relationTo === 'posts' && publishedAt ? (
          <p className="font-mono text-xs text-text-muted tabular-nums">
            {formatPostMonthYear(publishedAt)}
          </p>
        ) : null}
        {sanitizedDescription ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">{sanitizedDescription}</p>
        ) : null}
      </div>
    </article>
  )
}
