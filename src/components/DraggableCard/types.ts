import type { ReactNode } from 'react'

export type BreakpointPosition = {
  normalizedX?: number
  normalizedY?: number
}

export type BreakpointPositions = {
  xs?: BreakpointPosition
  sm?: BreakpointPosition
  md?: BreakpointPosition
  lg?: BreakpointPosition
  xl?: BreakpointPosition
  '2xl'?: BreakpointPosition
  '3xl'?: BreakpointPosition
}

export type DraggableCardData = {
  id: string
  title: string
  icon?: ReactNode
  image?: string
  initialX?: number
  initialY?: number
  normalizedX?: number // Legacy - use positions instead
  normalizedY?: number // Legacy - use positions instead
  positions?: BreakpointPositions // Breakpoint-specific positions
}
