'use client'

import { Button } from '@/components/ui/button'
import { clearToolSessionState } from '@/lib/lab/state/sessionToolState'

type ResetToolButtonProps = {
  toolSlug: string
}

export function ResetToolButton({ toolSlug }: ResetToolButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8 rounded-sm px-3 font-mono text-[10px] uppercase cursor-pointer"
      onClick={() => {
        clearToolSessionState(toolSlug)
        window.location.reload()
      }}
    >
      Reset
    </Button>
  )
}
