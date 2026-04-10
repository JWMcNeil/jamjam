import type { Metadata } from 'next/types'

import { redirect } from 'next/navigation'

export const revalidate = 600

/**
 * Post listings live on a single /posts page (see posts/page.tsx).
 * Legacy /posts/page/* URLs redirect here for consistency.
 */
export default async function PostsPaginatedRedirect() {
  redirect('/posts')
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Posts — jamjam.dev',
    description: 'Blog posts about web development, AI, and building things.',
  }
}
