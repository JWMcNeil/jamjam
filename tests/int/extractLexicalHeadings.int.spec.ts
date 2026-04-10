import { extractLexicalHeadings } from '@/utilities/extractLexicalHeadings'
import { describe, expect, it } from 'vitest'

/** Minimal lexical fixtures (extractLexicalHeadings only needs type/tag/children shape). */
type FixtureState = Parameters<typeof extractLexicalHeadings>[0]

const textNode = (text: string) => ({
  type: 'text' as const,
  text,
  version: 1,
  format: 0,
  style: '',
  mode: 'normal' as const,
  detail: 0,
})

describe('extractLexicalHeadings', () => {
  it('produces unique ids for duplicate heading text', () => {
    const duplicateOnly = {
      root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'heading',
            tag: 'h2',
            version: 1,
            children: [textNode('Same title')],
          },
          {
            type: 'heading',
            tag: 'h2',
            version: 1,
            children: [textNode('Same title')],
          },
        ],
      },
    } as FixtureState

    const outline = extractLexicalHeadings(duplicateOnly)
    expect(outline).toHaveLength(2)
    expect(outline[0].id).toBe('same-title')
    expect(outline[1].id).toBe('same-title-2')
  })

  it('collects h2–h4 in order with levels and stable ids', () => {
    const ordered = {
      root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          { type: 'heading', tag: 'h2', version: 1, children: [textNode('Alpha')] },
          { type: 'heading', tag: 'h3', version: 1, children: [textNode('Beta')] },
          { type: 'heading', tag: 'h2', version: 1, children: [textNode('Alpha')] },
        ],
      },
    } as FixtureState
    const outline = extractLexicalHeadings(ordered)
    expect(outline.map((h) => h.text)).toEqual(['Alpha', 'Beta', 'Alpha'])
    expect(outline.map((h) => h.level)).toEqual([2, 3, 2])
    expect(outline.map((h) => h.id)).toEqual(['alpha', 'beta', 'alpha-2'])
  })

  it('returns empty for missing or empty content', () => {
    expect(extractLexicalHeadings(undefined)).toEqual([])
    const empty = {
      root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [],
      },
    } as FixtureState
    expect(extractLexicalHeadings(empty)).toEqual([])
  })
})
