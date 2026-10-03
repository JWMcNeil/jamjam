import Link from 'next/link'
import React from 'react'

import { TileHoverPreview } from '@/components/board/TileHoverPreview'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { isMedia } from '@/lib/board/media'
import { boardVideoGifUrl, isMuxVideo } from '@/lib/board/video'
import type { Media, MuxVideo, SiteSetting, Tag } from '@/payload-types'
import { tagPillClasses } from '@/utilities/tagPillClasses'
import { cn } from '@/utilities/ui'

import { ChipSlides } from './ChipSlides'

type ChipData = { image?: unknown; video?: unknown } | null | undefined

function chipStill(data: ChipData): Media | null {
  return isMedia(data?.image) ? data.image : null
}

function chipGif(data: ChipData): string | null {
  const video: MuxVideo | null = isMuxVideo(data?.video) ? data.video : null
  return boardVideoGifUrl(video)
}

const chipFrame =
  'relative inline-block h-[0.98em] align-[-0.06em] mx-[0.06em] overflow-hidden rounded-sm border border-border bg-divider'

function ChipTag({
  href,
  colour,
  children,
}: {
  href: string
  colour: Tag['colour']
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        tagPillClasses(colour),
        'absolute left-1.5 top-[-0.12em] z-10 leading-none tracking-normal transition-colors hover:text-text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      )}
    >
      {children}
    </Link>
  )
}

function Word({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>
}

function StillChip({ data, widthClass }: { data: ChipData; widthClass: string }) {
  const still = chipStill(data)
  return (
    <span aria-hidden className={cn(chipFrame, widthClass)}>
      <TileHoverPreview gifUrl={chipGif(data)} autoPlayOnTouch className="absolute inset-0">
        {still ? (
          <ImageMedia
            resource={still}
            fill
            pictureClassName="absolute inset-0 block h-full w-full"
            imgClassName="h-full w-full object-cover"
            size="320px"
            alt=""
          />
        ) : null}
      </TileHoverPreview>
    </span>
  )
}

type Props = Pick<SiteSetting, 'heroWeb' | 'heroAi' | 'heroFilm' | 'heroPhotos'>

export function HeroHeadline({ heroWeb, heroAi, heroFilm, heroPhotos }: Props) {
  const photos = (heroPhotos ?? []).map((row) => row.image).filter(isMedia)

  return (
    <h1
      aria-label="Making web, Ai, film and photography."
      className="pt-[0.5em] text-center text-[clamp(2.5rem,8.6vw,8.25rem)] font-black leading-[1.5] tracking-[-0.035em] text-text-heading motion-safe:animate-subtle-fade"
    >
      <Word>Making</Word>{' '}
      <span className="relative inline-block">
        <ChipTag href="/projects" colour="blueSlate">
          #web
        </ChipTag>
        <StillChip data={heroWeb} widthClass="w-[2.3em]" />
      </span>
      <Word>web,</Word>{' '}
      <span className="relative inline-block">
        <ChipTag href="/lab" colour="emerald">
          #ai
        </ChipTag>
        <StillChip data={heroAi} widthClass="w-[1.7em]" />
      </span>
      <Word>Ai,</Word>{' '}
      <span className="relative inline-block">
        <ChipTag href="/gallery" colour="rose">
          #film
        </ChipTag>
        <StillChip data={heroFilm} widthClass="w-[2.3em]" />
      </span>
      <Word>film</Word> <Word>&amp;</Word>{' '}
      <span className="relative inline-block">
        <ChipTag href="/gallery" colour="amber">
          #photography
        </ChipTag>
        <span aria-hidden className={cn(chipFrame, 'w-[2.3em]')}>
          <ChipSlides stills={photos} />
        </span>
      </span>
      <Word>photography.</Word>
    </h1>
  )
}
