import { cn } from '@/utilities/ui'
import React from 'react'

export const StatusDot: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      'relative ml-1 inline-flex size-2.5 shrink-0 aspect-square items-center justify-center align-middle',
      className,
    )}
    aria-hidden
  >
    <span className="absolute inset-0 inline-flex animate-ping animation-duration-[3s] rounded-full bg-accent-dot opacity-50 motion-reduce:animate-none" />
    <span className="relative inline-flex size-full rounded-full bg-accent-dot" />
  </span>
)
