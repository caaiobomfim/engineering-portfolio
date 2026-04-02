'use client'

import { useState, useEffect } from 'react'

/**
 * Returns a debounced version of `value` that only updates after `delay` ms
 * of inactivity. Useful for deferring expensive operations (search, URL sync)
 * while keeping the UI input responsive.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
