import type { BoardItem } from '@/payload-types'

import { BoardTile } from './BoardTile'

export function BoardGrid({ items }: { items: BoardItem[] }) {
  if (items.length === 0) {
    return <p className="font-mono text-sm text-text-muted">ls: board/: no items</p>
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-4">
      {items.map((item, index) => (
        <BoardTile key={item.id} item={item} priority={index < 4} />
      ))}
    </div>
  )
}
