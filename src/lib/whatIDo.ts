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
  title: 'Sites, content and AI, from one person.',
  lede: 'I build websites, make the photos and video that go on them, and build AI tools that take work off your plate. One person, one brief, all of it fitting together.',
  indexLabel: '// ls what-i-do/',
  reelTag: '#film',
  reelCaption: 'The reel: recent film and photo work',
  closingHeadline: 'Got something to build?',
  closingLine: 'Tell me what it is and when you need it.',
  closingCtaLabel: 'say hello',
  closingCtaHref: '/contact',
  metaDescription:
    'Websites, content creation and AI tools from one person. Available for freelance and full-time.',
  rows: [
    {
      name: 'web',
      line: 'a website that does its job',
      body: 'A site that loads fast, is easy to look after and works the way your business does: listings, bookings, enquiries. I build it, launch it and stick around in case something needs changing.',
      tags: 'next.js, astro, cms',
      openByDefault: false,
    },
    {
      name: 'content',
      line: 'content that looks the part',
      body: 'Content creation, start to finish. I shoot the photos and video, edit them and hand them over ready to post, so you always have something fresh for your website, socials and ads.',
      tags: 'film, photography, production',
      openByDefault: true,
    },
    {
      name: 'ai',
      line: 'AI that does real work',
      body: 'Custom AI tools and agents built around how your business actually runs: answering common questions, sorting enquiries, drafting the first version of the boring stuff. I build them, plug them in and keep an eye on them.',
      tags: 'ai, agents, automation',
      openByDefault: false,
    },
    {
      name: 'campaigns',
      line: 'everything for a launch',
      body: 'Launching something? I can build the landing page, make the photos and video to promote it, and set up the tools to handle the replies. One person and one brief, all ready for launch day.',
      tags: 'campaigns, launch, content',
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
