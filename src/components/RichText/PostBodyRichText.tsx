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
          'prose max-w-none text-[1.0625rem]',
          'prose-p:mb-[1.35em] prose-p:mt-0 prose-p:leading-[1.8] prose-p:text-text-primary prose-p:text-pretty',
          'prose-headings:scroll-mt-28 prose-headings:text-text-heading prose-headings:font-semibold prose-headings:text-balance',
          'prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[1.625rem] prose-h2:font-bold prose-h2:tracking-tight',
          'prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[1.3125rem] prose-h3:tracking-tight',
          'prose-h4:mt-8 prose-h4:mb-2 prose-h4:text-lg',
          'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-text-heading prose-strong:font-semibold',
          'prose-li:text-text-primary prose-li:leading-[1.75] prose-li:marker:text-text-muted',
          'prose-ul:my-6 prose-ol:my-6 prose-ul:pl-[1.35em] prose-ol:pl-[1.35em]',
          'prose-li:my-1.5',
          'prose-hr:my-10 prose-hr:border-border',
          'prose-blockquote:border-border prose-blockquote:py-1 prose-blockquote:text-text-secondary prose-blockquote:leading-[1.75]',
          'prose-code:text-text-primary prose-code:before:content-none prose-code:after:content-none',
          'prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:my-8',
          'max-w-[68ch]',
          proseLayout === 'flush' ? 'mx-0 w-full text-left' : 'mx-auto',
        ],
        className,
      )}
    />
  )
}
