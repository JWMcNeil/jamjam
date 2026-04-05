import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
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
      title: true,
      slug: true,
      excerpt: true,
      year: true,
      lifecycle: true,
      tags: true,
      meta: true,
    },
  })

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-16">
      <p className="font-mono text-sm text-text-prompt mb-2">jamjam~$ ls projects/ | sort -r</p>
      <p className="font-mono text-sm text-text-muted mb-8">{projects.totalDocs} projects</p>

      <div className="space-y-px bg-divider">
        {projects.docs.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="bg-page p-4 flex justify-between items-start hover:bg-card transition-colors"
          >
            <div>
              <p className="text-text-heading font-medium">{project.title}</p>
              {project.excerpt && <p className="text-text-secondary text-sm mt-1">{project.excerpt}</p>}
            </div>
            <div className="text-right shrink-0 ml-4">
              {project.year && <p className="text-text-secondary text-sm">{project.year}</p>}
              <p className="text-text-prompt font-mono text-sm">→</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects — jamjam.dev',
    description: 'Selected web and AI projects, with build notes and links.',
  }
}
