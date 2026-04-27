import React from 'react'

type EmbedProvider = 'auto' | 'youtube' | 'vimeo' | 'codepen' | 'figma' | 'iframe'

export type EmbedBlockProps = {
  blockType: 'embed'
  provider?: EmbedProvider
  url: string
  title?: string | null
  caption?: string | null
}

type Props = EmbedBlockProps & {
  className?: string
}

function toYouTubeEmbed(url: URL): string | null {
  if (url.hostname.includes('youtu.be')) {
    const id = url.pathname.replace('/', '').trim()
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  if (url.hostname.includes('youtube.com')) {
    const id = url.searchParams.get('v')?.trim()
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  return null
}

function toVimeoEmbed(url: URL): string | null {
  if (!url.hostname.includes('vimeo.com')) return null
  const id = url.pathname.split('/').filter(Boolean)[0]?.trim()
  return id ? `https://player.vimeo.com/video/${id}` : null
}

function toCodepenEmbed(url: URL): string | null {
  if (!url.hostname.includes('codepen.io')) return null

  const parts = url.pathname.split('/').filter(Boolean)
  const user = parts[0]
  const penId = parts[2]

  if (!user || !penId) return null
  return `https://codepen.io/${user}/embed/${penId}?default-tab=result`
}

function toFigmaEmbed(url: URL): string | null {
  if (!url.hostname.includes('figma.com')) return null
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url.toString())}`
}

function resolveEmbedUrl(rawUrl: string, provider: EmbedProvider): string | null {
  try {
    const parsed = new URL(rawUrl)

    if (provider === 'iframe') return parsed.toString()
    if (provider === 'youtube') return toYouTubeEmbed(parsed)
    if (provider === 'vimeo') return toVimeoEmbed(parsed)
    if (provider === 'codepen') return toCodepenEmbed(parsed)
    if (provider === 'figma') return toFigmaEmbed(parsed)

    return (
      toYouTubeEmbed(parsed) ??
      toVimeoEmbed(parsed) ??
      toCodepenEmbed(parsed) ??
      toFigmaEmbed(parsed) ??
      parsed.toString()
    )
  } catch {
    return null
  }
}

export const EmbedBlock: React.FC<Props> = ({ className, provider = 'auto', url, title, caption }) => {
  const embedUrl = resolveEmbedUrl(url, provider)

  if (!embedUrl) {
    return (
      <div className={[className, 'not-prose rounded-sm border border-border p-4'].filter(Boolean).join(' ')}>
        <p className="font-mono text-xs text-text-muted">// invalid embed url</p>
        <a className="text-sm text-accent hover:underline" href={url} rel="noreferrer" target="_blank">
          {url}
        </a>
      </div>
    )
  }

  return (
    <figure className={[className, 'not-prose my-6 space-y-3'].filter(Boolean).join(' ')}>
      <div className="relative w-full overflow-hidden rounded-sm border border-border bg-card pt-[56.25%]">
        <iframe
          src={embedUrl}
          title={title ?? 'Embedded content'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? <figcaption className="text-sm text-text-secondary">{caption}</figcaption> : null}
    </figure>
  )
}
