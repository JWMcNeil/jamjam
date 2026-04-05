import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const base = getServerSideURL().replace(/\/$/, '')

  const { docs } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  })

  const items = docs
    .filter((p) => Boolean(p.slug))
    .map((post) => {
      const link = `${base}/posts/${post.slug}`
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : ''
      const description = post.excerpt ? escapeXml(post.excerpt) : ''
      return `    <item>
      <title>${escapeXml(post.title ?? '')}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>jamjam.dev</title>
    <link>${base}</link>
    <description>Posts from jamjam.dev</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
