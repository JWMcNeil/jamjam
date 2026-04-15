import type { ReactNode } from 'react'

import { LabShell } from '@/components/lab/LabShell'
import { resolveEnabledLabTools } from '@/lib/lab/resolveTools'

type LayoutProps = {
  children: ReactNode
}

export default async function LabLayout({ children }: LayoutProps) {
  const tools = (await resolveEnabledLabTools()).map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    primaryTag: tool.primaryTag,
    group: tool.group,
  }))

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <LabShell tools={tools}>{children}</LabShell>
    </section>
  )
}
