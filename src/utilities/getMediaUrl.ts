import { getServerSideURL } from '@/utilities/getURL'

/**
 * If href matches our configured site origin, return pathname + search only.
 * Same-origin relative URLs let next/image use an internal fetch instead of
 * `fetchExternalImage`, which rejects localhost / private IPs unless
 * `images.dangerouslyAllowLocalIP` is set (Next.js 16+).
 */
function sameOriginPathOnly(href: string): string {
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    return href
  }
  try {
    const site = new URL(getServerSideURL())
    const parsed = new URL(href)
    if (parsed.origin === site.origin) {
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    /* invalid absolute URL */
  }
  return href
}

function appendCacheTag(url: string, cacheTag: string): string {
  const sep = url.includes('?') ? '&' : '?'
  // ISO timestamps contain ":" which survives encodeURIComponent; next/image then
  // re-encodes for /_next/image and breaks the URL. Prefer a numeric cache buster.
  const v = (() => {
    const parsed = Date.parse(cacheTag)
    if (!Number.isNaN(parsed)) return String(parsed)
    return encodeURIComponent(cacheTag)
  })()
  return `${url}${sep}v=${v}`
}

type DisplaySizeKey = 'small' | 'medium' | 'large' | 'xlarge'

const SIZE_ORDER: DisplaySizeKey[] = ['small', 'medium', 'large', 'xlarge']

type MediaSize = {
  url?: string | null
  width?: number | null
  height?: number | null
}

type MediaLike = {
  url?: string | null
  width?: number | null
  height?: number | null
  sizes?: Partial<Record<DisplaySizeKey, MediaSize | null>> | null
}

/**
 * Prefer a Payload-generated size so next/image does not download a multi-MB original.
 * Picks the smallest size whose width is at least `minWidth`.
 */
export function pickDisplayMedia(
  resource: MediaLike,
  minWidth: number,
): { url: string; width?: number; height?: number } {
  const sizes = resource.sizes
  const generated = SIZE_ORDER.map((key) => sizes?.[key])
    .filter((size): size is MediaSize => Boolean(size?.url))
    .sort((a, b) => (a.width ?? 0) - (b.width ?? 0))

  const fit = generated.find((size) => (size.width ?? 0) >= minWidth) ?? generated.at(-1)
  if (fit?.url) {
    return {
      url: fit.url,
      width: fit.width ?? undefined,
      height: fit.height ?? undefined,
    }
  }

  return {
    url: resource.url || '',
    width: resource.width ?? undefined,
    height: resource.height ?? undefined,
  }
}

/**
 * Media URL for img / next/image / video src on this app.
 * Uses root-relative paths for local media so the image optimizer can fetch internally.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  let resolved = sameOriginPathOnly(url.trim())

  if (!resolved.startsWith('http://') && !resolved.startsWith('https://')) {
    if (!resolved.startsWith('/')) {
      resolved = `/${resolved}`
    }
  }

  if (cacheTag && cacheTag !== '') {
    return appendCacheTag(resolved, cacheTag)
  }

  return resolved
}
