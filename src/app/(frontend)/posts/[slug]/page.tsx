import type { Metadata } from 'next'

import { PostArticle } from '@/components/templates/PostArticle'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { extractLexicalHeadings } from '@/utilities/extractLexicalHeadings'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { SiteSetting } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getHeartCount, parseHeartCounts } from '@/lib/hearts'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug

  const [post, siteSettings, hearts] = await Promise.all([
    queryPostBySlug({ slug: decodedSlug }),
    querySiteSettings(),
    queryHearts(),
  ])

  if (!post) return <PayloadRedirects url={url} />

  const outline = extractLexicalHeadings(post.content)

  return (
    <article className="pt-4 md:pt-10">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostArticle
        post={post}
        siteSettings={siteSettings}
        outline={outline}
        heartCount={getHeartCount(parseHeartCounts(hearts.counts), post.id)}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    // depth 2: relatedPosts are populated at 1, their heroImage/meta.image need another level
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const querySiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
  return doc as SiteSetting
})

const queryHearts = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'hearts',
    overrideAccess: true,
  })
})
