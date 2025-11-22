'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
// @ts-ignore - SplitText may not have types
import SplitText from '@benjaminlooi/splittext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useIsMobile } from '@/components/DraggableCard/useIsMobile'
import { cn } from '@/utilities/ui'

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
  targetBlurbIndex: number,
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

  // Compare element1 to element2 for animation (which words move)
  const animationData = compareSplits(split1, split2)
  const l = animationData.matches1.length

  // Get words to highlight for the target blurb
  const wordsToHighlight = highlightedWords[targetBlurbIndex] || []
  const words2ToHighlight: HTMLElement[] = []
  const words2NotHighlighted: HTMLElement[] = []

  // Helper function to normalize words for comparison (remove punctuation, lowercase, trim)
  const normalizeWord = (word: string): string => {
    return word
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation (keeps only word characters and spaces)
      .replace(/\s+/g, '') // Remove all whitespace for exact word matching
      .trim()
  }

  words2.forEach((word2: HTMLElement) => {
    const word2Text = word2.textContent || ''
    const normalizedWord2 = normalizeWord(word2Text)

    const shouldHighlight = wordsToHighlight.some((highlightWord) => {
      const normalizedHighlight = normalizeWord(highlightWord)
      return normalizedWord2 === normalizedHighlight
    })

    if (shouldHighlight) {
      words2ToHighlight.push(word2)
    } else {
      words2NotHighlighted.push(word2)
    }
  })

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
  // Matching words: green when transitioning between blurbs, white when going to welcome
  const movingWordColor = useDefaultColor ? defaultColor : accentColor

  // Set initial states
  // Make element2 visible but keep its words hidden initially
  gsap.set(element2, { opacity: 1, visibility: 'visible' })
  words2.forEach((word: HTMLElement) => {
    gsap.set(word, { opacity: 0, visibility: 'hidden' }) // Hide word divs initially
  })

  // Set color on all words from block 1 synchronously before timeline starts
  // This prevents white flash during transitions
  // Matching words: green if they should be highlighted in target blurb (and not going to welcome), white otherwise
  animationData.matches1.forEach((word1: HTMLElement, index: number) => {
    const correspondingWord2 = animationData.matches2[index]
    const shouldHighlight = words2ToHighlight.includes(correspondingWord2)
    const wordColor = shouldHighlight && !useDefaultColor ? accentColor : defaultColor
    gsap.set(word1, { color: wordColor })
  })

  // Unmatched words from old blurb: always fade out in white (default color)
  const fadeOutColor = defaultColor
  animationData.unmatched1.forEach((word1: HTMLElement) => {
    gsap.set(word1, { color: fadeOutColor })
  })

  // Animate matching words from position 1 to position 2
  for (let i = 0; i < l; i++) {
    const word1 = animationData.matches1[i]
    const word2 = animationData.matches2[i]

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
    animationData.unmatched1,
    {
      duration: 0.3,
      autoAlpha: 0,
    },
    0,
  )

  // Calculate when the last word movement finishes
  // Last word starts at (l-1) * 0.03 and has duration 1, so it finishes at (l-1) * 0.03 + 1
  const lastWordFinishTime = l > 0 ? (l - 1) * 0.03 + 1 : 0

  // Separate matched and unmatched words2 for different timing
  const matchedWords2 = animationData.matches2
  const unmatchedWords2ToHighlight = words2ToHighlight.filter(
    (word) => !matchedWords2.includes(word),
  )
  const unmatchedWords2NotHighlighted = words2NotHighlighted.filter(
    (word) => !matchedWords2.includes(word),
  )

  // Show unmatched words from element2 at time 0
  // Words that should be highlighted should be green (unless going to welcome), others white
  unmatchedWords2ToHighlight.forEach((word: HTMLElement) => {
    tl.to(
      word,
      {
        duration: 0.5,
        opacity: 1,
        visibility: 'visible',
        color: useDefaultColor ? defaultColor : accentColor,
      },
      0,
    )
  })

  unmatchedWords2NotHighlighted.forEach((word: HTMLElement) => {
    tl.to(
      word,
      {
        duration: 0.5,
        opacity: 1,
        visibility: 'visible',
        color: defaultColor,
      },
      0,
    )
  })

  // Show matching words from block 2 AFTER all word movements are complete
  // Instantly hide word1 and show word2 to avoid flickering
  animationData.matches2.forEach((word: HTMLElement, index: number) => {
    const word1 = animationData.matches1[index]

    // Determine color based on whether this word should be highlighted
    const shouldHighlight = words2ToHighlight.includes(word)
    const wordColor = shouldHighlight && !useDefaultColor ? accentColor : defaultColor

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
        color: wordColor, // Green if should be highlighted (and not going to welcome), white otherwise
      },
      lastWordFinishTime,
    )
  })

  return tl
}

type HeroTextProps = {
  heroBlock?: any
  cardsBlock?: any
}

// Define your blurbs - index 0 is the welcome blurb (default)
const blurbs = [
  'Step into jamjam.dev — where web experiences that work beautifully, content that resonates authentically, and thoughtful design that brings it all together.',
  'Intuitive web experiences that work seamlessly and beautifully — where every interaction feels natural and users want to explore.',
  'Strategic content that resonates with your audience authentically — meaningful connections, stories with purpose.',
]

// Define which words to highlight (green) in each blurb
// Words should match exactly as they appear in the blurb (case-sensitive, including punctuation)
const highlightedWords: Record<number, string[]> = {
  0: [], // Welcome blurb - no highlights (all white)
  1: ['web', 'experiences', 'that', 'work', 'beautifully'],
  2: ['content', 'that', 'resonates', 'authentically'],
}

const WELCOME_BLURB_INDEX = 0

// Button color scheme for active state (matching TechStackCanvas style)
const BUTTON_ACTIVE_STYLES = {
  border: 'border-primary',
  text: 'text-primary',
  bg: 'bg-primary/10',
}

const navigationItems = [
  {
    label: 'web',
    secondaryLabel: 'Learn more about web',
    blurbIndex: 1,
    url: '/web',
  },
  {
    label: 'content',
    secondaryLabel: 'Learn more about content',
    blurbIndex: 2,
    url: '/content',
  },
]

export const HeroText = ({ heroBlock, cardsBlock }: HeroTextProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const blurb1Ref = useRef<HTMLDivElement>(null)
  const blurb2Ref = useRef<HTMLDivElement>(null)
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const currentBlurbIndexRef = useRef<number>(WELCOME_BLURB_INDEX)
  const isAnimatingRef = useRef<boolean>(false)
  const returnToWelcomeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null)
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null)
  const [countdownButtonIndex, setCountdownButtonIndex] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const strokeAnimationRefs = useRef<Record<number, gsap.core.Tween | null>>({})
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({})

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
      const tl = transition(sourceRef, targetRef, targetIndex, undefined, useDefaultColor)

      if (tl) {
        currentTimelineRef.current = tl

        // After animation completes, swap the refs
        tl.eventCallback('onComplete', () => {
          // Update current blurb index
          currentBlurbIndexRef.current = targetIndex
          isAnimatingRef.current = false
          currentTimelineRef.current = null

          // Reset button state when returning to welcome blurb
          if (targetIndex === WELCOME_BLURB_INDEX) {
            setActiveButtonIndex(null)
            setHoveredButtonIndex(null)
            setCountdownButtonIndex(null)
            // Stop all stroke animations
            Object.keys(strokeAnimationRefs.current).forEach((key) => {
              stopStrokeAnimation(Number(key))
            })
          }

          // Note: Don't swap text content here - the transition function handles the visual swap
          // We just need to track which blurb is now visible
        })
      } else {
        isAnimatingRef.current = false
      }
    })
  }

  // Handle hover on navigation items (desktop only)
  const handleLinkHover = (blurbIndex: number) => {
    if (!isMobile) {
      // Stop previous button's animation if any
      if (hoveredButtonIndex !== null && hoveredButtonIndex !== blurbIndex) {
        stopStrokeAnimation(hoveredButtonIndex)
      }
      // Clear countdown state if switching buttons
      if (countdownButtonIndex !== null && countdownButtonIndex !== blurbIndex) {
        stopStrokeAnimation(countdownButtonIndex)
        setCountdownButtonIndex(null)
      }
      setHoveredButtonIndex(blurbIndex)
      transitionToBlurb(blurbIndex)
      // Show full stroke immediately on hover
      showFullStroke(blurbIndex)
    }
  }

  // Handle mouse leave - return to welcome blurb after timeout (desktop only)
  const handleLinkLeave = () => {
    if (!isMobile) {
      // Start countdown animation when leaving hover (anticlockwise)
      if (hoveredButtonIndex !== null) {
        const blurbIndex = hoveredButtonIndex
        setCountdownButtonIndex(blurbIndex) // Keep SVG visible during countdown
        setHoveredButtonIndex(null)
        startStrokeAnimation(blurbIndex, 2000, false) // false = anticlockwise

        // Clear countdown state when animation completes
        setTimeout(() => {
          setCountdownButtonIndex(null)
        }, 2000)
      }

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
  }

  // Handle click on navigation items (mobile only)
  const handleLinkClick = (item: (typeof navigationItems)[0], e: React.MouseEvent) => {
    if (!isMobile) return

    // If this button is already active, let Link handle navigation
    if (activeButtonIndex === item.blurbIndex) {
      return
    }

    // Stop any existing stroke animation
    if (activeButtonIndex !== null) {
      stopStrokeAnimation(activeButtonIndex)
    }

    // First click: prevent navigation and transition to blurb
    e.preventDefault()
    setActiveButtonIndex(item.blurbIndex)
    transitionToBlurb(item.blurbIndex)
    startStrokeAnimation(item.blurbIndex, 5000, true) // 5 seconds for mobile, true = clockwise

    // Set timeout to return to welcome blurb on mobile
    if (returnToWelcomeTimeoutRef.current) {
      clearTimeout(returnToWelcomeTimeoutRef.current)
    }

    returnToWelcomeTimeoutRef.current = setTimeout(() => {
      if (currentBlurbIndexRef.current !== WELCOME_BLURB_INDEX) {
        transitionToBlurb(WELCOME_BLURB_INDEX)
        setActiveButtonIndex(null)
        stopStrokeAnimation(item.blurbIndex)
      }
      returnToWelcomeTimeoutRef.current = null
    }, 5000) // 5 second delay before returning to welcome blurb on mobile
  }

  // Show full stroke immediately (for desktop hover)
  const showFullStroke = (blurbIndex: number) => {
    // Use double requestAnimationFrame to ensure React has rendered the SVG
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const button = buttonRefs.current[blurbIndex]
        if (!button) return

        const wrapper = button.parentElement
        if (!wrapper) return

        const svgPath = wrapper.querySelector(
          `[data-stroke-path="${blurbIndex}"]`,
        ) as SVGPathElement
        if (!svgPath) {
          // If SVG not found, try again after a short delay (for first hover)
          setTimeout(() => showFullStroke(blurbIndex), 10)
          return
        }

        // Get button dimensions and border radius
        const rect = button.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const computedStyle = window.getComputedStyle(button)
        // Parse border-radius - get the first value if it's shorthand
        const borderRadiusStr =
          computedStyle.borderTopLeftRadius || computedStyle.borderRadius || '0.375rem'
        // Handle both px and rem values
        let borderRadius = parseFloat(borderRadiusStr)
        if (borderRadiusStr.includes('rem')) {
          borderRadius = borderRadius * 16 // Convert rem to px (assuming 16px base)
        }
        if (!borderRadius || isNaN(borderRadius)) {
          borderRadius = 6 // Default fallback
        }
        const strokeWidth = 2

        // Create rounded rectangle path
        const pathData = createRoundedRectPath(width, height, borderRadius, strokeWidth, false) // anticlockwise
        svgPath.setAttribute('d', pathData)

        const pathLength = svgPath.getTotalLength()

        const svg = svgPath.closest('svg')
        if (svg) {
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        }

        // Set full stroke (offset 0)
        svgPath.style.strokeDasharray = `${pathLength}`
        svgPath.style.strokeDashoffset = `0`

        // Stop any existing animation
        stopStrokeAnimation(blurbIndex)
      })
    })
  }

  // Start stroke animation for countdown
  const startStrokeAnimation = (
    blurbIndex: number,
    duration: number,
    clockwise: boolean = false,
  ) => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const button = buttonRefs.current[blurbIndex]
      if (!button) return

      // Find the SVG path element (it's in the parent div wrapper)
      const wrapper = button.parentElement
      if (!wrapper) return

      const svgPath = wrapper.querySelector(`[data-stroke-path="${blurbIndex}"]`) as SVGPathElement
      if (!svgPath) return

      // Get button dimensions and border radius
      const rect = button.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const computedStyle = window.getComputedStyle(button)
      // Parse border-radius - get the first value if it's shorthand
      const borderRadiusStr =
        computedStyle.borderTopLeftRadius || computedStyle.borderRadius || '0.375rem'
      // Handle both px and rem values
      let borderRadius = parseFloat(borderRadiusStr)
      if (borderRadiusStr.includes('rem')) {
        borderRadius = borderRadius * 16 // Convert rem to px (assuming 16px base)
      }
      if (!borderRadius || isNaN(borderRadius)) {
        borderRadius = 6 // Default fallback
      }
      const strokeWidth = 2

      // Create rounded rectangle path (clockwise or anticlockwise based on parameter)
      const pathData = createRoundedRectPath(width, height, borderRadius, strokeWidth, clockwise)
      svgPath.setAttribute('d', pathData)

      // Calculate path length
      const pathLength = svgPath.getTotalLength()

      // Set SVG viewBox to match button dimensions
      const svg = svgPath.closest('svg')
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      }

      // Set initial stroke-dasharray and stroke-dashoffset (start full, offset 0)
      svgPath.style.strokeDasharray = `${pathLength}`
      svgPath.style.strokeDashoffset = `0`

      // Stop any existing animation for this button
      stopStrokeAnimation(blurbIndex)

      // Animate stroke-dashoffset from 0 to pathLength (emptying)
      const tween = gsap.to(svgPath, {
        strokeDashoffset: pathLength,
        duration: duration / 1000, // Convert ms to seconds
        ease: 'linear',
      })

      strokeAnimationRefs.current[blurbIndex] = tween
    })
  }

  // Create rounded rectangle path (clockwise or anticlockwise)
  const createRoundedRectPath = (
    width: number,
    height: number,
    borderRadius: number,
    strokeWidth: number,
    clockwise: boolean = false,
  ): string => {
    // Position path to align with button's border
    // Button has border-radius, our path should match it exactly
    // Position at border center (0.5px offset for 1px border)
    const halfStroke = strokeWidth / 2
    const x = 0.5 - halfStroke // Center stroke on button's border
    const y = 0.5 - halfStroke
    const w = width - 1 + strokeWidth
    const h = height - 1 + strokeWidth
    // Use the button's exact border-radius - this is what creates the rounded corners
    const maxRadius = Math.min(w / 2, h / 2)
    const r = Math.max(0, Math.min(borderRadius, maxRadius))

    if (clockwise) {
      // Clockwise: start from top-left, go right → down → left → up
      const startX = x + r
      const startY = y

      // Top edge: move right
      const topRightX = x + w - r
      const topRightY = y

      // Top-right corner: arc down (clockwise, sweep flag 0)
      const rightTopX = x + w
      const rightTopY = y + r

      // Right edge: move down
      const rightBottomX = x + w
      const rightBottomY = y + h - r

      // Bottom-right corner: arc left (clockwise)
      const bottomRightX = x + w - r
      const bottomRightY = y + h

      // Bottom edge: move left
      const bottomLeftX = x + r
      const bottomLeftY = y + h

      // Bottom-left corner: arc up (clockwise)
      const leftBottomX = x
      const leftBottomY = y + h - r

      // Left edge: move up
      const leftTopX = x
      const leftTopY = y + r

      // Top-left corner: arc right back to start (clockwise)
      return `M ${startX},${startY} L ${topRightX},${topRightY} A ${r},${r} 0 0 0 ${rightTopX},${rightTopY} L ${rightBottomX},${rightBottomY} A ${r},${r} 0 0 0 ${bottomRightX},${bottomRightY} L ${bottomLeftX},${bottomLeftY} A ${r},${r} 0 0 0 ${leftBottomX},${leftBottomY} L ${leftTopX},${leftTopY} A ${r},${r} 0 0 0 ${startX},${startY} Z`
    } else {
      // Anticlockwise: start from top-left, go right → down → left → up (same as before)
      const startX = x + r
      const startY = y

      const topRightX = x + w - r
      const topRightY = y

      const rightTopX = x + w
      const rightTopY = y + r

      const rightBottomX = x + w
      const rightBottomY = y + h - r

      const bottomRightX = x + w - r
      const bottomRightY = y + h

      const bottomLeftX = x + r
      const bottomLeftY = y + h

      const leftBottomX = x
      const leftBottomY = y + h - r

      const leftTopX = x
      const leftTopY = y + r

      return `M ${startX},${startY} L ${topRightX},${topRightY} A ${r},${r} 0 0 1 ${rightTopX},${rightTopY} L ${rightBottomX},${rightBottomY} A ${r},${r} 0 0 1 ${bottomRightX},${bottomRightY} L ${bottomLeftX},${bottomLeftY} A ${r},${r} 0 0 1 ${leftBottomX},${leftBottomY} L ${leftTopX},${leftTopY} A ${r},${r} 0 0 1 ${startX},${startY} Z`
    }
  }

  // Stop stroke animation
  const stopStrokeAnimation = (blurbIndex: number) => {
    const tween = strokeAnimationRefs.current[blurbIndex]
    if (tween) {
      tween.kill()
      strokeAnimationRefs.current[blurbIndex] = null
    }

    // Reset stroke (make it full again)
    const button = buttonRefs.current[blurbIndex]
    if (button) {
      const wrapper = button.parentElement
      if (wrapper) {
        const svgPath = wrapper.querySelector(
          `[data-stroke-path="${blurbIndex}"]`,
        ) as SVGPathElement
        if (svgPath) {
          const pathLength = svgPath.getTotalLength()
          svgPath.style.strokeDashoffset = `0` // Reset to full
        }
      }
    }
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
      // Cleanup stroke animations
      Object.keys(strokeAnimationRefs.current).forEach((key) => {
        stopStrokeAnimation(Number(key))
      })
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-5 w-full">
      <div
        ref={containerRef}
        className=" font-black w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl relative h-[40vh] sm:h-[45vh] md:h-[50vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 sm:mb-6 md:mb-8 text-center"
      >
        <div ref={blurb1Ref} className="absolute top-0 left-0 w-full">
          {blurbs[WELCOME_BLURB_INDEX]}
        </div>
        <div ref={blurb2Ref} className="absolute top-0 left-0 w-full opacity-0">
          {blurbs[1]}
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 justify-center items-center w-full">
        {navigationItems.map((item) => {
          const isActive = activeButtonIndex === item.blurbIndex
          const isHovered = hoveredButtonIndex === item.blurbIndex
          const isCountdown = countdownButtonIndex === item.blurbIndex
          const isButtonActive = isActive || (!isMobile && (isHovered || isCountdown))
          const buttonText = isActive ? item.secondaryLabel : item.label

          // Determine active styling
          const activeClasses = isButtonActive
            ? `${BUTTON_ACTIVE_STYLES.border} ${BUTTON_ACTIVE_STYLES.text} ${BUTTON_ACTIVE_STYLES.bg}`
            : ''

          // Use Link with asChild when button is active on mobile (second click ready)
          if (isMobile && isActive) {
            return (
              <div
                key={item.label}
                className="relative inline-block"
                onMouseEnter={() => handleLinkHover(item.blurbIndex)}
                onMouseLeave={handleLinkLeave}
              >
                <Button
                  ref={(el) => {
                    if (el) buttonRefs.current[item.blurbIndex] = el
                  }}
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    'text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 flex-shrink-0 relative w-full',
                    activeClasses,
                  )}
                  onClick={(e) => handleLinkClick(item, e)}
                >
                  <Link href={item.url}>{buttonText}</Link>
                </Button>
                {/* SVG Countdown Path */}
                {isButtonActive && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <path
                      data-stroke-path={item.blurbIndex}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: '0',
                        strokeDashoffset: '0',
                      }}
                    />
                  </svg>
                )}
              </div>
            )
          }

          return (
            <div
              key={item.label}
              className="relative inline-block"
              onMouseEnter={() => handleLinkHover(item.blurbIndex)}
              onMouseLeave={handleLinkLeave}
            >
              <Button
                ref={(el) => {
                  if (el) buttonRefs.current[item.blurbIndex] = el
                }}
                asChild
                variant="outline"
                size="lg"
                className={cn(
                  'text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 flex-shrink-0 relative',
                  activeClasses,
                )}
                onClick={(e) => handleLinkClick(item, e)}
              >
                <Link href={item.url}>{buttonText}</Link>
              </Button>
              {/* SVG Countdown Path */}
              {isButtonActive && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    data-stroke-path={item.blurbIndex}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '0',
                      strokeDashoffset: '0',
                    }}
                  />
                </svg>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
