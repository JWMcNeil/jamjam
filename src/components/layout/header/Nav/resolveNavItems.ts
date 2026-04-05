import type { Header } from '@/payload-types'

const fallbackNavItems: NonNullable<Header['navItems']> = [
  {
    link: {
      type: 'custom',
      label: 'Projects',
      url: '/projects',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Posts',
      url: '/posts',
    },
  },
]

export function getResolvedHeaderNavItems(data: Header): NonNullable<Header['navItems']> {
  const navItems = data?.navItems || []
  return navItems.length > 0 ? navItems : fallbackNavItems
}
