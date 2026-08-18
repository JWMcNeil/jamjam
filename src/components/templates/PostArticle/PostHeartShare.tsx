'use client'

import React, { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jamjam:hearted-posts'

const PIXEL_HEART = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
] as const

function readHeartedIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

function writeHeartedIds(ids: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

function PixelHeart({ filled }: { filled: boolean }) {
  return (
    <span
      className="inline-grid shrink-0 gap-0"
      style={{ gridTemplateColumns: 'repeat(8, 0.125rem)' }}
      aria-hidden
    >
      {PIXEL_HEART.flatMap((row, y) =>
        row.map((on, x) => (
          <span
            key={`${y}-${x}`}
            className={
              on
                ? filled
                  ? 'h-0.5 w-0.5 bg-accent'
                  : 'h-0.5 w-0.5 bg-accent/35'
                : 'h-0.5 w-0.5 bg-transparent'
            }
          />
        )),
      )}
    </span>
  )
}

export function PostHeartShare({
  postId,
  slug,
  title,
  initialCount,
}: {
  postId: number
  slug: string
  title: string
  initialCount: number
}) {
  const [count, setCount] = useState(initialCount)
  const [hearted, setHearted] = useState(false)
  const [shareLabel, setShareLabel] = useState('Share')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setHearted(readHeartedIds().has(String(postId)))
  }, [postId])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}/heart`)
        if (!res.ok) return
        const data = (await res.json()) as { count?: unknown }
        if (!cancelled && typeof data.count === 'number') {
          setCount(data.count)
        }
      } catch {
        // keep SSR count
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const toggleHeart = useCallback(async () => {
    if (pending) return
    const nextHearted = !hearted
    const action = nextHearted ? 'add' : 'remove'
    const previousCount = count
    const previousHearted = hearted

    setPending(true)
    setHearted(nextHearted)
    setCount((c) => (nextHearted ? c + 1 : Math.max(0, c - 1)))

    const ids = readHeartedIds()
    if (nextHearted) ids.add(String(postId))
    else ids.delete(String(postId))
    writeHeartedIds(ids)

    try {
      const res = await fetch(`/api/posts/${encodeURIComponent(slug)}/heart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error('Heart request failed')
      const data = (await res.json()) as { count?: unknown }
      if (typeof data.count === 'number') setCount(data.count)
    } catch {
      setHearted(previousHearted)
      setCount(previousCount)
      const rollback = readHeartedIds()
      if (previousHearted) rollback.add(String(postId))
      else rollback.delete(String(postId))
      writeHeartedIds(rollback)
    } finally {
      setPending(false)
    }
  }, [count, hearted, pending, postId, slug])

  const share = useCallback(async () => {
    const url = window.location.href
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, url })
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }

    try {
      await navigator.clipboard.writeText(url)
      setShareLabel('Copied')
      window.setTimeout(() => setShareLabel('Share'), 1600)
    } catch {
      setShareLabel('Share')
    }
  }, [title])

  return (
    <div className="mt-10 flex items-center gap-5">
      <button
        type="button"
        onClick={() => void toggleHeart()}
        disabled={pending}
        aria-pressed={hearted}
        aria-label={hearted ? 'Remove heart' : 'Heart this post'}
        className="inline-flex items-center gap-2 font-mono text-sm tabular-nums text-text-muted transition-colors hover:text-text-heading disabled:opacity-60"
      >
        <PixelHeart filled={hearted} />
        <span>{count}</span>
      </button>
      <button
        type="button"
        onClick={() => void share()}
        className="font-mono text-sm text-text-muted transition-colors hover:text-text-heading"
      >
        {shareLabel}
      </button>
    </div>
  )
}
