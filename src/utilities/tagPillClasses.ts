import type { Tag } from '@/payload-types'

import { cn } from '@/utilities/ui'

type LegacyTagColour =
  | 'nextjs'
  | 'webdev'
  | 'ai'
  | 'webflow'
  | 'js'
  | 'design'
  | 'opinion'
  | 'tools'
  | 'experiment'
  | 'freelance'
  | 'ux'
  | 'career'
  | 'tutorial'
  | 'wordpress'

type TagPillTokens = { bg: string; text: string; border: string }

const tagPillByColour: Record<Tag['colour'], TagPillTokens> = {
  indigo: { bg: 'bg-tag-indigo-bg', text: 'text-tag-indigo-text', border: 'border-tag-indigo-border' },
  blueSlate: { bg: 'bg-tag-blueSlate-bg', text: 'text-tag-blueSlate-text', border: 'border-tag-blueSlate-border' },
  emerald: { bg: 'bg-tag-emerald-bg', text: 'text-tag-emerald-text', border: 'border-tag-emerald-border' },
  teal: { bg: 'bg-tag-teal-bg', text: 'text-tag-teal-text', border: 'border-tag-teal-border' },
  amber: { bg: 'bg-tag-amber-bg', text: 'text-tag-amber-text', border: 'border-tag-amber-border' },
  rose: { bg: 'bg-tag-rose-bg', text: 'text-tag-rose-text', border: 'border-tag-rose-border' },
  brown: { bg: 'bg-tag-brown-bg', text: 'text-tag-brown-text', border: 'border-tag-brown-border' },
  olive: { bg: 'bg-tag-olive-bg', text: 'text-tag-olive-text', border: 'border-tag-olive-border' },
  purple: { bg: 'bg-tag-purple-bg', text: 'text-tag-purple-text', border: 'border-tag-purple-border' },
  cyan: { bg: 'bg-tag-cyan-bg', text: 'text-tag-cyan-text', border: 'border-tag-cyan-border' },
  grey: { bg: 'bg-tag-grey-bg', text: 'text-tag-grey-text', border: 'border-tag-grey-border' },
  green: { bg: 'bg-tag-green-bg', text: 'text-tag-green-text', border: 'border-tag-green-border' },
  violet: { bg: 'bg-tag-violet-bg', text: 'text-tag-violet-text', border: 'border-tag-violet-border' },
}

const legacyTagColourAlias: Record<LegacyTagColour, Tag['colour']> = {
  nextjs: 'indigo',
  webdev: 'blueSlate',
  ai: 'emerald',
  webflow: 'teal',
  js: 'amber',
  design: 'rose',
  opinion: 'brown',
  tools: 'olive',
  experiment: 'olive',
  freelance: 'purple',
  ux: 'cyan',
  career: 'grey',
  tutorial: 'green',
  wordpress: 'violet',
}

function normalizeTagColour(colour: Tag['colour'] | LegacyTagColour): Tag['colour'] {
  if (colour in tagPillByColour) return colour as Tag['colour']
  return legacyTagColourAlias[colour as LegacyTagColour] ?? 'grey'
}

export function tagPillClasses(colour: Tag['colour'] | LegacyTagColour, className?: string): string {
  const t = tagPillByColour[normalizeTagColour(colour)]
  return cn(
    'inline-flex rounded-sm border px-2 py-0.5 font-mono text-xs',
    t.bg,
    t.text,
    t.border,
    className,
  )
}
