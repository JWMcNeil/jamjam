import type { BoardItem } from '@/payload-types'

import { GalleryBrowser } from './GalleryBrowser'

export function BoardShell({ items }: { items: BoardItem[] }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10">
      <p className="mb-2 font-mono text-sm text-text-prompt">
        jamjam:~$ ls gallery/ | <span className="text-accent">grep -v draft</span>
      </p>
      <GalleryBrowser items={items} />
    </div>
  )
}
