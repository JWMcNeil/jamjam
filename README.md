# JamJam Portfolio & Blog

## Core Setup

- [x] Switch SQLite → Postgres (completed - using Docker)
- [ ] Run clean migrations and verify Payload boots without warnings
- [ ] Set environment variables for production (Payload secrets, DB URL, Next.js vars)

### Database Setup

PostgreSQL is configured via Docker Compose. To start the database:

```bash
docker-compose up -d postgres
```

The default connection string is: `postgresql://payload:payload@localhost:5432/jamjam`

Set `DATABASE_URI` in your `.env` file if you need a different connection string.

## Content & Pages

- [ ] Fill out all static pages (home, about, web, photography, videography, contact)
- [ ] Publish at least a couple of blog posts
- [ ] Add website showcase entries under Web
- [ ] Ensure slugs, timestamps, and SEO fields exist on all collections

## Navigation & UX

- [ ] Link all pages in the header/footer
- [ ] Add breadcrumbs or back links on posts
- [ ] Check mobile responsiveness
- [ ] Optimize images (payload uploads or external storage)

## SEO

- [ ] Set meta titles/descriptions for each page
- [ ] Add Open Graph + social preview images
- [ ] Generate sitemap + robots.txt
- [ ] Ensure clean URLs and no broken links

## Performance

- [ ] Enable Next.js image component everywhere needed
- [ ] Use caching on static pages
- [ ] Compress and minify assets (Next does most automatically)

## PayloadCMS

- [ ] Configure admin users & roles
- [ ] Add upload limits and validation
- [ ] Back up your DB before migrating to Postgres
- [ ] Add webhooks if needed (rebuild triggers, etc.)

## Infrastructure

- [ ] Decide on hosting (Vercel, Fly.io, Render, etc.)
- [ ] Set up Postgres hosting (Supabase, Neon, RDS, Railway)
- [ ] Configure persistent file storage (local, S3, Supabase Storage, etc.)
- [ ] Add rate limiting & basic security headers

## Testing

- [ ] Test forms (contact) and email delivery
- [ ] Test admin login + content creation
- [ ] Test page load on mobile and slow networks
- [ ] Test dark/light mode if supported

## Analytics & Monitoring

- [ ] Add analytics (Plausible, Umami, GA4, etc.)
- [ ] Add error monitoring (Sentry, Highlight, etc.)

## Final Polish

- [ ] Custom 404 + 500 pages
- [ ] Favicons + web manifest
- [ ] Typography and spacing consistency
- [ ] Final spell check on all content
- [ ] Run Lighthouse audit
