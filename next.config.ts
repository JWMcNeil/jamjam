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
    ],
  },
  reactStrictMode: true,
  redirects: async () => {
    return (await redirects()) as Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Payload admin relies on eval in some bundled paths; keep inline for Next.js.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://api.anthropic.com",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
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
