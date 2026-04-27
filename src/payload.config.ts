import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import sharp from 'sharp'
import path from 'path'
import { buildConfig, type PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Tags } from './collections/Tags'
import { Lab } from './collections/Lab'
import { Users } from './collections/Users'
import { Footer } from './components/layout/footer/config'
import { Header } from './components/layout/header/config'
import { SiteSettings } from './globals/SiteSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

function getPayloadCorsOrigins(): string[] {
  const primary = getServerSideURL()
  const extraFromEnv =
    process.env.PAYLOAD_CORS_ORIGINS?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) ?? []
  const devLocalOrigins =
    process.env.NODE_ENV === 'development'
      ? ['http://localhost:3000', 'http://127.0.0.1:3000']
      : []
  return [...new Set([primary, ...extraFromEnv, ...devLocalOrigins].filter(Boolean))]
}

/**
 * Form builder and other features use `payload.sendEmail`; Payload needs a transport.
 *
 * With `SMTP_USER` + `SMTP_PASS` set (e.g. Gmail app password), mail is sent via SMTP.
 * Defaults match Gmail: host smtp.gmail.com, port 587. Optional: `SMTP_HOST`, `SMTP_PORT`,
 * `SMTP_SECURE` (true for 465), `SMTP_FROM_ADDRESS`, `SMTP_FROM_NAME`.
 * If credentials are omitted, the Nodemailer adapter uses Ethereal (dev-only test inbox; see server logs).
 */
function getEmailAdapter() {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (user && pass) {
    const port = Number(process.env.SMTP_PORT) || 587
    const secure = process.env.SMTP_SECURE === 'true' || port === 465

    return nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS ?? user,
      defaultFromName: process.env.SMTP_FROM_NAME ?? 'jamjam.dev',
      transportOptions: {
        host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
        port,
        secure,
        auth: { user, pass },
      },
    })
  }

  return nodemailerAdapter()
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: ' - jamjam.dev',
      description: 'jamjam.dev',
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: [],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 390,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgresql://payload:payload@localhost:5432/jamjam',
    },
    generateSchemaOutputFile: path.resolve(dirname, 'payload-generated-schema.ts'),
  }),
  // Order matters for schema push: tables with FKs (e.g. uploads) must come after their targets.
  collections: [Users, Media, Tags, Lab, Posts, Projects],
  cors: getPayloadCorsOrigins(),
  globals: [Header, Footer, SiteSettings],
  plugins: [
    ...plugins,
  ],
  email: getEmailAdapter(),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        return false
      },
    },
    tasks: [],
  },
})
