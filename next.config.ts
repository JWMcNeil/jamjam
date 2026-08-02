import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** Fallback when env is missing at build time. Prefer setting R2_PUBLIC_URL / NEXT_PUBLIC_MEDIA_URL. */
const DEFAULT_MEDIA_PUBLIC_URL = 'https://media.jamjam.dev'

/** Hostnames only (no scheme/port). Lets phone/Tailscale load `/_next` dev assets. */
function parseAllowedDevOrigins(): string[] | undefined {
  const raw = process.env.NEXT_DEV_EXTRA_ORIGINS
  if (typeof raw !== 'string' || !raw.trim()) return undefined
  const hosts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return hosts.length ? hosts : undefined
}

const allowedDevOrigins = parseAllowedDevOrigins()

/**
 * Public media origin (R2 custom domain). Read env when called so CSP picks up runtime
 * values, not only what was present at `next build`.
 */
function parseMediaOriginWithFallback(): URL | null {
  const raw =
    process.env.NEXT_PUBLIC_MEDIA_URL || process.env.R2_PUBLIC_URL || DEFAULT_MEDIA_PUBLIC_URL
  try {
    return new URL(String(raw).trim())
  } catch {
    return null
  }
}

const mediaOrigin = parseMediaOriginWithFallback()

/**
 * CSP `frame-ancestors` for Payload live preview: the admin iframes the frontend. If users
 * hit `www` while `NEXT_PUBLIC_SITE_URL` is apex (or the reverse), `X-Frame-Options: SAMEORIGIN`
 * alone blocks the iframe. Listing both origins here allows same-site framing across that split.
 */
function buildFrameAncestors(): string {
  const origins = new Set<string>(["'self'"])
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (site) {
    try {
      const u = new URL(site)
      origins.add(u.origin)
      const host = u.hostname
      const isLocal =
        host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')
      const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
      if (!isLocal && !isIp) {
        if (host.startsWith('www.')) {
          origins.add(`${u.protocol}//${host.slice(4)}`)
        } else {
          origins.add(`${u.protocol}//www.${host}`)
        }
      }
    } catch {
      /* ignore invalid NEXT_PUBLIC_SITE_URL */
    }
  }
  const extra =
    process.env.FRAME_ANCESTORS?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) ?? []
  for (const e of extra) {
    try {
      origins.add(new URL(e).origin)
    } catch {
      /* ignore */
    }
  }
  return [...origins].join(' ')
}

const nextConfig: NextConfig = {
  ...(allowedDevOrigins ? { allowedDevOrigins } : {}),
  images: {
    /**
     * Next 16 defaults omitted `localPatterns` to `[{ pathname: '**', search: '' }]`,
     * which rejects any `?` on local URLs. Payload media URLs use `getMediaUrl` cache-bust `?v=`.
     * Listing `/api/media/file/**` without `search` allows any query for that path only.
     */
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '**', search: '' },
    ],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)
        return {
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
          hostname: url.hostname,
          ...(url.port ? { port: url.port } : {}),
          pathname: '/**',
        }
      }),
      ...(mediaOrigin
        ? [
            {
              protocol: mediaOrigin.protocol.replace(':', '') as 'http' | 'https',
              hostname: mediaOrigin.hostname,
              ...(mediaOrigin.port ? { port: mediaOrigin.port } : {}),
              pathname: '/**' as const,
            },
          ]
        : []),
    ],
  },
  reactStrictMode: true,
  redirects: async () => {
    return (await redirects()) as Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>
  },
  async headers() {
    // Re-read env at header generation so R2_PUBLIC_URL from the runtime env applies.
    const media = parseMediaOriginWithFallback()
    const imgSrc = [
      "'self'",
      'data:',
      'blob:',
      ...(media ? [media.origin] : []),
    ].join(' ')
    const connectSrc = [
      "'self'",
      'https://api.anthropic.com',
      // @mux/mux-uploader: resumable PUTs to signed GCS URLs (direct upload)
      'https://storage.googleapis.com',
      'https://storage.cloud.google.com',
      'https://*.googleapis.com',
      'https://www.googleapis.com',
      'https://api.mux.com',
      'https://*.mux.com',
      'https://stream.mux.com',
      'https://image.mux.com',
    ].join(' ')
    // Without explicit media-src / worker-src, default-src 'self' blocks Mux HLS (stream.mux.com)
    // and blob workers used by @mux/mux-player-react in production (dev omits CSP).
    const mediaSrc = [
      "'self'",
      'blob:',
      'data:',
      ...(media ? [media.origin] : []),
      'https://stream.mux.com',
      'https://image.mux.com',
      'https://*.mux.com',
    ].join(' ')
    const workerSrc = ["'self'", 'blob:'].join(' ')
    // Rich-text Embed block: match embed URLs in `src/components/blocks/Embed/Component.tsx`
    const frameSrc = [
      "'self'",
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      'https://player.vimeo.com',
      'https://codepen.io',
      'https://www.figma.com',
    ].join(' ')
    const frameAncestors = buildFrameAncestors()
    const csp = [
      "default-src 'self'",
      // Payload admin relies on eval in some bundled paths; keep inline for Next.js.
      // Cloudflare Web Analytics loads from static.cloudflareinsights.com
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc}`,
      "font-src 'self'",
      `media-src ${mediaSrc}`,
      `worker-src ${workerSrc}`,
      `frame-src ${frameSrc}`,
      `connect-src ${connectSrc}`,
      `frame-ancestors ${frameAncestors}`,
    ].join('; ')

    const sharedHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ]

    /**
     * In `next dev`, a strict CSP `connect-src` can block Mux Upchunk PUTs to signed
     * `https://storage.googleapis.com/...` URLs (XHR reports status 0). Omit CSP locally;
     * production keeps the full policy + connect-src / media-src / worker-src for Mux/GCS.
     */
    const isDev = process.env.NODE_ENV === 'development'

    return [
      {
        source: '/(.*)',
        headers: isDev
          ? [
              ...sharedHeaders,
              // Dev: no CSP; keep classic framing guard (admin + iframe are usually same origin).
              { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            ]
          : [
              ...sharedHeaders,
              // Prod: CSP `frame-ancestors` replaces X-Frame-Options so www/apex can both frame
              // the app (Payload live preview). Browsers prefer CSP when both are present.
              { key: 'Content-Security-Policy', value: csp },
            ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
