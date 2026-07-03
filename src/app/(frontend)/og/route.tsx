import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

function terminalPath(type: string | undefined, slug: string | undefined): string {
  if (type === 'project' && slug) return `~/projects/${slug}`
  if (slug) return `~/posts/${slug}`
  return '~/jamjam.dev'
}

export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')?.trim() || 'jamjam.dev'
  const type = searchParams.get('type') || undefined
  const slug = searchParams.get('slug') || undefined
  const path = terminalPath(type, slug)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'oklch(17% 0 0)',
          color: 'oklch(90% 0 0)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: 56,
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              color: '#44aa99',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 26,
            }}
          >
            jamjam~$ cat {path}
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: 'oklch(60% 0 0)',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 24,
            }}
          >
            {path}
          </div>
        </div>
      </div>
    ),
    { height: 630, width: 1200 },
  )
}
