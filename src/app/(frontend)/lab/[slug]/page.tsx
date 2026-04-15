import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import RichText from '@/components/RichText'
import { ResetToolButton } from '@/components/lab/ResetToolButton'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveLabToolBySlug } from '@/lib/lab/resolveTools'

type ToolPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = await resolveLabToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const toolModule = await tool.loadUi()
  const ToolUi = toolModule.default

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-border-subtle px-6 py-4 lg:h-[4.75rem] lg:py-0">
        <div className="min-w-0">
          <h1 className="text-base font-semibold text-text-heading">{tool.name}</h1>
          <p className="truncate text-xs text-text-secondary">{tool.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="font-mono text-[10px] text-text-muted">
            {tool.model ? `${tool.model} · streaming` : 'client only'}
          </div>
          <ResetToolButton toolSlug={tool.toolKey} />
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <ToolUi />

        {tool.writeUp || tool.blogPostUrl ? (
          <details className="mt-8 rounded-sm border border-border-subtle bg-page p-4">
            <summary className="cursor-pointer font-mono text-xs text-text-mid">More info</summary>
            <div className="mt-4 space-y-4">
              {tool.writeUp ? (
                <RichText data={tool.writeUp} className="prose-sm max-w-none" enableGutter={false} />
              ) : null}
              {tool.blogPostUrl ? (
                <a
                  href={tool.blogPostUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex font-mono text-xs text-primary hover:underline"
                >
                  Read related blog post
                </a>
              ) : null}
            </div>
          </details>
        ) : null}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const labDoc = await queryLabBySlug({ slug: decodedSlug })

  return generateMeta({ doc: labDoc })
}

const queryLabBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'lab',
    depth: 1,
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs[0] ?? null
})

export async function generateStaticParams() {
  return []
}
