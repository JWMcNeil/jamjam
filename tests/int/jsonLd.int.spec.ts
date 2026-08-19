import type { BoardItem, Post, SiteSetting } from '@/payload-types'
import { jsonLdForBoard, jsonLdForDoc, jsonLdForWebsite } from '@/utilities/jsonLd'
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

  it('emits Photograph for board items', () => {
    const doc = {
      slug: 'harbour-dawn',
      title: 'Harbour dawn',
      kind: 'photography',
      context: 'Shot on a walk.',
      cover: {
        url: '/media/harbour.jpg',
        sizes: { og: { url: '/media/harbour-og.webp' } },
      },
    } as unknown as Partial<BoardItem>

    const data = jsonLdForDoc({ kind: 'board', doc })

    expect(data['@type']).toBe('Photograph')
    expect(data.url).toBe(`${getServerSideURL()}/board/harbour-dawn`)
    expect(data.description).toBe('Shot on a walk.')
  })
})

describe('jsonLdForBoard', () => {
  it('emits CollectionPage for /board', () => {
    const data = jsonLdForBoard({
      items: [
        {
          title: 'Harbour dawn',
          slug: 'harbour-dawn',
          cover: {
            url: '/media/harbour.jpg',
          } as BoardItem['cover'],
        },
      ],
    })

    expect(data['@type']).toBe('CollectionPage')
    expect(data.url).toBe(`${getServerSideURL()}/board`)
    expect(Array.isArray(data.hasPart)).toBe(true)
  })
})
