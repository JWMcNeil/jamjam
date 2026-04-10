import { MediaBlock } from '@/components/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  type JSXConverter,
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
import React from 'react'

export type RichTextNodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | ContentBlockProps
    >

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

export type CreatePayloadJsxConvertersOptions = {
  /** When set, headings receive `id` in document order (must match `extractLexicalHeadings`). */
  headingIds?: string[]
}

export function createPayloadJsxConverters(
  options?: CreatePayloadJsxConvertersOptions,
): JSXConvertersFunction<RichTextNodeTypes> {
  const headingIds = options?.headingIds

  return ({ defaultConverters }) => {
    let headingIndex = 0

    const blocks: {
      banner: JSXConverter<SerializedBlockNode<BannerBlockProps>>
      mediaBlock: JSXConverter<SerializedBlockNode<MediaBlockProps>>
      code: JSXConverter<SerializedBlockNode<CodeBlockProps>>
      cta: JSXConverter<SerializedBlockNode<CTABlockProps>>
      content: JSXConverter<SerializedBlockNode<ContentBlockProps>>
    } = {
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
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
      content: ({ node }) => <ContentBlock {...node.fields} />,
    }

    const base = {
      ...defaultConverters,
      ...LinkJSXConverter({ internalDocToHref }),
      blocks,
    }

    if (!headingIds?.length) {
      return base
    }

    const headingWithIds: JSXConverter<SerializedHeadingNode> = ({ node, nodesToJSX }) => {
      const id = headingIds[headingIndex++] ?? undefined
      const children = nodesToJSX({ nodes: node.children })
      const tag = node.tag as 'h2' | 'h3' | 'h4'
      return React.createElement(tag, id ? { id, className: 'scroll-mt-28' } : { className: 'scroll-mt-28' }, children)
    }

    return {
      ...base,
      heading: headingWithIds,
    }
  }
}
