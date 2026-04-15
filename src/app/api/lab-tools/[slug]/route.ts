import type { NextRequest } from 'next/server'

import { resolveLabToolBySlug } from '@/lib/lab/resolveTools'

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
