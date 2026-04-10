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

  return (
    <div className={clsx(variant === 'postRelated' ? 'w-full max-w-none' : 'lg:container', className)}>
      {sectionLabel ? (
        <p className="mb-6 font-mono text-xs text-text-muted">{sectionLabel}</p>
      ) : null}
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <Card
              key={index}
              doc={doc}
              relationTo="posts"
              showCategories
              terminalCommentTags={terminalTags}
            />
          )
        })}
      </div>
    </div>
  )
}
