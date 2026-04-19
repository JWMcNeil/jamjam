import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { getPreviewSecret } from '@/utilities/previewSecret'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Base URL for redirects. Never use `request.url` as the base: behind Docker/reverse proxies
 * the internal host can be `0.0.0.0:3000`, which would send users to an invalid Location.
 */
function redirectOrigin(request: Request): string {
  const envBase = getServerSideURL()
  try {
    const u = new URL(envBase)
    const h = u.hostname
    if (h !== 'localhost' && h !== '127.0.0.1' && h !== '0.0.0.0') {
      return u.origin
    }
  } catch {
    /* fall through */
  }
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'https'
  if (forwardedHost) {
    const host = forwardedHost.split(',')[0].trim()
    return `${forwardedProto}://${host}`
  }
  try {
    return new URL(request.url).origin
  } catch {
    return 'http://localhost:3000'
  }
}

const allowedCollections = ['posts', 'projects'] as const
type PreviewCollection = (typeof allowedCollections)[number]

function isPreviewCollection(value: string): value is PreviewCollection {
  return (allowedCollections as readonly string[]).includes(value)
}

function buildPreviewPath(collection: PreviewCollection, slug: string): string {
  const segment = encodeURIComponent(slug)
  return collection === 'posts' ? `/posts/${segment}` : `/projects/${segment}`
}

export async function GET(request: Request): Promise<Response> {
  const secret = getPreviewSecret()
  if (!secret) {
    return new Response('Preview not configured', { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const token = searchParams.get('previewSecret')?.trim()
  if (token !== secret) {
    return new Response('Invalid token', { status: 401 })
  }

  const collectionParam = searchParams.get('collection')
  if (!collectionParam || !isPreviewCollection(collectionParam)) {
    return new Response('Invalid collection', { status: 400 })
  }
  const collection = collectionParam

  const slugParam = searchParams.get('slug')
  if (slugParam === null || String(slugParam).trim() === '') {
    return new Response('Invalid slug', { status: 400 })
  }

  let slug: string
  try {
    slug = decodeURIComponent(slugParam)
  } catch {
    slug = slugParam
  }

  if (slug.trim() === '' || slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
    return new Response('Invalid slug', { status: 400 })
  }

  const path = buildPreviewPath(collection, slug)
  ;(await draftMode()).enable()

  return NextResponse.redirect(new URL(path, redirectOrigin(request)))
}
