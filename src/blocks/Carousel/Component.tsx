'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'
import RichText from '@/components/RichText'

import type { CarouselBlock as CarouselBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type Props = CarouselBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const Carousel: React.FC<Props> = (props) => {
  const {
    autoplay = false,
    autoplayInterval = 5000,
    className,
    showIndicators = true,
    showNavigation = true,
    slides,
    disableInnerContainer,
  } = props

  const [currentSlide, setCurrentSlide] = useState(0)

  // Move useEffect before early return to follow React hooks rules
  const slidesLength = slides?.length || 0
  const intervalMs = autoplayInterval || 5000
  useEffect(() => {
    if (!autoplay || slidesLength === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [autoplay, intervalMs, slidesLength])

  if (!slides || slides.length === 0) {
    return null
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div
      className={cn(
        'my-16',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className="relative w-full">
        <div className="relative overflow-hidden rounded-lg aspect-video">
          {slides.map((slide, index) => {
            if (!slide || typeof slide.media === 'string') return null

            return (
              <div
                key={index}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  {
                    'opacity-100': index === currentSlide,
                    'opacity-0': index !== currentSlide,
                  },
                )}
              >
                <Media
                  imgClassName="w-full h-full object-cover"
                  resource={slide.media}
                  fill
                />
                {slide.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white">
                      <RichText data={slide.caption} enableGutter={false} enableProse={false} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {showNavigation && slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {showIndicators && slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  {
                    'bg-primary w-8': index === currentSlide,
                    'bg-muted': index !== currentSlide,
                  },
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

