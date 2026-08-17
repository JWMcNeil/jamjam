import type { NextRequest } from 'next/server'

import { resolveLabToolBySlug } from '@/lib/lab/resolveTools'

/** Keep the roast tool in Sydney next to Neon; streaming Gemini can exceed the default. */
export const preferredRegion = 'syd1'
export const maxDuration = 30

type RouteContext = {
  params: Promise<{
    slug: string
  }>
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  const tool = await resolveLabToolBySlug(slug)

  if (!tool || tool.runtime !== 'ai' || !tool.loadHandler) {
    return new Response('Not found', { status: 404 })
  }

  const toolModule = await tool.loadHandler()
  return toolModule.handler(req)
}
