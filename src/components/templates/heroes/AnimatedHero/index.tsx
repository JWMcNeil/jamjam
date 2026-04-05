'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

type HeroLinkRow = { link: React.ComponentProps<typeof CMSLink> }

export const AnimatedHero: React.FC<Record<string, unknown>> = ({ links, richText }) => {
  const richTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (richText && richTextRef.current) {
      const element = richTextRef.current

      // Set initial state
      gsap.set(element, {
        opacity: 0,
        y: 20,
      })

      // Animate in
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }
  }, [richText])

  return (
    <div className="relative -mt-[4.4rem] flex items-center justify-center text-white">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {Boolean(richText) && (
            <div ref={richTextRef}>
              <RichText
                className="mb-6"
                data={richText as DefaultTypedEditorState}
                enableGutter={false}
              />
            </div>
          )}
          {Boolean(links) && Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
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
      </div>
      <div className="min-h-[50vh] select-none absolute inset-0 -z-10 border-l sm:border-l-0 border-b border-r border-border bg-gradient-to-b from-background to-card/50">
      </div>
      <div className="min-h-[50vh]" aria-hidden="true" />
    </div>
  )
}
