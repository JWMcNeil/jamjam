import React from 'react'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { BreadcrumbSetter } from './BreadcrumbSetter'

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
    select: {
      projectType: true,
    },
  })

  return result.docs?.[0] || null
})

const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  photography: 'Photography',
  videography: 'Videography',
}

const PROJECT_TYPE_PATHS: Record<string, string> = {
  web: '/web',
  photography: '/photography',
  videography: '/videography',
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  // If project exists and has a projectType, create an override for the "projects" segment
  const override =
    project?.projectType && PROJECT_TYPE_LABELS[project.projectType]
      ? {
          label: PROJECT_TYPE_LABELS[project.projectType],
          href: PROJECT_TYPE_PATHS[project.projectType],
          segmentIndex: 0, // "projects" is the first segment after home
        }
      : null

  return (
    <>
      <BreadcrumbSetter override={override} />
      {children}
    </>
  )
}

