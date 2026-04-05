import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'

import type { Project } from '@/payload-types'
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
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug
  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project) return <PayloadRedirects url={url} />

  return (
    <article className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-16">
      <PayloadRedirects disableNotFound url={url} />

      <div className="mb-8">
        <p className="font-mono text-sm text-text-prompt mb-2">jamjam~$ cat projects/{project.slug}/readme.md</p>
        <h1 className="text-3xl md:text-5xl font-bold text-text-heading">{project.title}</h1>
        {project.excerpt && <p className="text-text-secondary mt-4 max-w-2xl">{project.excerpt}</p>}
      </div>

      {project.heroImage && typeof project.heroImage === 'object' && (
        <div className="mb-10 border border-border bg-card overflow-hidden">
          <Media resource={project.heroImage} />
        </div>
      )}

      {project.description && (
        <div className="mb-10">
          <RichText className="max-w-[48rem]" data={project.description} enableGutter={false} />
        </div>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <section className="mb-10">
          <p className="text-text-prompt font-mono text-sm mb-4">// tech stack</p>
          <div className="space-y-px bg-divider">
            {project.techStack.map((item, index) => (
              <div key={item.id || index} className="bg-page p-3 flex items-center justify-between">
                <span className="text-text-heading">{item.name}</span>
                <span className="text-text-secondary text-sm">{item.role}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="flex gap-3">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border rounded-md px-3 py-2 text-sm hover:bg-card transition-colors"
          >
            $ open live →
          </Link>
        )}
        {project.codeUrl && (
          <Link
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border rounded-md px-3 py-2 text-sm hover:bg-card transition-colors"
          >
            $ view code →
          </Link>
        )}
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft,
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
