/**
 * Hook to detect current breakpoint based on window width
 * Uses 3 breakpoints: mobile (< 768px), tablet (768px - 1023px), desktop (≥ 1024px)
 */

import { useState, useEffect } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

const breakpoints: Record<Breakpoint, number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
}

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth

      if (width >= breakpoints.desktop) {
        setBreakpoint('desktop')
      } else if (width >= breakpoints.tablet) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('mobile')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

/**
 * Get the appropriate breakpoint for a given width
 */
export const getBreakpointForWidth = (width: number): Breakpoint => {
  if (width >= breakpoints.desktop) return 'desktop'
  if (width >= breakpoints.tablet) return 'tablet'
  return 'mobile'
}

/**
 * Get the breakpoint value in pixels
 */
export const getBreakpointValue = (breakpoint: Breakpoint): number => {
  return breakpoints[breakpoint]
}

