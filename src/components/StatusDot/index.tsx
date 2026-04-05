import { cn } from '@/utilities/ui'
import React from 'react'

export const StatusDot: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn('relative ml-1 inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center align-middle', className)}
    aria-hidden
  >
    <span className="absolute inline-flex size-full animate-ping animation-duration-[3s] rounded-full bg-accent-dot opacity-50 motion-reduce:animate-none" />
    <span className="relative inline-flex size-2.5 rounded-full bg-accent-dot" />
  </span>
)
