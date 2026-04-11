import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
  /** e.g. `// related posts` */
  sectionLabel?: string
  variant?: 'default' | 'postRelated'
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent, sectionLabel, variant = 'default' } = props
  const terminalTags = variant === 'postRelated'

  const labelId = 'related-posts-heading'

  return (
    <section
      className={clsx(
        variant === 'postRelated' &&
          'border border-border bg-card p-6 md:p-8',
        variant === 'postRelated' ? 'w-full max-w-none' : 'lg:container',
        className,
      )}
      aria-labelledby={sectionLabel ? labelId : undefined}
    >
      {sectionLabel ? (
        <p id={labelId} className="mb-6 font-mono text-xs text-text-muted">
          {sectionLabel}
        </p>
      ) : null}
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <Card
              key={typeof doc.slug === 'string' ? doc.slug : index}
              className="h-full"
              doc={doc}
              relationTo="posts"
              showCategories
              terminalCommentTags={terminalTags}
            />
          )
        })}
      </div>
    </section>
  )
}
