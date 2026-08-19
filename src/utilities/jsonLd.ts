import type { BoardItem, Lab, Post, Project, SiteSetting } from '@/payload-types'

import { SITE_NAME } from './mergeOpenGraph'
import { canonicalPath, type MetaDocKind } from './generateMeta'
import { getServerSideURL } from './getURL'

type JsonLdObject = Record<string, unknown>
type JsonLdDoc = Partial<Post> | Partial<Project> | Partial<Lab> | Partial<BoardItem>

const absoluteUrl = (path: string): string => {
  const base = getServerSideURL().replace(/\/$/, '')
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

const person = (siteSettings?: SiteSetting | null): JsonLdObject => ({
  '@type': 'Person',
  name: siteSettings?.name?.trim() || 'Jamie McNeil',
  url: absoluteUrl('/'),
  ...(siteSettings?.location?.trim() ? { address: siteSettings.location.trim() } : {}),
})

const publisher = (): JsonLdObject => ({
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/apple-touch-icon.png'),
  },
})

const imageUrlFromDoc = (doc: JsonLdDoc | null): string | undefined => {
  if (!doc) return undefined
  const image = 'cover' in doc && doc.cover != null ? doc.cover : 'heroImage' in doc ? doc.heroImage : null
  if (!image || typeof image !== 'object') return undefined
  const og = 'sizes' in image ? image.sizes?.og?.url : undefined
  const raw = og || ('url' in image ? image.url : undefined)
  if (!raw) return undefined
  return absoluteUrl(raw)
}

export const jsonLdForDoc = (args: {
  kind: MetaDocKind
  doc: JsonLdDoc
  description?: string | null
  siteSettings?: SiteSetting | null
}): JsonLdObject => {
  const { kind, doc, description, siteSettings } = args
  const slug = typeof doc.slug === 'string' ? doc.slug : undefined
  const url = absoluteUrl(canonicalPath(kind, slug))
  const title =
    (typeof doc.meta?.title === 'string' && doc.meta.title.trim()) ||
    (typeof doc.title === 'string' && doc.title.trim()) ||
    SITE_NAME
  const desc =
    description?.trim() ||
    doc.meta?.description?.trim() ||
    ('excerpt' in doc && typeof doc.excerpt === 'string' ? doc.excerpt.trim() : undefined) ||
    ('context' in doc && typeof doc.context === 'string' ? doc.context.trim() : undefined) ||
    ('description' in doc && typeof doc.description === 'string' ? doc.description.trim() : undefined)
  const image = imageUrlFromDoc(doc)

  const shared: JsonLdObject = {
    '@context': 'https://schema.org',
    name: title,
    headline: title,
    url,
    ...(desc ? { description: desc } : {}),
    ...(image ? { image } : {}),
    publisher: publisher(),
    author: person(siteSettings),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  if (kind === 'post') {
    const post = doc as Partial<Post>
    return {
      ...shared,
      '@type': 'BlogPosting',
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    }
  }

  if (kind === 'project') {
    return {
      ...shared,
      '@type': 'CreativeWork',
    }
  }

  if (kind === 'board') {
    const item = doc as Partial<BoardItem>
    return {
      ...shared,
      '@type': item.kind === 'graphics' ? 'VisualArtwork' : 'Photograph',
    }
  }

  return {
    ...shared,
    '@type': 'WebApplication',
    applicationCategory: 'DeveloperApplication',
  }
}

export const jsonLdForWebsite = (siteSettings?: SiteSetting | null): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  publisher: person(siteSettings),
})

export const jsonLdForBoard = (args: {
  items: Array<Pick<BoardItem, 'title' | 'slug' | 'cover'>>
  siteSettings?: SiteSetting | null
}): JsonLdObject => {
  const url = absoluteUrl('/board')
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Board',
    url,
    author: person(args.siteSettings),
    hasPart: args.items.map((item) => ({
      '@type': 'ImageObject',
      name: item.title,
      url: absoluteUrl(`/board/${item.slug}`),
      ...(imageUrlFromDoc(item) ? { image: imageUrlFromDoc(item) } : {}),
    })),
  }
}
