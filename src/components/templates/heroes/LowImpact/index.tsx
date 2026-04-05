import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Record<string, unknown> & {
      children?: never
      richText?: unknown
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {(children as React.ReactNode) ||
          (Boolean(richText) && (
            <RichText data={richText as DefaultTypedEditorState} enableGutter={false} />
          ))}
      </div>
    </div>
  )
}
