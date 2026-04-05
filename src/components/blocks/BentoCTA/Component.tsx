'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'

import type { BentoCTABlock as BentoCTABlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { getIcon } from '@/utilities/icons'

type Props = BentoCTABlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const BentoCTABlock: React.FC<Props> = (props) => {
  const {
    mainImage,
    quotes,
    autoplay = true,
    autoplayInterval = 5000,
    showIndicators = true,
    ctaLink,
    className,
    disableInnerContainer,
  } = props

  const [currentQuote, setCurrentQuote] = useState(0)

  const quotesLength = quotes?.length || 0
  const intervalMs = autoplayInterval || 5000

  useEffect(() => {
    if (!autoplay || quotesLength === 0) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotesLength)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [autoplay, intervalMs, quotesLength])

  if (!quotes || quotes.length === 0) {
    return null
  }

  const goToQuote = (index: number) => {
    setCurrentQuote(index)
  }

  return (
    <div
      className={cn(
        '',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Main Image BentoBox - Left side */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-square rounded-lg border border-border bg-card overflow-hidden">
            {mainImage && (
              <Media imgClassName="w-full h-full object-cover" resource={mainImage} fill />
            )}
          </div>
        </div>

        {/* Right side - Quote Carousel + CTA */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-3">
          {/* Quote Carousel BentoBox */}
          <div className="rounded-lg border border-border bg-card p-4 flex-1">
            <div className="relative h-full flex flex-col">
              {/* Quotes Container */}
              <div className="flex-1 relative min-h-[60px]">
                {quotes.map((quoteItem, index) => {
                  const IconComponent = quoteItem.icon ? getIcon(quoteItem.icon) : null

                  return (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 flex items-center gap-3 transition-opacity duration-500',
                        {
                          'opacity-100': index === currentQuote,
                          'opacity-0 pointer-events-none': index !== currentQuote,
                        },
                      )}
                    >
                      {IconComponent && (
                        <div className="flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <p className="text-sm md:text-base text-foreground font-mono">
                        &ldquo;{quoteItem.quote}&rdquo;
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Dot Indicators */}
              {showIndicators && quotes.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuote(index)}
                      className={cn('w-2 h-2 rounded-full transition-all', {
                        'bg-primary': index === currentQuote,
                        'bg-muted': index !== currentQuote,
                      })}
                      aria-label={`Go to quote ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button BentoBox */}
          {ctaLink && (
            <div className="rounded-lg border border-border bg-card p-4">
              <CMSLink {...ctaLink} className="w-full flex items-center justify-center gap-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
