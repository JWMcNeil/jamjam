import type { Metadata } from 'next'

import type { Lab, Media, Post, Project } from '../payload-types'

import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_MAX_BYTES,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  TWITTER_HANDLE,
  mergeOpenGraph,
} from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

export type MetaDocKind = 'post' | 'project' | 'lab'

type MetaDoc = Partial<Post> | Partial<Project> | Partial<Lab> | null

const toAbsoluteUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const path = url.startsWith('/') ? url : `/${url}`
  return `${getServerSideURL()}${path}`
}

export const generatedOgImageUrl = (args: {
  title: string
  type?: string
  slug?: string
}): string => {
  const params = new URLSearchParams()
  params.set('title', args.title)
  if (args.type) params.set('type', args.type)
  if (args.slug) params.set('slug', args.slug)
  return `${getServerSideURL()}/og?${params.toString()}`
}

export const canonicalPath = (kind: MetaDocKind, slug: string | undefined): string => {
  if (!slug) return '/'
  if (kind === 'post') return `/posts/${slug}`
  if (kind === 'project') return `/projects/${slug}`
  return `/lab/${slug}`
}

export const withTitleSuffix = (raw: string): string => {
  const trimmed = raw.trim() || SITE_NAME
  if (trimmed === SITE_NAME || trimmed.includes(SITE_NAME)) return trimmed
  return `${trimmed} | ${SITE_NAME}`
}

const cardTitle = (doc: MetaDoc): string => {
  if (doc?.meta?.title?.trim()) return doc.meta.title.trim()
  if (doc && 'title' in doc && typeof doc.title === 'string' && doc.title.trim()) {
    return doc.title.trim()
  }
  return SITE_NAME
}

const metaDescription = (doc: MetaDoc): string | undefined => {
  const fromMeta = doc?.meta?.description?.trim()
  if (fromMeta) return fromMeta
  if (doc && 'excerpt' in doc && typeof doc.excerpt === 'string' && doc.excerpt.trim()) {
    return doc.excerpt.trim()
  }
  if (doc && 'description' in doc && typeof doc.description === 'string' && doc.description.trim()) {
    return doc.description.trim()
  }
  return undefined
}

const ogImageAlt = (doc: MetaDoc, media: Media | null): string => {
  const fromMedia = media?.alt?.trim()
  if (fromMedia) return fromMedia
  return cardTitle(doc)
}

const isOgSizeSafe = (filesize: number | null | undefined): boolean => {
  if (filesize == null) return true
  return filesize < OG_IMAGE_MAX_BYTES
}

const heroOgImage = (doc: MetaDoc): { url: string; alt: string } | null => {
  if (!doc || !('heroImage' in doc)) return null
  const image = doc.heroImage
  if (!image || typeof image !== 'object' || !('url' in image)) return null

  const media = image as Media
  const og = media.sizes?.og
  if (!og?.url || !isOgSizeSafe(og.filesize)) return null

  return { url: toAbsoluteUrl(og.url), alt: ogImageAlt(doc, media) }
}

const inferKind = (doc: MetaDoc): MetaDocKind => {
  if (doc && 'toolKey' in doc) return 'lab'
  if (doc && 'lifecycle' in doc) return 'project'
  return 'post'
}

export const ogImageFields = (
  url: string,
  alt: string,
): NonNullable<NonNullable<Metadata['openGraph']>['images']> => [
  {
    url,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt,
  },
]

export const pageMeta = (args: {
  path: string
  title: string
  description: string
  imageTitle?: string
  imageType?: string
  imageSlug?: string
}): Metadata => {
  const title = withTitleSuffix(args.title)
  const imageAlt = args.imageTitle?.trim() || args.title
  const imageUrl = generatedOgImageUrl({
    title: imageAlt,
    type: args.imageType,
    slug: args.imageSlug,
  })
  const images = ogImageFields(imageUrl, imageAlt)

  return {
    title,
    description: args.description,
    alternates: { canonical: args.path },
    openGraph: mergeOpenGraph({
      title,
      description: args.description,
      url: args.path,
      images,
    }),
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description: args.description,
      images,
    },
  }
}

export const generateMeta = async (args: {
  doc: MetaDoc
  kind?: MetaDocKind
}): Promise<Metadata> => {
  const { doc } = args
  const kind = args.kind ?? inferKind(doc)
  const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
  const path = canonicalPath(kind, slug)
  const displayTitle = cardTitle(doc)
  const title = withTitleSuffix(displayTitle)
  const description = metaDescription(doc)
  const hero = heroOgImage(doc)
  const ogImage = hero ?? {
    url: generatedOgImageUrl({
      title: displayTitle,
      type: kind,
      slug,
    }),
    alt: displayTitle,
  }
  const images = ogImageFields(ogImage.url, ogImage.alt)

  return {
    description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({
      description: description || '',
      images,
      title,
      url: path,
      type: kind === 'post' ? 'article' : 'website',
      ...(kind === 'post' && doc && 'publishedAt' in doc && doc.publishedAt
        ? { publishedTime: doc.publishedAt }
        : {}),
      ...(kind === 'post' && doc && 'updatedAt' in doc && typeof doc.updatedAt === 'string'
        ? { modifiedTime: doc.updatedAt }
        : {}),
    }),
    title,
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images,
    },
  }
}
