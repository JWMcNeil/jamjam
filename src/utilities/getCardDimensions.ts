import type { CardSize } from '@/components/DraggableCard/types'

/**
 * Get card dimensions (width and height) based on size variant
 * These dimensions are used for positioning calculations and collision detection
 */
export const getCardDimensions = (size: CardSize = 'md'): { width: number; height: number } => {
  switch (size) {
    case 'sm':
      return { width: 125, height: 160 } // ~100-150px width, title bar + content
    case 'md':
      return { width: 200, height: 220 } // ~150-250px width, title bar + content
    case 'lg':
      return { width: 275, height: 280 } // ~200-350px width, title bar + content
    default:
      return { width: 200, height: 220 }
  }
}

