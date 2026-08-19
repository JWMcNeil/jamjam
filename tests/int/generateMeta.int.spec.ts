import type { Lab, Post, Project, BoardItem } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { describe, expect, it } from 'vitest'

const ogImage = (meta: Awaited<ReturnType<typeof generateMeta>>) => {
  const images = meta.openGraph?.images
  const first = Array.isArray(images) ? images[0] : images
  if (typeof first === 'string' || first instanceof URL) {
    return { url: String(first), width: undefined, height: undefined, alt: undefined }
  }
  if (first && typeof first === 'object' && 'url' in first) {
    return {
      url: String(first.url),
      width: 'width' in first ? first.width : undefined,
      height: 'height' in first ? first.height : undefined,
      alt: 'alt' in first ? first.alt : undefined,
    }
  }
  return { url: '', width: undefined, height: undefined, alt: undefined }
}

describe('generateMeta', () => {
  it('uses the hero og crop for posts, not meta.image', async () => {
    const doc = {
      slug: 'hello-world',
      title: 'Hello World',
      meta: {
        title: 'Hello World',
        description: 'A post',
        image: {
          url: 'https://cdn.example.com/seo-meta.jpg',
        },
      },
      heroImage: {
        url: '/media/hero.jpg',
        alt: 'Hero alt',
        sizes: {
          og: {
            url: '/media/hero-og.webp',
            filesize: 120_000,
          },
        },
      },
    } as unknown as Partial<Post>

    const meta = await generateMeta({ doc, kind: 'post' })
    const image = ogImage(meta)

    expect(image.url).toBe(`${getServerSideURL()}/media/hero-og.webp`)
    expect(image.url).not.toContain('seo-meta.jpg')
    expect(image.width).toBe(1200)
    expect(image.height).toBe(630)
    expect(image.alt).toBe('Hero alt')
    expect(meta.openGraph?.url).toBe('/posts/hello-world')
    expect(meta.alternates?.canonical).toBe('/posts/hello-world')
    expect(meta.openGraph?.locale).toBe('en_US')
    expect((meta.openGraph as { type?: string } | undefined)?.type).toBe('article')
    expect(meta.twitter).toMatchObject({ site: '@jamjamdev', creator: '@jamjamdev' })
  })

  it('falls back to the generated /og card when the og crop is over 500 KB', async () => {
    const doc = {
      slug: 'heavy-hero',
      title: 'Heavy hero',
      meta: { title: 'Heavy hero' },
      heroImage: {
        url: 'https://media.example.com/huge.png',
        sizes: {
          og: {
            url: 'https://media.example.com/huge-og.png',
            filesize: 1_680_000,
          },
        },
      },
    } as unknown as Partial<Post>

    const meta = await generateMeta({ doc, kind: 'post' })
    const parsed = new URL(ogImage(meta).url)

    expect(parsed.pathname).toBe('/og')
    expect(parsed.searchParams.get('slug')).toBe('heavy-hero')
    expect(ogImage(meta).url).not.toContain('huge')
  })

  it('leaves an absolute R2 og URL unprefixed', async () => {
    const doc = {
      slug: 'portfolio-site',
      title: 'Portfolio',
      heroImage: {
        url: 'https://media.example.com/hero.jpg',
        sizes: {
          og: {
            url: 'https://media.example.com/hero-og.webp',
          },
        },
      },
    } as unknown as Partial<Project>

    const meta = await generateMeta({ doc, kind: 'project' })

    expect(ogImage(meta).url).toBe('https://media.example.com/hero-og.webp')
    expect(meta.openGraph?.url).toBe('/projects/portfolio-site')
    expect((meta.openGraph as { type?: string } | undefined)?.type).toBe('website')
    expect(meta.alternates?.canonical).toBe('/projects/portfolio-site')
  })

  it('falls back to the generated /og card for lab tools', async () => {
    const doc = {
      slug: 'roast-my-website',
      title: 'Roast my website',
      toolKey: 'roast-my-website',
      meta: {
        title: 'Roast my website',
        image: {
          url: '/media/unused-seo.jpg',
        },
      },
    } as unknown as Partial<Lab>

    const meta = await generateMeta({ doc, kind: 'lab' })
    const image = ogImage(meta)
    const parsed = new URL(image.url)

    expect(parsed.origin + parsed.pathname).toBe(`${getServerSideURL()}/og`)
    expect(parsed.searchParams.get('title')).toBe('Roast my website')
    expect(parsed.searchParams.get('type')).toBe('lab')
    expect(parsed.searchParams.get('slug')).toBe('roast-my-website')
    expect(image.url).not.toContain('unused-seo.jpg')
    expect(meta.openGraph?.url).toBe('/lab/roast-my-website')
  })

  it('infers lab when kind is omitted', async () => {
    const doc = {
      slug: 'memory-card-storage-calc',
      title: 'Memory card storage calc',
      toolKey: 'memory-card-storage-calc',
    } as unknown as Partial<Lab>

    const meta = await generateMeta({ doc })
    const parsed = new URL(ogImage(meta).url)

    expect(parsed.searchParams.get('type')).toBe('lab')
    expect(meta.openGraph?.url).toBe('/lab/memory-card-storage-calc')
  })

  it('falls back to /og when a post has no hero image', async () => {
    const doc = {
      slug: 'draft-notes',
      title: 'Draft notes',
      meta: { title: 'Draft notes' },
    } as unknown as Partial<Post>

    const meta = await generateMeta({ doc, kind: 'post' })
    const parsed = new URL(ogImage(meta).url)

    expect(parsed.pathname).toBe('/og')
    expect(parsed.searchParams.get('type')).toBe('post')
    expect(parsed.searchParams.get('slug')).toBe('draft-notes')
  })

  it('uses the cover og crop for board items', async () => {
    const doc = {
      slug: 'harbour-dawn',
      title: 'Harbour dawn',
      kind: 'photography',
      cover: {
        url: '/media/harbour.jpg',
        alt: 'Harbour',
        sizes: {
          og: {
            url: '/media/harbour-og.webp',
            filesize: 80_000,
          },
        },
      },
      context: 'Shot on a walk.',
    } as unknown as Partial<BoardItem>

    const meta = await generateMeta({ doc, kind: 'board' })
    const image = ogImage(meta)

    expect(image.url).toBe(`${getServerSideURL()}/media/harbour-og.webp`)
    expect(image.alt).toBe('Harbour')
    expect(meta.openGraph?.url).toBe('/board/harbour-dawn')
    expect(meta.alternates?.canonical).toBe('/board/harbour-dawn')
    expect((meta.openGraph as { type?: string } | undefined)?.type).toBe('website')
  })

  it('infers board when kind is omitted and cover is present', async () => {
    const doc = {
      slug: 'poster',
      title: 'Poster',
      cover: {
        url: '/media/poster.jpg',
        sizes: { og: { url: '/media/poster-og.webp' } },
      },
    } as unknown as Partial<BoardItem>

    const meta = await generateMeta({ doc })
    expect(meta.openGraph?.url).toBe('/board/poster')
  })
})
