import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'https://jamjam.dev'

    const dateFallback = new Date().toISOString()

    const projects = await payload.find({
      collection: 'projects',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const projectSitemap = projects.docs
      .filter((project) => Boolean(project?.slug))
      .map((project) => ({
        loc: `${SITE_URL}/projects/${project.slug}`,
        lastmod: project.updatedAt || dateFallback,
      }))

    return [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/projects`, lastmod: dateFallback },
      { loc: `${SITE_URL}/posts`, lastmod: dateFallback },
      { loc: `${SITE_URL}/board`, lastmod: dateFallback },
      { loc: `${SITE_URL}/contact`, lastmod: dateFallback },
      ...projectSitemap,
    ]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
