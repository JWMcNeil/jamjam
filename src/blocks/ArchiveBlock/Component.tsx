import type { Post, Web, Content, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3
  const collection = relationTo || 'posts'

  let docs: (Post | Web | Content)[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedDocs = await payload.find({
      collection: collection as 'posts' | 'web' | 'content',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    docs = fetchedDocs.docs as (Post | Web | Content)[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedDocs = selectedDocs
        .map((doc) => {
          if (typeof doc.value === 'object') return doc.value
          return null
        })
        .filter((doc): doc is Post | Web | Content => doc !== null)

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
      <CollectionArchive posts={docs} relationTo={collection as 'posts' | 'web' | 'content'} />
    </div>
  )
}
