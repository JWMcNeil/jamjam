import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { About } from '@/components/About'
import { LatestPosts } from '@/components/LatestPosts'
import { ProjectCard } from '@/components/ProjectCard'
import { HeroHeadline } from '@/components/home/HeroHeadline'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Button } from '@/components/ui/button'
import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { pageMeta } from '@/utilities/generateMeta'
import { JsonLd } from '@/components/JsonLd'
import { jsonLdForWebsite } from '@/utilities/jsonLd'
import { queryFeaturedBoardItems } from '@/lib/board/fetch'
import { getPayload } from 'payload'

export const revalidate = 600

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const description =
    siteSettings.aboutBio?.trim() ||
    'Creative developer building websites, web apps, and AI-powered tools in Melbourne.'

  return pageMeta({
    path: '/',
    title: 'jamjam.dev',
    description,
  })
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [featuredProjects, latestPosts, siteSettings, featuredWork] = await Promise.all([
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
    queryFeaturedBoardItems(4),
  ])

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <JsonLd data={jsonLdForWebsite(siteSettings)} />
      {/* Hero */}
      <section className="pb-10 pt-10 text-center md:pb-12 md:pt-14">
        <HeroHeadline
          heroWeb={siteSettings.heroWeb}
          heroAi={siteSettings.heroAi}
          heroFilm={siteSettings.heroFilm}
          heroPhotos={siteSettings.heroPhotos}
        />
        {siteSettings.heroSubheading ? (
          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg text-text-secondary md:text-xl">
            {siteSettings.heroSubheading}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact" variant="default" size="lg">
            <span aria-hidden className="text-text-prompt">
              $
            </span>{' '}
            say hello
          </Button>
          <Button href="/what-i-do" variant="outline" size="lg" showArrow>
            what I do
          </Button>
        </div>
      </section>

      <SelectedWork items={featuredWork} />

      <LatestPosts posts={latestPosts.docs} totalDocs={latestPosts.totalDocs} />

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
