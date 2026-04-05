import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type RichTextBlockProps = {
  content?: DefaultTypedEditorState | null
}

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
