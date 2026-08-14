import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Footer } from '@/components/layout/footer/Component'
import { Header } from '@/components/layout/header/Component'
import { jetbrainsMono, schibstedGrotesk } from '@/lib/fonts'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '@/styles/globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await draftMode()

  return (
    <html
      className={cn(schibstedGrotesk.variable, jetbrainsMono.variable)}
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
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
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@jamjamdev',
  },
}
