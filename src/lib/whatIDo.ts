import { isMedia } from '@/lib/board/media'
import { boardVideoGifUrl, isMuxVideo } from '@/lib/board/video'
import type { Media, Page } from '@/payload-types'
import { getMuxPlayback } from '@/utilities/muxPlayback'

export type ProofItem = {
  id: string
  kind: 'image' | 'video'
  /** Image, or a video's poster still. */
  still: Media | null
  /** Video only. */
  playbackId: string | null
  posterUrl: string | null
  gifUrl: string | null
}

export type CapabilityRow = {
  id: string
  name: string
  line: string
  body: string
  tags: string[]
  open: boolean
  proof: ProofItem[]
}

/** Built-in copy. Seeds a new page in the admin and is the fallback if no page exists yet. */
export const WHAT_I_DO_DEFAULTS = {
  slug: 'what-i-do',
  title: 'What I can do for you.',
  lede: 'I build the website, shoot the footage and make them work together. Mostly for motorcycles and cars.',
  indexLabel: '// ls what-i-do/',
  reelTag: '#film',
  reelCaption: 'The reel: bikes, cars, and the sites that sell them',
  closingHeadline: 'Got something to show off?',
  closingLine: 'Tell me what it is and when you need it.',
  closingCtaLabel: 'say hello',
  closingCtaHref: '/contact',
  metaDescription:
    'Web, content and AI work for motorcycles and cars. Websites, footage and campaigns from one person.',
  rows: [
    {
      name: 'web',
      line: 'sites and web apps',
      body: 'Fast, good-looking sites and web apps, from dealer-style listings and landing pages to booking and enquiry flows. I design, build, ship and keep them running.',
      tags: 'next.js, cms',
      openByDefault: false,
    },
    {
      name: 'content',
      line: 'photos and video that sell the machine',
      body: 'Photos and video of machines that make people want them. I shoot, edit and deliver in the formats a dealership actually uses.',
      tags: 'film, photography, motorcycles',
      openByDefault: true,
    },
    {
      name: 'ai',
      line: 'tools and automation that save time',
      body: 'AI-powered tools and automations for the repetitive parts of the job. Practical, not a gimmick.',
      tags: 'ai, agents, automation',
      openByDefault: false,
    },
    {
      name: 'campaigns',
      line: 'content built to carry a launch',
      body: 'Footage and stills made to carry a launch, a listing or a promotion. I know what the people running a campaign need handed over.',
      tags: 'campaigns, content',
      openByDefault: false,
    },
  ],
} as const

type ProofRow = NonNullable<NonNullable<Page['rows']>[number]['proof']>[number]

function toProofItem(row: ProofRow, index: number): ProofItem | null {
  const id = row.id ?? `proof-${index}`

  if (row.slideType === 'mux') {
    const video = isMuxVideo(row.video) ? row.video : null
    const { playbackId, posterUrl } = getMuxPlayback(video)
    if (!playbackId) return null
    return {
      id,
      kind: 'video',
      still: isMedia(row.poster) ? row.poster : null,
      playbackId,
      posterUrl: posterUrl ?? null,
      gifUrl: boardVideoGifUrl(video),
    }
  }

  if (!isMedia(row.image)) return null
  return { id, kind: 'image', still: row.image, playbackId: null, posterUrl: null, gifUrl: null }
}

function splitTags(value: string | null | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((t) => t.trim().replace(/^#/, ''))
    .filter(Boolean)
}

/** Rows from the page doc, or the built-in defaults when there is no page or no rows. */
export function getCapabilityRows(page: Page | null): CapabilityRow[] {
  const fromAdmin = page?.rows ?? []

  const rows: CapabilityRow[] =
    fromAdmin.length > 0
      ? fromAdmin.map((row, i) => ({
          id: row.id ?? `row-${i}`,
          name: row.name,
          line: row.line ?? '',
          body: row.body ?? '',
          tags: splitTags(row.tags),
          open: Boolean(row.openByDefault),
          proof: (row.proof ?? [])
            .map(toProofItem)
            .filter((p): p is ProofItem => p !== null),
        }))
      : WHAT_I_DO_DEFAULTS.rows.map((row, i) => ({
          id: `default-${i}`,
          name: row.name,
          line: row.line,
          body: row.body,
          tags: splitTags(row.tags),
          open: row.openByDefault,
          proof: [],
        }))

  if (rows.length > 0 && !rows.some((r) => r.open)) rows[0] = { ...rows[0], open: true }
  return rows
}
