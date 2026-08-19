import type { BoardItem } from '@/payload-types'

import { BoardGrid } from './BoardGrid'

export function BoardShell({ items }: { items: BoardItem[] }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10">
      <p className="mb-2 font-mono text-sm text-text-prompt">
        jamjam:~$ ls board/ | <span className="text-accent">grep -v draft</span>
      </p>
      <p className="mb-8 font-mono text-sm text-text-muted">
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>
      <BoardGrid items={items} />
    </div>
  )
}
