import { memoryCardStorageCalcMeta } from '@/lib/lab/tools/memory-card-storage-calc/meta'
import { roastMyWebsiteMeta } from '@/lib/lab/tools/roast-my-website/meta'
import type { LabCodeTool } from '@/lib/lab/types'

export const labRegistry: LabCodeTool[] = [
  {
    ...roastMyWebsiteMeta,
    runtime: 'ai',
    catalogKind: 'ai',
    defaultGroup: 'ai',
    defaultOrder: 20,
    loadUi: () => import('@/lib/lab/tools/roast-my-website/ui'),
    loadHandler: () => import('@/lib/lab/tools/roast-my-website/handler'),
  },
  {
    ...memoryCardStorageCalcMeta,
    runtime: 'app',
    catalogKind: 'app',
    defaultGroup: 'apps',
    defaultOrder: 10,
    loadUi: () => import('@/lib/lab/tools/memory-card-storage-calc/ui'),
  },
]

export const labRegistryBySlug = new Map(labRegistry.map((tool) => [tool.slug, tool]))
