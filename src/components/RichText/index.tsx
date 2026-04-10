import { MediaBlock } from '@/components/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/components/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  ContentBlock as ContentBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/components/blocks/Banner/Component'
import { CallToActionBlock } from '@/components/blocks/CallToAction/Component'
import { ContentBlock } from '@/components/blocks/Content/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | ContentBlockProps>

type CTABlockProps = {
  links?: {
    link?: {
      type?: 'reference' | 'custom' | null
      url?: string | null
      label?: string | null
    }
  }[]
  richText?: DefaultTypedEditorState
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  if (relationTo === 'posts') return `/posts/${slug}`
  if (relationTo === 'projects') return `/projects/${slug}`
  return `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
      <CallToActionBlock {...node.fields} />
    ),
    content: ({ node }) => <ContentBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
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
          'prose md:prose-md dark:prose-invert',
          proseLayout === 'flush' ? 'mx-0 w-full text-left' : 'mx-auto',
        ],
        className,
      )}
      {...rest}
    />
  )
}
