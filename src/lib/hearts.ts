export type HeartCounts = Record<string, number>

export function parseHeartCounts(value: unknown): HeartCounts {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const counts: HeartCounts = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const n = typeof raw === 'number' ? raw : Number(raw)
    if (Number.isFinite(n) && n >= 0) {
      counts[key] = Math.floor(n)
    }
  }
  return counts
}

export function getHeartCount(counts: HeartCounts, postId: number | string): number {
  return counts[String(postId)] ?? 0
}

export function applyHeartAction(
  counts: HeartCounts,
  postId: number | string,
  action: 'add' | 'remove',
): { counts: HeartCounts; count: number } {
  const key = String(postId)
  const current = counts[key] ?? 0
  const next = action === 'add' ? current + 1 : Math.max(0, current - 1)
  return {
    counts: { ...counts, [key]: next },
    count: next,
  }
}
