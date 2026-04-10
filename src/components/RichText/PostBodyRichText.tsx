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
          'prose md:prose-md dark:prose-invert',
          proseLayout === 'flush' ? 'mx-0 w-full text-left' : 'mx-auto',
        ],
        className,
      )}
    />
  )
}
