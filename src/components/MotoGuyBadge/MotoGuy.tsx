import NextImage from 'next/image'
import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  className?: string
}

export const MotoGuy: React.FC<Props> = ({ className }) => {
  return (
    <NextImage
      src="/motoguy.png"
      alt="jamjam.dev logo"
      width={72}
      height={72}
      sizes="36px"
      priority
      className={cn('h-8 w-auto object-contain md:h-9', className)}
    />
  )
}
