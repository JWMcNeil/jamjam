/** Fixed marketing routes selectable as “Site page” in the link field (e.g. Header nav). */
export const SITE_PAGE_PATHS = {
  home: '/',
  posts: '/posts',
  projects: '/projects',
  contact: '/contact',
} as const

export type SitePageSlug = keyof typeof SITE_PAGE_PATHS

export const SITE_PAGE_OPTIONS: { label: string; value: SitePageSlug }[] = [
  { label: 'Home', value: 'home' },
  { label: 'Posts', value: 'posts' },
  { label: 'Projects', value: 'projects' },
  { label: 'Contact', value: 'contact' },
]

export function getHrefForSitePage(slug: string | null | undefined): string | null {
  if (!slug || !(slug in SITE_PAGE_PATHS)) return null
  return SITE_PAGE_PATHS[slug as SitePageSlug]
}
