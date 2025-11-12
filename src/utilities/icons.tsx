import * as HeroIcons from '@heroicons/react/24/outline'
import type { ComponentType, SVGProps } from 'react'

// Common icon names for sidebar navigation
export const iconOptions = [
  { label: 'Home', value: 'HomeIcon' },
  { label: 'User', value: 'UserIcon' },
  { label: 'Users', value: 'UsersIcon' },
  { label: 'Document', value: 'DocumentIcon' },
  { label: 'Documents', value: 'DocumentsIcon' },
  { label: 'Folder', value: 'FolderIcon' },
  { label: 'Search', value: 'MagnifyingGlassIcon' },
  { label: 'Settings', value: 'Cog6ToothIcon' },
  { label: 'Bell', value: 'BellIcon' },
  { label: 'Heart', value: 'HeartIcon' },
  { label: 'Star', value: 'StarIcon' },
  { label: 'Bookmark', value: 'BookmarkIcon' },
  { label: 'Calendar', value: 'CalendarIcon' },
  { label: 'Clock', value: 'ClockIcon' },
  { label: 'Chart', value: 'ChartBarIcon' },
  { label: 'Grid', value: 'Squares2X2Icon' },
  { label: 'List', value: 'Bars3Icon' },
  { label: 'Menu', value: 'Bars3BottomLeftIcon' },
  { label: 'Arrow Right', value: 'ArrowRightIcon' },
  { label: 'Arrow Left', value: 'ArrowLeftIcon' },
  { label: 'Arrow Up', value: 'ArrowUpIcon' },
  { label: 'Arrow Down', value: 'ArrowDownIcon' },
  { label: 'Chevron Right', value: 'ChevronRightIcon' },
  { label: 'Chevron Left', value: 'ChevronLeftIcon' },
  { label: 'Plus', value: 'PlusIcon' },
  { label: 'Minus', value: 'MinusIcon' },
  { label: 'X', value: 'XMarkIcon' },
  { label: 'Check', value: 'CheckIcon' },
  { label: 'Information', value: 'InformationCircleIcon' },
  { label: 'Exclamation', value: 'ExclamationTriangleIcon' },
  { label: 'Question', value: 'QuestionMarkCircleIcon' },
  { label: 'Lock', value: 'LockClosedIcon' },
  { label: 'Unlock', value: 'LockOpenIcon' },
  { label: 'Key', value: 'KeyIcon' },
  { label: 'Shield', value: 'ShieldCheckIcon' },
  { label: 'Eye', value: 'EyeIcon' },
  { label: 'Eye Slash', value: 'EyeSlashIcon' },
  { label: 'Pencil', value: 'PencilIcon' },
  { label: 'Trash', value: 'TrashIcon' },
  { label: 'Share', value: 'ShareIcon' },
  { label: 'Link', value: 'LinkIcon' },
  { label: 'Photo', value: 'PhotoIcon' },
  { label: 'Video', value: 'VideoCameraIcon' },
  { label: 'Music', value: 'MusicalNoteIcon' },
  { label: 'Envelope', value: 'EnvelopeIcon' },
  { label: 'Phone', value: 'PhoneIcon' },
  { label: 'Globe', value: 'GlobeAltIcon' },
  { label: 'Map', value: 'MapPinIcon' },
  { label: 'Shopping Cart', value: 'ShoppingCartIcon' },
  { label: 'Credit Card', value: 'CreditCardIcon' },
  { label: 'Tag', value: 'TagIcon' },
  { label: 'Fire', value: 'FireIcon' },
  { label: 'Lightning', value: 'BoltIcon' },
  { label: 'Sun', value: 'SunIcon' },
  { label: 'Moon', value: 'MoonIcon' },
  { label: 'Cloud', value: 'CloudIcon' },
  { label: 'RSS', value: 'SignalIcon' },
] as const

export type IconName = (typeof iconOptions)[number]['value']

// Type-safe icon component getter
export const getIcon = (iconName: string | null | undefined): ComponentType<SVGProps<SVGSVGElement>> | null => {
  if (!iconName) return null

  // Type assertion needed because HeroIcons is a namespace
  const IconComponent = (HeroIcons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[iconName]

  return IconComponent || null
}


