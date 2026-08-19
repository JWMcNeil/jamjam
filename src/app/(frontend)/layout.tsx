import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Footer } from '@/components/layout/footer/Component'
import { Header } from '@/components/layout/header/Component'
import { jetbrainsMono, schibstedGrotesk } from '@/lib/fonts'
import { Providers } from '@/providers'
import { mergeOpenGraph, TWITTER_HANDLE } from '@/utilities/mergeOpenGraph'

import '@/styles/globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(schibstedGrotesk.variable, jetbrainsMono.variable)}
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {process.env.NEXT_PUBLIC_MEDIA_URL ? (
          <link rel="preconnect" href={new URL(process.env.NEXT_PUBLIC_MEDIA_URL).origin} />
        ) : null}
        <link
          href={`${getServerSideURL()}/feed.xml`}
          rel="alternate"
          title="jamjam.dev — posts"
          type="application/rss+xml"
        />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
}
