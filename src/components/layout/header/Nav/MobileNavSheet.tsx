'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { TerminalButton } from '@/components/ui/terminal-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'

import { getNavItemHref, hrefToTildePath, isContactNavLink } from './navSheetPaths'

type NavItems = NonNullable<Header['navItems']>

type SheetPlacement = { top: number; left: number; width: number }

export function MobileNavSheet({
  open,
  items,
  anchorRef,
}: {
  open: boolean
  items: NavItems
  anchorRef: React.RefObject<HTMLElement | null>
}) {
  const [placement, setPlacement] = useState<SheetPlacement | null>(null)

  const syncPlacement = useCallback(() => {
    const el = anchorRef.current
    if (!el || typeof window === 'undefined') return
    const rect = el.getBoundingClientRect()
    setPlacement({ top: rect.bottom, left: rect.left, width: rect.width })
  }, [anchorRef])

  useLayoutEffect(() => {
    if (!open) return
    syncPlacement()
  }, [open, syncPlacement])

  useEffect(() => {
    if (!open) return
    window.addEventListener('resize', syncPlacement, { passive: true })
    window.addEventListener('scroll', syncPlacement, { passive: true, capture: true })
    return () => {
      window.removeEventListener('resize', syncPlacement)
      window.removeEventListener('scroll', syncPlacement, { capture: true })
    }
  }, [open, syncPlacement])

  /** iOS can settle layout one frame after scroll lock — resync if needed */
  useEffect(() => {
    if (!open) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(syncPlacement)
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [open, syncPlacement])

  return (
    <div
      className={cn(
        /* z-10 vs chrome bar z-20. Collapse with 0fr/1fr — `hidden` breaks grid-template-rows transitions. */
        'md:hidden fixed z-10 grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] pointer-events-none',
      )}
      style={
        placement
          ? { top: placement.top, left: placement.left, width: placement.width }
          : open
            ? { top: 0, left: 0, width: '100%', visibility: 'hidden' as const }
            : undefined
      }
      aria-hidden={!open}
    >
      <div className="min-h-0">
        <nav
          aria-label="Mobile navigation"
          className="overflow-hidden rounded-b-lg border-b border-l border-r border-border bg-background"
        >
          <p
            className="border-b border-border px-4 py-3 font-mono text-sm text-muted-foreground"
            aria-hidden
          >
            <span className="text-text-muted">jamjam:~$ </span>
            <span className="text-primary">ls nav/</span>
          </p>
          <ul className="flex flex-col divide-y divide-border" role="list">
            {items.map(({ link }, i) => {
              if (!link) return null
              const href = getNavItemHref(link)
              if (!href) return null
              const tildePath = hrefToTildePath(href)
              const isContact = isContactNavLink(link)
              const label = link.label?.trim() ?? ''
              const newTabProps = link.newTab
                ? { rel: 'noopener noreferrer' as const, target: '_blank' as const }
                : {}

              return (
                <li key={i}>
                  <Link
                    href={href}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 px-4 py-4 font-mono transition-colors',
                      'hover:bg-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                    )}
                    {...newTabProps}
                  >
                    <span className="flex min-w-0 flex-1 items-start gap-2">
                      {/* <span className="mt-0.5 shrink-0 text-xs text-muted-foreground/45" aria-hidden>
                        $
                      </span> */}
                      <span className="min-w-0">
                        <span className="block text-base font-medium leading-tight text-foreground">
                          {label}
                        </span>
                        {/* <span className="mt-0.5 block truncate text-xs text-muted-foreground/70">
                          {tildePath}
                        </span> */}
                      </span>
                    </span>
                    {isContact ? (
                      <span className="shrink-0" aria-hidden>
                        {/* <TerminalButton asChild variant="outline" size="sm">
                          <span>contact</span>
                        </TerminalButton> */}
                        <Button asChild variant="outline" size="default"><span>contact</span></Button>
                      </span>
                    ) : (
                      <span className="shrink-0 text-sm text-muted-foreground/45" aria-hidden>
                        →
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
