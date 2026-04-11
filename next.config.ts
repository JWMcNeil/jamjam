import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** Fallback when env is missing at build time (e.g. Docker build without R2_*). Forks should set R2_PUBLIC_URL. */
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
 * Public media origin (R2 custom domain). Must read env when called — do not rely only on
 * module-load time for CSP: Dokploy often injects R2_PUBLIC_URL at runtime, not at `next build`.
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

const nextConfig: NextConfig = {
  ...(allowedDevOrigins ? { allowedDevOrigins } : {}),
  output: 'standalone',
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
    // Re-read env at header generation so runtime-injected R2_PUBLIC_URL applies (Dokploy, etc.).
    const media = parseMediaOriginWithFallback()
    const imgSrc = [
      "'self'",
      'data:',
      'blob:',
      ...(media ? [media.origin] : []),
    ].join(' ')
    const csp = [
      "default-src 'self'",
      // Payload admin relies on eval in some bundled paths; keep inline for Next.js.
      // Cloudflare Web Analytics loads from static.cloudflareinsights.com
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc}`,
      "font-src 'self'",
      "connect-src 'self' https://api.anthropic.com",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
