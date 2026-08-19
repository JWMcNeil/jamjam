import type { Metadata } from 'next'

import { BoardShell } from '@/components/board/BoardShell'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { queryBoardItemBySlug, queryPublishedBoardItems } from '@/lib/board/fetch'
import { generateMeta } from '@/utilities/generateMeta'
import { jsonLdForDoc } from '@/utilities/jsonLd'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const items = await payload.find({
    collection: 'board-items',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })

  return items.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function BoardItemPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/board/${decodedSlug}`

  const [item, items] = await Promise.all([
    queryBoardItemBySlug(decodedSlug),
    queryPublishedBoardItems(),
  ])

  if (!item) return <PayloadRedirects url={url} />

  return (
    <>
      <JsonLd data={jsonLdForDoc({ kind: 'board', doc: item })} />
      <PayloadRedirects disableNotFound url={url} />
      {draft ? <LivePreviewListener /> : null}
      <BoardShell items={items} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryBoardItemBySlug(decodedSlug)
  return generateMeta({ doc: item, kind: 'board' })
}
