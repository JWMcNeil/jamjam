import type { Post, SiteSetting } from '@/payload-types'
import { jsonLdForDoc, jsonLdForWebsite } from '@/utilities/jsonLd'
import { getServerSideURL } from '@/utilities/getURL'
import { describe, expect, it } from 'vitest'

describe('jsonLdForDoc', () => {
  it('emits BlogPosting for posts', () => {
    const doc = {
      slug: 'hello-world',
      title: 'Hello World',
      meta: { description: 'A post' },
      publishedAt: '2026-04-01T00:00:00.000Z',
      updatedAt: '2026-04-02T00:00:00.000Z',
    } as unknown as Partial<Post>

    const data = jsonLdForDoc({ kind: 'post', doc })

    expect(data['@type']).toBe('BlogPosting')
    expect(data.url).toBe(`${getServerSideURL()}/posts/hello-world`)
    expect(data.datePublished).toBe('2026-04-01T00:00:00.000Z')
    expect(data.dateModified).toBe('2026-04-02T00:00:00.000Z')
  })

  it('emits WebSite for the homepage', () => {
    const data = jsonLdForWebsite({ name: 'Jamie McNeil' } as SiteSetting)
    expect(data['@type']).toBe('WebSite')
    expect(data.url).toBe(getServerSideURL())
  })
})
