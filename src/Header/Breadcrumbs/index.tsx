'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  // Decode URI component and replace hyphens/underscores with spaces
  return decodeURIComponent(segment)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function BreadcrumbCollapsed() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { override } = useBreadcrumbOverride()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const itemsToDisplay = isDesktop ? ITEMS_TO_DISPLAY_DESKTOP : ITEMS_TO_DISPLAY_MOBILE

  // Split pathname into segments, filtering out empty strings
  const segments = pathname.split('/').filter(Boolean)

  // If we're on the home page, just show Home
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Build items array with { href, label } structure
  const items: Array<{ href?: string; label: string }> = [
    { href: '/', label: 'Home' },
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

    items.push({
      href: isLast ? undefined : displayHref,
      label: displayLabel,
    })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={items[0].href ?? '/'}>{items[0].label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.length > itemsToDisplay ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -(itemsToDisplay - 1)).map((item, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link href={item.href ? item.href : '#'}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger 
                    aria-label="Toggle Menu"
                    className="touch-manipulation"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -(itemsToDisplay - 1)).map((item, index) => (
                        <Link
                          key={index}
                          href={item.href ? item.href : '#'}
                          className="py-2 text-sm hover:text-foreground transition-colors"
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
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {(items.length > itemsToDisplay
          ? items.slice(-(itemsToDisplay - 1))
          : items.slice(1)
        ).map((item, index, array) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink
                  asChild
                  className="max-w-[120px] truncate sm:max-w-[200px] md:max-w-none"
                >
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px] md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < array.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
