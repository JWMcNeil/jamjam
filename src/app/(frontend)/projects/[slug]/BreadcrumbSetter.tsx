'use client'

import { useLayoutEffect } from 'react'
import { useBreadcrumbOverride } from '@/providers/Breadcrumb'

interface BreadcrumbSetterProps {
  override: {
    label: string
    href: string
    segmentIndex: number
  } | null
}

export function BreadcrumbSetter({ override }: BreadcrumbSetterProps) {
  const { setOverride } = useBreadcrumbOverride()

  useLayoutEffect(() => {
    setOverride(override)
    return () => {
      setOverride(null)
    }
  }, [override, setOverride])

  return null
}

