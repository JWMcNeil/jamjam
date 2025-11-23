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

export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'infrastructure'
  | 'tooling'
  | 'design'
  | 'ai-automation'
  | 'devops'
  | 'security'
  | 'mobile'
  | 'analytics'
  | 'e-commerce'
  | 'email-comm'
  | 'low-code-no-code'
export type CardSize = 'sm' | 'md' | 'lg'

export type DraggableCardData = {
  id: string
  title: string
  icon?: ReactNode
  image?: string
  category?: TechCategory
  size?: CardSize
  positions?: BreakpointPositions // Breakpoint-specific positions
  description?: string
  websiteUrl?: string
}
