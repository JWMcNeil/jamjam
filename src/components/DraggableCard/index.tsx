'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'

import type { DraggableCardData, CardSize } from './types'

type DraggableCardProps = {
  card: DraggableCardData
  className?: string
  style?: React.CSSProperties
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
    padding: 'p-1',
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

export const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  className,
  style: externalStyle,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  })

  const size: CardSize = card.size || 'md'
  const config = sizeConfig[size]

  const style = {
    ...externalStyle,
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'absolute cursor-grab active:cursor-grabbing select-none',
        'bg-background border border-border rounded-lg shadow-lg',
        'transition-shadow duration-200',
        'w-auto',
        config.minWidth,
        config.maxWidth,
        isDragging && 'shadow-2xl z-50',
        className,
      )}
      {...listeners}
      {...attributes}
    >
      {/* Title bar with window controls */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background rounded-t-lg">
        <h3 className="text-sm font-medium text-foreground truncate pr-2">{card.title}</h3>
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
        </div>
      </div>

      {/* Content area */}
      <div className={cn('flex items-center justify-center relative', config.padding)}>
        {card.icon && <div className="w-full flex items-center justify-center">{card.icon}</div>}
        {card.image && (
          <div className={cn('relative w-full aspect-square mx-auto', config.imageMaxWidth)}>
            <Image
              src={card.image}
              alt={card.title}
              className="object-cover rounded"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {!card.icon && !card.image && (
          <div className="text-muted-foreground text-sm py-8">No content</div>
        )}
      </div>
    </div>
  )
}
