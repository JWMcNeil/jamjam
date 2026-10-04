import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { StatusDot } from '@/components/StatusDot'
import { Button } from '@/components/ui/button'
import { CapabilityIndex } from '@/components/whatIDo/CapabilityIndex'
import { ReelPlayer } from '@/components/whatIDo/ReelPlayer'
import { isMedia } from '@/lib/board/media'
import { isMuxVideo } from '@/lib/board/video'
import { getCapabilityRows, WHAT_I_DO_DEFAULTS as D } from '@/lib/whatIDo'
import type { Page, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { pageMeta } from '@/utilities/generateMeta'
import { getMuxPlayback } from '@/utilities/muxPlayback'

export const revalidate = 600

const queryWhatIDoPage = cache(async (): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 1,
    limit: 1,
    // Skip access so the linked Mux videos populate (mux-video is admin-read only); the
    // published filter keeps drafts private.
    overrideAccess: true,
    pagination: false,
    where: {
      and: [
        { slug: { equals: D.slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' as const } }]),
      ],
    },
  })

  return (result.docs[0] as Page | undefined) ?? null
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryWhatIDoPage()
  const title = page?.meta?.title?.trim() || `${page?.title || 'What I do'} — jamjam.dev`
  return pageMeta({
    path: '/what-i-do',
    title,
    description: page?.meta?.description?.trim() || D.metaDescription,
    imageTitle: 'What I do',
  })
}

export default async function WhatIDoPage() {
  const { isEnabled: draft } = await draftMode()
  const [page, settings] = await Promise.all([
    queryWhatIDoPage(),
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
  ])

  const title = page?.title?.trim() || D.title
  const lede = page?.lede?.trim() || D.lede
  const indexLabel = page?.indexLabel?.trim() || D.indexLabel
  const reelTag = page?.reelTag?.trim() || D.reelTag
  const reelCaption = page?.reelCaption?.trim() || D.reelCaption
  const closingHeadline = page?.closingHeadline?.trim() || D.closingHeadline
  const closingLine = page?.closingLine?.trim() || D.closingLine
  const closingCtaLabel = page?.closingCtaLabel?.trim() || D.closingCtaLabel
  const closingCtaHref = page?.closingCtaHref?.trim() || D.closingCtaHref

  const rows = getCapabilityRows(page)
  const reelVideo = isMuxVideo(page?.reelVideo) ? page.reelVideo : null
  const reelPoster = isMedia(page?.reelPoster) ? page.reelPoster : null
  const playback = getMuxPlayback(reelVideo)
  const hasReel = Boolean(playback.playbackId || reelPoster)
  const portrait = isMedia(settings.aboutPhoto) ? settings.aboutPhoto : null
  const handle = `// ${settings.name.trim().toLowerCase()}`

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16">
      {draft ? <LivePreviewListener /> : null}
      <h1 className="mt-10 text-balance text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.02] tracking-[-0.035em] text-text-heading motion-safe:animate-subtle-fade md:mt-14">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-lg text-text-secondary md:text-xl">{lede}</p>

      {hasReel ? (
        <figure className="mt-10 overflow-hidden rounded-sm border border-border bg-card">
          <ReelPlayer
            playbackId={playback.playbackId}
            posterUrl={playback.posterUrl}
            poster={reelPoster}
            title={reelCaption}
          />
          <figcaption className="flex items-baseline justify-between gap-4 px-2.5 py-2 font-mono text-xs">
            <span className="shrink-0 text-text-prompt">{reelTag}</span>
            <span className="min-w-0 text-right text-text-muted">{reelCaption}</span>
          </figcaption>
        </figure>
      ) : process.env.NODE_ENV !== 'production' ? (
        <p className="mt-10 rounded-sm border border-dashed border-border bg-card p-4 font-mono text-sm text-text-muted">
          dev placeholder: add the reel in Admin &rarr; Pages &rarr; What I do.
        </p>
      ) : null}

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
        <main className="min-w-0">
          <p className="mb-4 font-mono text-xs text-text-muted lg:text-sm">{indexLabel}</p>
          <CapabilityIndex rows={rows} />
        </main>

        <aside className="order-last flex flex-col gap-4 border-t border-border pt-6 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:pt-0">
          <div className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 lg:block">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-divider lg:mb-4 lg:aspect-[4/5]">
              {portrait ? (
                <ImageMedia
                  resource={portrait}
                  fill
                  pictureClassName="absolute inset-0 block h-full w-full"
                  imgClassName="h-full w-full object-cover object-top grayscale"
                  size="(min-width: 1024px) 260px, 96px"
                  alt={portrait.alt || `Portrait of ${settings.name}`}
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs text-text-dim">{handle}</p>
              <h2 className="mt-1 text-xl font-bold leading-tight text-text-heading">
                {settings.aboutHeadline}
              </h2>
              <p className="mt-3 flex flex-wrap items-center gap-x-1 font-mono text-xs text-accent">
                <span>{settings.statusText}</span>
                <StatusDot />
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="mt-1 block break-all font-mono text-xs text-text-dim underline-offset-4 hover:underline"
              >
                {settings.email}
              </a>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">{settings.aboutBio}</p>
        </aside>
      </div>

      <section className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border py-10">
        <div>
          <h2 className="text-[clamp(1.8rem,3.4vw,3rem)] font-black leading-[1.05] tracking-[-0.03em] text-text-heading">
            {closingHeadline}
          </h2>
          <p className="mt-2 text-text-secondary">{closingLine}</p>
        </div>
        <Button href={closingCtaHref} variant="default" size="lg">
          <span aria-hidden className="text-text-prompt">
            $
          </span>{' '}
          {closingCtaLabel}
        </Button>
      </section>
    </div>
  )
}
