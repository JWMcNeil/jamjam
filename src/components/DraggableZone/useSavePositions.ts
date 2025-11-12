/**
 * Hook to save draggable card positions to Payload CMS
 * Supports breakpoint-specific positions for responsive layouts
 * 
 * Usage example:
 * ```tsx
 * const { savePosition, saveAllPositions, isSaving } = useSavePositions({
 *   pageId: '123',
 *   blockId: 'draggable-cards-block-id',
 *   enabled: true, // Set to false to disable auto-saving
 * })
 * 
 * // Listen to card movement events (includes breakpoint info)
 * useEffect(() => {
 *   const handleCardMove = (event: CustomEvent) => {
 *     const { cardId, normalizedX, normalizedY, breakpoint } = event.detail
 *     savePosition(cardId, normalizedX, normalizedY, breakpoint)
 *   }
 *   
 *   window.addEventListener('draggableCardMoved', handleCardMove as EventListener)
 *   return () => window.removeEventListener('draggableCardMoved', handleCardMove as EventListener)
 * }, [savePosition])
 * ```
 */

import { useState, useCallback, useRef } from 'react'
import type { Breakpoint } from '@/hooks/useBreakpoint'
import type { Page, DraggableCardsBlock } from '@/payload-types'

type SavePositionsOptions = {
  pageId?: string
  blockId?: string
  enabled?: boolean
  debounceMs?: number
  onSave?: (cardId: string, normalizedX: number, normalizedY: number, breakpoint: Breakpoint) => Promise<void>
}

type CardPosition = {
  cardId: string
  normalizedX: number
  normalizedY: number
  breakpoint: Breakpoint
}

export const useSavePositions = (options: SavePositionsOptions = {}) => {
  const { enabled = true, debounceMs = 500, onSave } = options
  const [isSaving, setIsSaving] = useState(false)
  const pendingSaves = useRef<Map<string, CardPosition>>(new Map())
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Default save function that updates Payload CMS via API
  const defaultSave = useCallback(
    async (cardId: string, normalizedX: number, normalizedY: number, breakpoint: Breakpoint) => {
      if (!options.pageId || !options.blockId) {
        console.warn('useSavePositions: pageId and blockId are required for saving')
        return
      }

      try {
        // Fetch the current page to get the block structure
        const pageResponse = await fetch(`/api/pages/${options.pageId}`)
        if (!pageResponse.ok) {
          throw new Error('Failed to fetch page')
        }

        const page = (await pageResponse.json()) as Page

        // Find the draggable cards block
        const blockIndex = page.layout?.findIndex(
          (block): block is DraggableCardsBlock =>
            block.blockType === 'draggableCards' && block.id === options.blockId,
        )

        if (blockIndex === -1) {
          throw new Error('Draggable cards block not found')
        }

        // Find the card within the block
        const block = page.layout[blockIndex] as DraggableCardsBlock
        const cardIndex = block.cards?.findIndex((card) => card.id === cardId)

        if (cardIndex === -1) {
          throw new Error('Card not found in block')
        }

        // Update the card's breakpoint-specific position
        const updatedLayout = [...page.layout]
        const currentCard = block.cards[cardIndex]
        
        // Initialize positions object if it doesn't exist
        const positions = currentCard.positions || {}
        
        // Update the specific breakpoint position
        updatedLayout[blockIndex] = {
          ...block,
          cards: block.cards.map((card, idx) =>
            idx === cardIndex
              ? {
                  ...card,
                  positions: {
                    ...positions,
                    [breakpoint]: {
                      normalizedX,
                      normalizedY,
                    },
                  },
                }
              : card,
          ),
        }

        // Save the updated page
        const saveResponse = await fetch(`/api/pages/${options.pageId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            layout: updatedLayout,
          }),
        })

        if (!saveResponse.ok) {
          throw new Error('Failed to save positions')
        }
      } catch (error) {
        console.error('Error saving card position:', error)
        throw error
      }
    },
    [options.pageId, options.blockId],
  )

  const savePosition = useCallback(
    async (cardId: string, normalizedX: number, normalizedY: number, breakpoint: Breakpoint) => {
      if (!enabled) return

      // Store the position for batch saving (including breakpoint)
      pendingSaves.current.set(cardId, { cardId, normalizedX, normalizedY, breakpoint })

      // Clear existing timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      // Set new timer for debounced save
      debounceTimer.current = setTimeout(async () => {
        setIsSaving(true)
        const saves = Array.from(pendingSaves.current.values())
        pendingSaves.current.clear()

        try {
          if (onSave) {
            // Use custom save function if provided
            await Promise.all(
              saves.map(({ cardId, normalizedX, normalizedY, breakpoint }) =>
                onSave(cardId, normalizedX, normalizedY, breakpoint),
              ),
            )
          } else {
            // Use default save function
            await Promise.all(
              saves.map(({ cardId, normalizedX, normalizedY, breakpoint }) =>
                defaultSave(cardId, normalizedX, normalizedY, breakpoint),
              ),
            )
          }
        } catch (error) {
          console.error('Error saving positions:', error)
        } finally {
          setIsSaving(false)
        }
      }, debounceMs)
    },
    [enabled, debounceMs, onSave, defaultSave],
  )

  const saveAllPositions = useCallback(
    async (
      positions: Record<string, { normalizedX: number; normalizedY: number; breakpoint: Breakpoint }>,
    ) => {
      if (!enabled) return

      setIsSaving(true)
      try {
        if (onSave) {
          await Promise.all(
            Object.entries(positions).map(([cardId, { normalizedX, normalizedY, breakpoint }]) =>
              onSave(cardId, normalizedX, normalizedY, breakpoint),
            ),
          )
        } else {
          await Promise.all(
            Object.entries(positions).map(([cardId, { normalizedX, normalizedY, breakpoint }]) =>
              defaultSave(cardId, normalizedX, normalizedY, breakpoint),
            ),
          )
        }
      } catch (error) {
        console.error('Error saving all positions:', error)
        throw error
      } finally {
        setIsSaving(false)
      }
    },
    [enabled, onSave, defaultSave],
  )

  return {
    savePosition,
    saveAllPositions,
    isSaving,
  }
}

