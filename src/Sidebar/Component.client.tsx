'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import type { Sidebar } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface SidebarClientProps {
  data: Sidebar
}

export const SidebarClient: React.FC<SidebarClientProps> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  // Filter navItems based on current pathname
  const visibleNavItems = navItems.filter((navItem) => {
    const showOnPages = navItem.showOnPages || []

    // If no pages are specified, show on all pages
    if (showOnPages.length === 0) {
      return true
    }

    // Check if current pathname matches any of the configured paths
    return showOnPages.some((pageConfig) => {
      const path = pageConfig?.path
      if (!path) return false

      // Exact match or starts with (for nested routes)
      return pathname === path || pathname.startsWith(path + '/')
    })
  })

  return (
    <aside className="hidden md:flex w-14 fixed h-[calc(90vh-1rem)] z-10 border-x border-border self-start flex-col">
      <nav
        aria-label="Sidebar navigation"
        className="flex flex-col items-center py-4 gap-4 min-h-96  flex-1"
      >
        {visibleNavItems.map(({ link }, i) => {
          return (
            <CMSLink key={i} {...link} className="text-muted-foreground hover:text-foreground">
              {/* Icon or label can be added here */}
            </CMSLink>
          )
        })}
      </nav>
      <div className="bg-[repeating-linear-gradient(45deg,#303030,#303030_3.5px,#080808_3.5px,#080808_17.5px)] w-full h-1/2 border-y border-border overflow-hidden"></div>
    </aside>
  )
}
