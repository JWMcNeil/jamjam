'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
// @ts-ignore - SplitText may not have types
import SplitText from '@benjaminlooi/splittext'

// Helper function to find first matching word in collection
function findFirstMatch(word: string, collection: HTMLElement[]): number {
  const l = collection.length
  const normalizedWord = word.replace(/\s/g, '')

  for (let i = 0; i < l; i++) {
    const normalizedText = collection[i].textContent?.replace(/\s/g, '') || ''
    if (normalizedText === normalizedWord) {
      return i
    }
  }

  return -1
}

// Compare two SplitText instances and find matching words
function compareSplits(s1: any, s2: any) {
  const matches1: HTMLElement[] = []
  const matches2: HTMLElement[] = []
  // Convert to arrays if they're jQuery objects
  const words1 = Array.isArray(s1.words) ? s1.words : Array.from(s1.words)
  const words2 = Array.isArray(s2.words) ? s2.words : Array.from(s2.words)
  const unmatched1 = words1.slice(0) as HTMLElement[]
  const unmatched2 = words2.slice(0) as HTMLElement[]

  let l = unmatched2.length

  for (let i = 0; i < l; i++) {
    const index = findFirstMatch(unmatched2[i].textContent || '', unmatched1)
    if (index !== -1) {
      matches1.push(unmatched1[index])
      matches2.push(unmatched2[i])
      unmatched1.splice(index, 1)
      unmatched2.splice(i--, 1)
      l--
    }
  }

  return {
    matches1,
    matches2,
    unmatched1,
    unmatched2,
  }
}

// Transition function that animates words from element1 to element2
function transition(
  element1: HTMLElement | null,
  element2: HTMLElement | null,
  vars?: gsap.TimelineVars,
  useDefaultColor: boolean = false,
): gsap.core.Timeline | null {
  if (!element1 || !element2) {
    return null
  }

  const split1 = new SplitText(element1, ['words'])
  const split2 = new SplitText(element2, ['words'])

  // Convert to arrays
  const words1 = Array.isArray(split1.words) ? split1.words : Array.from(split1.words)
  const words2 = Array.isArray(split2.words) ? split2.words : Array.from(split2.words)

  // Force a reflow to ensure layout is calculated
  void element1.offsetHeight
  void element2.offsetHeight

  // Get element bounds for relative positioning
  const element1Rect = element1.getBoundingClientRect()
  const element2Rect = element2.getBoundingClientRect()

  // Store initial positions BEFORE making absolute (relative to parent element)
  const words1Positions: Array<{ left: number; top: number }> = []
  const words2Positions: Array<{ left: number; top: number }> = []

  words1.forEach((word: HTMLElement) => {
    const rect = word.getBoundingClientRect()
    words1Positions.push({
      left: rect.left - element1Rect.left,
      top: rect.top - element1Rect.top,
    })
  })

  words2.forEach((word: HTMLElement) => {
    const rect = word.getBoundingClientRect()
    words2Positions.push({
      left: rect.left - element2Rect.left,
      top: rect.top - element2Rect.top,
    })
  })

  // Now set to absolute positioning using stored positions
  words1.forEach((word: HTMLElement, index: number) => {
    const pos = words1Positions[index]
    word.style.position = 'absolute'
    word.style.left = `${pos.left}px`
    word.style.top = `${pos.top}px`
    word.style.margin = '0'
    word.style.padding = '0'
    word.style.whiteSpace = 'nowrap'
  })

  words2.forEach((word: HTMLElement, index: number) => {
    const pos = words2Positions[index]
    word.style.position = 'absolute'
    word.style.left = `${pos.left}px`
    word.style.top = `${pos.top}px`
    word.style.margin = '0'
    word.style.padding = '0'
    word.style.whiteSpace = 'nowrap'
  })

  const data = compareSplits(split1, split2)
  const l = data.matches1.length
  const tl = gsap.timeline(vars)

  // Get computed color values from CSS variables (GSAP can't parse CSS vars directly)
  // Calculate once before the loop to avoid repeated calculations
  const foregroundColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--foreground')
    .trim()
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim()

  const defaultColor = foregroundColor ? `hsl(${foregroundColor})` : '#ffffff' // fallback to white
  const accentColor = primaryColor ? `hsl(${primaryColor})` : '#7ab87a' // fallback color

  // Determine color for moving words
  const movingWordColor = useDefaultColor ? defaultColor : accentColor

  // Set initial states
  // Make element2 visible but keep its words hidden initially
  gsap.set(element2, { opacity: 1, visibility: 'visible' })
  words2.forEach((word: HTMLElement) => {
    gsap.set(word, { opacity: 0, visibility: 'hidden' }) // Hide word divs initially
  })

  // Set color on all words from block 1 synchronously before timeline starts
  // This prevents white flash during transitions
  // Matching words: use movingWordColor (accent when between blurbs, white when going to welcome)
  data.matches1.forEach((word1: HTMLElement) => {
    gsap.set(word1, { color: movingWordColor })
  })

  // Unmatched words from old blurb: keep accent color when fading out between blurbs,
  // fade to white when transitioning to welcome blurb
  const fadeOutColor = useDefaultColor ? defaultColor : accentColor
  data.unmatched1.forEach((word1: HTMLElement) => {
    gsap.set(word1, { color: fadeOutColor })
  })

  // Animate matching words from position 1 to position 2
  for (let i = 0; i < l; i++) {
    const word1 = data.matches1[i]
    const word2 = data.matches2[i]

    // Find indices in original arrays to get stored positions
    const idx1 = words1.indexOf(word1)
    const idx2 = words2.indexOf(word2)

    if (idx1 !== -1 && idx2 !== -1) {
      // Get current absolute position of word1 (relative to element1)
      const word1CurrentLeft = parseFloat(word1.style.left) || 0
      const word1CurrentTop = parseFloat(word1.style.top) || 0

      // Get target position of word2 (relative to element2, but we need it relative to element1)
      // Since both elements are in the same container at the same position, we can use word2's position directly
      const word2TargetLeft = parseFloat(word2.style.left) || 0
      const word2TargetTop = parseFloat(word2.style.top) || 0

      // Calculate delta (how much to move word1 to reach word2's position)
      const deltaX = word2TargetLeft - word1CurrentLeft
      const deltaY = word2TargetTop - word1CurrentTop

      const animationProps: gsap.TweenVars = {
        duration: 1,
        x: deltaX,
        y: deltaY,
        ease: 'power1.inOut',
      }

      tl.to(word1, animationProps, i * 0.03)
    }
  }

  // Fade out unmatched words from block 1
  tl.to(
    data.unmatched1,
    {
      duration: 0.3,
      autoAlpha: 0,
    },
    0,
  )

  // Calculate when the last word movement finishes
  // Last word starts at (l-1) * 0.03 and has duration 1, so it finishes at (l-1) * 0.03 + 1
  const lastWordFinishTime = l > 0 ? (l - 1) * 0.03 + 1 : 0

  // Determine target color for unmatched words (colors already calculated above)
  const targetColor = useDefaultColor ? defaultColor : accentColor

  tl.to(
    data.unmatched2,
    {
      duration: 0.5,
      opacity: 1,
      visibility: 'visible',
      color: targetColor,
    },
    0,
  )

  // Show matching words from block 2 AFTER all word movements are complete
  // Instantly hide word1 and show word2 to avoid flickering
  data.matches2.forEach((word: HTMLElement, index: number) => {
    const word1 = data.matches1[index]

    // Instantly hide word1 and show word2 at the exact same time
    // This prevents any flickering from overlapping elements
    tl.set(
      word1,
      {
        opacity: 0,
        visibility: 'hidden',
      },
      lastWordFinishTime,
    )

    tl.set(
      word,
      {
        opacity: 1,
        visibility: 'visible',
        color: useDefaultColor ? targetColor : undefined, // Reset color to default if needed
      },
      lastWordFinishTime,
    )
  })

  return tl
}

type HeroCanvasProps = {
  heroBlock?: any
  cardsBlock?: any
}

// Define your blurbs - index 0 is the welcome blurb (default)
const blurbs = [
  "Welcome! This is the default blurb that appears when you're not hovering over any links.",
  'Building things for the web comes naturally, from small pages to ideas that grow together over time.',
  'Some things feel worth capturing, and light and timing come together when the shot finally works.',
  'Motion pulls things into focus, and scenes come together when the story starts to feel right.',
  'Thoughts, notes, and half-formed ideas live here, where writing helps put things together.',
]

const WELCOME_BLURB_INDEX = 0

const navigationItems = [
  { label: 'Blurb 1', blurbIndex: 1 },
  { label: 'Blurb 2', blurbIndex: 2 },
  { label: 'Blurb 3', blurbIndex: 3 },
  { label: 'Blurb 4', blurbIndex: 4 },
]

export const HeroCanvas = ({ heroBlock, cardsBlock }: HeroCanvasProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const blurb1Ref = useRef<HTMLDivElement>(null)
  const blurb2Ref = useRef<HTMLDivElement>(null)
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const currentBlurbIndexRef = useRef<number>(WELCOME_BLURB_INDEX)
  const isAnimatingRef = useRef<boolean>(false)
  const returnToWelcomeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Function to completely clean up an element (remove all SplitText wrappers and reset)
  const cleanupElement = (element: HTMLElement, text: string) => {
    // Kill any GSAP animations on this element and its children
    gsap.killTweensOf(element)
    const children = Array.from(element.children) as HTMLElement[]
    children.forEach((child) => {
      gsap.killTweensOf(child)
    })

    // Reset all styles and transforms
    gsap.set(element, { clearProps: 'all' })
    element.style.cssText = ''

    // Remove all children (SplitText wrappers)
    element.innerHTML = ''

    // Set plain text content
    element.textContent = text

    // Reset any transforms that might be on the element itself
    gsap.set(element, { x: 0, y: 0, opacity: 1, visibility: 'visible' })
  }

  // Function to transition between blurbs
  const transitionToBlurb = (targetIndex: number) => {
    if (isAnimatingRef.current || targetIndex === currentBlurbIndexRef.current) return

    if (!blurb1Ref.current || !blurb2Ref.current) return

    // Clear any pending return-to-welcome timeout
    if (returnToWelcomeTimeoutRef.current) {
      clearTimeout(returnToWelcomeTimeoutRef.current)
      returnToWelcomeTimeoutRef.current = null
    }

    // Kill any existing animation
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill()
      currentTimelineRef.current = null
    }

    isAnimatingRef.current = true

    // Determine which ref is currently showing (source) and which is hidden (target)
    const sourceRef = blurb1Ref.current
    const targetRef = blurb2Ref.current

    // Get the current source text (before cleanup)
    const sourceText = blurbs[currentBlurbIndexRef.current]
    const targetText = blurbs[targetIndex]

    // Completely clean up both elements before transition
    cleanupElement(sourceRef, sourceText)
    cleanupElement(targetRef, targetText)

    // Set visibility states
    gsap.set(sourceRef, { opacity: 1, visibility: 'visible' })
    gsap.set(targetRef, { opacity: 0, visibility: 'hidden' })

    // Small delay to ensure DOM has updated
    requestAnimationFrame(() => {
      // Trigger the transition animation
      // Use default color when transitioning to welcome blurb
      const useDefaultColor = targetIndex === WELCOME_BLURB_INDEX
      const tl = transition(sourceRef, targetRef, undefined, useDefaultColor)

      if (tl) {
        currentTimelineRef.current = tl

        // After animation completes, swap the refs
        tl.eventCallback('onComplete', () => {
          // Update current blurb index
          currentBlurbIndexRef.current = targetIndex
          isAnimatingRef.current = false
          currentTimelineRef.current = null

          // Note: Don't swap text content here - the transition function handles the visual swap
          // We just need to track which blurb is now visible
        })
      } else {
        isAnimatingRef.current = false
      }
    })
  }

  // Handle hover on navigation items
  const handleLinkHover = (blurbIndex: number) => {
    transitionToBlurb(blurbIndex)
  }

  // Handle mouse leave - return to welcome blurb after timeout
  const handleLinkLeave = () => {
    // Clear any existing timeout
    if (returnToWelcomeTimeoutRef.current) {
      clearTimeout(returnToWelcomeTimeoutRef.current)
    }

    // Set timeout to return to welcome blurb
    returnToWelcomeTimeoutRef.current = setTimeout(() => {
      if (currentBlurbIndexRef.current !== WELCOME_BLURB_INDEX) {
        transitionToBlurb(WELCOME_BLURB_INDEX)
      }
      returnToWelcomeTimeoutRef.current = null
    }, 2000) // 2 second delay before returning to welcome blurb
  }

  useEffect(() => {
    if (!blurb1Ref.current || !blurb2Ref.current) return

    // Set initial text to welcome blurb (clean, no SplitText wrappers yet)
    blurb1Ref.current.textContent = blurbs[WELCOME_BLURB_INDEX]
    blurb2Ref.current.textContent = blurbs[1]
    currentBlurbIndexRef.current = WELCOME_BLURB_INDEX

    return () => {
      // Cleanup on unmount
      if (currentTimelineRef.current) {
        currentTimelineRef.current.kill()
      }
      if (returnToWelcomeTimeoutRef.current) {
        clearTimeout(returnToWelcomeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-[30px] py-5">
      <div ref={containerRef} className="w-[550px] relative h-[50vh] text-5xl text-foreground mb-8">
        <div ref={blurb1Ref} className="absolute top-0 left-0 w-full">
          {blurbs[WELCOME_BLURB_INDEX]}
        </div>
        <div ref={blurb2Ref} className="absolute top-0 left-0 w-full opacity-0">
          {blurbs[1]}
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex gap-4 flex-wrap justify-center">
        {navigationItems.map((item) => (
          <button
            key={item.label}
            onMouseEnter={() => handleLinkHover(item.blurbIndex)}
            onMouseLeave={handleLinkLeave}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
