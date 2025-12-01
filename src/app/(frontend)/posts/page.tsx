import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cache } from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
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

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  // Check if a Payload CMS page with slug "posts" exists
  const cmsPage = await queryPageBySlug({ slug: 'posts' })

  // If CMS page exists, render it instead of the custom posts listing
  if (cmsPage) {
    const { hero, layout } = cmsPage
    return (
      <article className="pt-16 pb-24">
        <PageClient />
        <PayloadRedirects disableNotFound url="/posts" />
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
      </article>
    )
  }

  // Otherwise, render the custom posts listing
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} basePath="/posts" />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  // Check if CMS page exists for metadata
  const cmsPage = await queryPageBySlug({ slug: 'posts' })

  if (cmsPage) {
    const { generateMeta } = await import('@/utilities/generateMeta')
    return generateMeta({ doc: cmsPage })
  }

  return {
    title: `JamJamDev Posts`,
  }
}
