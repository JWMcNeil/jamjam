'use client'

import { useState, type ReactNode } from 'react'

import { StatusDot } from '@/components/StatusDot'
import { ToolLink } from '@/components/lab/ToolLink'
import type { LabPrimaryTag, LabSidebarGroup } from '@/lib/lab/types'

type LabShellProps = {
  tools: LabShellTool[]
  children: ReactNode
}

type LabShellTool = {
  slug: string
  name: string
  primaryTag: LabPrimaryTag | null
  group: LabSidebarGroup
}

type LabSection = {
  group: LabSidebarGroup
  title: string
}

const sections: LabSection[] = [
  { group: 'ai', title: 'AI' },
  { group: 'apps', title: 'Apps' },
  { group: 'tools', title: 'Tools' },
]

export function LabShell({ tools, children }: LabShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true)
  const mobilePanelId = 'lab-mobile-nav-panel'
  const navTools = tools.map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    primaryTag: tool.primaryTag,
    group: tool.group,
  }))

  return (
    <div className="grid min-h-0 grid-cols-1 overflow-hidden rounded-sm border border-border-subtle bg-card lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="self-start bg-page lg:self-stretch lg:border-r lg:border-border-subtle">
        <div className="flex flex-col justify-center border-b border-border-subtle px-4 py-4 lg:h-[4.75rem] lg:py-0">
          <p className="font-mono text-[11px] text-text-muted">Lab.</p>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-text-mid">
            <StatusDot className="ml-0 size-2" />
            <span>online</span>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-between border-b border-border-subtle px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-text-muted lg:hidden"
          aria-expanded={isMobileNavOpen}
          aria-controls={mobilePanelId}
          onClick={() => setIsMobileNavOpen((previousState) => !previousState)}
        >
          <span>Experiments</span>
          <span className="text-text-mid">{isMobileNavOpen ? 'hide' : 'show'}</span>
        </button>

        <div id={mobilePanelId} className={`${isMobileNavOpen ? 'block' : 'hidden'} lg:block`}>
          <nav className="max-h-[40vh] overflow-y-auto px-3 py-3 lg:max-h-[calc(100vh-18rem)]">
            <div className="space-y-4">
              {sections.map((section) => {
                const sectionTools = navTools.filter((tool) => tool.group === section.group)
                if (!sectionTools.length) return null

                return (
                  <section key={section.group}>
                    <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {section.title}
                    </p>
                    <ul className="space-y-1">
                      {sectionTools.map((tool) => (
                        <ToolLink
                          key={tool.slug}
                          slug={tool.slug}
                          name={tool.name}
                          primaryTag={tool.primaryTag}
                        />
                      ))}
                    </ul>
                  </section>
                )
              })}
            </div>
          </nav>

        </div>
      </aside>

      <main className="min-h-[40rem] border-t border-border-subtle lg:border-t-0">{children}</main>
    </div>
  )
}
