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

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Update positions when container size or breakpoint changes
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    setPositions((prev) => {
      const updated: Record<string, { x: number; y: number }> = {}
      const existingPositions: Array<{ x: number; y: number; width: number; height: number }> = []

      cards.forEach((card) => {
        const breakpointPosition = getPositionForBreakpoint(card, currentBreakpoint)

        // If card has normalized coordinates for current breakpoint, use them
        if (
          breakpointPosition.normalizedX !== undefined ||
          breakpointPosition.normalizedY !== undefined
        ) {
          const x =
            breakpointPosition.normalizedX !== undefined
              ? normalizedToPixels(breakpointPosition.normalizedX, containerSize.width, cardWidth)
              : (prev[card.id]?.x ?? 0)
          const y =
            breakpointPosition.normalizedY !== undefined
              ? normalizedToPixels(breakpointPosition.normalizedY, containerSize.height, cardHeight)
              : (prev[card.id]?.y ?? 0)

          updated[card.id] = { x, y }
          existingPositions.push({ x, y, width: cardWidth, height: cardHeight })
        } else {
          // No explicit position - generate auto-position with collision avoidance
          const autoPosition = generateNonOverlappingPosition(
            containerSize.width,
            containerSize.height,
            cardWidth,
            cardHeight,
            existingPositions,
          )
          updated[card.id] = autoPosition
          existingPositions.push({
            x: autoPosition.x,
            y: autoPosition.y,
            width: cardWidth,
            height: cardHeight,
          })
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
