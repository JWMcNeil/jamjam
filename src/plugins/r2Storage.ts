import { s3Storage } from '@payloadcms/storage-s3'

/**
 * Cloudflare R2 via S3-compatible API. Set R2_* env vars in production (e.g. Dokploy).
 * Omit R2_BUCKET locally to keep uploads in public/media.
 *
 * @see https://payloadcms.com/docs/upload/storage-adapters#using-with-cloudflare-r2-via-s3-api
 */
export const r2StoragePlugin = s3Storage({
  enabled: Boolean(process.env.R2_BUCKET),
  collections: {
    media: {
      // Omit disablePayloadAccessControl (do not set true). If true, no S3 staticHandler
      // is registered and /api/media/file falls back to disk. generateFileURL still
      // uses R2_PUBLIC_URL for public URLs.
      generateFileURL: ({ filename, prefix }) => {
        const key = prefix ? `${prefix}/${filename}` : filename
        const base = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')
        return `${base}/${key}`
      },
    },
  },
  bucket: process.env.R2_BUCKET ?? '',
  config: {
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
    },
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    forcePathStyle: true,
  },
})
