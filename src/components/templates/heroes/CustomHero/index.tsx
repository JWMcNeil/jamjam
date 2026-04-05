import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { Eyebrow } from '@/components/Eyebrow'
import { CMSLink } from '@/components/Link'
import { ContentCard, type FooterMeta } from '@/components/ContentCard'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

type HeroLinkRow = { link: React.ComponentProps<typeof CMSLink> }

/** CMS shape for the custom hero content card block (Pages collection removed). */
type ContentCardHeroInput = {
  media?: unknown
  footerMeta?: unknown
  enableLink?: boolean | null
  link?: unknown
  aspectRatio?: unknown
  cycleInterval?: number | null
  enableFooter?: boolean | null
  videoAutoplay?: boolean | null
}

export const CustomHero: React.FC<Record<string, unknown>> = ({
  children,
  richText,
  links,
  contentCard,
}) => {
  const contentCardData = contentCard as ContentCardHeroInput | null | undefined
  // Extract media items from the contentCard array structure
  const mediaItems =
    Array.isArray(contentCardData?.media) && contentCardData.media
      ? contentCardData.media
          .map((item: unknown) => {
            if (item && typeof item === 'object' && 'item' in item) {
              return (item as { item?: unknown }).item
            }
            return item
          })
          .filter((item) => item !== null && item !== undefined)
      : []

  // Extract footer meta from array structure
  const footerMetaItems =
    Array.isArray(contentCardData?.footerMeta) && contentCardData.footerMeta
      ? contentCardData.footerMeta
          .map((item: unknown): FooterMeta | null => {
            if (item && typeof item === 'object') {
              const row = item as Record<string, unknown>
              const str = (v: unknown) => (typeof v === 'string' ? v : null)
              return {
                title: str(row.title),
                description: str(row.description),
                location: str(row.location),
                customText: str(row.customText),
              }
            }
            return null
          })
          .filter((item): item is FooterMeta => item !== null)
      : []

  // Build href from link data
  let href: string | undefined
  let linkNewTab = false

  if (contentCardData?.enableLink && contentCardData?.link) {
    const linkData = contentCardData.link as Record<string, unknown>
    if (linkData.type === 'reference' && linkData.reference) {
      const reference = linkData.reference as Record<string, unknown>
      if (typeof reference === 'object' && reference.value) {
        const value = reference.value
        const relationTo = reference.relationTo || 'pages'
        if (typeof value === 'object' && value !== null && 'slug' in value) {
          const slug = (value as { slug?: string }).slug
          if (slug)
            href = relationTo === 'pages' ? `/${slug}` : `/${String(relationTo)}/${slug}`
        }
      }
    } else if (linkData.type === 'custom' && linkData.url) {
      href = String(linkData.url)
    }
    linkNewTab = Boolean(linkData.newTab)
  }

  const hasContentCard = Boolean(contentCardData && mediaItems.length > 0)

  return (
    <div className="container mt-16">
      <Eyebrow TextLeft="Web Dev" TextRight="Photo + Video" />
      <div
        className={`gap-8 flex flex-col ${
          hasContentCard ? 'lg:flex-row lg:items-start' : 'max-w-[40rem]'
        }`}
      >
        <div className={`flex flex-col gap-8 ${hasContentCard ? 'flex-1 lg:max-w-[40rem]' : ''}`}>
          {(children as React.ReactNode) ||
            (Boolean(richText) && (
              <RichText data={richText as DefaultTypedEditorState} enableGutter={false} />
            ))}
          {Boolean(links) && Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
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
        {hasContentCard && contentCardData && (
          <div className="flex-1 lg:max-w-[40rem]">
            <ContentCard
              aspectRatio={
                contentCardData.aspectRatio as
                  | 'square'
                  | 'landscape'
                  | 'portrait'
                  | 'auto'
                  | undefined
              }
              cycleInterval={contentCardData.cycleInterval || 3}
              enableFooter={contentCardData.enableFooter || false}
              enableLink={contentCardData.enableLink || false}
              footerMeta={footerMetaItems}
              href={href}
              linkNewTab={linkNewTab}
              media={mediaItems as (MediaType | string | number | null)[]}
              videoAutoplay={contentCardData.videoAutoplay || false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
