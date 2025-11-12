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
import React, { useRef, useState, useEffect } from 'react'

import { DraggableCard } from '@/components/DraggableCard'
import type { DraggableCardData } from '@/components/DraggableCard/types'
import { useBreakpoint, type Breakpoint } from '@/hooks/useBreakpoint'

type DraggableZoneProps = {
  cards: DraggableCardData[]
  className?: string
  width?: string
  height?: string
  style?: React.CSSProperties
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
    // Fallback to legacy normalized coordinates
    return {
      normalizedX: card.normalizedX,
      normalizedY: card.normalizedY,
    }
  }

  // Breakpoint priority order (largest to smallest)
  const breakpointOrder: Breakpoint[] = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs']
  const currentIndex = breakpointOrder.indexOf(breakpoint)

  // Try current breakpoint and all smaller ones
  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i]
    const position = card.positions[bp]
    if (position && (position.normalizedX !== undefined || position.normalizedY !== undefined)) {
      return position
    }
  }

  // Fallback to legacy normalized coordinates
  return {
    normalizedX: card.normalizedX,
    normalizedY: card.normalizedY,
  }
}

export const DraggableZone: React.FC<DraggableZoneProps> = ({
  cards,
  className,
  width = 'w-full',
  height = 'min-h-[500px]',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const cardWidth = 200 // Fixed card width
  const cardHeight = 200 // Approximate card height (title bar ~40px + content ~160px)
  const currentBreakpoint = useBreakpoint()

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Deterministic hash function to generate consistent positions from card ID
  const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  // Generate deterministic position from card ID
  const getDeterministicPosition = (id: string, axis: 'x' | 'y'): number => {
    const hash = hashString(id + axis)
    // Use modulo to get a value between 0 and 200
    return hash % 200
  }

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    // Initial state - will be updated when breakpoint and container size are known
    const initial: Record<string, { x: number; y: number }> = {}
    cards.forEach((card) => {
      // Use deterministic positions initially, will be updated by useEffect
      initial[card.id] = {
        x: card.initialX ?? getDeterministicPosition(card.id, 'x'),
        y: card.initialY ?? getDeterministicPosition(card.id, 'y'),
      }
    })
    return initial
  })

  // Update positions when container size or breakpoint changes (for normalized coordinates)
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    setPositions((prev) => {
      const updated: Record<string, { x: number; y: number }> = {}
      cards.forEach((card) => {
        const current = prev[card.id] || { x: 0, y: 0 }
        const breakpointPosition = getPositionForBreakpoint(card, currentBreakpoint)

        // If card has normalized coordinates for current breakpoint, recalculate pixel position
        if (breakpointPosition.normalizedX !== undefined) {
          updated[card.id] = {
            x: normalizedToPixels(breakpointPosition.normalizedX, containerSize.width, cardWidth),
            y:
              breakpointPosition.normalizedY !== undefined
                ? normalizedToPixels(
                    breakpointPosition.normalizedY,
                    containerSize.height,
                    cardHeight,
                  )
                : current.y,
          }
        } else if (breakpointPosition.normalizedY !== undefined) {
          updated[card.id] = {
            x: current.x,
            y: normalizedToPixels(breakpointPosition.normalizedY, containerSize.height, cardHeight),
          }
        } else {
          // Keep existing position if no normalized coordinates for this breakpoint
          updated[card.id] = current
        }
      })
      return updated
    })
  }, [containerSize.width, containerSize.height, cards, cardWidth, cardHeight, currentBreakpoint])

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

  const handleDragStart = (_event: DragStartEvent) => {
    // Optional: Add any visual feedback on drag start
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event

    setPositions((prev) => {
      const current = prev[active.id as string] || { x: 0, y: 0 }
      const newX = current.x + delta.x
      const newY = current.y + delta.y

      // Constrain within container bounds
      const maxX = Math.max(0, containerSize.width - cardWidth)
      const maxY = Math.max(0, containerSize.height - cardHeight)

      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      // Convert to normalized coordinates for potential saving
      // This could be passed to a callback or saved via API
      const normalizedX = pixelsToNormalized(constrainedX, containerSize.width, cardWidth)
      const normalizedY = pixelsToNormalized(constrainedY, containerSize.height, cardHeight)

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
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden mt-4  ', width, height, className)}
        style={style}
      >
        {cards.map((card) => {
          const position = positions[card.id] || { x: 0, y: 0 }
          return (
            <DraggableCard
              key={card.id}
              card={card}
              className="w-[200px]"
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
