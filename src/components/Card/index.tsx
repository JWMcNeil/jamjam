'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Project } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'tags' | 'meta' | 'title' | 'heroImage'>
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
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, tags, meta, title, heroImage } = doc || {}
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
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!displayImage && <div className="">No image</div>}
        {displayImage && typeof displayImage !== 'string' && (
          <Media resource={displayImage} size="33vw" />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasTags && (
          <div className="uppercase text-sm mb-4">
            <div>
              {tags?.map((tag, index) => {
                if (typeof tag === 'object') {
                  const tagLabel = tag.label || 'Untitled tag'
                  const isLast = index === tags.length - 1

                  return (
                    <Fragment key={index}>
                      {tagLabel}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="text-muted-foreground text-sm mt-2">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
