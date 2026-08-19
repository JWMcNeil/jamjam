import type { Metadata } from 'next/types'

import { ProjectsFilteredGrid } from '@/components/ProjectsFilteredGrid'
import { pageMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 50,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    sort: 'order',
    select: {
      slug: true,
      title: true,
      excerpt: true,
      type: true,
      lifecycle: true,
      heroImage: true,
      tags: true,
    },
  })

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10">
      <p className="mb-2 font-mono text-sm text-text-prompt">
        jamjam:~$ ls projects/ | <span className="text-accent">grep -v draft</span>
      </p>
      <p className="mb-8 font-mono text-sm text-text-muted">{projects.totalDocs} projects</p>

      <ProjectsFilteredGrid projects={projects.docs} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    path: '/projects',
    title: 'Projects — jamjam.dev',
    description: 'Selected web and AI projects, with build notes and links.',
    imageTitle: 'Projects',
    imageType: 'project',
  })
}
