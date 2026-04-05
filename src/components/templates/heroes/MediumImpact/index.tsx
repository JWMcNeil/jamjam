import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'

type HeroLinkRow = { link: React.ComponentProps<typeof CMSLink> }

export const MediumImpactHero: React.FC<Record<string, unknown>> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {Boolean(richText) && (
          <RichText
            className="mb-6"
            data={richText as DefaultTypedEditorState}
            enableGutter={false}
          />
        )}

        {Boolean(links) && Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {(links as HeroLinkRow[]).map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {Boolean(media) && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media as MediaType}
            />
            {(media as MediaType).caption && (
              <div className="mt-3">
                <RichText
                  data={(media as MediaType).caption as DefaultTypedEditorState}
                  enableGutter={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
