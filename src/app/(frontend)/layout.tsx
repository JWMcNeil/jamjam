import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { DM_Mono, DM_Sans } from 'next/font/google'
import React from 'react'

import { Header } from '@/Header/Component'
import { Sidebar } from '@/Sidebar/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await draftMode()

  return (
    <html className={cn(dmSans.variable, dmMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

          <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-20">
              <Header />
            </div>
            <div className="w-[90vw] max-w-[120rem] mx-auto flex flex-1 min-h-0 pt-0">
              <Sidebar />
              <main className="md:ml-16 flex-1">{children}</main>
            </div>
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
    creator: '@payloadcms',
  },
}
