import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { applyHeartAction, getHeartCount, parseHeartCounts } from '@/lib/hearts'

type RouteContext = {
  params: Promise<{
    slug: string
  }>
}

async function findPublishedPostBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    select: {
      slug: true,
    },
  })

  return { payload, post: result.docs[0] ?? null }
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params
  const decodedSlug = decodeURIComponent(slug)
  const { payload, post } = await findPublishedPostBySlug(decodedSlug)

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const hearts = await payload.findGlobal({
    slug: 'hearts',
    overrideAccess: true,
  })
  const counts = parseHeartCounts(hearts.counts)

  return NextResponse.json({ count: getHeartCount(counts, post.id) })
}

export async function POST(req: Request, context: RouteContext) {
  const { slug } = await context.params
  const decodedSlug = decodeURIComponent(slug)

  let action: unknown
  try {
    const body = (await req.json()) as { action?: unknown }
    action = body.action
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (action !== 'add' && action !== 'remove') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const { payload, post } = await findPublishedPostBySlug(decodedSlug)

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const hearts = await payload.findGlobal({
    slug: 'hearts',
    overrideAccess: true,
  })
  const current = parseHeartCounts(hearts.counts)
  const { counts, count } = applyHeartAction(current, post.id, action)

  await payload.updateGlobal({
    slug: 'hearts',
    data: { counts },
    overrideAccess: true,
  })

  return NextResponse.json({ count })
}
