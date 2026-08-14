import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { About } from '@/components/About'
import { LatestPosts } from '@/components/LatestPosts'
import { ProjectCard } from '@/components/ProjectCard'
import RichText from '@/components/RichText'
import { StatusDot } from '@/components/StatusDot'
import { BracketLink } from '@/components/ui/bracket-link'
import { Button } from '@/components/ui/button'
import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getPayload } from 'payload'

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const description =
    siteSettings.aboutBio?.trim() ||
    'Creative developer building websites, web apps, and AI-powered tools in Melbourne.'

  return {
    title: 'jamjam.dev',
    description,
    openGraph: mergeOpenGraph({
      title: 'jamjam.dev',
      description,
    }),
  }
}

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
        <h1 className="text-display font-black text-text-heading motion-safe:animate-subtle-fade">
          Runs on curiosity, mostly.
          <br />
          <span>Making</span>{' '}
          <span className="text-text-secondary">web & Ai</span>{' '}
          <span>things out of it.</span>
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="flex flex-wrap items-center gap-x-1 font-mono text-xs lg:text-sm">
            <span className="text-text-muted">jamjam:~$&nbsp;</span>
            <span className="text-accent">{siteSettings.statusText}</span>
            <StatusDot />
          </p>
          <BracketLink href="/contact">say hello</BracketLink>
        </div>
        {siteSettings.homeIntro && (
          <div className="mt-10 min-w-0 max-w-2xl text-pretty">
            <RichText
              data={siteSettings.homeIntro}
              enableGutter={false}
              proseInvert={false}
              proseLayout="flush"
              className="min-w-0 text-lg text-text-muted prose-p:mt-0 prose-p:text-text-secondary prose-strong:text-text-heading prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none text-pretty"
            />
          </div>
        )}
      </section>

      {/* Featured Projects */}
      <section className="py-2 lg:py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted font-mono text-xs lg:text-sm">// featured projects</p>
          <Button href="/projects" variant="outline" size="default">
            projects
          </Button>
        </div>
        {featuredProjects.docs.length === 0 ? (
          <p className="rounded-sm border border-border bg-page p-4 font-mono text-sm text-text-muted">
            No featured projects yet.{' '}
            <Link
              href="/projects"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Browse all projects
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.docs.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                subduedImage
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </section>

      <LatestPosts posts={latestPosts.docs} totalDocs={latestPosts.totalDocs} />

      <About
        name={siteSettings.name}
        aboutSectionLabel={siteSettings.aboutSectionLabel}
        aboutHeadline={siteSettings.aboutHeadline}
        aboutBio={siteSettings.aboutBio}
        aboutPhoto={siteSettings.aboutPhoto}
        statusText={siteSettings.statusText}
        email={siteSettings.email}
      />
    </div>
  )
}
