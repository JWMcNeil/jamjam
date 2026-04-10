const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

export function formatPostPinnedMonthYear(
  timestamp: string | null | undefined,
): string | null {
  if (!timestamp) return null
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return null
  return monthYearFormatter.format(date)
}
