'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_PREFIX = 'lab-tool-state'

function storageKey(toolSlug: string, key: string): string {
  return `${STORAGE_PREFIX}:${toolSlug}:${key}`
}

function listKey(toolSlug: string): string {
  return `${STORAGE_PREFIX}:${toolSlug}:__keys`
}

function addTrackedKey(toolSlug: string, key: string): void {
  if (typeof window === 'undefined') return
  const trackedKeysRaw = window.sessionStorage.getItem(listKey(toolSlug))
  const trackedKeys = trackedKeysRaw ? (JSON.parse(trackedKeysRaw) as string[]) : []
  if (trackedKeys.includes(key)) return
  trackedKeys.push(key)
  window.sessionStorage.setItem(listKey(toolSlug), JSON.stringify(trackedKeys))
}

export function clearToolSessionState(toolSlug: string): void {
  if (typeof window === 'undefined') return
  const trackedKeysRaw = window.sessionStorage.getItem(listKey(toolSlug))
  const trackedKeys = trackedKeysRaw ? (JSON.parse(trackedKeysRaw) as string[]) : []

  for (const key of trackedKeys) {
    window.sessionStorage.removeItem(storageKey(toolSlug, key))
  }

  window.sessionStorage.removeItem(listKey(toolSlug))
}

export function useToolSessionState<T>(
  toolSlug: string,
  key: string,
  initialValue: T,
): [T, (value: T | ((previous: T) => T)) => void] {
  const sessionKey = useMemo(() => storageKey(toolSlug, key), [toolSlug, key])
  const [value, setValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedValue = window.sessionStorage.getItem(sessionKey)
      if (savedValue !== null) {
        setValue(JSON.parse(savedValue) as T)
      }
    } catch {
      setValue(initialValue)
    } finally {
      setIsHydrated(true)
    }
  }, [sessionKey, initialValue])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isHydrated) return
    try {
      window.sessionStorage.setItem(sessionKey, JSON.stringify(value))
      addTrackedKey(toolSlug, key)
    } catch {
      // Ignore storage write issues to keep tool usable.
    }
  }, [sessionKey, toolSlug, key, value, isHydrated])

  const setPersistedValue = useCallback((nextValue: T | ((previous: T) => T)) => {
    setValue((previous) =>
      typeof nextValue === 'function' ? (nextValue as (previous: T) => T)(previous) : nextValue,
    )
  }, [])

  return [value, setPersistedValue]
}
