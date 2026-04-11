import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

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

/** R2 / public media host (e.g. https://media.jamjam.dev) — used for next/image + CSP. */
function parseMediaOrigin(): URL | null {
  const raw = process.env.NEXT_PUBLIC_MEDIA_URL || process.env.R2_PUBLIC_URL
  if (typeof raw !== 'string' || !raw.trim()) return null
  try {
    return new URL(raw.trim())
  } catch {
    return null
  }
}

const mediaOrigin = parseMediaOrigin()

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
    const imgSrc = [
      "'self'",
      'data:',
      'blob:',
      ...(mediaOrigin ? [mediaOrigin.origin] : []),
    ].join(' ')
    const csp = [
      "default-src 'self'",
      // Payload admin relies on eval in some bundled paths; keep inline for Next.js.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
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
