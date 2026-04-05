import type { Post, Project, Tag } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

type ArchiveBlockProps = {
  tags?: (number | Tag)[] | null
  introContent?: Parameters<typeof RichText>[0]['data']
  limit?: number | null
  populateBy?: 'collection' | 'selection' | null
  relationTo?: 'posts' | 'projects' | null
  selectedDocs?:
    | {
        value: number | Post | Project
      }[]
    | null
}

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    tags,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3
  const collection = relationTo || 'posts'

  let docs: (Post | Project)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedTags = tags?.map((tag: number | Tag) => {
      if (typeof tag === 'object') return tag.id
      else return tag
    })

    const fetchedDocs = await payload.find({
      collection: collection as 'posts' | 'projects',
      depth: 1,
      limit,
      ...(flattenedTags && flattenedTags.length > 0
        ? {
            where: {
              tags: {
                in: flattenedTags,
              },
            },
          }
        : {}),
    })

    docs = fetchedDocs.docs as (Post | Project)[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDocs = selectedDocs
        .map((doc: { value: number | Post | Project }) => {
          if (typeof doc.value === 'object') return doc.value
          return null
        })
        .filter((doc): doc is Post | Project => doc !== null)

      docs = filteredSelectedDocs
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={docs} relationTo={collection as 'posts' | 'projects'} />
    </div>
  )
}
