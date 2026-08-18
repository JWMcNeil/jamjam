import { applyHeartAction, getHeartCount, parseHeartCounts } from '@/lib/hearts'
import { describe, expect, it } from 'vitest'

describe('heart counts', () => {
  it('treats missing and invalid values as empty', () => {
    expect(parseHeartCounts(null)).toEqual({})
    expect(parseHeartCounts('nope')).toEqual({})
    expect(parseHeartCounts({ '12': 3, skip: 'x', also: -1 })).toEqual({ '12': 3 })
  })

  it('adds and removes without going below zero', () => {
    const added = applyHeartAction({}, 12, 'add')
    expect(added.count).toBe(1)
    expect(getHeartCount(added.counts, 12)).toBe(1)

    const removed = applyHeartAction(added.counts, 12, 'remove')
    expect(removed.count).toBe(0)

    const floor = applyHeartAction({}, 12, 'remove')
    expect(floor.count).toBe(0)
  })
})
