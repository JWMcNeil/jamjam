import type { ReactNode } from 'react'

export type BreakpointPosition = {
  normalizedX?: number
  normalizedY?: number
}

export type BreakpointPositions = {
  mobile?: BreakpointPosition
  tablet?: BreakpointPosition
  desktop?: BreakpointPosition
}

export type DraggableCardData = {
  id: string
  title: string
  icon?: ReactNode
  image?: string
  positions?: BreakpointPositions // Breakpoint-specific positions
}
