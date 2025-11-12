'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'

import type { DraggableCardData } from './types'

type DraggableCardProps = {
  card: DraggableCardData
  className?: string
  style?: React.CSSProperties
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  className,
  style: externalStyle,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  })

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
        isDragging && 'shadow-2xl z-50',
        className,
      )}
      {...listeners}
      {...attributes}
    >
      {/* Title bar with window controls */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background rounded-t-lg">
        <h3 className="text-sm font-medium text-foreground">{card.title}</h3>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
        </div>
      </div>

      {/* Content area */}
      <div className="p-4 flex items-center justify-center min-h-[120px] relative">
        {card.icon && (
          <div className="w-full h-full flex items-center justify-center">{card.icon}</div>
        )}
        {card.image && (
          <Image
            src={card.image}
            alt={card.title}
            className="object-contain rounded"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {!card.icon && !card.image && (
          <div className="text-muted-foreground text-sm">No content</div>
        )}
      </div>
    </div>
  )
}
