import configPromise from '@payload-config'
import { About } from '@/components/About'
import { LatestPosts } from '@/components/LatestPosts'
import { ProjectCard } from '@/components/ProjectCard'
import { StatusDot } from '@/components/StatusDot'
import { TerminalButton } from '@/components/ui/terminal-button'
import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [featuredProjects, latestPosts, siteSettings] = await Promise.all([
    payload.find({
      collection: 'projects',
      where: {
        _status: { equals: 'published' },
        featured: { equals: true },
      },
      sort: 'order',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
      select: {
        title: true,
        slug: true,
        tags: true,
        publishedAt: true,
      },
    }),
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
  ])

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl  font-black text-text-heading leading-tight">
          Full-stack dev.
          <br />
          <span className="text-text-secondary">Making things with</span>{' '}
          <span className="font-bold text-text-heading">web + AI.</span>
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-1 font-mono text-sm lg:text-base">
          <span className="text-text-muted">
            jamjam:~$&nbsp;{' '}
          </span>
          <span className="text-accent">{siteSettings.statusText}</span>
          <StatusDot />
        </p>
      </section>

      {/* Featured Projects */}
      <section className="py-8 lg:py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted font-mono text-xs lg:text-sm">// featured projects</p>
          <Button asChild variant="outline" size="default">
            <Link href="/projects">projects</Link>
          </Button>
        </div>     
        <div className="grid grid-cols-1 gap-8 md:gap-4  md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.docs.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <LatestPosts posts={latestPosts.docs} totalDocs={latestPosts.totalDocs} />

      <About
        name={siteSettings.name}
        aboutSectionLabel={siteSettings.aboutSectionLabel}
        aboutHeadline={siteSettings.aboutHeadline}
        aboutBio={siteSettings.aboutBio}
        aboutPhoto={siteSettings.aboutPhoto}
        statusText={siteSettings.statusText}
        statusNote={siteSettings.statusNote}
        email={siteSettings.email}
      />
    </div>
  )
}
