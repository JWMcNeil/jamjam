import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

/**
 * Origin Mux allows for direct uploads (`mux.video.uploads.create`).
 * Must match the browser address bar exactly — `http://localhost:3000` and `http://127.0.0.1:3000`
 * are different origins. Set `MUX_CORS_ORIGIN` to your dev URL if it differs from `NEXT_PUBLIC_SITE_URL`.
 */
export const getMuxCorsOrigin = () => {
  const explicit = process.env.MUX_CORS_ORIGIN?.trim()
  if (explicit) return explicit
  return getServerSideURL()
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || ''
}
