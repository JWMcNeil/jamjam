import React from 'react'

import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const RichTextBlockComponent: React.FC<RichTextBlockProps & { className?: string }> = ({
  content,
  className,
}) => {
  if (!content) return null

  return (
    <div className={cn(className)}>
      <RichText data={content} enableGutter={false} />
    </div>
  )
}
