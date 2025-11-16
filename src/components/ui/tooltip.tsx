'use client'

import * as React from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
} from '@floating-ui/react'

import { cn } from '@/utilities/ui'

export interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const arrowRef = React.useRef<HTMLDivElement>(null)

  // Map position prop to Floating UI placement
  const placement: Placement = position

  const {
    refs,
    floatingStyles,
    context,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  // Calculate arrow styles based on placement and middleware data
  const getArrowStyles = React.useMemo(() => {
    if (!middlewareData.arrow) return {}

    const { x, y } = middlewareData.arrow

    const baseStyles = {
      width: 0,
      height: 0,
      position: 'absolute' as const,
    }

    switch (finalPlacement) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '-6px',
          left: x != null ? `${x}px` : '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid hsl(var(--border))',
        }
      case 'bottom':
        return {
          ...baseStyles,
          top: '-6px',
          left: x != null ? `${x}px` : '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid hsl(var(--border))',
        }
      case 'left':
        return {
          ...baseStyles,
          right: '-6px',
          top: y != null ? `${y}px` : '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '6px solid hsl(var(--border))',
        }
      case 'right':
        return {
          ...baseStyles,
          left: '-6px',
          top: y != null ? `${y}px` : '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid hsl(var(--border))',
        }
      default:
        return {}
    }
  }, [middlewareData.arrow, finalPlacement])

  // Calculate inner arrow (fill) styles - offset by 1px to create border effect
  const getArrowInnerStyles = React.useMemo(() => {
    if (!middlewareData.arrow) return {}

    const { x, y } = middlewareData.arrow

    const baseStyles = {
      width: 0,
      height: 0,
      position: 'absolute' as const,
    }

    switch (finalPlacement) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '-5px',
          left: x != null ? `${x}px` : '50%',
          transform: 'translateX(-50%)',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '5px solid hsl(var(--popover))',
        }
      case 'bottom':
        return {
          ...baseStyles,
          top: '-5px',
          left: x != null ? `${x}px` : '50%',
          transform: 'translateX(-50%)',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '5px solid hsl(var(--popover))',
        }
      case 'left':
        return {
          ...baseStyles,
          right: '-5px',
          top: y != null ? `${y}px` : '50%',
          transform: 'translateY(-50%)',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '5px solid hsl(var(--popover))',
        }
      case 'right':
        return {
          ...baseStyles,
          left: '-5px',
          top: y != null ? `${y}px` : '50%',
          transform: 'translateY(-50%)',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderRight: '5px solid hsl(var(--popover))',
        }
      default:
        return {}
    }
  }, [middlewareData.arrow, finalPlacement])

  // Don't render tooltip if content is empty
  if (!content) {
    return <>{children}</>
  }

  // Wrap children in a span to properly attach ref and event handlers
  // This is necessary because Next.js Link and other components may not forward refs
  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} style={{ display: 'inline-block' }}>
        {children}
      </span>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className={cn(
            'z-50 rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md relative',
            className,
          )}
        >
          {content}
          {middlewareData.arrow && (
            <>
              {/* Outer arrow (border) */}
              <div ref={arrowRef} style={getArrowStyles} />
              {/* Inner arrow (fill) */}
              <div style={getArrowInnerStyles} />
            </>
          )}
        </div>
      )}
    </>
  )
}
