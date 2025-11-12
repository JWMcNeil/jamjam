'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { DraggableCardData } from '@/components/DraggableCard/types'

// Dynamically import DraggableZone with SSR disabled to prevent hydration mismatch
// @dnd-kit generates IDs that differ between server and client
const DraggableZone = dynamic(
  () => import('@/components/DraggableZone').then((mod) => ({ default: mod.DraggableZone })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] bg-background border border-border rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    ),
  },
)

type DraggableZoneClientWrapperProps = {
  cards: DraggableCardData[]
  className?: string
  width?: string
  height?: string
  style?: React.CSSProperties
}

export const DraggableZoneClientWrapper: React.FC<DraggableZoneClientWrapperProps> = (props) => {
  return <DraggableZone {...props} />
}
