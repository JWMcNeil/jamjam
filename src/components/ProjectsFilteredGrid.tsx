'use client'

import { ProjectCard, type ProjectCardProject } from '@/components/ProjectCard'
import { cn } from '@/utilities/ui'
import React, { useMemo, useState } from 'react'

function projectHasTag(project: ProjectCardProject, tagId: number): boolean {
  const tags = project.tags
  if (!tags?.length) return false
  return tags.some((t) => (typeof t === 'object' && t !== null ? t.id === tagId : t === tagId))
}

function deriveTagsFromProjects(projects: ProjectCardProject[]): { id: number; label: string }[] {
  const map = new Map<number, string>()
  for (const p of projects) {
    if (!p.tags) continue
    for (const t of p.tags) {
      if (typeof t === 'object' && t !== null && 'id' in t && typeof t.label === 'string') {
        map.set(t.id, t.label)
      }
    }
  }
  return [...map.entries()]
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

const pillBase =
  'rounded-md border px-3 py-1.5 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
const pillInactive = 'border-border bg-page text-text-heading hover:bg-card'
const pillActive = 'border-border-subtle bg-grey-150 text-text-heading hover:bg-grey-200'

export const ProjectsFilteredGrid: React.FC<{
  projects: ProjectCardProject[]
}> = ({ projects }) => {
  const tagOptions = useMemo(() => deriveTagsFromProjects(projects), [projects])
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (selectedTagId === null) return projects
    return projects.filter((p) => projectHasTag(p, selectedTagId))
  }, [projects, selectedTagId])

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="toolbar" aria-label="Filter by tag">
        <button
          type="button"
          aria-pressed={selectedTagId === null}
          className={cn(pillBase, selectedTagId === null ? pillActive : pillInactive)}
          onClick={() => setSelectedTagId(null)}
        >
          all
        </button>
        {tagOptions.map((tag) => {
          const active = selectedTagId === tag.id
          return (
            <button
              key={tag.id}
              type="button"
              aria-pressed={active}
              className={cn(pillBase, active ? pillActive : pillInactive)}
              onClick={() => setSelectedTagId(tag.id)}
            >
              #{tag.label}
            </button>
          )
        })}
      </div>
      <p className="mb-6 font-mono text-xs text-text-muted lg:text-sm">// projects + demos</p>
      {filtered.length === 0 ? (
        <p className="text-sm text-text-secondary">No projects with this tag.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </>
  )
}
