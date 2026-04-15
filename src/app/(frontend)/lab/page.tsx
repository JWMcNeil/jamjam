import { redirect } from 'next/navigation'

import { resolveEnabledLabTools } from '@/lib/lab/resolveTools'

export default async function LabIndexPage() {
  const tools = await resolveEnabledLabTools()

  if (tools.length > 0) {
    redirect(`/lab/${tools[0].slug}`)
  }

  return (
    <div className="flex h-full min-h-[40rem] items-center justify-center p-8">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-text-muted">/lab</p>
        <h1 className="mt-3 text-2xl text-text-heading">No experiments found!</h1>
        <p className="mt-3 text-sm text-text-secondary">
          Check back soon for new lab experiments 👨🏻‍🔬
        </p>
      </div>
    </div>
  )
}
