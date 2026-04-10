'use client'

import React, { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'

import { getResolvedHeaderNavItems } from './resolveNavItems'

const SHOW_HEADER_SEARCH = false

interface HeaderNavProps {
  data: HeaderType
  isMobileMenuOpen: boolean
  onMobileMenuOpenChange: (isOpen: boolean) => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  isMobileMenuOpen,
  onMobileMenuOpenChange,
}) => {
  const resolvedNavItems = getResolvedHeaderNavItems(data)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    onMobileMenuOpenChange(false)
  }, [onMobileMenuOpenChange, pathname])

  /**
   * Lock scroll: `useLayoutEffect` runs before paint so layout matches before the sheet measures.
   * Apply to `documentElement` (not `body`) — works more reliably on mobile with sticky headers.
   */
  useLayoutEffect(() => {
    if (!isMobileMenuOpen) return

    const scrollY = window.scrollY || document.documentElement.scrollTop
    const html = document.documentElement

    const prev = {
      overflow: html.style.overflow,
      position: html.style.position,
      top: html.style.top,
      left: html.style.left,
      right: html.style.right,
      width: html.style.width,
    }

    html.style.overflow = 'hidden'
    html.style.position = 'fixed'
    html.style.top = `-${scrollY}px`
    html.style.left = '0'
    html.style.right = '0'
    html.style.width = '100%'

    return () => {
      html.style.overflow = prev.overflow
      html.style.position = prev.position
      html.style.top = prev.top
      html.style.left = prev.left
      html.style.right = prev.right
      html.style.width = prev.width
      window.scrollTo(0, scrollY)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex min-w-56 gap-4 justify-around items-center px-8 "
      >
        {resolvedNavItems.map(({ link }, i) => {
          if (!link) return null

          return (
            <CMSLink
              key={i}
              {...link}
              className="bg-background/80 font-mono text-sm text-foreground hover:text-white duration-300 transition-colors"
            />
          )
        })}
        {SHOW_HEADER_SEARCH && (
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 " />
          </Link>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => onMobileMenuOpenChange(!isMobileMenuOpen)}
        className="relative flex h-14 w-14 shrink-0 touch-manipulation items-center justify-center px-4 text-muted-foreground hover:text-foreground md:hidden"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <Menu className="h-5 w-5" aria-hidden />
        )}
      </button>
    </>
  )
}
