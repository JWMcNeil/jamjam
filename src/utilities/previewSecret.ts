/**
 * Preview links and `/next/preview` must use the same secret.
 * Avoid `process.env.PREVIEW_SECRET` directly in modules that Next may analyze at
 * build time — Docker images often inject this only at container runtime, and a
 * build-time empty value can get inlined so admin iframe URLs omit the token.
 */
const previewSecretEnvKey = `${'PREVIEW'}_${'SECRET'}`

export function getPreviewSecret(): string | undefined {
  const raw = process.env[previewSecretEnvKey]
  if (typeof raw !== 'string') return undefined
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : undefined
}
