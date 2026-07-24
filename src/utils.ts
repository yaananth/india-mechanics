export function formatDate(date: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!date) return 'Present'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(new Date(`${date}T00:00:00Z`))
}

export function formatYear(date: string | null) {
  return date ? date.slice(0, 4) : 'Present'
}

export function formatValue(
  value: number,
  format: string,
  unit: string,
  compact = false,
) {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: compact ? 'compact' : 'standard',
    }).format(value)
  }
  if (format === 'percent') {
    return `${new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: value < 10 ? 1 : 0,
    }).format(value)}%`
  }
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: value < 10 ? 2 : 1,
    notation: compact ? 'compact' : 'standard',
  }).format(value)
  return unit === '0–1 index' ? formatted : `${formatted}`
}

export function changeBetween(
  observations: Array<{ period: number; value: number }>,
  years = 10,
) {
  if (observations.length < 2) return null
  const latest = observations.at(-1)
  if (!latest) return null
  const target = latest.period - years
  const earlier = [...observations]
    .reverse()
    .find((observation) => observation.period <= target)
  if (!earlier) return null
  return {
    from: earlier,
    to: latest,
    absolute: latest.value - earlier.value,
    percent:
      earlier.value === 0
        ? null
        : ((latest.value - earlier.value) / Math.abs(earlier.value)) * 100,
  }
}

export function sentenceCase(value: string) {
  return value
    .replace(/-/g, ' ')
    .replace(/^\w/, (character) => character.toUpperCase())
}
