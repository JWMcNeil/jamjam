'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { LabPrimaryTag } from '@/lib/lab/types'
import { tagPillClasses } from '@/utilities/tagPillClasses'
import { cn } from '@/utilities/ui'

type ToolLinkProps = {
  slug: string
  name: string
  primaryTag: LabPrimaryTag | null
}

export function ToolLink({ slug, name, primaryTag }: ToolLinkProps) {
  const pathname = usePathname()
  const href = `/lab/${slug}`
  const isActive = pathname === href
  const tagLabel = primaryTag?.label?.trim() ? `#${primaryTag.label}` : '#tag'
  const tagColour = primaryTag?.colour ?? 'grey'

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'group flex items-center gap-2 rounded-sm px-2 py-1.5 text-text-nav transition-colors hover:bg-card hover:text-text-heading',
          isActive && 'bg-card text-text-heading',
        )}
      >
        <span className={tagPillClasses(tagColour, 'px-1.5 py-0.5 text-[9px] uppercase leading-none')}>
          {tagLabel}
        </span>
        <span className="truncate text-xs">{name}</span>
      </Link>
    </li>
  )
}
