import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const HEADING_TAGS = new Set(['h2', 'h3', 'h4'])

export type LexicalHeadingOutlineItem = {
  id: string
  level: number
  text: string
}

function extractTextFromLexicalNodes(nodes: unknown): string {
  if (!Array.isArray(nodes)) return ''
  return nodes
    .map((raw) => {
      if (!raw || typeof raw !== 'object') return ''
      const node = raw as Record<string, unknown>
      if (node.type === 'text' && typeof node.text === 'string') return node.text
      if (Array.isArray(node.children)) return extractTextFromLexicalNodes(node.children)
      return ''
    })
    .join('')
}

function slugifyHeading(text: string, used: Set<string>): string {
  const base =
    text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'section'

  let id = base
  let n = 2
  while (used.has(id)) {
    id = `${base}-${n}`
    n += 1
  }
  used.add(id)
  return id
}

function walkLexicalNodes(
  nodes: unknown[] | undefined,
  out: LexicalHeadingOutlineItem[],
  usedIds: Set<string>,
): void {
  if (!nodes?.length) return

  for (const raw of nodes) {
    if (!raw || typeof raw !== 'object') continue
    const node = raw as Record<string, unknown>

    if (node.type === 'heading' && typeof node.tag === 'string' && HEADING_TAGS.has(node.tag)) {
      const text = extractTextFromLexicalNodes(node.children).trim()
      if (text.length > 0) {
        out.push({
          id: slugifyHeading(text, usedIds),
          level: Number(node.tag.slice(1)),
          text,
        })
      }
    }

    if (Array.isArray(node.children)) {
      walkLexicalNodes(node.children as unknown[], out, usedIds)
    }
  }
}

/** Outline for post TOC / heading anchors. Only headings in the main editor tree (not nested block sub-editors). */
export function extractLexicalHeadings(
  content: DefaultTypedEditorState | null | undefined,
): LexicalHeadingOutlineItem[] {
  if (!content?.root?.children || !Array.isArray(content.root.children)) return []
  const out: LexicalHeadingOutlineItem[] = []
  walkLexicalNodes(content.root.children as unknown[], out, new Set())
  return out
}
