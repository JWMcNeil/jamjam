'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import DotGrid from '@/components/ReactBits/DotGrid'
import RichText from '@/components/RichText'

export const AnimatedHero: React.FC<Page['hero']> = ({ links, richText, dotGrid }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const richTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  })

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
    <div
      className="relative -mt-[4.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <div ref={richTextRef}>
              <RichText className="mb-6" data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
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
      <div className="min-h-[50vh] select-none absolute inset-0 -z-10 border-l sm:border-l-0 border-b border-r border-border">
        {dotGrid && typeof dotGrid === 'object' && (
          <DotGrid
            dotSize={dotGrid.dotSize ?? 10}
            gap={dotGrid.gap ?? 15}
            baseColor={dotGrid.baseColor ?? '#5227FF'}
            activeColor={dotGrid.activeColor ?? '#5227FF'}
            proximity={dotGrid.proximity ?? 120}
            shockRadius={dotGrid.shockRadius ?? 250}
            shockStrength={dotGrid.shockStrength ?? 5}
            resistance={dotGrid.resistance ?? 750}
            returnDuration={dotGrid.returnDuration ?? 1.5}
            className="!p-0"
            style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', padding: 0 }}
          />
        )}
      </div>
      <div className="min-h-[50vh]" aria-hidden="true" />
    </div>
  )
}
