'use client'

import React, { createContext, use, useState, useCallback } from 'react'

export interface BreadcrumbOverride {
  label: string
  href: string
  segmentIndex: number
}

interface ContextType {
  override: BreadcrumbOverride | null
  setOverride: (override: BreadcrumbOverride | null) => void
}

const initialContext: ContextType = {
  override: null,
  setOverride: () => null,
}

const BreadcrumbContext = createContext(initialContext)

export const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [override, setOverrideState] = useState<BreadcrumbOverride | null>(null)

  const setOverride = useCallback((newOverride: BreadcrumbOverride | null) => {
    setOverrideState(newOverride)
  }, [])

  return (
    <BreadcrumbContext value={{ override, setOverride }}>{children}</BreadcrumbContext>
  )
}

export const useBreadcrumbOverride = (): ContextType => use(BreadcrumbContext)

