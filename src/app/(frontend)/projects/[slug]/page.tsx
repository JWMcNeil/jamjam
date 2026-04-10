import type { Metadata } from 'next'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ProjectShowcaseCarousel } from '@/components/ProjectShowcaseCarousel'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { getNextPublishedProject } from '@/utilities/getNextPublishedProject'
import {
  projectLifecycleDetailLabel,
  projectTypeHeroLabel,
} from '@/utilities/projectLabels'
import { Button } from '@/components/ui/button'
import { tagPillClasses } from '@/utilities/tagPillClasses'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'

import type { Media, Project } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return projects.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug
  const [project, nextProject] = await Promise.all([
    queryProjectBySlug({ slug: decodedSlug }),
    getNextPublishedProject(decodedSlug),
  ])

  if (!project) return <PayloadRedirects url={url} />

  const showcaseMedia = getProjectShowcaseMedia(project)

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-16 md:px-4 ">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <Link
        href="/projects"
        className="mb-6 inline-block font-mono text-sm text-text-prompt transition-colors hover:text-text-heading"
      >
        ← ls projects/
      </Link>

      <p className="mb-4 font-mono text-sm text-text-prompt">
        jamjam~$ cat projects/{project.slug}/readme.md
      </p>

      <div className="mb-10 space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-text-heading md:text-5xl">{project.title}</h1>
            {project.excerpt ? (
              <p className="mt-4 max-w-2xl text-text-secondary">{project.excerpt}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="default"
              >
                open live
              </Button>
            ) : null}
            {project.codeUrl ? (
              <Button
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="default"
              >
                $ view code →
              </Button>
            ) : null}
          </div>
        </div>

        {project.tags && project.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => {
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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-start">
        <div className="min-w-0">
          {showcaseMedia.length > 0 ? (
            <ProjectShowcaseCarousel className="mb-0" resources={showcaseMedia} />
          ) : null}
        </div>

        <aside className="space-y-8 self-start font-mono text-sm lg:sticky lg:top-24">
          {project.techStack && project.techStack.length > 0 ? (
            <section>
              <p className="mb-2 text-text-prompt">// tech stack</p>
              <div className="overflow-hidden rounded-sm border border-border bg-card">
                {project.techStack.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
                      index > 0 ? 'border-t border-border' : ''
                    }`}
                  >
                    <span className="min-w-0 text-text-heading">{item.name}</span>
                    <span className="shrink-0 text-text-secondary lowercase">{item.role}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-5 text-text-secondary">
            <div>
              <p className="mb-1 text-text-prompt">// type</p>
              <p className="text-text-heading">{projectTypeHeroLabel[project.type]}</p>
            </div>
            <div>
              <p className="mb-1 text-text-prompt">// year</p>
              <p className="text-text-heading tabular-nums">
                {project.year != null ? project.year : '—'}
              </p>
            </div>
            <div>
              <p className="mb-1 text-text-prompt">// status</p>
              <p className="text-text-heading">{projectLifecycleDetailLabel[project.lifecycle]}</p>
            </div>
            {project.role?.trim() ? (
              <div>
                <p className="mb-1 text-text-prompt">// role</p>
                <p className="text-text-heading">{project.role.trim()}</p>
              </div>
            ) : null}
          </section>
        </aside>
      </div>

      {project.description ? (
        <div className="mt-10">
          <RichText
            className="max-w-3xl"
            data={project.description}
            enableGutter={false}
            proseLayout="flush"
          />
        </div>
      ) : null}

      <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          {nextProject ? (
            <>
              <p className="mb-2 font-mono text-sm text-text-prompt">// next project</p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="font-medium text-text-heading transition-colors hover:text-text-primary"
              >
                {nextProject.title} →
              </Link>
            </>
          ) : null}
        </div>
        <Link
          href="/projects"
          className="shrink-0 font-mono text-sm text-text-secondary transition-colors hover:text-text-heading sm:text-right"
        >
          $ ls projects/ →
        </Link>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  return generateMeta({ doc: project })
}

function getProjectShowcaseMedia(project: Project): Media[] {
  const slides: Media[] = []
  if (project.heroImage && typeof project.heroImage === 'object') {
    slides.push(project.heroImage)
  }
  if (project.gallery?.length) {
    for (const row of project.gallery) {
      if (row.image && typeof row.image === 'object') {
        slides.push(row.image)
      }
    }
  }
  return slides
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Project) || null
})
