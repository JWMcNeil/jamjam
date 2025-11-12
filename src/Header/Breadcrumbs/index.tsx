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

  // Always show Home link
  breadcrumbItems.push(
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  )

  // If there are more than 3 segments, show ellipsis
  if (segments.length > 3) {
    breadcrumbItems.push(
      <BreadcrumbSeparator key="sep-1" />,
      <BreadcrumbItem key="ellipsis">
        <BreadcrumbEllipsis />
      </BreadcrumbItem>,
    )

    // Show last 2 segments: second-to-last as link, last as current page
    const secondToLastSegment = segments[segments.length - 2]
    const lastSegment = segments[segments.length - 1]
    const secondToLastPath = '/' + segments.slice(0, segments.length - 1).join('/')

    breadcrumbItems.push(
      <BreadcrumbSeparator key="sep-2" />,
      <BreadcrumbItem key="item-penultimate">
        <BreadcrumbLink asChild>
          <Link href={secondToLastPath}>{formatBreadcrumbLabel(secondToLastSegment)}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep-3" />,
      <BreadcrumbItem key="item-last">
        <BreadcrumbPage>{formatBreadcrumbLabel(lastSegment)}</BreadcrumbPage>
      </BreadcrumbItem>,
    )
  } else {
    // Show all segments as links except the last one
    segments.forEach((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/')
      const isLast = index === segments.length - 1

      breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${index + 1}`} />)

      if (isLast) {
        breadcrumbItems.push(
          <BreadcrumbItem key={`item-${index}`}>
            <BreadcrumbPage>{formatBreadcrumbLabel(segment)}</BreadcrumbPage>
          </BreadcrumbItem>,
        )
      } else {
        breadcrumbItems.push(
          <BreadcrumbItem key={`item-${index}`}>
            <BreadcrumbLink asChild>
              <Link href={path}>{formatBreadcrumbLabel(segment)}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>,
        )
      }
    })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  )
}
