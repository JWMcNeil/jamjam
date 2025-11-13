'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function formatBreadcrumbLabel(segment: string): string {
  // Decode URI component and replace hyphens/underscores with spaces
  return decodeURIComponent(segment)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function BreadcrumbCollapsed() {
  const pathname = usePathname()

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

  // Build breadcrumb items
  const breadcrumbItems = []
  const lastSegment = segments[segments.length - 1]
  const hasMultipleSegments = segments.length > 1

  // Show Home link - always visible
  breadcrumbItems.push(
    <BreadcrumbItem key="home" className="min-w-0">
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  )

  // On larger screens (md+): show full path
  // On smaller screens: collapse with ellipsis
  if (hasMultipleSegments) {
    // Show all segments on larger screens
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const href = '/' + segments.slice(0, index + 1).join('/')

      breadcrumbItems.push(
        <BreadcrumbSeparator key={`sep-${index}`} className="hidden md:flex" />,
        <BreadcrumbItem key={`item-${index}`} className="min-w-0 hidden md:inline-flex">
          {isLast ? (
            <BreadcrumbPage>{formatBreadcrumbLabel(segment)}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{formatBreadcrumbLabel(segment)}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>,
      )
    })

    // On smaller screens: show ellipsis instead of full path
    breadcrumbItems.push(
      <BreadcrumbSeparator key="sep-collapsed" className="md:hidden" />,
      <BreadcrumbItem key="ellipsis" className="flex-shrink-0 md:hidden">
        <BreadcrumbEllipsis />
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep-collapsed-2" className="md:hidden" />,
      // Show last segment on smaller screens (it's already shown in loop above for larger screens)
      <BreadcrumbItem key="item-last" className="min-w-0 md:hidden">
        <BreadcrumbPage>{formatBreadcrumbLabel(lastSegment)}</BreadcrumbPage>
      </BreadcrumbItem>,
    )
  } else {
    // Single segment: show separator and segment (always visible)
    breadcrumbItems.push(
      <BreadcrumbSeparator key="sep-1" />,
      <BreadcrumbItem key="item-last" className="min-w-0">
        <BreadcrumbPage>{formatBreadcrumbLabel(lastSegment)}</BreadcrumbPage>
      </BreadcrumbItem>,
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  )
}
