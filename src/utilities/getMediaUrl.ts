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
  return `${url}${sep}v=${encodeURIComponent(cacheTag)}`
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
