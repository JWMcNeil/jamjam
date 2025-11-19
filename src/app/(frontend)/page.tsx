import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { getBlockByName } from '@/utilities/getBlocksByName'
import type { RichTextBlock, DraggableCardsBlock } from '@/payload-types'
import { HeroCanvas } from '@/components/HeroCanvas'

const queryStaticPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'static-pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function HomePage() {
  const staticPage = await queryStaticPageBySlug({ slug: 'home' })

  // Get blocks by name - scalable for many blocks
  const heroBlock = getBlockByName<RichTextBlock>(staticPage?.blocks, 'Hero', 'richTextBlock')
  const heroCardsBlock = getBlockByName<DraggableCardsBlock>(
    staticPage?.blocks,
    'HeroCards',
    'draggableCards',
  )

  return (
    <div className="h-full w-full">
      <HeroCanvas heroBlock={heroBlock} cardsBlock={heroCardsBlock} />
    </div>
  )
}
