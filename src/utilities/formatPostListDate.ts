const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

export function formatPostListDate(
  timestamp: string | null | undefined,
): { line1: string; line2: string; iso: string } | null {
  if (!timestamp) return null
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return null

  return {
    line1: monthDayFormatter.format(date),
    line2: String(date.getFullYear()),
    iso: date.toISOString(),
  }
}
