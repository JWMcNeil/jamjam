# jamjam.dev

The source for [jamjam.dev](https://jamjam.dev), my personal portfolio and blog.

## Hi, I'm Jamie

I'm a web developer, photographer and filmmaker in north-east Victoria, Australia. I build sites and AI tools, shoot the photos and footage that go with them, and lean towards motorcycles and cars. I'm open to freelance and full-time work.

This site is meant to show all of that in one place, rather than a web portfolio over here and a photography one over there. If you're reading the code to see how I work, the site itself is the best summary. If you'd rather just say hello, use the contact page on the site.

## What's on the site

| Section | What it is |
| --- | --- |
| **Projects** | Web and app work, each with a full case-study page. The main feature. |
| **Posts** | Writing, mainly about tech. |
| **Gallery** | Selected photography, video, graphics and music, browsed in one place. |
| **Lab** | Small tools I've built, shown as experiments or utilities. |

The look is a dark, terminal-flavoured one: mono labels, shell-style section headers, a green accent. Type is Schibsted Grotesk and JetBrains Mono, and GSAP handles motion (with `prefers-reduced-motion` respected). The reasoning is written down in [`PRODUCT.md`](./PRODUCT.md) and [`DESIGN.md`](./DESIGN.md), and the vocabulary used in the code is in [`CONTEXT.md`](./CONTEXT.md).

## What it's built on

- **[Next.js 16](https://nextjs.org)** (App Router) and **React 19**
- **[Payload CMS 3](https://payloadcms.com)** running inside the same Next.js app, with Lexical rich text, live preview, SEO, search, redirects and form-builder plugins
- **PostgreSQL** via Payload's Drizzle adapter, with committed migrations
- **[Tailwind CSS 4](https://tailwindcss.com)**, Radix UI primitives and shadcn-style components
- **Cloudflare R2** for media storage and **Mux** for video
- **Vercel** for hosting, analytics and speed insights
- **Vitest** for integration tests and **Playwright** for end-to-end tests
- TypeScript throughout, managed with pnpm

## Project layout

```
src/
  app/(frontend)/   public site: home, projects, posts, gallery, lab, contact
  app/(payload)/    Payload admin panel
  collections/      Projects, Posts, Gallery items (BoardItems), Lab, Media, Pages, Tags, Users
  globals/          site settings, header, footer
  components/       UI components
  migrations/       database migrations
docs/adr/           architecture decision records
```

## Running it locally

You'll need Node 24 (see `mise.toml`), pnpm and Docker.

```bash
pnpm install
cp .env.example .env        # then fill in the values
docker-compose up -d postgres
pnpm dev
```

The site runs at `http://localhost:3000` and the admin panel at `/admin`.

The default database connection is `postgresql://payload:payload@localhost:5432/jamjam`. Set `DATABASE_URL` in `.env` to use a different one. Leave `R2_BUCKET` unset and uploads stay in `public/media`.

Useful scripts:

```bash
pnpm test:int            # integration tests
pnpm test:e2e            # Playwright
pnpm lint
pnpm migrate:create      # after changing a collection schema
pnpm generate:types      # refresh payload-types.ts
```

## Deploying

Vercel's build command is `pnpm run ci`, which runs `payload migrate` and then `pnpm build`. Use `run`: bare `pnpm ci` is a built-in pnpm command that isn't implemented and fails the build. Migrations apply to whatever `DATABASE_URL` the environment has, so commit new migrations (`pnpm migrate:create`) with the code that needs them.

## Using this code

It's a personal site, so the content, photos, footage and copy are mine and aren't for reuse. The code is there to read, learn from and borrow ideas from.
