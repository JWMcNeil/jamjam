import type { NextRequest } from 'next/server'

/** Gemini OpenAI-compatible streaming chat (Google AI Studio / API key). */
const GEMINI_OPENAI_CHAT_COMPLETIONS =
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'

const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash'
const JAMJAM_DOMAIN = 'jamjam.dev'
const JAMJAM_OVERRIDE_RESPONSE = "C'mon man, this website is pure class! but aye, nice try!"

const SYSTEM_PROMPT = `You are a brutally honest Scottish web critic.
Roast websites with wit, specificity, and clear UX observations.
Always respond in a strong Scottish voice and dialect.
Keep the roast concise: 2-3 sentences max, under 90 words total.
Return JSON only (no markdown, no code fences) with this exact shape:
{"roast":"string","scores":{"design":number,"ux":number,"cringe":number}}
Scores must be integers between 0 and 10.`

function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  const parsed = new URL(withProtocol)

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Invalid protocol')
  }

  return parsed.toString()
}

function isJamjamDomain(url: string): boolean {
  const hostname = new URL(url).hostname.toLowerCase()
  return hostname === JAMJAM_DOMAIN || hostname.endsWith(`.${JAMJAM_DOMAIN}`)
}

function stripHtmlToText(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchPageText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'jamjam.dev lab bot' },
      signal: AbortSignal.timeout(5000),
    })

    const html = await response.text()
    const text = stripHtmlToText(html)

    return text.slice(0, 2600) || '(no readable page text found)'
  } catch {
    return '(could not fetch page content)'
  }
}

function resolveGeminiRoastConfig(): { apiKey: string; model: string } | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim() ?? ''
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL
  if (!apiKey) return null
  return { apiKey, model }
}

type GeminiRoastPayload = {
  roast: string
  scores: {
    design: number
    ux: number
    cringe: number
  }
}

type StreamResult =
  | { kind: 'ok'; text: string }
  | { kind: 'error'; status: number; message: string }

function formatProviderError(status: number, bodyText: string): string {
  let message = `Gemini request failed (${status}).`

  try {
    const parsed = JSON.parse(bodyText) as { error?: { message?: string } }
    const providerMessage = parsed.error?.message?.trim()
    if (providerMessage) {
      message = providerMessage
    }
  } catch {
    const raw = bodyText.trim()
    if (raw) {
      message = raw
    }
  }

  if (status === 429) {
    message += '\nRate limit or quota reached in Gemini. Try again shortly or review AI Studio quota.'
  }

  return message
}

function clampScore(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  const rounded = Math.round(value)
  if (rounded < 0 || rounded > 10) return null
  return rounded
}

function extractJsonBlock(text: string): string {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) return fenced[1].trim()
  return trimmed
}

function parseGeminiPayload(content: string): GeminiRoastPayload | null {
  const raw = extractJsonBlock(content)
  try {
    const parsed = JSON.parse(raw) as {
      roast?: unknown
      scores?: { design?: unknown; ux?: unknown; cringe?: unknown }
    }

    const roast = typeof parsed.roast === 'string' ? parsed.roast.trim() : ''
    const design = clampScore(parsed.scores?.design)
    const ux = clampScore(parsed.scores?.ux)
    const cringe = clampScore(parsed.scores?.cringe)
    if (!roast || design === null || ux === null || cringe === null) {
      return null
    }

    return {
      roast,
      scores: { design, ux, cringe },
    }
  } catch {
    return null
  }
}

function formatNormalizedRoast(payload: GeminiRoastPayload): string {
  return [
    payload.roast,
    `SCORES: design ${payload.scores.design}/10 | ux ${payload.scores.ux}/10 | cringe ${payload.scores.cringe}/10`,
  ].join('\n\n')
}

async function streamFromGemini(prompt: string, apiKey: string, model: string): Promise<StreamResult> {
  const response = await fetch(GEMINI_OPENAI_CHAT_COMPLETIONS, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    }),
  })

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '')
    return {
      kind: 'error',
      status: response.status,
      message: formatProviderError(response.status, bodyText),
    }
  }

  if (!response.body) {
    return {
      kind: 'error',
      status: 502,
      message: 'Gemini returned an empty response body.',
    }
  }

  const raw = await response.text().catch(() => '')
  if (!raw.trim()) {
    return {
      kind: 'error',
      status: 502,
      message: 'Gemini returned an empty payload.',
    }
  }

  let assistantContent = ''
  try {
    const parsed = JSON.parse(raw) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    assistantContent = parsed.choices?.[0]?.message?.content?.trim() ?? ''
  } catch {
    // Ignore parse errors and fail below with a clear message.
  }

  const payload = parseGeminiPayload(assistantContent)
  if (!payload) {
    return {
      kind: 'error',
      status: 502,
      message:
        'Gemini returned an unexpected format. Please try again. (Expected roast JSON with scores.)',
    }
  }

  return { kind: 'ok', text: formatNormalizedRoast(payload) }
}

function localRoast(url: string, pageText: string): string {
  const snippet = pageText.slice(0, 260)
  return [
    `Och aye, ${url} has the confidence of a premium agency site but the soul of a recycled template. The copy feels generic, the hierarchy is muddy, and the page reads like it was stitched together in a panic before stand-up. Ye've got ingredients, but the story and structure arenae landing.`,
    `Specific clue from the scrape: "${snippet || 'No readable page text'}".`,
    'SCORES: design 5/10 | ux 4/10 | cringe 7/10',
  ].join('\n\n')
}

export async function handler(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null
  const rawUrl = typeof body?.url === 'string' ? body.url : ''
  if (!rawUrl.trim()) {
    return new Response('Missing url', { status: 400 })
  }

  let normalizedUrl = ''
  try {
    normalizedUrl = normalizeUrl(rawUrl)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  if (isJamjamDomain(normalizedUrl)) {
    return new Response(JAMJAM_OVERRIDE_RESPONSE, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const pageText = await fetchPageText(normalizedUrl)
  const prompt = `Roast this website: ${normalizedUrl}\n\nPage content snippet:\n${pageText}`

  const config = resolveGeminiRoastConfig()
  if (!config) {
    const fallbackText = localRoast(normalizedUrl, pageText)
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(fallbackText))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const providerResult = await streamFromGemini(prompt, config.apiKey, config.model).catch(
    () =>
      ({
        kind: 'error',
        status: 502,
        message: 'Could not reach Gemini. Try again in a wee second.',
      }) as const,
  )

  if (providerResult.kind === 'error') {
    return new Response(providerResult.message, {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  return new Response(providerResult.text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
