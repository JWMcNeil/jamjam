import type { Metadata } from 'next/types'

import { BoardShell } from '@/components/board/BoardShell'
import { JsonLd } from '@/components/JsonLd'
import { queryPublishedBoardItems } from '@/lib/board/fetch'
import { pageMeta } from '@/utilities/generateMeta'
import { jsonLdForBoard } from '@/utilities/jsonLd'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BoardPage() {
  const [items, siteSettings] = await Promise.all([
    queryPublishedBoardItems(),
    getCachedGlobal('site-settings', 0)() as Promise<SiteSetting>,
  ])

  return (
    <>
      <JsonLd data={jsonLdForBoard({ items, siteSettings })} />
      <BoardShell items={items} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    path: '/board',
    title: 'Board — jamjam.dev',
    description: 'Photography and graphics — a scrapbook, not a second case-study track.',
    imageTitle: 'Board',
    imageType: 'board',
  })
}
