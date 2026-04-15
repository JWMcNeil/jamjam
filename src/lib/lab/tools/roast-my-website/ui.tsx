'use client'

import { useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useToolSessionState } from '@/lib/lab/state/sessionToolState'
import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'

type RoastScores = {
  design?: string
  ux?: string
  cringe?: string
}

function parseErrorStatus(text: string): number | null {
  const directMatch = text.match(/\b([45]\d{2})\b/)
  if (!directMatch) return null

  const status = Number.parseInt(directMatch[1], 10)
  return Number.isFinite(status) ? status : null
}

function formatRoastError(errorText: string): { friendly: string; technical: string } {
  const technical = errorText.trim()
  const status = parseErrorStatus(technical)

  if (status === 429) {
    return {
      friendly: 'Ahh, out of AI credits perhaps — or rate-limited for now. Give it a minute and try again.',
      technical,
    }
  }

  if (status === 503) {
    return {
      friendly:
        'Ahh, Gemini is having a wee wobble right now (service unavailable). Try again in a minute.',
      technical,
    }
  }

  return {
    friendly: 'Ahh, Gemini refused that roast right now. Try again in a wee second.',
    technical,
  }
}

function parseScores(text: string): { body: string; scores: RoastScores | null } {
  const scoreLine = text.match(/^\s*\**\s*SCORES?\s*:?.*$/im)?.[0] ?? ''
  const scoreSource = scoreLine || text

  const extractScore = (label: 'design' | 'ux' | 'cringe'): string | null => {
    // Be tolerant of markdown/bullets and optional "/10" formatting from model output.
    const regex = new RegExp(`${label}[\\s*_` + '`' + `-]*[:=-]?[\\s*_` + '`' + `-]*(\\d{1,2})(?:\\s*\\/\\s*10)?`, 'i')
    const match = scoreSource.match(regex)
    const raw = match?.[1]
    if (!raw) return null

    const numeric = Number.parseInt(raw, 10)
    if (!Number.isFinite(numeric) || numeric < 0 || numeric > 10) return null
    return `${numeric}/10`
  }

  const scores: RoastScores = {
    design: extractScore('design') ?? undefined,
    ux: extractScore('ux') ?? undefined,
    cringe: extractScore('cringe') ?? undefined,
  }
  const hasAnyScore = Object.values(scores).some(Boolean)
  if (!hasAnyScore) return { body: text.trim(), scores: null }

  return {
    body: text.replace(/^\s*\**\s*SCORES?\s*:?.*$/gim, '').trim(),
    scores,
  }
}

export default function RoastMyWebsiteUi() {
  const pathname = usePathname()
  const [url, setUrl] = useToolSessionState('roast-my-website', 'url', '')
  const [output, setOutput] = useToolSessionState('roast-my-website', 'output', '')
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const parsed = useMemo(() => parseScores(output), [output])
  const hasUrl = url.trim().length > 0

  const runRoast = async () => {
    if (!url.trim() || isLoading) return

    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setIsLoading(true)
    setErrorDetail(null)
    setOutput('')

    try {
      const slug = pathname.split('/').filter(Boolean).at(-1)
      if (!slug) {
        throw new Error('Missing tool slug')
      }

      const response = await fetch(`/api/lab-tools/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        const errorText = await response.text()
        const formatted = formatRoastError(errorText || 'Roast failed.')
        setOutput(formatted.friendly)
        setErrorDetail(formatted.technical)
        return
      }

      if (!response.body) {
        setOutput('Roast failed: empty response body.')
        setErrorDetail('Empty response body from roast endpoint.')
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setOutput((previous) => previous + decoder.decode(value, { stream: true }))
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setOutput('Och, something broke while roasting that site. Try again in a wee second.')
        setErrorDetail(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl pt-8">
      <h2 className="text-3xl font-bold tracking-tight text-text-heading">Roast My Website in <span className="italic text-blue-500">Scottish 🏴󠁧󠁢󠁳󠁣󠁴󠁿</span></h2>
      <p className="mt-2 text-sm text-text-secondary">A sharp UX roast delivered in Scots dialect.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') runRoast()
          }}
          placeholder="www.example.com"
          className="h-10 rounded-sm bg-page px-3 py-2 font-mono text-xs text-text-primary"
        />
        <Button
          onClick={runRoast}
          disabled={isLoading || !hasUrl}
          className={cn(
            'h-10 rounded-sm border border-border-subtle px-4 py-2 font-mono text-xs whitespace-nowrap',
            hasUrl
              ? 'cursor-pointer bg-white text-black hover:bg-grey-150 disabled:pointer-events-auto disabled:cursor-wait disabled:opacity-100'
              : 'cursor-not-allowed bg-grey-150 text-text-muted opacity-80 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-grey-150 disabled:text-text-muted',
          )}
          variant="white"
        >
          {isLoading ? 'Roasting...' : 'Roast it'}
        </Button>
      </div>

      {output ? (
        <div className="mt-8 rounded-sm border border-border-subtle bg-page p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-text-muted">// roast outcome</span>
            <span className="max-w-[55%] truncate font-mono text-[10px] text-accent">{url}</span>
          </div>

          <div className="prose prose-sm max-w-none text-text-default prose-p:my-0 prose-p:leading-7">
            <p>{parsed.body}</p>
          </div>

          {errorDetail ? (
            <p className="mt-3 font-mono text-[10px] leading-5 text-text-muted opacity-80">{errorDetail}</p>
          ) : null}

          {parsed.scores ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {Object.entries(parsed.scores)
                .filter(([, value]) => Boolean(value))
                .map(([key, value]) => (
                  <span
                    key={key}
                    className={cn(
                      'rounded-sm border border-border-subtle bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-text-mid',
                    )}
                  >
                    {key} {value}
                  </span>
                ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
