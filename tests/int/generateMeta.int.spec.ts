import type { Lab, Post, Project } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { describe, expect, it } from 'vitest'

const ogImageUrl = (meta: Awaited<ReturnType<typeof generateMeta>>): string => {
  const images = meta.openGraph?.images
  const first = Array.isArray(images) ? images[0] : images
  if (typeof first === 'string' || first instanceof URL) return String(first)
  if (first && typeof first === 'object' && 'url' in first) return String(first.url)
  return ''
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
        sizes: {
          og: {
            url: '/media/hero-og.webp',
          },
        },
      },
    } as unknown as Partial<Post>

    const meta = await generateMeta({ doc, kind: 'post' })

    expect(ogImageUrl(meta)).toBe(`${getServerSideURL()}/media/hero-og.webp`)
    expect(ogImageUrl(meta)).not.toContain('seo-meta.jpg')
    expect(meta.openGraph?.url).toBe('/posts/hello-world')
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

    expect(ogImageUrl(meta)).toBe('https://media.example.com/hero-og.webp')
    expect(meta.openGraph?.url).toBe('/projects/portfolio-site')
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
    const image = ogImageUrl(meta)
    const parsed = new URL(image)

    expect(parsed.origin + parsed.pathname).toBe(`${getServerSideURL()}/og`)
    expect(parsed.searchParams.get('title')).toBe('Roast my website')
    expect(parsed.searchParams.get('type')).toBe('lab')
    expect(parsed.searchParams.get('slug')).toBe('roast-my-website')
    expect(image).not.toContain('unused-seo.jpg')
    expect(meta.openGraph?.url).toBe('/lab/roast-my-website')
  })

  it('infers lab when kind is omitted', async () => {
    const doc = {
      slug: 'memory-card-storage-calc',
      title: 'Memory card storage calc',
      toolKey: 'memory-card-storage-calc',
    } as unknown as Partial<Lab>

    const meta = await generateMeta({ doc })
    const parsed = new URL(ogImageUrl(meta))

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
    const parsed = new URL(ogImageUrl(meta))

    expect(parsed.pathname).toBe('/og')
    expect(parsed.searchParams.get('type')).toBe('post')
    expect(parsed.searchParams.get('slug')).toBe('draft-notes')
  })
})
