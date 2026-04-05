import type { Header } from '@/payload-types'

type NavLink = NonNullable<NonNullable<Header['navItems']>[number]['link']>

export function getNavItemHref(link: NavLink | null | undefined): string | null {
  if (!link) return null
  const { type, reference, url } = link
  if (
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    reference.value &&
    'slug' in reference.value &&
    reference.value.slug
  ) {
    return `/${reference.relationTo}/${reference.value.slug}`
  }
  return url ?? null
}

/** Display path like ~/home, ~/home/projects for mobile nav sheet rows */
export function hrefToTildePath(href: string): string {
  const normalized = href.trim()
  if (!normalized || normalized === '/') return '~/home'
  const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`
  const noDup = withSlash.replace(/\/+/g, '/')
  return noDup === '/' ? '~/home' : `~/home${noDup}`
}

export function isContactNavLink(link: NavLink | null | undefined): boolean {
  if (!link) return false
  const href = getNavItemHref(link)
  const label = (link.label ?? '').trim().toLowerCase()
  if (label === 'contact') return true
  if (!href) return false
  const path = href.split('?')[0]?.replace(/\/+$/, '') ?? ''
  return path === '/contact' || path.endsWith('/contact')
}
