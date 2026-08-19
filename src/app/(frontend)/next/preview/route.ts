import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { getPreviewSecret } from '@/utilities/previewSecret'
import { getServerSideURL } from '@/utilities/getURL'

function isInternalBindHost(hostname: string): boolean {
  return hostname === '0.0.0.0' || hostname === '::' || hostname === '[::]'
}

/**
 * Keep the draft-mode redirect on the origin the admin iframe actually requested.
 * Preferring `NEXT_PUBLIC_SITE_URL` when it is production (e.g. jamjam.dev) while
 * you are on localhost or a Vercel preview makes Chrome block the iframe:
 * "This content is blocked. Contact the site owner to fix the issue."
 *
 * Still skip internal bind addresses (`0.0.0.0`) from Docker/`request.url`.
 */
function redirectOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'http'
  if (forwardedHost) {
    const host = forwardedHost.split(',')[0].trim()
    if (host && !isInternalBindHost(host.split(':')[0] ?? '')) {
      return `${forwardedProto}://${host}`
    }
  }

  try {
    const fromRequest = new URL(request.url)
    if (!isInternalBindHost(fromRequest.hostname)) {
      return fromRequest.origin
    }
  } catch {
    /* fall through */
  }

  try {
    return new URL(getServerSideURL()).origin
  } catch {
    return 'http://localhost:3000'
  }
}

const allowedCollections = ['posts', 'projects', 'board-items'] as const
type PreviewCollection = (typeof allowedCollections)[number]

function isPreviewCollection(value: string): value is PreviewCollection {
  return (allowedCollections as readonly string[]).includes(value)
}

function buildPreviewPath(collection: PreviewCollection, slug: string): string {
  const segment = encodeURIComponent(slug)
  if (collection === 'posts') return `/posts/${segment}`
  if (collection === 'projects') return `/projects/${segment}`
  return `/board/${segment}`
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
