import type { Metadata } from 'next'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ProjectShowcaseCarousel } from '@/components/ProjectShowcaseCarousel'
import { PostBodyRichText } from '@/components/RichText/PostBodyRichText'
import configPromise from '@payload-config'
import { extractLexicalHeadings } from '@/utilities/extractLexicalHeadings'
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

import type { Project } from '@/payload-types'
import type { ProjectShowcaseSlide } from '@/types/projectShowcase'
import { generateMeta } from '@/utilities/generateMeta'
import { populateProjectGalleryMuxVideos } from '@/utilities/populateProjectGalleryMux'
import { JsonLd } from '@/components/JsonLd'
import { jsonLdForDoc } from '@/utilities/jsonLd'

export const revalidate = 600

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

  const showcaseSlides = getProjectShowcaseSlides(project)
  const outline = extractLexicalHeadings(project.description)
  const headingIds = outline.map((h) => h.id)

  return (
    <article className="mx-auto w-full max-w-[1100px] px-4 py-6 md:px-10 md:py-14">
      <JsonLd data={jsonLdForDoc({ kind: 'project', doc: project })} />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <Link
        href="/projects"
        className="mb-2 inline-block font-mono text-sm text-text-prompt transition-colors hover:text-text-heading"
      >
        ← ls projects/
      </Link>

      <header className="mb-10 space-y-6 pt-4 md:pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-text-heading md:text-3xl lg:text-[2.125rem] lg:leading-[1.2]">
              {project.title}
            </h1>
            {project.excerpt ? (
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-[1.75] text-text-secondary md:text-[1.125rem]">
                {project.excerpt}
              </p>
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
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-10 md:gap-12">
          {showcaseSlides.length > 0 ? (
            <ProjectShowcaseCarousel className="mb-0" slides={showcaseSlides} />
          ) : null}

          {project.description ? (
            <PostBodyRichText
              className="pt-1"
              data={project.description}
              headingIds={headingIds}
              enableGutter={false}
              proseLayout="flush"
            />
          ) : null}
        </div>

        <aside className="space-y-5 self-start font-mono text-sm lg:sticky lg:top-24">
          {project.techStack && project.techStack.length > 0 ? (
            <section className="border border-border bg-card p-4">
              <p className="mb-3 text-xs text-text-muted">// tech stack</p>
              <div className="overflow-hidden rounded-sm border border-border">
                {project.techStack.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex items-baseline justify-between gap-4 bg-page px-3 py-2.5 ${
                      index > 0 ? 'border-t border-border' : ''
                    }`}
                  >
                    <span className="shrink-0 text-xs lowercase text-text-dim">{item.role}</span>
                    <span className="min-w-0 text-right font-medium text-text-heading">{item.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-5 border border-border bg-card p-4">
            <div>
              <p className="mb-1 text-xs text-text-muted">// type</p>
              <p className="text-text-primary">{projectTypeHeroLabel[project.type]}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-text-muted">// year</p>
              <p className="tabular-nums text-text-primary">
                {project.year != null ? project.year : '—'}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-text-muted">// status</p>
              <p className="text-text-primary">{projectLifecycleDetailLabel[project.lifecycle]}</p>
            </div>
            {project.role?.trim() ? (
              <div>
                <p className="mb-1 text-xs text-text-muted">// role</p>
                <p className="text-text-primary">{project.role.trim()}</p>
              </div>
            ) : null}
          </section>

          {outline.length > 0 ? (
            <nav aria-label="Table of contents" className="border border-border bg-card p-4">
              <p className="mb-3 text-xs text-text-muted">// contents</p>
              <ul className="space-y-2.5 p-0 text-sm leading-snug">
                {outline.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-text-secondary transition-colors hover:text-text-heading"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </div>

      <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          {nextProject ? (
            <>
              <p className="mb-2 font-mono text-xs text-text-muted">// next project</p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="font-medium text-text-heading transition-colors hover:text-accent"
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

  return generateMeta({ doc: project, kind: 'project' })
}

function getProjectShowcaseSlides(project: Project): ProjectShowcaseSlide[] {
  const slides: ProjectShowcaseSlide[] = []
  if (project.heroImage && typeof project.heroImage === 'object') {
    slides.push({ kind: 'media', media: project.heroImage })
  }
  if (project.gallery?.length) {
    for (const row of project.gallery) {
      if (!row) continue
      if (row.slideType === 'mux') {
        if (row.muxVideo && typeof row.muxVideo === 'object') {
          slides.push({ kind: 'mux', video: row.muxVideo })
        }
      } else if (row.image && typeof row.image === 'object') {
        slides.push({ kind: 'media', media: row.image })
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

  const doc = (result.docs?.[0] as Project) || null
  return populateProjectGalleryMuxVideos(doc, payload, draft)
})
