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
import React, { useRef, useState, useEffect, useMemo } from 'react'

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

// Generate non-overlapping random position (responsive for mobile)
const generateNonOverlappingPosition = (
  containerWidth: number,
  containerHeight: number,
  cardWidth: number,
  cardHeight: number,
  existingPositions: Array<{ x: number; y: number; width: number; height: number }>,
  heroTextBounds?: { left: number; right: number; top: number; bottom: number },
  maxAttempts: number = 100,
): { x: number; y: number } => {
  const isMobile = containerWidth < 768
  // Use smaller padding on mobile to allow cards to be closer together
  const padding = isMobile ? 8 : 20
  const maxX = Math.max(0, containerWidth - cardWidth)
  const maxY = Math.max(0, containerHeight - cardHeight)

  // Try random positions (fewer attempts on mobile for performance)
  const attempts = isMobile ? Math.min(maxAttempts, 50) : maxAttempts
  for (let attempt = 0; attempt < attempts; attempt++) {
    const x = Math.random() * maxX
    const y = Math.random() * maxY

    // Check collision with existing positions
    if (checkCollision(x, y, cardWidth, cardHeight, existingPositions, padding)) {
      continue
    }

    // Check collision with hero text area if provided
    if (heroTextBounds) {
      const cardRight = x + cardWidth
      const cardBottom = y + cardHeight
      if (
        x < heroTextBounds.right &&
        cardRight > heroTextBounds.left &&
        y < heroTextBounds.bottom &&
        cardBottom > heroTextBounds.top
      ) {
        continue
      }
    }

    return { x, y }
  }

  // Fallback: stack vertically, avoiding hero text area
  const lastY =
    existingPositions.length > 0
      ? Math.max(...existingPositions.map((p) => p.y + p.height)) + padding
      : 0

  let fallbackY = Math.min(lastY, maxY)

  // If fallback position overlaps with hero text, move it (with responsive spacing)
  if (
    heroTextBounds &&
    fallbackY < heroTextBounds.bottom &&
    fallbackY + cardHeight > heroTextBounds.top
  ) {
    fallbackY = Math.max(heroTextBounds.bottom + padding, fallbackY)
  }

  return { x: 0, y: Math.min(fallbackY, maxY) }
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
        // Use calculated minimum height instead of offsetHeight
        const calculatedHeight = Math.max(minimumHeight, containerRef.current.offsetHeight)
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: calculatedHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [minimumHeight])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Memoize card positions key to detect actual changes (not just array reference)
  const cardPositionsKey = useMemo(
    () =>
      cards.map((c) => `${c.id}:${c.size || 'md'}:${JSON.stringify(c.positions || {})}`).join('|'),
    [cards],
  )

  // Calculate hero text bounds for collision avoidance (responsive)
  const heroTextBounds = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return undefined

    const isMobile = containerSize.width < 768
    // Use responsive units: 80% width on mobile, max 640px on desktop
    const heroTextWidth = isMobile
      ? containerSize.width * 0.8 // 80% of container width on mobile
      : Math.min(640, containerSize.width - 32) // Max 640px on desktop with padding
    const heroTextLeft = (containerSize.width - heroTextWidth) / 2
    const heroTextRight = heroTextLeft + heroTextWidth

    // Use responsive vertical exclusion: smaller on mobile
    const verticalPadding = isMobile ? containerSize.height * 0.1 : 150 // 10% of height on mobile, 150px on desktop
    const heroTextTop = Math.max(0, containerSize.height / 2 - verticalPadding)
    const heroTextBottom = Math.min(
      containerSize.height,
      containerSize.height / 2 + verticalPadding,
    )

    return { left: heroTextLeft, right: heroTextRight, top: heroTextTop, bottom: heroTextBottom }
  }, [containerSize.width, containerSize.height])

  // Update positions when container size or breakpoint changes
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    setPositions((prev) => {
      // If reset was triggered, start fresh
      if (resetTrigger !== undefined && resetTrigger > 0 && Object.keys(prev).length > 0) {
        prev = {}
      }
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
          // No explicit position - preserve existing position if it exists
          if (prev[card.id]) {
            updated[card.id] = prev[card.id]
            existingPositions.push({
              x: prev[card.id].x,
              y: prev[card.id].y,
              width: cardDimensions.width,
              height: cardDimensions.height,
            })
          } else {
            // No existing position - generate auto-position
            const isMobile = containerSize.width < 768
            let autoPosition: { x: number; y: number }

            if (isMobile) {
              // On mobile, use simple random positioning without collision detection
              const maxX = Math.max(0, containerSize.width - cardDimensions.width)
              const maxY = Math.max(0, containerSize.height - cardDimensions.height)
              autoPosition = {
                x: Math.random() * maxX,
                y: Math.random() * maxY,
              }
            } else {
              // On desktop, use collision detection to avoid overlaps
              autoPosition = generateNonOverlappingPosition(
                containerSize.width,
                containerSize.height,
                cardDimensions.width,
                cardDimensions.height,
                existingPositions,
                heroTextBounds,
              )
            }

            updated[card.id] = autoPosition
            existingPositions.push({
              x: autoPosition.x,
              y: autoPosition.y,
              width: cardDimensions.width,
              height: cardDimensions.height,
            })
          }
        }
      })

      return updated
    })
  }, [
    containerSize.width,
    containerSize.height,
    cardPositionsKey,
    currentBreakpoint,
    resetTrigger,
    cards,
    heroTextBounds,
  ])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    }),
  )

  const handleDragStart = (_event: DragStartEvent) => {
    // Optional: Add any visual feedback on drag start
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event
    const cardId = active.id as string

    setPositions((prev) => {
      const current = prev[cardId] || { x: 0, y: 0 }
      const newX = current.x + delta.x
      const newY = current.y + delta.y

      // Find the card to get its dimensions
      const card = cards.find((c) => c.id === cardId)
      const cardDimensions = getCardDimensions(card?.size)

      const maxX = Math.max(0, containerSize.width - cardDimensions.width)
      const maxY = Math.max(0, containerSize.height - cardDimensions.height)

      let constrainedX = Math.max(0, Math.min(newX, maxX))
      let constrainedY = Math.max(0, Math.min(newY, maxY))

      // Constrain position to avoid hero text area (center of screen) - disabled on mobile
      const isMobile = containerSize.width < 768

      if (!isMobile) {
        // Use responsive units: max 640px on desktop
        const heroTextWidth = Math.min(640, containerSize.width - 32) // Max 640px on desktop with padding
        const heroTextLeft = (containerSize.width - heroTextWidth) / 2
        const heroTextRight = heroTextLeft + heroTextWidth
        // Use responsive vertical exclusion: 150px on desktop
        const verticalPadding = 150
        const heroTextTop = Math.max(0, containerSize.height / 2 - verticalPadding)
        const heroTextBottom = Math.min(
          containerSize.height,
          containerSize.height / 2 + verticalPadding,
        )

        // Check if card would overlap with hero text area
        const cardRight = constrainedX + cardDimensions.width
        const cardBottom = constrainedY + cardDimensions.height

        if (
          constrainedX < heroTextRight &&
          cardRight > heroTextLeft &&
          constrainedY < heroTextBottom &&
          cardBottom > heroTextTop
        ) {
          // Card overlaps with hero text - push it to the side
          const pushSpacing = 20
          // Prefer pushing left if there's space, otherwise right
          if (constrainedX < containerSize.width / 2) {
            // Push left
            constrainedX = Math.max(0, heroTextLeft - cardDimensions.width - pushSpacing)
          } else {
            // Push right
            constrainedX = Math.min(maxX, heroTextRight + pushSpacing)
          }
          // If still overlapping vertically, push up or down
          if (constrainedY < heroTextBottom && cardBottom > heroTextTop) {
            if (constrainedY < containerSize.height / 2) {
              constrainedY = Math.max(0, heroTextTop - cardDimensions.height - pushSpacing)
            } else {
              constrainedY = Math.min(maxY, heroTextBottom + pushSpacing)
            }
          }
        }
      }

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

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('draggableCardMoved', {
            detail: {
              cardId,
              normalizedX,
              normalizedY,
              pixelX: constrainedX,
              pixelY: constrainedY,
              breakpoint: currentBreakpoint,
            },
          }),
        )
      }

      return {
        ...prev,
        [cardId]: {
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
        className={cn('relative overflow-hidden', width, className)}
        style={{
          ...style,
          height: '100%',
          minHeight: style?.minHeight || `${minimumHeight}px`,
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
