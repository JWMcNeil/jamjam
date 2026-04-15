import configPromise from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'

import { labRegistry } from '@/lib/lab/registry'
import type { LabOverlayEntry, LabPrimaryTag, LabResolvedTool } from '@/lib/lab/types'

function normalizeOverlay(entries: LabOverlayEntry[]): Map<string, LabOverlayEntry> {
  return new Map(entries.map((entry) => [entry.toolKey, entry]))
}

function normalizePrimaryTag(primaryTag: unknown): LabPrimaryTag | null {
  if (!primaryTag || typeof primaryTag !== 'object') return null

  const candidate = primaryTag as Partial<LabPrimaryTag>
  if (typeof candidate.id !== 'number') return null
  if (typeof candidate.label !== 'string' || !candidate.label.trim()) return null
  if (typeof candidate.colour !== 'string' || !candidate.colour.trim()) return null

  return {
    id: candidate.id,
    label: candidate.label,
    colour: candidate.colour,
  }
}

async function readLabOverlay(): Promise<LabOverlayEntry[]> {
  noStore()

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'lab' as never,
      depth: 1,
      limit: 200,
      pagination: false,
      sort: 'order',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    return result.docs.map((rawDoc) => {
      const doc = rawDoc as Record<string, unknown>

      return {
        toolKey: typeof doc.toolKey === 'string' ? doc.toolKey : '',
        title: typeof doc.title === 'string' ? doc.title : null,
        slug: typeof doc.slug === 'string' ? doc.slug : null,
        description: typeof doc.description === 'string' ? doc.description : null,
        model: typeof doc.model === 'string' ? doc.model : null,
        writeUp: (doc.writeUp ?? null) as LabOverlayEntry['writeUp'],
        blogPostUrl: typeof doc.blogPostUrl === 'string' ? doc.blogPostUrl : null,
        kind: doc.kind === 'tool' || doc.kind === 'app' || doc.kind === 'ai' ? doc.kind : null,
        group: doc.group === 'ai' || doc.group === 'apps' || doc.group === 'tools' ? doc.group : null,
        enabled: typeof doc.enabled === 'boolean' ? doc.enabled : null,
        order: typeof doc.order === 'number' ? doc.order : null,
        primaryTag: normalizePrimaryTag(doc.primaryTag),
      }
    })
  } catch {
    // Gracefully fall back to code defaults if the collection is not ready yet.
    return []
  }
}

export async function resolveLabTools(): Promise<LabResolvedTool[]> {
  const overlayEntries = await readLabOverlay()
  const overlayMap = normalizeOverlay(overlayEntries)

  return overlayEntries
    .map((overlay): LabResolvedTool | null => {
      const tool = labRegistry.find((entry) => entry.slug === overlay.toolKey)
      if (!tool) return null

      const mergedOverlay = overlayMap.get(tool.slug) ?? overlay
      const resolvedSlug = mergedOverlay.slug?.trim() || tool.slug

      return {
        ...tool,
        toolKey: tool.slug,
        slug: resolvedSlug,
        enabled: mergedOverlay.enabled ?? true,
        order: mergedOverlay.order ?? tool.defaultOrder,
        group: mergedOverlay.group ?? tool.defaultGroup,
        kind: mergedOverlay.kind ?? tool.catalogKind,
        name: mergedOverlay.title?.trim() || tool.name,
        description: mergedOverlay.description?.trim() || tool.description,
        model: mergedOverlay.model?.trim() || tool.model,
        writeUp: mergedOverlay.writeUp ?? tool.writeUp ?? null,
        blogPostUrl: mergedOverlay.blogPostUrl?.trim() || tool.blogPostUrl || null,
        primaryTag: mergedOverlay.primaryTag ?? null,
      }
    })
    .filter((tool): tool is LabResolvedTool => tool !== null)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.name.localeCompare(b.name)
    })
}

export async function resolveEnabledLabTools(): Promise<LabResolvedTool[]> {
  const tools = await resolveLabTools()
  return tools.filter((tool) => tool.enabled)
}

export async function resolveLabToolBySlug(slug: string): Promise<LabResolvedTool | null> {
  const tools = await resolveEnabledLabTools()
  return tools.find((tool) => tool.slug === slug) ?? null
}
