'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import { useMemo } from 'react'

import { createPayloadJsxConverters } from '@/components/RichText/lexicalConverters'
import { cn } from '@/utilities/ui'

type Props = {
  data: DefaultTypedEditorState
  headingIds: string[]
  className?: string
  enableGutter?: boolean
  enableProse?: boolean
  proseLayout?: 'center' | 'flush'
  disableTextAlign?: boolean | string[]
} & React.HTMLAttributes<HTMLDivElement>

export function PostBodyRichText(props: Props) {
  const {
    data,
    headingIds,
    className,
    enableProse = true,
    enableGutter = true,
    proseLayout = 'flush',
    disableTextAlign,
    ...rest
  } = props

  const converters = useMemo(
    () =>
      createPayloadJsxConverters({
        headingIds: headingIds.length ? headingIds : undefined,
      }),
    [headingIds],
  )

  return (
    <ConvertRichText
      {...rest}
      converters={converters}
      data={data}
      disableTextAlign={disableTextAlign}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
        },
        enableProse && [
          'prose prose-lg max-w-none',
          'prose-p:mb-4 prose-p:mt-0 prose-p:leading-relaxed prose-p:text-text-prose',
          'prose-headings:scroll-mt-24 prose-headings:text-text-heading prose-headings:font-semibold',
          'prose-h2:mt-10 prose-h2:mb-3 prose-h3:mt-8 prose-h3:mb-2 prose-h4:mt-6 prose-h4:mb-2',
          'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-text-primary',
          'prose-li:text-text-prose prose-li:marker:text-text-muted',
          'prose-ul:my-4 prose-ol:my-4',
          'prose-hr:border-border',
          'prose-blockquote:border-border prose-blockquote:text-text-secondary',
          'prose-code:text-text-primary prose-code:before:content-none prose-code:after:content-none',
          'prose-pre:bg-card prose-pre:border prose-pre:border-border',
          proseLayout === 'flush' ? 'mx-0 w-full text-left' : 'mx-auto',
        ],
        className,
      )}
    />
  )
}
