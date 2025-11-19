import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current viewport is mobile
 * @param containerSize - Optional container size object. If provided, uses container width instead of window width
 * @returns boolean indicating if the viewport is mobile (< 768px)
 */
export function useIsMobile(containerSize?: { width: number; height: number } | null): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Initial state: check if containerSize is provided, otherwise check window
    if (containerSize) {
      return containerSize.width < 768
    }
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    // If containerSize is provided, use it directly (no need for window listener)
    if (containerSize) {
      setIsMobile(containerSize.width < 768)
      return
    }

    // Otherwise, listen to window resize
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [containerSize])

  return isMobile
}

