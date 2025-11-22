import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Web, Content } from '@/payload-types'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedProjectsProps = {
  className?: string
  docs?: (Web | Content)[]
  introContent?: DefaultTypedEditorState
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc !== 'object' || doc === null) return null

          // Determine relationTo based on the document structure
          // Web projects don't have projectType, Content projects do
          const relationTo = 'projectType' in doc ? 'content' : 'web'

          return <Card key={index} doc={doc} relationTo={relationTo} showCategories />
        })}
      </div>
    </div>
  )
}

