import type { Metadata } from 'next'

import type { Lab, Media, Post, Project } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
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

const canonicalPath = (kind: MetaDocKind, slug: string | undefined): string => {
  if (!slug) return '/'
  if (kind === 'post') return `/posts/${slug}`
  if (kind === 'project') return `/projects/${slug}`
  return `/lab/${slug}`
}

const heroOgImageUrl = (doc: MetaDoc): string | null => {
  if (!doc || !('heroImage' in doc)) return null
  const image = doc.heroImage
  if (!image || typeof image !== 'object' || !('url' in image)) return null

  const media = image as Media
  const raw = media.sizes?.og?.url || media.url
  if (!raw) return null
  return toAbsoluteUrl(raw)
}

const cardTitle = (doc: MetaDoc): string => {
  if (doc?.meta?.title?.trim()) return doc.meta.title.trim()
  if (doc && 'title' in doc && typeof doc.title === 'string' && doc.title.trim()) {
    return doc.title.trim()
  }
  return 'jamjam.dev'
}

const inferKind = (doc: MetaDoc): MetaDocKind => {
  if (doc && 'toolKey' in doc) return 'lab'
  if (doc && 'lifecycle' in doc) return 'project'
  return 'post'
}

export const generateMeta = async (args: {
  doc: MetaDoc
  kind?: MetaDocKind
}): Promise<Metadata> => {
  const { doc } = args
  const kind = args.kind ?? inferKind(doc)
  const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
  const title = doc?.meta?.title ? `${doc.meta.title} | jamjam.dev` : 'jamjam.dev'
  const ogImage =
    heroOgImageUrl(doc) ??
    generatedOgImageUrl({
      title: cardTitle(doc),
      type: kind,
      slug,
    })

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: [
        {
          url: ogImage,
        },
      ],
      title,
      url: canonicalPath(kind, slug),
    }),
    title,
  }
}
