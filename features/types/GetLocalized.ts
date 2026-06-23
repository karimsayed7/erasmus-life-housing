export const getLocalized = (
  value: unknown,
  locale: string
): string => {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value)
  ) {
    const obj = value as Record<string, string>
    return obj[locale] ?? obj.en ?? ''
  }

  return ''
}