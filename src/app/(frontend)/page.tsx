import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { getBlockByName } from '@/utilities/getBlocksByName'
import type { RichTextBlock, DraggableCardsBlock } from '@/payload-types'
import { HeroText } from '@/components/HeroText'
import DarkVeil from '@/components/DarkVeil/DarkVeil'

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

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-[-5.5rem] inset-x-0 bottom-0 z-0">
        <DarkVeil />
      </div>
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <HeroText heroBlock={heroBlock} />
      </div>
    </div>
  )
}
