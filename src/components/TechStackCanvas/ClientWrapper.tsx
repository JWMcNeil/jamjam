'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { DraggableCardData } from '@/components/DraggableCard/types'

// Dynamically import TechStackCanvas with SSR disabled to prevent hydration mismatch
const TechStackCanvas = dynamic(
  () => import('@/components/TechStackCanvas').then((mod) => ({ default: mod.TechStackCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] bg-background border border-border rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    ),
  },
)

type TechStackCanvasClientWrapperProps = {
  cards: DraggableCardData[]
  className?: string
  width?: string
  height?: string
  style?: React.CSSProperties
}

export const TechStackCanvasClientWrapper: React.FC<TechStackCanvasClientWrapperProps> = (
  props,
) => {
  return <TechStackCanvas {...props} />
}
