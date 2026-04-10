'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useBreadcrumbOverride } from '@/providers/Breadcrumb'

const ITEMS_TO_DISPLAY_DESKTOP = 3
const ITEMS_TO_DISPLAY_MOBILE = 2

function formatBreadcrumbLabel(segment: string): string {
  return decodeURIComponent(segment)
}

export function BreadcrumbCollapsed() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { override } = useBreadcrumbOverride()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const itemsToDisplay = isDesktop ? ITEMS_TO_DISPLAY_DESKTOP : ITEMS_TO_DISPLAY_MOBILE

  // Memoize segments array calculation
  const segments = React.useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname]
  )

  // Memoize items array calculation
  const items = React.useMemo(() => {
    const itemsArray: Array<{ href?: string; label: string }> = [
      { href: '/', label: 'home' },
    ]

    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const href = '/' + segments.slice(0, index + 1).join('/')

      // Apply breadcrumb override if it exists for this segment index
      let displayLabel = formatBreadcrumbLabel(segment)
      let displayHref = href

      if (override && override.segmentIndex === index && !isLast) {
        displayLabel = override.label
        displayHref = override.href
      }

      itemsArray.push({
        href: isLast ? undefined : displayHref,
        label: displayLabel,
      })
    })

    return itemsArray
  }, [segments, override])

  // Memoize collapsed items for dropdown/drawer
  const collapsedItems = React.useMemo(
    () => items.slice(1, -(itemsToDisplay - 1)),
    [items, itemsToDisplay]
  )

  // Memoize visible items slice
  const visibleItems = React.useMemo(
    () =>
      items.length > itemsToDisplay
        ? items.slice(-(itemsToDisplay - 1))
        : items.slice(1),
    [items, itemsToDisplay]
  )

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <span
          className="font-mono text-xs text-muted-foreground md:text-sm"
          aria-current="page"
        >
          ~/home
        </span>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <div className="flex min-w-0 items-center font-mono text-xs md:text-sm">
        <Link
          href="/"
          className="shrink-0 text-muted-foreground transition-colors hover:text-muted-foreground"
        >
          ~/home
        </Link>
        {items.length > itemsToDisplay ? (
          <>
            <span aria-hidden="true" className="shrink-0 text-muted-foreground">
              /
            </span>
            {isDesktop ? (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex items-center" aria-label="Show hidden breadcrumbs">
                  <BreadcrumbEllipsis className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {collapsedItems.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link className="font-mono" href={item.href ?? '/'}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger aria-label="Show hidden breadcrumbs" className="touch-manipulation">
                  <BreadcrumbEllipsis className="h-6 w-6" />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Navigate to</DrawerTitle>
                    <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                  </DrawerHeader>
                  <div className="grid gap-1 px-4">
                    {collapsedItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href ?? '/'}
                        className="py-2 font-mono text-sm transition-colors text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <DrawerFooter className="pt-4">
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </>
        ) : null}
        {visibleItems.map((item, index) => (
          <React.Fragment key={index}>
            <span aria-hidden="true" className="shrink-0 text-muted-foreground">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="max-w-[120px] truncate text-muted-foreground transition-colors hover:text-foreground sm:max-w-[200px] md:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[120px] truncate font-mono text-muted-foreground sm:max-w-[200px] md:max-w-none">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </Breadcrumb>
  )
}
