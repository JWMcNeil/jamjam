import type { Project } from '@/payload-types'

/** Monospace prompt line on project cards, e.g. `// client`. */
export const projectTypePrompt: Record<Project['type'], string> = {
  client: '// client',
  demo: '// demo',
  experiment: '// experiment',
  personal: '// personal',
}

export const projectTypeHeroLabel: Record<Project['type'], string> = {
  demo: 'Demo',
  client: 'Client',
  experiment: 'Experiment',
  personal: 'Personal',
}

/** Lowercase lifecycle label for the outlined badge on cards. */
export const projectLifecycleBadgeLabel: Record<Project['lifecycle'], string> = {
  live: 'live',
  archived: 'archived',
  'in-progress': 'in-progress',
}
