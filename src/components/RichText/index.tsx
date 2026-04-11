import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { createPayloadJsxConverters } from '@/components/RichText/lexicalConverters'
import { cn } from '@/utilities/ui'

const jsxConverters = createPayloadJsxConverters()

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  /** When `enableProse` is true: apply `dark:prose-invert` (Tailwind Typography inverted palette in dark mode). Set false to style with your own classes instead. */
  proseInvert?: boolean
  /** When prose is on: `center` uses mx-auto (default); `flush` aligns to the parent’s start edge. */
  proseLayout?: 'center' | 'flush'
  /** Forwarded to Payload’s converter; use `true` to ignore alignment from the editor (e.g. centered blocks). */
  disableTextAlign?: boolean | string[]
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    proseInvert = true,
    proseLayout = 'center',
    disableTextAlign,
    ...rest
  } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      disableTextAlign={disableTextAlign}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
        },
        enableProse && [
          'prose md:prose-md',
          proseInvert && 'dark:prose-invert',
          proseLayout === 'flush' ? 'mx-0 w-full text-left' : 'mx-auto',
        ],
        className,
      )}
      {...rest}
    />
  )
}
