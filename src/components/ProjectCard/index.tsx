import Link from 'next/link'
import React from 'react'

import type { Media as MediaType, Project } from '@/payload-types'

import { Media } from '@/components/Media'
import {
  projectLifecycleBadgeLabel,
  projectTypePrompt,
} from '@/utilities/projectLabels'
import { tagPillClasses } from '@/utilities/tagPillClasses'

export type ProjectCardProject = Pick<
  Project,
  'slug' | 'title' | 'excerpt' | 'type' | 'lifecycle' | 'heroImage' | 'tags'
>

export const ProjectCard: React.FC<{
  project: ProjectCardProject
}> = ({ project }) => {
  const { slug, title, excerpt, type, lifecycle, heroImage, tags } = project
  const hero =
    heroImage && typeof heroImage === 'object' && 'url' in heroImage ? heroImage : null

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:bg-card-hover">
        <div className="relative aspect-video w-full bg-muted">
          {hero ? (
            <Media
              fill
              pictureClassName="absolute inset-0 block h-full w-full"
              imgClassName="object-cover"
              resource={hero as MediaType}
              size="33vw"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-sm text-text-prompt">{projectTypePrompt[type]}</span>
            <span className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-xs text-text-prompt tabular-nums">
              {projectLifecycleBadgeLabel[lifecycle]}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-snug text-text-heading group-hover:text-text-primary md:text-xl">
            {title}
          </h2>
          {excerpt ? (
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">{excerpt}</p>
          ) : null}
          {tags && tags.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => {
                if (typeof tag !== 'object' || tag === null) return null
                const { label, colour, id } = tag
                const text = label ? `#${label}` : '#tag'
                return (
                  <span key={id} className={tagPillClasses(colour)}>
                    {text}
                  </span>
                )
              })}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  )
}
