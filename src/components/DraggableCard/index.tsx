'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
import { GripVertical, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { DraggableCardData, CardSize } from './types'
import { useIsMobile } from './useIsMobile'

type DraggableCardProps = {
  card: DraggableCardData
  className?: string
  style?: React.CSSProperties
  resetTrigger?: number
  containerSize?: { width: number; height: number }
}

// Size variant configurations
const sizeConfig: Record<
  CardSize,
  { minWidth: string; maxWidth: string; imageMaxWidth: string; padding: string }
> = {
  sm: {
    minWidth: 'min-w-[80px]',
    maxWidth: 'max-w-[120px]',
    imageMaxWidth: 'max-w-[70px]',
    padding: 'p-1.5',
  },
  md: {
    minWidth: 'min-w-[120px]',
    maxWidth: 'max-w-[180px]',
    imageMaxWidth: 'max-w-[120px]',
    padding: 'p-2',
  },
  lg: {
    minWidth: 'min-w-[160px]',
    maxWidth: 'max-w-[240px]',
    imageMaxWidth: 'max-w-[180px]',
    padding: 'p-2',
  },
}

// Mobile-specific size configurations (smaller images/icons)
const mobileSizeConfig: Record<
  CardSize,
  { minWidth: string; maxWidth: string; imageMaxWidth: string; padding: string }
> = {
  sm: {
    minWidth: 'min-w-[80px]',
    maxWidth: 'max-w-[120px]',
    imageMaxWidth: 'max-w-[50px]', // Smaller on mobile
    padding: 'p-1.5',
  },
  md: {
    minWidth: 'min-w-[120px]',
    maxWidth: 'max-w-[180px]',
    imageMaxWidth: 'max-w-[80px]', // Smaller on mobile
    padding: 'p-2',
  },
  lg: {
    minWidth: 'min-w-[160px]',
    maxWidth: 'max-w-[240px]',
    imageMaxWidth: 'max-w-[120px]', // Smaller on mobile
    padding: 'p-2',
  },
}

const DraggableCardComponent: React.FC<DraggableCardProps> = ({
  card,
  className,
  style: externalStyle,
  resetTrigger,
  containerSize,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [constrainedSize, setConstrainedSize] = useState<{ width: number; height: number } | null>(
    null,
  )
  const [positionAdjustment, setPositionAdjustment] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const previousResetTrigger = useRef(resetTrigger)
  const cardRef = useRef<HTMLDivElement>(null)
  // Consolidated dimension refs
  const dimensionsRef = useRef<{
    min?: { width: number; height: number }
    expanded?: { width: number; height: number }
    constrained?: { width: number; height: number }
  }>({})
  // Use ref for position adjustment to avoid stale closures in event handlers
  const positionAdjustmentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Mobile detection
  const isMobile = useIsMobile(containerSize)

  // Memoize size calculations
  const size: CardSize = card.size || 'md'
  const effectiveSize: CardSize = isExpanded ? 'lg' : size
  const effectiveConfig = isMobile ? mobileSizeConfig[effectiveSize] : sizeConfig[effectiveSize]

  // Reset expansion when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger !== previousResetTrigger.current) {
      setIsExpanded(false)
      previousResetTrigger.current = resetTrigger
    }
  }, [resetTrigger])

  // Reset constrained size when collapsing
  useEffect(() => {
    if (!isExpanded) {
      setConstrainedSize(null)
      dimensionsRef.current.constrained = undefined
      setPositionAdjustment({ x: 0, y: 0 })
      positionAdjustmentRef.current = { x: 0, y: 0 }
      dimensionsRef.current.expanded = undefined
    }
  }, [isExpanded])

  // Reset position adjustment when dragging starts
  useEffect(() => {
    if (isDragging) {
      setPositionAdjustment({ x: 0, y: 0 })
      positionAdjustmentRef.current = { x: 0, y: 0 }
    }
  }, [isDragging])

  // Consolidated overflow handling - handles both predictive and refined checks
  useEffect(() => {
    if (!isExpanded || !containerSize || containerSize.width === 0 || containerSize.height === 0) {
      if (!isExpanded) {
        setPositionAdjustment({ x: 0, y: 0 })
        positionAdjustmentRef.current = { x: 0, y: 0 }
      }
      return
    }

    if (isDragging) {
      return
    }

    // Function to check and fix overflow
    const checkOverflow = () => {
      if (
        !cardRef.current ||
        !containerSize ||
        containerSize.width === 0 ||
        containerSize.height === 0
      ) {
        return
      }

      // Get base position from style prop
      const baseLeft = externalStyle?.left
        ? parseFloat(String(externalStyle.left).replace('px', ''))
        : 0
      const baseTop = externalStyle?.top
        ? parseFloat(String(externalStyle.top).replace('px', ''))
        : 0

      // Get card dimensions - prioritize constrained size, then actual rendered size
      const cardRect = cardRef.current.getBoundingClientRect()
      const scrollWidth = cardRef.current.scrollWidth || cardRect.width
      const scrollHeight = cardRef.current.scrollHeight || cardRect.height

      // Read from refs to avoid stale closures
      const currentConstrainedSize = dimensionsRef.current.constrained

      // When expanded, use scroll dimensions for more accurate size
      let cardWidth = currentConstrainedSize?.width || Math.max(cardRect.width, scrollWidth)
      let cardHeight = currentConstrainedSize?.height || Math.max(cardRect.height, scrollHeight)

      // If expanded but dimensions not yet measured, use estimated expanded size
      if (isExpanded && !currentConstrainedSize && dimensionsRef.current.expanded) {
        cardWidth = Math.max(cardWidth, dimensionsRef.current.expanded.width)
        cardHeight = Math.max(cardHeight, dimensionsRef.current.expanded.height)
      }

      // Check if size constraints are needed
      const padding = 20
      const maxAllowedWidth = Math.max(200, containerSize.width - padding)
      const maxAllowedHeight = Math.max(200, containerSize.height - padding)

      // Constrain size if too large (apply before position adjustment)
      if (!currentConstrainedSize) {
        let sizeChanged = false
        let constrainedWidth = cardWidth
        let constrainedHeight = cardHeight

        if (cardWidth > maxAllowedWidth) {
          constrainedWidth = maxAllowedWidth
          sizeChanged = true
        }
        if (cardHeight > maxAllowedHeight) {
          constrainedHeight = maxAllowedHeight
          sizeChanged = true
        }

        // Update constrained size if dimensions changed
        if (sizeChanged) {
          const newConstrainedSize = { width: constrainedWidth, height: constrainedHeight }
          dimensionsRef.current.constrained = newConstrainedSize
          setConstrainedSize(newConstrainedSize)
          cardWidth = constrainedWidth
          cardHeight = constrainedHeight
        }
      } else {
        // Use existing constrained size
        cardWidth = currentConstrainedSize.width
        cardHeight = currentConstrainedSize.height
      }

      // Current position includes existing adjustment (read from ref to avoid stale closure)
      const currentAdjustment = positionAdjustmentRef.current
      const currentLeft = baseLeft + currentAdjustment.x
      const currentTop = baseTop + currentAdjustment.y

      // Calculate minimal adjustment needed to keep card within bounds
      let targetLeft = currentLeft
      let targetTop = currentTop

      // Check right edge overflow
      const rightEdge = currentLeft + cardWidth
      if (rightEdge > containerSize.width) {
        targetLeft = containerSize.width - cardWidth
        if (targetLeft < 0) {
          targetLeft = 0
        }
      }
      // Check left edge overflow
      else if (currentLeft < 0) {
        targetLeft = 0
      }

      // Check bottom edge overflow
      const bottomEdge = currentTop + cardHeight
      if (bottomEdge > containerSize.height) {
        targetTop = containerSize.height - cardHeight
        if (targetTop < 0) {
          targetTop = 0
        }
      }
      // Check top edge overflow
      else if (currentTop < 0) {
        targetTop = 0
      }

      // Calculate adjustment relative to base position
      const newAdjustX = targetLeft - baseLeft
      const newAdjustY = targetTop - baseTop

      // Update adjustment (relative to base position)
      const newAdjustment = { x: newAdjustX, y: newAdjustY }
      setPositionAdjustment((prev) => {
        if (prev.x === newAdjustX && prev.y === newAdjustY) {
          return prev
        }
        positionAdjustmentRef.current = newAdjustment
        return newAdjustment
      })
    }

    // Use ResizeObserver to watch for card size changes
    if (!cardRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkOverflow)
    })

    resizeObserver.observe(cardRef.current)

    // Use MutationObserver for more reliable detection of content changes
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(checkOverflow)
    })

    mutationObserver.observe(cardRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    })

    // Initial check after a brief delay to allow rendering
    requestAnimationFrame(checkOverflow)

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [isExpanded, containerSize, externalStyle, isDragging, card.description, card.websiteUrl])

  // Calculate minimum dimensions and expanded size based on content - only when first expanded
  useEffect(() => {
    if (isExpanded && cardRef.current && !constrainedSize) {
      // Use requestAnimationFrame to ensure content is fully rendered
      requestAnimationFrame(() => {
        if (!cardRef.current || constrainedSize) return

        // Measure the card's natural dimensions when first expanded
        const cardRect = cardRef.current.getBoundingClientRect()
        const scrollWidth = cardRef.current.scrollWidth || cardRect.width
        const scrollHeight = cardRef.current.scrollHeight || cardRect.height

        // Use the larger of actual size or scroll size to account for content
        const naturalWidth = Math.max(cardRect.width, scrollWidth)
        const naturalHeight = Math.max(cardRect.height, scrollHeight)

        // Set minimum dimensions with small buffer
        dimensionsRef.current.min = {
          width: Math.max(200, Math.ceil(naturalWidth + 4)),
          height: Math.max(200, Math.ceil(naturalHeight + 4)),
        }

        // Store expanded dimensions for predictive overflow checks
        // Account for expanded size constraints: min-w-[300px] max-w-[300px]
        const expandedMinWidth = 300
        const expandedMaxWidth = 300
        const estimatedExpandedWidth = Math.max(
          expandedMinWidth,
          Math.min(expandedMaxWidth, naturalWidth),
        )
        const estimatedExpandedHeight = naturalHeight

        dimensionsRef.current.expanded = {
          width: estimatedExpandedWidth,
          height: estimatedExpandedHeight,
        }
      })
    }
  }, [isExpanded, card.description, card.websiteUrl, constrainedSize])

  // Check if card can expand
  const canExpand = Boolean(card.description || card.websiteUrl)

  // Memoize click handler
  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't expand if card doesn't have expandable content
      if (!canExpand) return

      // Don't expand if dragging
      if (isDragging) return

      // Don't expand if clicking on drag handle or its children
      const target = e.target as HTMLElement
      if (target.closest('[data-drag-handle]')) return

      // Don't expand if clicking on links or buttons
      if (target.closest('a') || target.closest('button')) return

      setIsExpanded((prev) => !prev)
    },
    [canExpand, isDragging],
  )

  // Calculate dynamic size constraints based on container and position
  const dynamicConstraints = useMemo(() => {
    if (!containerSize || containerSize.width === 0 || containerSize.height === 0) {
      return { maxWidth: undefined, maxHeight: undefined, minWidth: undefined }
    }

    const baseLeft = externalStyle?.left
      ? parseFloat(String(externalStyle.left).replace('px', ''))
      : 0
    const baseTop = externalStyle?.top ? parseFloat(String(externalStyle.top).replace('px', '')) : 0

    const adjustedLeft = baseLeft + positionAdjustment.x
    const adjustedTop = baseTop + positionAdjustment.y

    const padding = 20 // Padding from container edges
    const absoluteMinWidth = 200 // Absolute minimum for readability
    const absoluteMinHeight = 200

    // Calculate maximum width based on available space
    // Consider that the card can shift, so we calculate based on container width
    // but also ensure it fits at the current position
    const idealMaxWidth = 300
    const idealMinWidth = 300

    // Available width: container width minus padding on both sides
    const containerAvailableWidth = containerSize.width - padding * 2
    // Space available from current position to right edge
    const spaceOnRight = containerSize.width - adjustedLeft - padding
    // Space available from current position to left edge (if we shift left)
    const spaceOnLeft = adjustedLeft - padding

    // Max width is limited by: container width, ideal max, and available space
    // We want to allow the card to use as much space as possible while fitting
    const maxWidth = Math.min(
      idealMaxWidth,
      containerAvailableWidth,
      spaceOnRight + Math.min(spaceOnLeft, idealMaxWidth - spaceOnRight), // Allow some left shift
    )

    // Ensure maxWidth is at least the absolute minimum
    const finalMaxWidth = Math.max(absoluteMinWidth, maxWidth)

    // Min width should respect container but also ensure readability
    const minWidth = isExpanded
      ? Math.min(idealMinWidth, Math.max(absoluteMinWidth, finalMaxWidth))
      : undefined

    // Calculate maximum height similarly
    const idealMaxHeight = 400
    const containerAvailableHeight = containerSize.height - padding * 2
    const spaceBelow = containerSize.height - adjustedTop - padding
    const spaceAbove = adjustedTop - padding

    const maxHeight = Math.min(
      idealMaxHeight,
      containerAvailableHeight,
      spaceBelow + Math.min(spaceAbove, idealMaxHeight - spaceBelow),
    )

    const finalMaxHeight = Math.max(absoluteMinHeight, maxHeight)

    return {
      maxWidth: isExpanded && finalMaxWidth > 0 ? finalMaxWidth : undefined,
      maxHeight: isExpanded && finalMaxHeight > 0 ? finalMaxHeight : undefined,
      minWidth: isExpanded && minWidth && minWidth > 0 ? minWidth : undefined,
    }
  }, [containerSize, externalStyle, positionAdjustment, isExpanded])

  // Memoize style object
  const style = useMemo(() => {
    const baseLeft = externalStyle?.left
      ? parseFloat(String(externalStyle.left).replace('px', ''))
      : 0
    const baseTop = externalStyle?.top ? parseFloat(String(externalStyle.top).replace('px', '')) : 0

    // Only apply positionAdjustment when expanded and not dragging
    // During normal dragging, use the position directly from externalStyle
    const shouldApplyAdjustment = isExpanded && !isDragging
    const adjustedLeft = shouldApplyAdjustment ? baseLeft + positionAdjustment.x : baseLeft
    const adjustedTop = shouldApplyAdjustment ? baseTop + positionAdjustment.y : baseTop

    // Use constrained size if available
    const effectiveSize = constrainedSize

    return {
      ...externalStyle,
      left: `${adjustedLeft}px`,
      top: `${adjustedTop}px`,
      transform: CSS.Translate.toString(transform),
      ...(effectiveSize && {
        width: `${effectiveSize.width}px`,
        height: `${effectiveSize.height}px`,
      }),
      // Apply dynamic constraints via inline styles when expanded
      ...(isExpanded &&
        !effectiveSize &&
        dynamicConstraints.maxWidth !== undefined && {
          maxWidth: `${dynamicConstraints.maxWidth}px`,
          ...(dynamicConstraints.minWidth !== undefined && {
            minWidth: `${dynamicConstraints.minWidth}px`,
          }),
        }),
      ...(isExpanded &&
        !effectiveSize &&
        dynamicConstraints.maxHeight !== undefined && {
          maxHeight: `${dynamicConstraints.maxHeight}px`,
        }),
    }
  }, [
    externalStyle,
    transform,
    constrainedSize,
    positionAdjustment,
    isExpanded,
    isDragging,
    dynamicConstraints,
  ])

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        cardRef.current = node
      }}
      style={style}
      className={cn(
        'absolute select-none',
        'bg-card border border-border rounded-lg shadow-lg',
        'overflow-y-auto', // Prevent content from breaking out
        // Only transition non-transform properties to avoid repaints during drag
        // Removed left/top transitions to prevent bounce-back animation
        isDragging ? '' : 'transition-[width,height,shadow] duration-300 ease-in-out',
        !constrainedSize && 'w-auto',
        // Apply size constraints via Tailwind only when NOT expanded (expanded uses inline styles)
        // Expanded cards use dynamic constraints calculated from container size
        !constrainedSize && !isExpanded && effectiveConfig.minWidth,
        !constrainedSize && !isExpanded && effectiveConfig.maxWidth,
        isDragging && 'shadow-2xl z-50',
        isExpanded && 'z-40',
        canExpand && 'cursor-pointer',
        className,
      )}
      onClick={canExpand ? handleCardClick : undefined}
    >
      {/* Title bar with drag handle and window controls */}
      <div className="flex gap-2 items-center justify-between px-2 py-2 border-b border-border bg-card rounded-t-lg">
        <h3 className="font-mono text-sm font-medium text-foreground truncate flex-1 min-w-0">
          {card.title}
        </h3>
        {/* Drag Handle */}
        <div
          data-drag-handle
          {...listeners}
          {...attributes}
          className={cn(
            'flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors touch-none',
            isMobile
              ? 'cursor-grab active:cursor-grabbing px-2.5 py-1.5'
              : 'cursor-grab active:cursor-grabbing px-1.5 py-1',
          )}
          style={{ touchAction: 'none' }}
          aria-label="Drag handle"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      {/* Content area */}
      <div
        className={cn(
          'flex flex-col items-center relative',
          effectiveConfig.padding,
          isExpanded ? 'justify-start min-h-0' : 'justify-center',
        )}
      >
        {card.icon && (
          <div
            className={cn(
              'flex items-center justify-center',
              isMobile && 'scale-75',
              isExpanded ? 'max-w-[120px] w-full flex-shrink-0' : 'w-full',
            )}
          >
            {card.icon}
          </div>
        )}
        {card.image && (
          <div
            className={cn(
              'relative overflow-hidden rounded-lg flex-shrink-0',
              isExpanded
                ? cn(
                    'aspect-square mx-auto',
                    isMobile ? 'max-w-[120px] w-full' : 'max-w-[150px] w-full',
                  )
                : cn(
                    'aspect-square mx-auto',
                    effectiveConfig.imageMaxWidth,
                    isMobile ? 'w-[100px]' : 'w-[150px]', // Changed from max-w to w for explicit width
                  ),
            )}
          >
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}
        {!card.icon && !card.image && (
          <div className="text-muted-foreground text-sm py-8">No content</div>
        )}

        {/* Expanded content */}
        <div
          className={cn(
            'w-full min-w-0',
            'transition-all duration-300 ease-in-out',
            // Animate max-height and opacity based on expanded state
            isExpanded
              ? 'opacity-100 mt-4 pt-4 border-t border-border flex-shrink'
              : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0 overflow-hidden',
          )}
        >
          <div className="flex flex-col gap-4">
            {card.description && (
              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                {card.description}
              </p>
            )}
            {card.websiteUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={card.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="mr-2">Visit Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export const DraggableCard = memo(DraggableCardComponent, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  if (prevProps.card.id !== nextProps.card.id) return false
  if (prevProps.card.title !== nextProps.card.title) return false
  if (prevProps.card.image !== nextProps.card.image) return false
  if (prevProps.card.description !== nextProps.card.description) return false
  if (prevProps.card.websiteUrl !== nextProps.card.websiteUrl) return false
  if (prevProps.card.size !== nextProps.card.size) return false
  if (prevProps.resetTrigger !== nextProps.resetTrigger) return false
  if (prevProps.className !== nextProps.className) return false

  // Compare containerSize
  const prevContainerSize = prevProps.containerSize
  const nextContainerSize = nextProps.containerSize
  if (prevContainerSize !== nextContainerSize) {
    if (!prevContainerSize || !nextContainerSize) return false
    if (
      prevContainerSize.width !== nextContainerSize.width ||
      prevContainerSize.height !== nextContainerSize.height
    )
      return false
  }

  // Compare style objects efficiently
  const prevStyle = prevProps.style
  const nextStyle = nextProps.style
  if (prevStyle === nextStyle) return true
  if (!prevStyle || !nextStyle) return false
  if (prevStyle.left !== nextStyle.left) return false
  if (prevStyle.top !== nextStyle.top) return false
  if (prevStyle.opacity !== nextStyle.opacity) return false
  if (prevStyle.transform !== nextStyle.transform) return false

  return true
})
