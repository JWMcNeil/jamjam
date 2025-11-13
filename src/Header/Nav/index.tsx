'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'

const mobileNavItems = [
  {
    link: {
      type: 'reference' as const,
      label: 'Home',
      url: '/',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Posts',
      url: '/posts',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Projects',
      url: '/projects',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Web',
      url: '/web',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Photography',
      url: '/photography',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Videography',
      url: '/videography',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
  {
    link: {
      type: 'reference' as const,
      label: 'Contact',
      url: '/contact',
      reference: null,
      newTab: null,
      appearance: null,
      size: null,
      icon: null,
    },
  },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = React.useRef<HTMLElement | null>(null)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Find the header element and update its z-index when menu is open
  useEffect(() => {
    headerRef.current = document.querySelector('header') as HTMLElement | null
  }, [])

  // Prevent body scroll and overflow when mobile menu is open, and update header z-index
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      // Increase header z-index to be above overlay
      if (headerRef.current) {
        headerRef.current.style.zIndex = '130'
      }
      // Also update the sticky container
      const stickyContainer = headerRef.current?.closest('[class*="sticky"]') as HTMLElement | null
      if (stickyContainer) {
        stickyContainer.style.zIndex = '130'
      }
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      // Reset header z-index
      if (headerRef.current) {
        headerRef.current.style.zIndex = ''
      }
      const stickyContainer = headerRef.current?.closest('[class*="sticky"]') as HTMLElement | null
      if (stickyContainer) {
        stickyContainer.style.zIndex = ''
      }
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (headerRef.current) {
        headerRef.current.style.zIndex = ''
      }
      const stickyContainer = headerRef.current?.closest('[class*="sticky"]') as HTMLElement | null
      if (stickyContainer) {
        stickyContainer.style.zIndex = ''
      }
    }
  }, [isMobileMenuOpen])

  // Render mobile menu overlay in a portal to ensure it's full screen
  const mobileMenuOverlay =
    isMobileMenuOpen && typeof window !== 'undefined'
      ? createPortal(
          <>
            <div
              className="fixed inset-0 bg-background z-[100] md:hidden animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav
              aria-label="Mobile navigation"
              className="fixed inset-0 flex items-center justify-center h-svh z-[110] md:hidden pointer-events-none"
            >
              <div
                className="flex flex-col items-center justify-center  h-full w-full gap-8  max-w-sm px-4 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Navigation Links */}
                {mobileNavItems.map(({ link }, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full flex justify-center animate-fade-in-up h-10"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationFillMode: 'both',
                      }}
                    >
                      <CMSLink
                        {...link}
                        appearance={'outline'}
                        className="text-muted-foreground hover:text-foreground w-full h-10"
                      />
                    </div>
                  )
                })}
              </div>
            </nav>
          </>,
          document.body,
        )
      : null

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex min-w-56 gap-2 justify-around items-center px-16 "
      >
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink key={i} {...link} className="text-muted-foreground hover:text-foreground" />
          )
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 " />
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden flex items-center justify-center w-14 h-14 px-4 relative z-[130]`}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {mobileMenuOverlay}
    </>
  )
}
