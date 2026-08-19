import type { Lab, Post, Project, SiteSetting } from '@/payload-types'

import { SITE_NAME } from './mergeOpenGraph'
import { canonicalPath, type MetaDocKind } from './generateMeta'
import { getServerSideURL } from './getURL'

type JsonLdObject = Record<string, unknown>

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

const imageUrlFromDoc = (doc: Partial<Post> | Partial<Project> | Partial<Lab> | null): string | undefined => {
  if (!doc || !('heroImage' in doc)) return undefined
  const image = doc.heroImage
  if (!image || typeof image !== 'object') return undefined
  const og = 'sizes' in image ? image.sizes?.og?.url : undefined
  const raw = og || ('url' in image ? image.url : undefined)
  if (!raw) return undefined
  return absoluteUrl(raw)
}

export const jsonLdForDoc = (args: {
  kind: MetaDocKind
  doc: Partial<Post> | Partial<Project> | Partial<Lab>
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
