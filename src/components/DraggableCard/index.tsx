'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
import { GripVertical, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { DraggableCardData, CardSize } from './types'

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
    minWidth: 'min-w-[100px]',
    maxWidth: 'max-w-[150px]',
    imageMaxWidth: 'max-w-[90px]',
    padding: 'p-2',
  },
  md: {
    minWidth: 'min-w-[150px]',
    maxWidth: 'max-w-[250px]',
    imageMaxWidth: 'max-w-[150px]',
    padding: 'p-2',
  },
  lg: {
    minWidth: 'min-w-[200px]',
    maxWidth: 'max-w-[350px]',
    imageMaxWidth: 'max-w-[250px]',
    padding: 'p-4',
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
  const [isResizing, setIsResizing] = useState(false)
  const [customSize, setCustomSize] = useState<{ width: number; height: number } | null>(null)
  const [constrainedSize, setConstrainedSize] = useState<{ width: number; height: number } | null>(
    null,
  )
  const [positionAdjustment, setPositionAdjustment] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const previousResetTrigger = useRef(resetTrigger)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(
    null,
  )
  const minDimensionsRef = useRef<{ width: number; height: number } | null>(null)
  const expandedDimensionsRef = useRef<{ width: number; height: number } | null>(null)
  const constrainedSizeRef = useRef<{ width: number; height: number } | null>(null)
  const positionAdjustmentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Memoize size calculations
  const size: CardSize = useMemo(() => card.size || 'md', [card.size])
  const effectiveSize: CardSize = useMemo(() => (isExpanded ? 'lg' : size), [isExpanded, size])
  const effectiveConfig = useMemo(() => sizeConfig[effectiveSize], [effectiveSize])

  // Reset expansion when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger !== previousResetTrigger.current) {
      setIsExpanded(false)
      setCustomSize(null)
      previousResetTrigger.current = resetTrigger
    }
  }, [resetTrigger])

  // Reset custom size when collapsing
  useEffect(() => {
    if (!isExpanded) {
      setCustomSize(null)
      setConstrainedSize(null)
      constrainedSizeRef.current = null
      setIsResizing(false)
      setPositionAdjustment({ x: 0, y: 0 })
      positionAdjustmentRef.current = { x: 0, y: 0 }
      expandedDimensionsRef.current = null
    }
  }, [isExpanded])

  // Reset position adjustment when dragging starts
  useEffect(() => {
    if (isDragging) {
      setPositionAdjustment({ x: 0, y: 0 })
      positionAdjustmentRef.current = { x: 0, y: 0 }
    }
  }, [isDragging])

  // Predictive overflow check when expansion starts
  useEffect(() => {
    if (
      !isExpanded ||
      !containerSize ||
      containerSize.width === 0 ||
      containerSize.height === 0 ||
      isDragging ||
      isResizing
    ) {
      return
    }

    // Get base position from style prop
    const baseLeft = externalStyle?.left
      ? parseFloat(String(externalStyle.left).replace('px', ''))
      : 0
    const baseTop = externalStyle?.top ? parseFloat(String(externalStyle.top).replace('px', '')) : 0

    // Estimate expanded dimensions if available, otherwise use constraints
    const expandedMaxWidth = 300
    const estimatedWidth = expandedDimensionsRef.current?.width || expandedMaxWidth
    const estimatedHeight = expandedDimensionsRef.current?.height || 400

    // Check if card would be too large for container - constrain size first
    const padding = 20
    const maxAllowedWidth = Math.max(200, containerSize.width - padding)
    const maxAllowedHeight = Math.max(200, containerSize.height - padding)

    let finalWidth = estimatedWidth
    let finalHeight = estimatedHeight
    let needsConstraint = false

    // Constrain size if too large for container (check both dimensions)
    if (estimatedWidth > maxAllowedWidth) {
      finalWidth = maxAllowedWidth
      needsConstraint = true
    }
    if (estimatedHeight > maxAllowedHeight) {
      finalHeight = maxAllowedHeight
      needsConstraint = true
    }

    // Update constrained size if needed
    if (needsConstraint) {
      const newConstrainedSize = { width: finalWidth, height: finalHeight }
      setConstrainedSize((prev) => {
        if (prev?.width === finalWidth && prev?.height === finalHeight) return prev
        constrainedSizeRef.current = newConstrainedSize
        return newConstrainedSize
      })
    } else {
      // Clear constrained size if not needed
      setConstrainedSize(null)
      constrainedSizeRef.current = null
    }

    // Calculate minimal position adjustment needed
    let adjustX = 0
    let adjustY = 0

    // Check right edge overflow
    const rightEdge = baseLeft + finalWidth
    if (rightEdge > containerSize.width) {
      adjustX = containerSize.width - rightEdge
      // Ensure card doesn't go negative
      if (baseLeft + adjustX < 0) {
        adjustX = -baseLeft
      }
    }
    // Check left edge overflow
    else if (baseLeft < 0) {
      adjustX = -baseLeft
    }

    // Check bottom edge overflow
    const bottomEdge = baseTop + finalHeight
    if (bottomEdge > containerSize.height) {
      adjustY = containerSize.height - bottomEdge
      // Ensure card doesn't go negative
      if (baseTop + adjustY < 0) {
        adjustY = -baseTop
      }
    }
    // Check top edge overflow
    else if (baseTop < 0) {
      adjustY = -baseTop
    }

    // Apply minimal adjustment immediately
    const newAdjustment = { x: adjustX, y: adjustY }
    setPositionAdjustment((prev) => {
      if (prev.x === adjustX && prev.y === adjustY) {
        return prev
      }
      positionAdjustmentRef.current = newAdjustment
      return newAdjustment
    })
  }, [
    isExpanded,
    containerSize,
    externalStyle,
    isDragging,
    isResizing,
    card.description,
    card.websiteUrl,
  ])

  // Detect overflow when expanded and adjust position (refined check after expansion)
  useEffect(() => {
    if (!isExpanded || !containerSize || containerSize.width === 0 || containerSize.height === 0) {
      if (!isExpanded) {
        setPositionAdjustment({ x: 0, y: 0 })
      }
      return
    }

    if (isDragging || isResizing) {
      return
    }

    // Function to check and fix overflow with improved dimension calculation
    const checkOverflow = () => {
      if (
        !cardRef.current ||
        !containerSize ||
        containerSize.width === 0 ||
        containerSize.height === 0
      ) {
        return
      }

      // Get card dimensions - prioritize constrained size (from ref to avoid stale closure), then custom size, then actual rendered size
      const cardRect = cardRef.current.getBoundingClientRect()
      const scrollWidth = cardRef.current.scrollWidth || cardRect.width
      const scrollHeight = cardRef.current.scrollHeight || cardRect.height

      // Read constrained size from ref to get current value (avoids stale closure)
      const currentConstrainedSize = constrainedSizeRef.current

      // When expanded, use scroll dimensions for more accurate size
      let cardWidth =
        currentConstrainedSize?.width || customSize?.width || Math.max(cardRect.width, scrollWidth)
      let cardHeight =
        currentConstrainedSize?.height ||
        customSize?.height ||
        Math.max(cardRect.height, scrollHeight)

      // If expanded but dimensions not yet measured, use estimated expanded size
      if (isExpanded && !currentConstrainedSize && !customSize && expandedDimensionsRef.current) {
        cardWidth = Math.max(cardWidth, expandedDimensionsRef.current.width)
        cardHeight = Math.max(cardHeight, expandedDimensionsRef.current.height)
      }

      // Get base position from style prop (accounting for current adjustment)
      const baseLeft = externalStyle?.left
        ? parseFloat(String(externalStyle.left).replace('px', ''))
        : 0
      const baseTop = externalStyle?.top
        ? parseFloat(String(externalStyle.top).replace('px', ''))
        : 0

      // Current position includes existing adjustment (read from ref to avoid stale closure)
      const currentAdjustment = positionAdjustmentRef.current
      const currentLeft = baseLeft + currentAdjustment.x
      const currentTop = baseTop + currentAdjustment.y

      // Check if size constraints are needed
      const padding = 20
      const maxAllowedWidth = Math.max(200, containerSize.width - padding)
      const maxAllowedHeight = Math.max(200, containerSize.height - padding)

      // Constrain size if too large (apply before position adjustment)
      // Only constrain if we don't already have a constrained size (to avoid loops)
      // If we have constrained size, use it and don't recalculate
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
          constrainedSizeRef.current = newConstrainedSize
          setConstrainedSize(newConstrainedSize)
          // Use constrained dimensions for position calculation
          cardWidth = constrainedWidth
          cardHeight = constrainedHeight
        }
      } else {
        // Use existing constrained size
        cardWidth = currentConstrainedSize.width
        cardHeight = currentConstrainedSize.height
      }

      // Calculate minimal adjustment needed to keep card within bounds
      // Calculate what the final position should be
      let targetLeft = currentLeft
      let targetTop = currentTop

      // Check right edge overflow - prioritize minimal adjustment
      const rightEdge = currentLeft + cardWidth
      if (rightEdge > containerSize.width) {
        // Shift left by minimum amount needed
        targetLeft = containerSize.width - cardWidth
        // Ensure card doesn't go negative
        if (targetLeft < 0) {
          targetLeft = 0
        }
      }
      // Check left edge overflow
      else if (currentLeft < 0) {
        targetLeft = 0
      }

      // Check bottom edge overflow - prioritize minimal adjustment
      const bottomEdge = currentTop + cardHeight
      if (bottomEdge > containerSize.height) {
        // Shift up by minimum amount needed
        targetTop = containerSize.height - cardHeight
        // Ensure card doesn't go negative
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
        // Only update if changed to avoid unnecessary re-renders
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
      // Debounce the check slightly to avoid excessive updates
      requestAnimationFrame(checkOverflow)
    })

    resizeObserver.observe(cardRef.current)

    // Use MutationObserver for more reliable detection of content changes
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(checkOverflow)
    })

    if (cardRef.current) {
      mutationObserver.observe(cardRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      })
    }

    // Multiple checkpoints: immediate, after animation frame, after transition completes
    requestAnimationFrame(checkOverflow)
    const timeoutId1 = setTimeout(checkOverflow, 100)
    const timeoutId2 = setTimeout(checkOverflow, 400) // Increased from 350ms to account for CSS transitions

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [
    isExpanded,
    containerSize,
    customSize,
    // Removed constrainedSize and positionAdjustment from dependencies to prevent infinite loop
    // They're read from refs inside the function to avoid stale closures
    externalStyle,
    isDragging,
    isResizing,
    card.description,
    card.websiteUrl,
  ])

  // Calculate minimum dimensions and expanded size based on content - only when first expanded
  useEffect(() => {
    if (isExpanded && cardRef.current && !customSize && !constrainedSize) {
      // Use requestAnimationFrame to ensure content is fully rendered
      requestAnimationFrame(() => {
        if (!cardRef.current || customSize || constrainedSize) return

        // Measure the card's natural dimensions when first expanded
        const cardRect = cardRef.current.getBoundingClientRect()
        const scrollWidth = cardRef.current.scrollWidth || cardRect.width
        const scrollHeight = cardRef.current.scrollHeight || cardRect.height

        // Use the larger of actual size or scroll size to account for content
        const naturalWidth = Math.max(cardRect.width, scrollWidth)
        const naturalHeight = Math.max(cardRect.height, scrollHeight)

        // Set minimum dimensions with small buffer
        minDimensionsRef.current = {
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

        expandedDimensionsRef.current = {
          width: estimatedExpandedWidth,
          height: estimatedExpandedHeight,
        }
      })
    }
  }, [isExpanded, card.description, card.websiteUrl, customSize, constrainedSize])

  // Memoize canExpand check
  const canExpand = useMemo(
    () => Boolean(card.description || card.websiteUrl),
    [card.description, card.websiteUrl],
  )

  // Memoize click handler
  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't expand if card doesn't have expandable content
      if (!canExpand) return

      // Don't expand if dragging or resizing
      if (isDragging || isResizing) return

      // Don't expand if clicking on drag handle or its children
      const target = e.target as HTMLElement
      if (target.closest('[data-drag-handle]')) return

      // Don't expand if clicking on resize handle or its children
      if (target.closest('[data-resize-handle]')) return

      // Don't expand if clicking on links or buttons
      if (target.closest('a') || target.closest('button')) return

      setIsExpanded((prev) => !prev)
    },
    [canExpand, isDragging, isResizing],
  )

  // Resize handlers
  const handleResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Only allow resize when expanded
      if (!isExpanded) return
      // Prevent resize during drag
      if (isDragging) return

      e.preventDefault()
      e.stopPropagation()

      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      setIsResizing(true)
      // Use constrained size if available, otherwise custom size, otherwise actual size
      const currentWidth = constrainedSize?.width || customSize?.width || rect.width
      const currentHeight = constrainedSize?.height || customSize?.height || rect.height
      resizeStartRef.current = {
        x: clientX,
        y: clientY,
        width: currentWidth,
        height: currentHeight,
      }
    },
    [isDragging, customSize, constrainedSize, isExpanded],
  )

  const handleResizeMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isResizing || !resizeStartRef.current) return

      e.preventDefault()
      e.stopPropagation()

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      const deltaX = clientX - resizeStartRef.current.x
      const deltaY = clientY - resizeStartRef.current.y

      // Calculate proposed new dimensions
      const proposedWidth = resizeStartRef.current.width + deltaX
      const proposedHeight = resizeStartRef.current.height + deltaY

      // Use minimum dimensions from content, or fallback to 200px
      const minWidth = minDimensionsRef.current?.width || 200
      const minHeight = minDimensionsRef.current?.height || 200

      // Enforce minimum dimensions strictly
      let newWidth = Math.max(minWidth, proposedWidth)
      let newHeight = Math.max(minHeight, proposedHeight)

      // Respect container size limits if available
      if (containerSize && containerSize.width > 0 && containerSize.height > 0) {
        const padding = 20
        const maxAllowedWidth = Math.max(200, containerSize.width - padding)
        const maxAllowedHeight = Math.max(200, containerSize.height - padding)
        newWidth = Math.min(newWidth, maxAllowedWidth)
        newHeight = Math.min(newHeight, maxAllowedHeight)
      }

      // When user manually resizes, clear constrained size and use custom size
      setConstrainedSize(null)
      constrainedSizeRef.current = null
      setCustomSize({ width: newWidth, height: newHeight })
    },
    [isResizing, containerSize],
  )

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
    resizeStartRef.current = null
  }, [])

  // Set up global mouse/touch event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
      document.addEventListener('touchmove', handleResizeMove)
      document.addEventListener('touchend', handleResizeEnd)

      return () => {
        document.removeEventListener('mousemove', handleResizeMove)
        document.removeEventListener('mouseup', handleResizeEnd)
        document.removeEventListener('touchmove', handleResizeMove)
        document.removeEventListener('touchend', handleResizeEnd)
      }
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])

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
    const shouldApplyAdjustment = isExpanded && !isDragging && !isResizing
    const adjustedLeft = shouldApplyAdjustment ? baseLeft + positionAdjustment.x : baseLeft
    const adjustedTop = shouldApplyAdjustment ? baseTop + positionAdjustment.y : baseTop

    // Prioritize constrained size over custom size
    const effectiveSize = constrainedSize || customSize

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
    customSize,
    constrainedSize,
    positionAdjustment,
    isExpanded,
    isDragging,
    isResizing,
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
        'overflow-hidden', // Prevent content from breaking out
        // Only transition non-transform properties to avoid repaints during drag
        // Removed left/top transitions to prevent bounce-back animation
        isDragging || isResizing ? '' : 'transition-[width,height,shadow] duration-300 ease-in-out',
        !constrainedSize && !customSize && 'w-auto',
        // Apply size constraints via Tailwind only when NOT expanded (expanded uses inline styles)
        // Expanded cards use dynamic constraints calculated from container size
        !constrainedSize && !customSize && !isExpanded && effectiveConfig.minWidth,
        !constrainedSize && !customSize && !isExpanded && effectiveConfig.maxWidth,
        isDragging && 'shadow-2xl z-50',
        isResizing && 'shadow-2xl z-50',
        isExpanded && 'z-40',
        canExpand && !isResizing && 'cursor-pointer',
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
          className="cursor-grab active:cursor-grabbing flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted rounded px-1.5 py-1 transition-colors touch-none"
          style={{ touchAction: 'none' }}
          aria-label="Drag handle"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      {/* Content area */}
      <div
        ref={contentRef}
        className={cn(
          'flex flex-col items-center justify-center relative ',
          effectiveConfig.padding,
        )}
      >
        {card.icon && <div className="w-full flex items-center justify-center">{card.icon}</div>}
        {card.image && (
          <div
            className={cn(
              'relative w-full overflow-hidden rounded-lg',
              isExpanded
                ? 'w-full aspect-square'
                : cn('aspect-square mx-auto', effectiveConfig.imageMaxWidth, 'max-w-[150px]'),
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
            'w-full overflow-hidden',
            // Disable transitions during resize to prevent interference
            isResizing ? '' : 'transition-all duration-300 ease-in-out',
            // Animate max-height and opacity based on expanded state
            isExpanded
              ? 'max-h-[400px]  opacity-100 mt-4 pt-4 border-t border-border'
              : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0',
          )}
        >
          <div className="flex flex-col gap-4 justify-between h-full">
            {card.description && (
              <p className="text-sm text-muted-foreground leading-relaxed ">{card.description}</p>
            )}
            {card.websiteUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
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

      {/* Resize Handle - Only show when expanded */}
      {isExpanded && (
        <div
          data-resize-handle
          onMouseDown={(e) => {
            e.stopPropagation()
            handleResizeStart(e)
          }}
          onTouchStart={(e) => {
            e.stopPropagation()
            handleResizeStart(e)
          }}
          className={cn(
            'absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize',
            'bg-background hover:bg-muted border-l border-t border-border rounded-br-lg',
            'flex items-center justify-center',
            'transition-colors touch-none z-10',
            isResizing && 'bg-muted',
          )}
          style={{ touchAction: 'none', pointerEvents: 'auto' }}
          aria-label="Resize handle"
        >
          <div className="w-full h-full flex items-end justify-end p-0.5">
            <div className="w-2 h-2 border-r border-b border-foreground/30" />
          </div>
        </div>
      )}
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
