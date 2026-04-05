import type { FieldHook } from 'payload'

const WORDS_PER_MINUTE = 200

function extractTextFromLexical(node: Record<string, unknown>): string {
  if (!node) return ''

  let text = ''

  if (node.text && typeof node.text === 'string') {
    text += node.text + ' '
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractTextFromLexical(child as Record<string, unknown>)
    }
  }

  return text
}

export const calculateReadTime: FieldHook = ({ data }) => {
  if (!data?.content) return 0

  const content = data.content as { root?: Record<string, unknown> }
  const text = extractTextFromLexical(content.root || content)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}
