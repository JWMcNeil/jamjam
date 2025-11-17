'use client'

import { cn } from '@/utilities/ui'
import React, { useState, useMemo, useEffect } from 'react'
import NextImage from 'next/image'

import type { ImageMasonryGridBlock as ImageMasonryGridBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = ImageMasonryGridBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ImageMasonryGrid: React.FC<Props> = (props) => {
  const { className, gap = 'medium', images, disableInnerContainer } = props

  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})

  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-8',
  }

  const columnClasses = 'columns-1 sm:columns-2 lg:columns-3 xl:columns-3'

  const gapValue = gap || 'medium'

  // Prepare images data
  const preparedImages = useMemo(() => {
    if (!images || images.length === 0) {
      return []
    }

    const filtered = images.filter((item) => {
      if (!item) return false
      // Handle both object (populated) and number (ID reference) cases
      if (typeof item.image === 'object' && item.image !== null) {
        return true
      }
      return false
    })

    return filtered
      .map((item) => {
        const image = item.image as {
          url: string | null
          alt?: string | null
          width?: number | null
          height?: number | null
          updatedAt?: string | null
        }
        const imageId = item.id || image.url || Math.random().toString()
        const imageUrl = getMediaUrl(image.url, image.updatedAt)

        // Normalize empty strings to null and skip images with empty URLs
        const normalizedUrl = imageUrl && imageUrl.trim() !== '' ? imageUrl : null
        if (!normalizedUrl) {
          return null
        }

        return {
          id: imageId,
          src: normalizedUrl,
          alt: image.alt || item.caption || '',
          caption: item.caption,
          width: image.width || 400,
          height: image.height || 300,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }, [images])

  // Debug: Log if images exist but preparedImages is empty
  useEffect(() => {
    if (images && images.length > 0 && preparedImages.length === 0) {
      console.warn(
        'ImageMasonryGrid: Images exist but none were prepared. Check image structure:',
        images,
      )
    }
  }, [images, preparedImages])

  // Initialize loading states when images are prepared
  useEffect(() => {
    if (preparedImages.length > 0) {
      setImageLoadingStates((prev) => {
        const newStates: Record<string, boolean> = { ...prev }
        preparedImages.forEach((img) => {
          // Only set loading state if not already set
          if (newStates[img.id] === undefined) {
            newStates[img.id] = true
          }
        })
        return newStates
      })
    }
  }, [preparedImages])

  if (!images || images.length === 0 || preparedImages.length === 0) {
    return null
  }

  const handleImageLoad = (id: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }))
  }

  const handleImageError = (id: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }))
  }

  return (
    <div
      className={cn(
        'container my-16 w-full mx-auto',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className={cn(columnClasses, gapClasses[gapValue as keyof typeof gapClasses])}>
        {preparedImages.map((photo) => {
          // Skip rendering if src is null or empty (defensive check)
          // Ensure we never pass empty strings - normalize to null
          const src = photo.src && photo.src.trim() !== '' ? photo.src : null
          if (!src) {
            return null
          }

          return (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid mb-4"
            >
              {imageLoadingStates[photo.id] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                </div>
              )}
              <NextImage
                alt={photo.alt}
                className=" h-auto rounded-lg transition-transform duration-500 group-hover:scale-105 block m-0 p-0"
                height={photo.height}
                loading="lazy"
                src={src}
                unoptimized
                width={photo.width}
                onLoad={() => handleImageLoad(photo.id)}
                onError={(e) => {
                  console.error('Failed to load image:', photo.src)
                  handleImageError(photo.id)
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement
                  target.src = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(photo.alt)}`
                }}
              />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <p className="text-white text-sm font-medium leading-relaxed">{photo.caption}</p>
                </div>
              )}
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg pointer-events-none"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
