'use client'

import React, { useEffect, useState } from 'react'

import { getHeartCount, parseHeartCounts } from '@/lib/hearts'

import './index.scss'

const baseClass = 'before-dashboard'

type HeartRow = {
  id: number
  title: string
  count: number
}

export default function BeforeDashboard() {
  const [rows, setRows] = useState<HeartRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const postsQuery = new URLSearchParams({
          depth: '0',
          draft: 'false',
          limit: '200',
          pagination: 'false',
          'select[title]': 'true',
          'where[_status][equals]': 'published',
          sort: '-publishedAt',
        })

        const [postsRes, heartsRes] = await Promise.all([
          fetch(`/api/posts?${postsQuery.toString()}`, { credentials: 'include' }),
          fetch('/api/globals/hearts', { credentials: 'include' }),
        ])

        if (!postsRes.ok) throw new Error('Could not load posts')
        if (!heartsRes.ok) throw new Error('Could not load hearts')

        const postsJson = (await postsRes.json()) as {
          docs?: Array<{ id: number; title?: string }>
        }
        const heartsJson = (await heartsRes.json()) as { counts?: unknown }
        const counts = parseHeartCounts(heartsJson.counts)

        const ranked = (postsJson.docs ?? [])
          .map((post) => ({
            id: post.id,
            title: post.title?.trim() || 'untitled',
            count: getHeartCount(counts, post.id),
          }))
          .sort((a, b) => {
            if (a.count === 0 && b.count !== 0) return 1
            if (b.count === 0 && a.count !== 0) return -1
            if (b.count !== a.count) return b.count - a.count
            return a.title.localeCompare(b.title)
          })

        if (!cancelled) setRows(ranked)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load hearts')
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={baseClass}>
      <p className={`${baseClass}__label`}>// hearts</p>
      {error ? <p className={`${baseClass}__empty`}>{error}</p> : null}
      {rows === null && !error ? <p className={`${baseClass}__empty`}>Loading...</p> : null}
      {rows && rows.length === 0 ? (
        <p className={`${baseClass}__empty`}>No published posts yet.</p>
      ) : null}
      {rows && rows.length > 0 ? (
        <ol className={`${baseClass}__list`}>
          {rows.map((row) => (
            <li key={row.id} className={`${baseClass}__row`}>
              <a className={`${baseClass}__title`} href={`/admin/collections/posts/${row.id}`}>
                {row.title}
              </a>
              <span className={`${baseClass}__count`}>{row.count}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
