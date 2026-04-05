import type { Tag } from '@/payload-types'

import { cn } from '@/utilities/ui'

const tagPillByColour: Record<
  Tag['colour'],
  { bg: string; text: string; border: string }
> = {
  nextjs: { bg: 'bg-tag-nextjs-bg', text: 'text-tag-nextjs-text', border: 'border-tag-nextjs-border' },
  webdev: { bg: 'bg-tag-webdev-bg', text: 'text-tag-webdev-text', border: 'border-tag-webdev-border' },
  ai: { bg: 'bg-tag-ai-bg', text: 'text-tag-ai-text', border: 'border-tag-ai-border' },
  webflow: { bg: 'bg-tag-webflow-bg', text: 'text-tag-webflow-text', border: 'border-tag-webflow-border' },
  js: { bg: 'bg-tag-js-bg', text: 'text-tag-js-text', border: 'border-tag-js-border' },
  design: { bg: 'bg-tag-design-bg', text: 'text-tag-design-text', border: 'border-tag-design-border' },
  opinion: { bg: 'bg-tag-opinion-bg', text: 'text-tag-opinion-text', border: 'border-tag-opinion-border' },
  tools: { bg: 'bg-tag-tools-bg', text: 'text-tag-tools-text', border: 'border-tag-tools-border' },
  experiment: {
    bg: 'bg-tag-experiment-bg',
    text: 'text-tag-experiment-text',
    border: 'border-tag-experiment-border',
  },
  freelance: { bg: 'bg-tag-freelance-bg', text: 'text-tag-freelance-text', border: 'border-tag-freelance-border' },
  ux: { bg: 'bg-tag-ux-bg', text: 'text-tag-ux-text', border: 'border-tag-ux-border' },
  career: { bg: 'bg-tag-career-bg', text: 'text-tag-career-text', border: 'border-tag-career-border' },
  tutorial: { bg: 'bg-tag-tutorial-bg', text: 'text-tag-tutorial-text', border: 'border-tag-tutorial-border' },
  wordpress: { bg: 'bg-tag-wordpress-bg', text: 'text-tag-wordpress-text', border: 'border-tag-wordpress-border' },
}

export function tagPillClasses(colour: Tag['colour'], className?: string): string {
  const t = tagPillByColour[colour]
  return cn(
    'inline-flex rounded-sm border px-2 py-0.5 font-mono text-xs',
    t.bg,
    t.text,
    t.border,
    className,
  )
}
