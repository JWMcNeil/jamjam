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

/** True when src is absolute and not served from this app (e.g. R2 on media.*). */
export function isCrossOriginMediaUrl(href: string): boolean {
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    return false
  }
  try {
    const site = new URL(getServerSideURL())
    const parsed = new URL(href)
    return parsed.origin !== site.origin
  } catch {
    return false
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
