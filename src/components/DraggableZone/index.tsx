'use client'

import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { cn } from '@/utilities/ui'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'

import { DraggableCard } from '@/components/DraggableCard'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { useBreakpoint, type Breakpoint } from '@/hooks/useBreakpoint'
import { getCardDimensions } from '@/utilities/getCardDimensions'

// Calculate minimum height estimate based on cards (for initial render to prevent glitching)
const calculateMinimumHeight = (cards: DraggableCardData[]): number => {
  if (cards.length === 0) return 500 // Default minimum

  // Estimate height if cards were stacked vertically with spacing
  // This gives us a safe minimum that prevents layout shifts
  const cardSpacing = 20
  let totalHeight = 0
  let maxCardHeight = 0

  cards.forEach((card) => {
    const dimensions = getCardDimensions(card.size)
    totalHeight += dimensions.height + cardSpacing
    maxCardHeight = Math.max(maxCardHeight, dimensions.height)
  })

  // Remove last spacing
  totalHeight -= cardSpacing

  // Add padding at top and bottom
  const padding = 40

  // Use the larger of: stacked height or a reasonable minimum based on largest card
  return Math.max(totalHeight + padding, maxCardHeight * 2 + padding, 500)
}

type DraggableZoneProps = {
  cards: DraggableCardData[]
  className?: string
  width?: string
  height?: string
  style?: React.CSSProperties
  resetTrigger?: number
}

// Helper functions moved outside component for stability
const normalizedToPixels = (
  normalized: number | undefined,
  containerSize: number,
  cardSize: number,
): number => {
  if (normalized === undefined) return 0
  // Clamp between 0 and 1, then scale to container size minus card size
  const clamped = Math.max(0, Math.min(1, normalized))
  return clamped * Math.max(0, containerSize - cardSize)
}

const pixelsToNormalized = (pixels: number, containerSize: number, cardSize: number): number => {
  const maxPosition = Math.max(0, containerSize - cardSize)
  if (maxPosition === 0) return 0
  return Math.max(0, Math.min(1, pixels / maxPosition))
}

// Get position for a breakpoint with fallback to smaller breakpoints
const getPositionForBreakpoint = (
  card: DraggableCardData,
  breakpoint: Breakpoint,
): { normalizedX?: number; normalizedY?: number } => {
  if (!card.positions) {
    return {}
  }

  // Breakpoint priority order (largest to smallest)
  const breakpointOrder: Breakpoint[] = ['desktop', 'tablet', 'mobile']
  const currentIndex = breakpointOrder.indexOf(breakpoint)

  // Try current breakpoint and all smaller ones
  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i]
    const position = card.positions[bp]
    if (position && (position.normalizedX !== undefined || position.normalizedY !== undefined)) {
      return position
    }
  }

  return {}
}

// Check if a position collides with existing positions
const checkCollision = (
  x: number,
  y: number,
  width: number,
  height: number,
  existingPositions: Array<{ x: number; y: number; width: number; height: number }>,
  padding: number = 20,
): boolean => {
  for (const pos of existingPositions) {
    if (
      x < pos.x + pos.width + padding &&
      x + width + padding > pos.x &&
      y < pos.y + pos.height + padding &&
      y + height + padding > pos.y
    ) {
      return true // Collision detected
    }
  }
  return false
}

// Generate non-overlapping random position
const generateNonOverlappingPosition = (
  containerWidth: number,
  containerHeight: number,
  cardWidth: number,
  cardHeight: number,
  existingPositions: Array<{ x: number; y: number; width: number; height: number }>,
  maxAttempts: number = 100,
): { x: number; y: number } => {
  const padding = 20
  const maxX = Math.max(0, containerWidth - cardWidth)
  const maxY = Math.max(0, containerHeight - cardHeight)

  // Try random positions
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = Math.random() * maxX
    const y = Math.random() * maxY

    if (!checkCollision(x, y, cardWidth, cardHeight, existingPositions, padding)) {
      return { x, y }
    }
  }

  // Fallback: stack vertically
  const lastY =
    existingPositions.length > 0
      ? Math.max(...existingPositions.map((p) => p.y + p.height)) + padding
      : 0
  return { x: 0, y: Math.min(lastY, maxY) }
}

export const DraggableZone: React.FC<DraggableZoneProps> = ({
  cards,
  className,
  width = 'w-full',
  height: _height = 'min-h-[500px]',
  style,
  resetTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const currentBreakpoint = useBreakpoint()

  // Calculate minimum height upfront to prevent glitching on initial render
  const minimumHeight = useMemo(() => calculateMinimumHeight(cards), [cards])

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const measuredHeight = containerRef.current.offsetHeight
        // Use minimum height if measured height is 0 or very small (before layout)
        const height = measuredHeight > 0 ? measuredHeight : minimumHeight
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [minimumHeight])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Calculate dynamic height based on card positions
  const dynamicHeight = useMemo(() => {
    if (Object.keys(positions).length === 0) return undefined

    let maxBottom = 0
    cards.forEach((card) => {
      const position = positions[card.id]
      if (position) {
        const cardDimensions = getCardDimensions(card.size)
        const bottom = position.y + cardDimensions.height
        maxBottom = Math.max(maxBottom, bottom)
      }
    })

    // Add some padding at the bottom (e.g., 40px)
    // Ensure it's at least the minimum height to prevent shrinking
    const calculatedHeight = maxBottom > 0 ? maxBottom + 40 : undefined
    return calculatedHeight ? Math.max(calculatedHeight, minimumHeight) : undefined
  }, [positions, cards, minimumHeight])

  // Update container size when dynamic height changes
  useEffect(() => {
    if (dynamicHeight && containerRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (containerRef.current) {
          setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          })
        }
      })
    }
  }, [dynamicHeight])

  // Memoize card positions key to detect actual changes (not just array reference)
  const cardPositionsKey = useMemo(
    () =>
      cards
        .map((c) => `${c.id}:${c.size || 'md'}:${JSON.stringify(c.positions || {})}`)
        .join('|'),
    [cards],
  )

  // Update positions when container size or breakpoint changes
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    setPositions((prev) => {
      const updated: Record<string, { x: number; y: number }> = {}
      const existingPositions: Array<{ x: number; y: number; width: number; height: number }> = []

      cards.forEach((card) => {
        const cardDimensions = getCardDimensions(card.size)
        const breakpointPosition = getPositionForBreakpoint(card, currentBreakpoint)

        // If card has normalized coordinates for current breakpoint, use them
        if (
          breakpointPosition.normalizedX !== undefined ||
          breakpointPosition.normalizedY !== undefined
        ) {
          const x =
            breakpointPosition.normalizedX !== undefined
              ? normalizedToPixels(
                  breakpointPosition.normalizedX,
                  containerSize.width,
                  cardDimensions.width,
                )
              : (prev[card.id]?.x ?? 0)
          const y =
            breakpointPosition.normalizedY !== undefined
              ? normalizedToPixels(
                  breakpointPosition.normalizedY,
                  containerSize.height,
                  cardDimensions.height,
                )
              : (prev[card.id]?.y ?? 0)

          updated[card.id] = { x, y }
          existingPositions.push({
            x,
            y,
            width: cardDimensions.width,
            height: cardDimensions.height,
          })
        } else {
          // No explicit position - generate auto-position with collision avoidance
          const autoPosition = generateNonOverlappingPosition(
            containerSize.width,
            containerSize.height,
            cardDimensions.width,
            cardDimensions.height,
            existingPositions,
          )
          updated[card.id] = autoPosition
          existingPositions.push({
            x: autoPosition.x,
            y: autoPosition.y,
            width: cardDimensions.width,
            height: cardDimensions.height,
          })
        }
      })

      return updated
    })
  }, [containerSize.width, containerSize.height, cardPositionsKey, currentBreakpoint, cards])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  )

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    // Optional: Add any visual feedback on drag start
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, delta } = event

    setPositions((prev) => {
      const current = prev[active.id as string] || { x: 0, y: 0 }
      const newX = current.x + delta.x
      const newY = current.y + delta.y

      // Find the card to get its dimensions
      const card = cards.find((c) => c.id === active.id)
      const cardDimensions = getCardDimensions(card?.size)

      // Constrain within container bounds
      const maxX = Math.max(0, containerSize.width - cardDimensions.width)
      const maxY = Math.max(0, containerSize.height - cardDimensions.height)

      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      // Convert to normalized coordinates for potential saving
      // This could be passed to a callback or saved via API
      const normalizedX = pixelsToNormalized(
        constrainedX,
        containerSize.width,
        cardDimensions.width,
      )
      const normalizedY = pixelsToNormalized(
        constrainedY,
        containerSize.height,
        cardDimensions.height,
      )

      // Store normalized coordinates in a way that can be accessed later
      // You could emit an event or call a callback here to save positions
      if (typeof window !== 'undefined') {
        // Dispatch custom event with normalized positions for saving (including breakpoint)
        window.dispatchEvent(
          new CustomEvent('draggableCardMoved', {
            detail: {
              cardId: active.id as string,
              normalizedX,
              normalizedY,
              pixelX: constrainedX,
              pixelY: constrainedY,
              breakpoint: currentBreakpoint, // Include current breakpoint for saving
            },
          }),
        )
      }

      return {
        ...prev,
        [active.id as string]: {
          x: constrainedX,
          y: constrainedY,
        },
      }
    })
  }, [cards, containerSize.width, containerSize.height, currentBreakpoint])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden mt-4', width, className)}
        style={{
          ...style,
          minHeight: dynamicHeight ? `${dynamicHeight}px` : `${minimumHeight}px`,
        }}
      >
        {cards.map((card) => {
          const position = positions[card.id] || { x: 0, y: 0 }
          return (
            <DraggableCard
              key={card.id}
              card={card}
              resetTrigger={resetTrigger}
              containerSize={containerSize}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
            />
          )
        })}
      </div>
    </DndContext>
  )
}
