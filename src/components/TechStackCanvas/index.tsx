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
import type { DraggableCardData, TechCategory } from '@/components/DraggableCard/types'
import { useBreakpoint, type Breakpoint } from '@/hooks/useBreakpoint'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

type TechStackCanvasProps = {
  cards: DraggableCardData[]
  className?: string
  width?: string
  height?: string
  style?: React.CSSProperties
}

type CategoryFilter = TechCategory | 'all'

const CATEGORIES: Array<{ value: TechCategory; label: string }> = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend/CMS' },
  { value: 'database', label: 'Database' },
  { value: 'infrastructure', label: 'Infra/Hosting' },
  { value: 'tooling', label: 'Tooling' },
]

// Zone colors for each category
const ZONE_COLORS: Record<TechCategory, string> = {
  frontend: 'bg-blue-500/10 border-blue-500/20',
  backend: 'bg-purple-500/10 border-purple-500/20',
  database: 'bg-green-500/10 border-green-500/20',
  infrastructure: 'bg-orange-500/10 border-orange-500/20',
  tooling: 'bg-pink-500/10 border-pink-500/20',
}

// Tab colors for each category (matching zone colors)
const TAB_COLORS: Record<TechCategory, { bg: string; text: string; hover: string }> = {
  frontend: {
    bg: 'bg-blue-500',
    text: 'text-white',
    hover: 'hover:bg-blue-600',
  },
  backend: {
    bg: 'bg-purple-500',
    text: 'text-white',
    hover: 'hover:bg-purple-600',
  },
  database: {
    bg: 'bg-green-500',
    text: 'text-white',
    hover: 'hover:bg-green-600',
  },
  infrastructure: {
    bg: 'bg-orange-500',
    text: 'text-white',
    hover: 'hover:bg-orange-600',
  },
  tooling: {
    bg: 'bg-pink-500',
    text: 'text-white',
    hover: 'hover:bg-pink-600',
  },
}

// Helper functions moved outside component for stability
const normalizedToPixels = (
  normalized: number | undefined,
  containerSize: number,
  cardSize: number,
): number => {
  if (normalized === undefined) return 0
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

  const breakpointOrder: Breakpoint[] = ['desktop', 'tablet', 'mobile']
  const currentIndex = breakpointOrder.indexOf(breakpoint)

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
      return true
    }
  }
  return false
}

// Generate non-overlapping random position within a zone
const generateNonOverlappingPosition = (
  containerWidth: number,
  containerHeight: number,
  cardWidth: number,
  cardHeight: number,
  existingPositions: Array<{ x: number; y: number; width: number; height: number }>,
  zone?: { top: number; height: number },
  maxAttempts: number = 100,
): { x: number; y: number } => {
  const padding = 20
  const maxX = Math.max(0, containerWidth - cardWidth)

  // If zone is provided, constrain Y to zone bounds
  let minY = 0
  let maxY = Math.max(0, containerHeight - cardHeight)

  if (zone) {
    minY = Math.max(0, zone.top)
    maxY = Math.min(maxY, zone.top + zone.height - cardHeight)
    // Ensure we have valid range
    if (maxY < minY) {
      maxY = minY
    }
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = Math.random() * maxX
    const y = minY + Math.random() * Math.max(0, maxY - minY)

    if (!checkCollision(x, y, cardWidth, cardHeight, existingPositions, padding)) {
      return { x, y }
    }
  }

  // Fallback: stack vertically within zone
  const lastY =
    existingPositions.length > 0
      ? Math.max(...existingPositions.map((p) => p.y + p.height)) + padding
      : minY
  return { x: 0, y: Math.min(lastY, maxY) }
}

// Calculate required height based on cards
const calculateRequiredHeight = (
  cards: DraggableCardData[],
  cardHeight: number,
  padding: number = 20,
): number => {
  const categoryCounts: Record<TechCategory, number> = {
    frontend: 0,
    backend: 0,
    database: 0,
    infrastructure: 0,
    tooling: 0,
  }

  cards.forEach((card) => {
    if (card.category) {
      categoryCounts[card.category]++
    }
  })

  // Calculate height needed for each category
  // Each card needs cardHeight + padding, plus extra space for distribution
  const cardsPerRow = 4 // Approximate cards per row
  let totalHeight = 0

  CATEGORIES.forEach(({ value }) => {
    const count = categoryCounts[value]
    if (count > 0) {
      const rows = Math.ceil(count / cardsPerRow)
      const categoryHeight = rows * (cardHeight + padding) + padding * 2
      totalHeight += categoryHeight
    }
  })

  // Minimum height and add extra padding
  return Math.max(600, totalHeight + padding * 2)
}

// Calculate proportional zone heights based on card distribution
const calculateZoneHeights = (
  cards: DraggableCardData[],
  containerHeight: number,
): Array<{ category: TechCategory; height: number; top: number }> => {
  const categoryCounts: Record<TechCategory, number> = {
    frontend: 0,
    backend: 0,
    database: 0,
    infrastructure: 0,
    tooling: 0,
  }

  cards.forEach((card) => {
    if (card.category) {
      categoryCounts[card.category]++
    }
  })

  const totalCards = cards.length || 1
  const minHeight = containerHeight * 0.15
  const maxHeight = containerHeight * 0.3

  const zones: Array<{ category: TechCategory; height: number; top: number }> = []
  let currentTop = 0

  CATEGORIES.forEach(({ value }) => {
    const count = categoryCounts[value]
    const proportion = count / totalCards
    let height = containerHeight * proportion

    // Clamp between min and max
    height = Math.max(minHeight, Math.min(maxHeight, height))

    zones.push({
      category: value,
      height,
      top: currentTop,
    })

    currentTop += height
  })

  // Adjust if total exceeds container height
  const totalHeight = zones.reduce((sum, zone) => sum + zone.height, 0)
  if (totalHeight > containerHeight) {
    const scale = containerHeight / totalHeight
    let adjustedTop = 0
    zones.forEach((zone) => {
      zone.height *= scale
      zone.top = adjustedTop
      adjustedTop += zone.height
    })
  }

  return zones
}

export const TechStackCanvas: React.FC<TechStackCanvasProps> = ({
  cards,
  className,
  width = 'w-full',
  height: _height = 'min-h-[600px]',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [showZones, setShowZones] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)
  const cardWidth = 200
  const cardHeight = 200
  const currentBreakpoint = useBreakpoint()

  // Calculate required height based on cards
  const requiredHeight = useMemo(() => {
    return calculateRequiredHeight(cards, cardHeight)
  }, [cards, cardHeight])

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        // Use calculated required height instead of offsetHeight
        const calculatedHeight = Math.max(requiredHeight, containerRef.current.offsetHeight)
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: calculatedHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [requiredHeight])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  // Reset positions function
  const handleReset = () => {
    setPositions({})
    setResetTrigger((prev) => prev + 1)
  }

  // Calculate zone heights
  const zones = useMemo(() => {
    if (containerSize.height === 0) return []
    return calculateZoneHeights(cards, containerSize.height)
  }, [cards, containerSize.height])

  // Update positions when container size or breakpoint changes
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0 || zones.length === 0) return

    setPositions((prev) => {
      // If reset was triggered, start fresh
      if (resetTrigger > 0 && Object.keys(prev).length > 0) {
        prev = {}
      }
      const updated: Record<string, { x: number; y: number }> = {}
      // Group existing positions by category for zone-specific collision detection
      const existingPositionsByCategory: Record<
        TechCategory | 'uncategorized',
        Array<{ x: number; y: number; width: number; height: number }>
      > = {
        frontend: [],
        backend: [],
        database: [],
        infrastructure: [],
        tooling: [],
        uncategorized: [],
      }

      cards.forEach((card) => {
        const breakpointPosition = getPositionForBreakpoint(card, currentBreakpoint)
        const cardCategory = card.category || 'uncategorized'

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
          if (cardCategory !== 'uncategorized') {
            existingPositionsByCategory[cardCategory].push({
              x,
              y,
              width: cardWidth,
              height: cardHeight,
            })
          }
        } else {
          // Find the zone for this card's category
          const zone = card.category ? zones.find((z) => z.category === card.category) : undefined

          const existingPositions =
            cardCategory !== 'uncategorized'
              ? existingPositionsByCategory[cardCategory]
              : Object.values(existingPositionsByCategory).flat()

          const autoPosition = generateNonOverlappingPosition(
            containerSize.width,
            containerSize.height,
            cardWidth,
            cardHeight,
            existingPositions,
            zone,
          )
          updated[card.id] = autoPosition
          if (cardCategory !== 'uncategorized') {
            existingPositionsByCategory[cardCategory].push({
              x: autoPosition.x,
              y: autoPosition.y,
              width: cardWidth,
              height: cardHeight,
            })
          }
        }
      })

      return updated
    })
  }, [
    containerSize.width,
    containerSize.height,
    cards,
    cardWidth,
    cardHeight,
    currentBreakpoint,
    zones,
    resetTrigger,
  ])

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

      const maxX = Math.max(0, containerSize.width - cardWidth)
      const maxY = Math.max(0, containerSize.height - cardHeight)

      const constrainedX = Math.max(0, Math.min(newX, maxX))
      const constrainedY = Math.max(0, Math.min(newY, maxY))

      const normalizedX = pixelsToNormalized(constrainedX, containerSize.width, cardWidth)
      const normalizedY = pixelsToNormalized(constrainedY, containerSize.height, cardHeight)

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('draggableCardMoved', {
            detail: {
              cardId: active.id as string,
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
        [active.id as string]: {
          x: constrainedX,
          y: constrainedY,
        },
      }
    })
  }

  // Get opacity for a card based on selected category
  const getCardOpacity = (card: DraggableCardData): number => {
    if (selectedCategory === 'all') return 1
    return card.category === selectedCategory ? 1 : 0.25
  }

  // Check if a zone should be highlighted
  const isZoneHighlighted = (category: TechCategory): boolean => {
    if (selectedCategory === 'all') return false
    return selectedCategory === category
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            All
          </button>
          {CATEGORIES.map(({ value, label }) => {
            const tabColors = TAB_COLORS[value]
            return (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out',
                  selectedCategory === value
                    ? `${tabColors.bg} ${tabColors.text}`
                    : 'bg-muted text-muted-foreground hover:bg-muted/80',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Controls Right Side */}
        <div className="flex items-center gap-4">
          {/* Show Zones Switch */}
          <div className="flex items-center gap-2">
            <Switch id="show-zones" checked={showZones} onCheckedChange={setShowZones} />
            <Label htmlFor="show-zones" className="text-sm cursor-pointer">
              Show Zones
            </Label>
          </div>

          {/* Reset Button */}
          <Button onClick={handleReset} variant="outline" size="sm" aria-label="Reset positions">
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset</span>
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <div
          ref={containerRef}
          className={cn('relative overflow-hidden', width)}
          style={{
            ...style,
            minHeight: `${requiredHeight}px`,
            height: 'auto',
          }}
        >
          {/* Dotted Grid Background */}
          <div
            className="absolute inset-0 opacity-30 border border-border rounded-md"
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Category Zones */}
          {showZones &&
            zones.map((zone) => (
              <div
                key={zone.category}
                className={cn(
                  'absolute left-0 right-0 transition-all duration-300 ease-in-out border-t border-b',
                  isZoneHighlighted(zone.category)
                    ? 'bg-primary/15 border-primary/30'
                    : ZONE_COLORS[zone.category],
                )}
                style={{
                  top: `${zone.top}px`,
                  height: `${zone.height}px`,
                }}
              />
            ))}

          {/* Draggable Cards */}
          {cards.map((card) => {
            const position = positions[card.id] || { x: 0, y: 0 }
            const opacity = getCardOpacity(card)

            return (
              <DraggableCard
                key={card.id}
                card={card}
                className="w-[200px] transition-opacity duration-300 ease-in-out m-4"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  opacity,
                }}
              />
            )
          })}
        </div>
      </DndContext>
    </div>
  )
}
