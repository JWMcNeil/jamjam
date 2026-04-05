'use client'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { MotoGuy } from '@/components/MotoGuyBadge/MotoGuy'
import { cn } from '@/utilities/ui'

import { BreadcrumbCollapsed } from './Breadcrumbs'
import { HeaderNav } from './Nav'
import { MobileNavSheet } from './Nav/MobileNavSheet'
import { getResolvedHeaderNavItems } from './Nav/resolveNavItems'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileNavAnchorRef = useRef<HTMLDivElement | null>(null)

  const resolvedNavItems = getResolvedHeaderNavItems(data)

  return (
    <header className="sticky top-0 z-[150] bg-background">
      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-background/80 animate-fade-in md:hidden"
          aria-hidden
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}
      <div className="relative z-50 max-w-7xl mx-auto px-4 pt-4">
        {/*
          Isolate stacking so the chrome bar stays above the fixed MobileNavSheet on WebKit
          (mixing fixed + relative z on the button was unreliable on iOS).
        */}
        <div className="relative isolate z-0 w-full">
          <div
            ref={mobileNavAnchorRef}
            className={cn(
              'relative z-20 flex border border-border h-14 transition-[border-radius]',
              isMobileMenuOpen
                ? 'rounded-t-sm rounded-bl-none rounded-br-none'
                : 'rounded-sm',
            )}
          >
            <Link
              className="flex items-center gap-2 md:gap-3 px-4 md:px-8 border-r border-border shrink-0"
              href="/"
            >
              <MotoGuy />
              <span className="hidden md:inline text-md md:text-xl font-black">jamjam.dev</span>
              <span className="sr-only md:hidden">jamjam.dev</span>
            </Link>
            <div className="flex items-center px-4 border-r border-border shrink min-w-0">
              <BreadcrumbCollapsed />
            </div>
            <div className="flex-1 min-w-0 border-r border-border bg-[repeating-linear-gradient(-45deg,#0b0b0b_0_18px,var(--color-border)_18px_19px)]" />
            <div className="shrink-0 flex items-center justify-center">
              <HeaderNav
                data={data}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuOpenChange={setIsMobileMenuOpen}
              />
            </div>
          </div>
          <MobileNavSheet
            open={isMobileMenuOpen}
            items={resolvedNavItems}
            anchorRef={mobileNavAnchorRef}
          />
        </div>
      </div>
    </header>
  )
}
