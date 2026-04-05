# jamjam.dev — Master Rebuild Plan

> This document is the single source of truth for the jamjam.dev redesign and rebuild.
> It lives in the root of the repo and is updated as decisions are made.
> It doubles as a case study reference — AI usage, architecture decisions, and process notes are documented inline.

---

## Table of Contents

1. [Goals](#1-goals)
2. [Repo Structure](#2-repo-structure)
3. [Design System & Tokens](#3-design-system--tokens)
4. [Terminal UI Pattern](#4-terminal-ui-pattern)
5. [Tech Stack](#5-tech-stack)
6. [Payload CMS — Content Architecture](#6-payload-cms--content-architecture)
7. [Page Architecture & Routes](#7-page-architecture--routes)
8. [Component Library & Storybook](#8-component-library--storybook)
9. [Testing Strategy](#9-testing-strategy)
10. [CI/CD & Self-Hosting (Dokploy + Hetzner + Cloudflare)](#10-cicd--self-hosting-dokploy--hetzner--cloudflare)
11. [Security](#11-security)
12. [AI Workflow & Tooling](#12-ai-workflow--tooling)
13. [Linear — Issues & Milestones](#13-linear--issues--milestones)
14. [Migration & Cleanup](#14-migration--cleanup)
15. [Launch Checklist](#15-launch-checklist)
16. [Blog & Case Study Strategy](#16-blog--case-study-strategy)
17. [What Employers Will See](#17-what-employers-will-see)
18. [What's Missing / To Revisit](#18-whats-missing--to-revisit)

---

## 1. Goals

### Primary goal
Land a web dev role at a company that uses modern tooling, encourages AI usage, and values engineers who ship. Not looking for corporate and boring — looking for somewhere that wants developers who are effective because they understand their tools deeply, AI included.

### Honest context
Coming from a WordPress background with a few years of self-directed coding. Not pretending to be a senior full-stack dev — the goal is to demonstrate genuine curiosity, growth, and the ability to build real things properly. The site itself is the evidence. Being honest about the journey is part of the brand, not something to hide.

This site is also a public blog for anyone who finds it useful — not just a job application vehicle. Writing openly about learning, process, and mistakes is more interesting and more credible than a polished highlight reel.

### What this site is NOT
- A vibe-coded AI dump
- A generic portfolio template with the name swapped out
- A fake senior engineer persona

---

## 2. Repo Structure

### Migration strategy
Do not delete old work. Move it cleanly so git history is preserved and there is a clear reference point.

```
src/
  _archive/                  # old components — preserved, not deleted
    components/
    app/
    payload/
  app/                       # Next.js App Router
  components/
    ui/                      # primitive components (Button, Tag, Input etc)
    blocks/                  # Payload block components (used inside content fields)
    layout/                  # Nav, Footer etc
    templates/               # page-level templates (PostTemplate, ProjectTemplate)
  lib/                       # utilities, helpers, api functions
  styles/
    globals.css              # Tailwind v4 @theme config — frontend only
    payloadStyles.css        # Tailwind v4 admin styles — Payload only
  collections/               # Payload collection configs
  globals/                   # Payload global configs
  stories/                   # Storybook stories
  tests/
    unit/                    # Vitest unit tests
    e2e/                     # Playwright end-to-end tests
docs/
  design/                    # Figma screenshots, UI reference, UX notes
  ai-log/                    # dated notes on AI usage during development
PLAN.md                      # this file
.cursor/
  rules/                     # Cursor rules — see AI Workflow section
```

### Key principle
Every directory should have a brief `README.md` explaining what lives there and why. Free documentation that shows systematic thinking.

---

## 3. Design System & Tokens

### Tailwind CSS v4

The project uses Tailwind v4, which shifts to a CSS-first configuration model. All custom tokens are defined in `src/styles/globals.css` using `@theme` — no `tailwind.config.js` needed. Tailwind's built-in scales (greys, spacing, etc) are used as-is; only brand-specific values need defining.

#### Split styles (Payload compatibility)

Tailwind v4's preflight resets break Payload's admin panel styling. The solution is two separate stylesheets:

- `src/styles/globals.css` — full Tailwind import with `@theme` tokens, imported in `(frontend)/layout.tsx`
- `src/styles/payloadStyles.css` — Tailwind theme + utilities only (no preflight), imported in `(payload)/layout.tsx`

This follows the approach from the [official Payload guide](https://payloadcms.com/posts/guides/how-to-theme-the-payload-admin-panel-with-tailwind-css-4) and the [Rubix Studios guide](https://rubixstudios.com.au/insights/tailwindcss-v4-with-payloadcms).

```css
/* src/styles/globals.css — frontend */
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Roboto Mono', ui-monospace, 'Courier New', monospace;

  /* Brand accent */
  --color-accent:           #44aa99;
  --color-accent-hover:     #66ccbb;
  --color-accent-bg:        #0f1a14;
  --color-accent-border:    #1a2e1e;
  --color-accent-dot:       #3a9a3a;

  /* Page surfaces */
  --color-page:             #0a0a0a;
  --color-card:             #0c0c0c;
  --color-card-hover:       #0f0f0f;
  --color-input-bg:         #111111;
  --color-divider:          #161616;
  --color-border-subtle:    #1e1e1e;
}
```

```css
/* src/styles/payloadStyles.css — Payload admin only */
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
/* Preflight intentionally skipped — breaks Payload admin styles */
@import 'tailwindcss/utilities.css' layer(utilities);

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@layer utilities {
  .table {
    display: block;
    width: 100%;
  }
}
```

### Typography

#### Fonts
| Role | Font | Fallback stack |
|---|---|---|
| Body / UI | DM Sans | `ui-sans-serif, system-ui, sans-serif` |
| Code / terminal | Roboto Mono | `ui-monospace, 'Courier New', monospace` |

Loaded via `next/font/google` — self-served, no external requests, no layout shift.

```ts
// src/lib/fonts.ts
import { DM_Sans, Roboto_Mono } from 'next/font/google'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
```

Both variables applied to `<html>` in the root layout.

### Colour reference

Dark mode only — no light theme. Full colour reference for design decisions and Storybook. Most applied via Tailwind utilities referencing `@theme` custom properties.

#### Surfaces
| Usage | Hex |
|---|---|
| Page background | `#0a0a0a` |
| Card / sidebar | `#0c0c0c` |
| Hover state | `#0f0f0f` |
| Input background | `#111111` |
| Grid gaps / dividers | `#161616` |
| Borders | `#1e1e1e` |

#### Greys
| Usage | Hex |
|---|---|
| Subtle borders | `#222222` |
| Ghost button border | `#2a2a2a` |
| Dim text, brackets | `#333333` |
| Input focus border | `#3a3a3a` |
| Muted text | `#444444` |
| Secondary text | `#555555` |
| Body text | `#666666` |
| Prompt prefix | `#777777` |
| Nav / meta text | `#888888` |
| Light muted | `#999999` |
| Hover text | `#aaaaaa` |
| Mid text | `#bbbbbb` |
| Primary text | `#cccccc` |
| Default text | `#dddddd` |
| Inverse button bg | `#e8e8e8` |
| Headings | `#f0f0f0` |
| Inverse hover | `#ffffff` |

#### Accent — green
| Usage | Hex |
|---|---|
| Accent background | `#0f1a14` |
| Accent border | `#1a2e1e` |
| Active state | `#1a3a2a` |
| Hover background | `#142014` |
| Hover border | `#2a4a3a` |
| Status dot | `#3a9a3a` |
| Primary accent | `#44aa99` |
| Hover accent | `#66ccbb` |

#### Tag colours
| Tag | Background | Text | Border |
|---|---|---|---|
| `#nextjs` | `#0e0e18` | `#8888cc` | `#1a1a2c` |
| `#webdev` | `#0f0f1a` | `#7777aa` | `#1a1a2e` |
| `#ai` | `#0f1a14` | `#44aa99` | `#1a2e1e` |
| `#webflow` | `#0f1518` | `#4499bb` | `#1a2530` |
| `#js` | `#1a1509` | `#bbaa55` | `#2e2614` |
| `#design` | `#1a0f12` | `#cc7788` | `#2e1a1e` |
| `#opinion` | `#1a130f` | `#aa8877` | `#2e1e1a` |
| `#tools` | `#1a1a0f` | `#aaaa99` | `#2a2a1a` |
| `#experiment` | `#1a1a0f` | `#aaaa99` | `#2a2a1a` |
| `#freelance` | `#1a0f1a` | `#aa77aa` | `#2e1a2e` |
| `#ux` | `#0f1a1a` | `#44aaaa` | `#1a2e2e` |
| `#career` | `#1a1a1a` | `#999999` | `#2a2a2a` |
| `#tutorial` | `#0f1a10` | `#55aa66` | `#1a2e1c` |
| `#wordpress` | `#160f1a` | `#aa77cc` | `#2a1a2e` |

### Spacing & layout
- Max content width: `1100px`, centred
- Page padding: `32px 40px` desktop, `20px 16px` mobile
- Card grid gap: `1px` with background colour as divider
- Border radius: `4px` buttons/tags, `6px` cards/inputs, `8px` large containers

---

## 4. Terminal UI Pattern

The site uses a distinctive terminal/code aesthetic throughout. This is the most recognisable element of the design and should be treated as a first-class design system pattern.

### Pattern inventory

| Pattern | Example | Where used |
|---|---|---|
| Nav breadcrumb | `~/home`, `~/posts`, `~/home/projects/content-creators-demo` | Every page navbar |
| Section comment | `// featured projects`, `// archive`, `// tech stack` | Section headings across all pages |
| Command prompt | `jamjam~$ ls posts/ | sort -r` | Page hero areas, decorative headings |
| Terminal button | `$ open live →`, `$ view code →`, `$ send message →` | CTAs and navigation links |
| Count display | `7 projects`, `8 entries` | Index pages |
| Status indicator | `● available for work` | Homepage, footer, contact |
| Meta label | `// type` / `Demo / Template` | Project template sidebar |
| Code reference | `jamjam~$ cat projects/slug/readme.md` | Project template hero |

### Component definitions

| Component | Purpose |
|---|---|
| `TerminalNav` | Breadcrumb-style path display in navbar — renders current route as terminal path |
| `SectionComment` | `// section name` heading pattern — used consistently for all section dividers |
| `CommandPrompt` | `jamjam~$ command` decorative heading — page-specific terminal commands |
| `TerminalButton` | `$ action →` button variant — primary CTA style |
| `StatusDot` | Green/amber/red dot + label — driven by Site Settings `statusText` |
| `MetaLabel` | `// label` + value pair — used in project template sidebar, post meta |

### Usage rules
- Monospace font (Roboto Mono) for all terminal-style text
- Muted grey (`#777777`) for prompt prefixes and `//` comments
- Accent green (`#44aa99`) for interactive terminal elements
- Always use `→` (arrow character), not `>` or `->`

---

## 5. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.0 (App Router) | Confirmed compatible with Payload 3.81.0 |
| CMS | Payload CMS v3.81.0 | Headless, TypeScript-native, self-hostable |
| Database | PostgreSQL | Native Payload adapter |
| Styling | Tailwind CSS v4 | CSS-first `@theme` config, split styles for Payload |
| Fonts | DM Sans + Roboto Mono | Via `next/font/google` — self-served, fallbacks defined |
| Component docs | Storybook | Isolated components, deployed to subdomain |
| Testing — unit | Vitest | Fast, ESM-native |
| Testing — e2e | Playwright | Critical paths + visual regression |
| Hosting | Hetzner via Dokploy | Full app (Next.js + Payload + Postgres) |
| CDN / proxy | Cloudflare | DDoS protection, SSL, caching, IP masking |
| Networking | Tailscale | Secure Payload admin access |
| Analytics | Umami (self-hosted) | Privacy-first, no cookie banner |
| CI/CD | GitHub Actions | Lint, typecheck, test → webhook to Dokploy |
| OG images | `next/og` | Auto-generated per post and project |
| RSS | `/feed.xml` route | Built from Payload API data |
| IDE | Cursor | Primary agentic coding environment |

### Payload plugins (all retained)

| Plugin | Purpose |
|---|---|
| `@payloadcms/plugin-seo` | SEO meta fields on Posts and Projects |
| `@payloadcms/plugin-search` | Search indexing — page not exposed at launch, plugin kept |
| `@payloadcms/plugin-form-builder` | Can power the contact form |
| `@payloadcms/plugin-nested-docs` | Useful for category/tag hierarchy |
| `@payloadcms/plugin-redirects` | URL redirects for migration |
| `@oversightstudio/mux-video` | Video embedding for future use |

---

## 6. Payload CMS — Content Architecture

### Philosophy
Everything a real client would manage goes through the admin. Nothing editable is hardcoded. The admin is a deliverable — it should look good and make sense to someone filling in a form for the first time.

### Page architecture: code-driven templates + CMS content
Page layouts are React server components in the app router with fixed structure. All content comes from Payload collections and globals. Blocks are used only where content is genuinely flexible — inside blog post content (code blocks, media blocks, CTAs, banners) and project descriptions.

This is a deliberate architecture choice: blocks make sense when page structure is unknown and user-configurable. For a site with known, fixed page layouts, code-driven templates pulling CMS content is the correct approach. It shows architectural judgment, not just CMS feature awareness.

### Collections

#### Posts
```
title           Text          required — used in OG image and browser tab
slug            Text          auto-generated, editable (Payload slugField())
excerpt         Textarea      150 char max — index cards and OG description
heroImage       Upload        required, relationTo: 'media'
readTime        Number        auto-calculated via beforeChange hook from content word count
tags            Relationship  → Tags, hasMany: true
content         RichText      Lexical — headings, code blocks, blockquote, images, banners, CTAs
publishedAt     Date          auto-set on first publish, editable
relatedPosts    Relationship  → Posts, hasMany: true, max: 2
authors         Relationship  → Users, hasMany: true
meta            Group         SEO plugin fields (title, description, image, preview)
```

Uses Payload's built-in versioning (`_status: draft | published`) — no custom status field needed.

#### Projects
```
title           Text          required
slug            Text          auto-generated, editable
type            Select        demo | client | experiment
status          Select        draft | live | archived — project status, not Payload publish status
year            Number
excerpt         Textarea      120 char max
heroImage       Upload        required, relationTo: 'media'
gallery         Array         Upload fields, drag-to-reorder
description     RichText      optional longer write-up (Lexical with blocks)
techStack       Array         { name: Text, role: Text }
liveUrl         Text          URL validated
codeUrl         Text          conditional — only shown if type = demo or experiment
tags            Relationship  → Tags, hasMany: true
featured        Checkbox      surfaces on homepage
order           Number        manual sort order
meta            Group         SEO plugin fields
```

Uses Payload versioning for publish/draft. The `status` field is for the external project state (is the app itself live/archived), not whether the entry is published on the site.

#### Tags
```
label           Text          required e.g. "nextjs"
slug            Text          auto-generated
colour          Select        matches design token set
```

Colour select options: `nextjs`, `webdev`, `ai`, `webflow`, `js`, `design`, `opinion`, `tools`, `experiment`, `freelance`, `ux`, `career`, `tutorial`, `wordpress`

#### Media
```
Standard Payload media collection — uploads with alt text, focal point, sizes.
```

#### Users
```
Standard Payload users collection — auth, name, avatar.
```

### Globals

#### Header
```
Nav links and branding — wired to the TerminalNav component.
```

#### Footer
```
Footer content — driven by Site Settings values.
```

#### Site Settings
```
name                Text        "Jamie McNeil"
statusText          Text        e.g. "available for work" / "open to freelance" / "happily employed"
statusNote          Text        e.g. "open to fully remote roles"
email               Text        "jamie@jamjam.dev"
location            Text        "Melbourne, Australia"
footerNote          Text
```

`statusText` is a free string, not a boolean — allows for any status message.

### Admin customisation checklist
- [ ] Custom logo in admin navbar
- [ ] Dark theme via `payloadStyles.css` overrides
- [ ] Field descriptions on every field
- [ ] Conditional fields (e.g. `codeUrl` hidden unless type is demo/experiment)
- [ ] Collapsible groups on long forms
- [ ] Live preview button on Posts and Projects
- [ ] Slug auto-generation with manual override

---

## 7. Page Architecture & Routes

### Code-driven templates

Every page is a React server component that fetches data from Payload. The page structure is defined in code; the content comes from the CMS. This is the right pattern when page layouts are known and fixed.

| Route | Template | Data source | Notes |
|---|---|---|---|
| `/` | Homepage | Featured Projects, latest Posts, Site Settings | Hero, projects grid, posts list, about section |
| `/projects` | Projects index | All published Projects, Tags | Tag filter, all published |
| `/projects/[slug]` | Project template | Single Project by slug | Gallery, tech stack, links |
| `/posts` | Posts index | All published Posts, Tags | Tag filter, pinned + archive |
| `/posts/[slug]` | Post template | Single Post by slug | Two-column, TOC sidebar, author bio, related |
| `/posts/page/[pageNumber]` | Posts pagination | Paginated Posts | Future implementation, route preserved |
| `/contact` | Contact page | Site Settings | Form + email, wired to site settings |
| `/ai` | AI page | — | Sidebar log, live tools |
| `/feed.xml` | RSS | All published Posts | Valid RSS 2.0 XML |
| `/og` | OG image | Query params | Auto-generated per post and project |

### Blocks (used inside content fields only)

Blocks are used within the Lexical rich text editor on Posts and Projects — not for page-level composition.

| Block | Purpose |
|---|---|
| `Code` | Syntax-highlighted code with language selector |
| `MediaBlock` | Image with optional caption |
| `Banner` | Callout / info / warning banner |
| `Content` | Multi-column rich text layout |
| `CTA` | Call-to-action with link |

### OG image generation
Every post and project gets an auto-generated OG image via `next/og`. Uses the site's aesthetic — title in DM Sans, path in Roboto Mono, dark background.

```ts
// src/app/og/route.tsx
// Usage: /og?title=Post+Title&type=post&slug=post-slug
```

### RSS feed
```ts
// src/app/feed.xml/route.ts
// Fetches all published posts from Payload REST API
// Returns valid RSS 2.0 XML with full content
// Linked in root layout <head> as <link rel="alternate">
```

### AI page tools
- **Roast My Website** — Anthropic API, URL input, Scottish roast + scores
- **RAG playground** — paste text, ask questions, shows retrieval in practice
- **Structured output demo** — freeform → typed JSON, demonstrates tool use / function calling

---

## 8. Component Library & Storybook

Deploy Storybook to `storybook.jamjam.dev` — publicly linkable in job applications.

### Story coverage (priority order)
1. `TerminalButton` — all variants (ghost, solid, accent, inverse) and sizes
2. `Tag` — all colour variants
3. `ProjectCard` — with image, placeholder, hover state
4. `PostRow` — default, hover
5. `FeaturedCard` — pinned variant
6. `StackItem` — tech stack list row
7. `TerminalNav` — path variants per page
8. `SectionComment` — heading pattern
9. `CommandPrompt` — decorative heading
10. `StatusDot` — available, unavailable variants
11. `GalleryScroll` — horizontal scroll
12. `ContactForm` — fields, validation, success state
13. `ProseContent` — h2, h3, blockquote, code, pre, links

---

## 9. Testing Strategy

### Mindset
Testing is being learned properly here, not just added for appearances. Coming from a background without formal test coverage — this is an intentional step up, and the blog post about it will be honest about that starting point.

### Unit tests (Vitest)

Focus on logic, not rendering.

```ts
// src/tests/unit/slug.test.ts
import { describe, it, expect } from 'vitest'
import { generateSlug } from '@/lib/utils/slug'

describe('generateSlug', () => {
  it('converts spaces to hyphens', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })
  it('strips special characters', () => {
    expect(generateSlug('Hello, World!')).toBe('hello-world')
  })
  it('lowercases output', () => {
    expect(generateSlug('UPPERCASE')).toBe('uppercase')
  })
})
```

Good targets:
- `generateSlug(title)`
- `calculateReadTime(content)` — word count to minutes
- `formatDate(date)`
- `resolveTagColour(slug)` — returns correct token set
- Payload field validators

### End-to-end tests (Playwright)

#### Critical paths
- Homepage loads — hero, projects, posts all visible
- Projects filter — tag filter works, count updates
- Project page — gallery scrolls, links present
- Posts filter — works correctly
- Post page — content renders, TOC visible, related posts shown
- Contact form — validation, success state
- AI page — Roast tool accepts input, returns response
- `/feed.xml` — returns valid XML

#### Visual regression
Snapshot each page at `1440px` and `375px`. Run on every PR.

```ts
// playwright.config.ts
export default {
  testDir: './src/tests/e2e',
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'Desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'Mobile', use: { viewport: { width: 375, height: 812 } } },
  ]
}
```

---

## 10. CI/CD & Self-Hosting (Dokploy + Hetzner + Cloudflare)

> Deployment is partially up and running. This section will be expanded as it's refined — the goal is to document it fully so it becomes a blog post.

### Architecture

```
                    ┌──────────────┐
                    │  Cloudflare   │  CDN / proxy / DDoS protection
                    │  (free tier)  │  SSL termination, asset caching
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   Hetzner    │  VPS running Dokploy
                    │   VPS        │  Docker container: Next.js + Payload
                    │              │  PostgreSQL on same instance
                    └──────────────┘
                           │
                    ┌──────▼───────┐
                    │  Tailscale   │  Secure tunnel for /admin access
                    └──────────────┘
```

- **Cloudflare** sits in front as CDN/proxy. DNS points to Cloudflare, which forwards to Hetzner origin. Benefits: DDoS protection, automatic SSL, CDN caching for static assets, server IP hidden. Free tier is sufficient. Option to use Cloudflare Tunnel for zero open inbound ports on the server.
- **Hetzner VPS** runs Dokploy, which manages the Docker container.
- **Payload admin** behind Tailscale — not publicly exposed.
- **PostgreSQL** on same instance.

### Target pipeline
```
GitHub push to main
  → GitHub Actions (lint, typecheck, Vitest)
  → on pass: webhook to Dokploy
  → Dokploy pulls, builds, deploys
  → zero-downtime rolling restart
```

### Environment variables
```
DATABASE_URL           postgres://...
PAYLOAD_SECRET         ...
ANTHROPIC_API_KEY      ...     # server-side only — never in client bundle
NEXT_PUBLIC_SITE_URL   https://jamjam.dev
```

Managed in Dokploy UI. Never committed to the repo.

---

## 11. Security

Showing you've thought about security is a signal in itself — most junior portfolios don't.

### API keys
- `ANTHROPIC_API_KEY` is server-side only — AI tools are Next.js API routes, the key never reaches the client bundle
- All secrets in environment variables, never in source

### Payload admin
- `/admin` not publicly accessible — behind Tailscale only
- Strong credentials, no defaults

### Rate limiting
Contact form and AI endpoints rate limited per IP to prevent abuse and runaway API costs.

```ts
// Simple approach: @upstash/ratelimit + Redis
// Or: in-memory limiter for low-traffic self-hosted setup
// AI endpoints: ~10 requests / minute per IP
// Contact form: ~5 requests / 10 minutes per IP
```

### HTTP security headers

Applied in `next.config.ts`:

```ts
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://api.anthropic.com",
    ].join('; ')
  },
]
```

### HTTPS
Enforced at the Cloudflare / Dokploy level. HTTP redirects to HTTPS. SSL managed by Cloudflare.

### Input sanitisation
- Contact form: server-side validation before any processing
- AI endpoints: length limits enforced server-side
- Payload handles CMS input validation via collection field config

### Dependencies
- `pnpm audit` runs in CI — fail on high severity
- Outdated packages reviewed regularly

---

## 12. AI Workflow & Tooling

### Philosophy
AI is used as an engineering multiplier. Every significant AI interaction is logged. The goal is to demonstrate orchestration and judgment — knowing when to use it, what to change before shipping it, and what it got wrong.

### Tools in use
| Tool | Role |
|---|---|
| Cursor | Primary IDE + agentic coding |
| Claude Code | Secondary agent — audits, parallel features, PR review |
| Claude.ai | Architecture planning, writing, design decisions |

### Cursor rules (`.cursor/rules/`)

```
.cursor/rules/
  global.mdc        project conventions, stack, naming
  components.mdc    component patterns, Tailwind v4 token usage
  payload.mdc       Payload field conventions, collection patterns
  testing.mdc       what to test, structure, what to skip
  git.mdc           commit format, branch naming, PR conventions
```

Example `git.mdc`:
```
Follow gitmoji commit format:
  <intention> [scope?][:?] <message>

Branch naming: feature/description, fix/description
Never push directly to main — always open a PR.
Reference Linear issue in commit where applicable.
Always use pnpm.
```

### Git workflow
- `main` — production, protected
- `develop` — integration
- Feature branches from `develop`, PRs back to `develop`
- `develop` → `main` on milestone completion
- Git worktrees for parallel feature work

### AI log
`docs/ai-log/` — dated notes on significant AI interactions:
- What was asked
- What the output was
- What was changed before using it
- What it got wrong

Raw material for blog posts. Proof that AI output is reviewed, not blindly accepted.

---

## 13. Linear — Issues & Milestones

### Milestones

**M1 — Foundation**
Repo restructure, Tailwind v4 + tokens, fonts, component primitives, Storybook scaffolded, Payload collections defined, old collections archived

**M2 — Core pages**
Homepage, Projects index + template, Posts index + template — all wired to Payload, OG images live, RSS feed live

**M3 — AI page**
Sidebar log nav, Roast My Website, RAG playground, structured output demo

**M4 — Contact & polish**
Contact page, rate-limited form, site settings global wired, nav finalised

**M5 — Testing**
Vitest unit tests, Playwright e2e critical paths, visual regression baseline

**M6 — Security & DevOps**
HTTP headers, rate limiting, Cloudflare proxy configured, CI pipeline finalised, Dokploy deployment documented

**M7 — Launch**
Launch checklist complete, Storybook deployed, Umami live, first 3 posts published

### Issue template
```
Title: short description
Milestone: M1–M7
Label: feature | fix | chore | test | docs
Linear ID: LIN-XX

Acceptance criteria:
- [ ] ...

AI usage:
- Cursor used for: ...
- Reviewed and modified before committing: yes / no / partially
```

---

## 14. Migration & Cleanup

### Status legend

- **Done**: target state already matches repo
- **Pending**: target state still requires implementation work
- **Needs decision**: requires explicit keep/archive/remove choice before implementation

### Current state snapshot (April 2026)

- Legacy collections/routes listed for deletion are already gone (`Pages`, `Web`, `Content`, `StaticPages`, old frontend catch-all/content/web/search routes, and seed endpoint path).
- `src/_archive/` now exists with an archive policy README.
- Component roots were normalized into `src/components/{blocks,layout,templates}`.
- `src/search/` remains in place pending a final keep-vs-move decision.

### Collections — target action vs status

| Current collection | Target action | Status | Notes |
|---|---|---|---|
| **Pages** | DELETE | Done | Code-driven templates replaced generic CMS pages |
| **Posts** | REWORK | Done | Read-time hook and tags architecture are present |
| **Media** | KEEP | Done | Required for uploads |
| **Categories** | DELETE + REPLACE | Done | Replaced by Tags |
| **Users** | KEEP | Done | Required for auth |
| **Web** | DELETE | Done | Not in new design |
| **Content** | DELETE | Done | Not in new design |
| **StaticPages** | DELETE | Done | Not in new design |
| **Projects** | CREATE | Done | New collection exists |
| **Tags** | CREATE | Done | New collection exists |

### Globals — target action vs status

| Current global | Target action | Status | Notes |
|---|---|---|---|
| **Header** | KEEP + REWORK | Done | Normalized to `src/components/layout/header/` |
| **Footer** | KEEP + REWORK | Done | Normalized to `src/components/layout/footer/` |
| **Sidebar** | DELETE | Done | No longer present |
| **Site Settings** | CREATE | Done | Global exists |

### Routes to delete — target action vs status

| Route | Target action | Status | Reason |
|---|---|---|---|
| `/[slug]` | DELETE | Done | Generic CMS pages route replaced by purpose-built pages |
| `/content/[slug]` | DELETE | Done | Content collection removed |
| `/web/[slug]` | DELETE | Done | Web collection removed |
| `/search` | DELETE | Done | Search page out of scope at launch (plugin kept) |
| `/next/seed` | DELETE | Done | Seed endpoint was a development artifact |

### Files to delete — target action vs status

| Path | Target action | Status | Notes |
|---|---|---|---|
| `src/collections/Pages/` | DELETE | Done | Removed |
| `src/collections/Web/` | DELETE | Done | Removed |
| `src/collections/Content/` | DELETE | Done | Removed |
| `src/collections/StaticPages/` | DELETE | Done | Removed |
| `src/Sidebar/` | DELETE | Done | Removed |
| `src/app/(frontend)/[slug]/` | DELETE | Done | Removed |
| `src/app/(frontend)/content/` | DELETE | Done | Removed |
| `src/app/(frontend)/web/` | DELETE | Done | Removed |
| `src/app/(frontend)/search/` | DELETE | Done | Removed |
| `src/endpoints/seed/` | DELETE | Done | Removed |
| `tailwind.config.mjs` | DELETE | Done | Replaced by Tailwind v4 CSS-first setup |

### Component migration matrix (current roots)

| Current root | Role today | Target location | Disposition | Priority | Status |
|---|---|---|---|---|---|
| `src/Header/` | Header/global config + UI | `src/components/layout/header/` (or equivalent canonical layout path) | Move + normalize imports | P1 | Done |
| `src/Footer/` | Footer/global config + UI | `src/components/layout/footer/` (or equivalent canonical layout path) | Move + normalize imports | P1 | Done |
| `src/heros/` | Hero variants + config | `src/components/templates/heroes/` (or agreed template path) | Move + normalize naming (`heros` -> `heroes`) | P1 | Done |
| `src/blocks/` | Payload-rendered blocks | `src/components/blocks/` for active blocks; `src/_archive/blocks/` for deprecated blocks | Split keep/archive | P2 | Done |
| `src/search/` | Search plugin integration | Keep near plugin code (`src/search/`) or move to `src/lib/search/` | Needs decision (keep path vs move) | P2 | Needs decision |

### Codebase cleanup

- Remove Vercel references from `next.config.js` (`VERCEL_PROJECT_PRODUCTION_URL`) and `payload.config.ts` (`CRON_SECRET`) — **Done**
- Rename `next.config.js` → `next.config.ts` — **Done**
- Update `postcss.config.js` → `postcss.config.mjs` for TW4 — **Done**
- Fix Dockerfile `next.config.mjs*` reference to match actual config filename — **Done**
- Audit `src/components/ui/` — keep useful primitives (button, card, input, label, select, dialog, tabs), delete unused ones — **Pending**
- Create `src/_archive/` and move deprecated components/code before deletion — **Done (archive scaffold created)**

### Execution backlog (components + cleanup)

#### Phase A — establish archive + classify
1. Create `src/_archive/` with `README.md` explaining archive policy and reactivation rules.
2. Classify every current root in the migration matrix as `active-move`, `archive`, or `remove`.
3. For `src/blocks/`, split block-by-block into active vs archive candidates before moving files.

#### Phase B — relocate active roots
1. Move `src/Header/` and `src/Footer/` into the canonical layout component path.
2. Move `src/heros/` into template-level location and normalize naming to `heroes`.
3. Move active `src/blocks/` files into `src/components/blocks/`.
4. Update all imports after each move and keep build green after every batch.

#### Phase C — remove stale codepaths
1. Move deprecated block/component code to `src/_archive/`.
2. Remove dead imports/exports from previous root paths.
3. Finalize decision on `src/search/` location and apply consistently.

#### Phase D — validate + close
1. Run `pnpm lint`.
2. Run `pnpm tsc --noEmit`.
3. Run `pnpm test` (or project-specific unit/e2e split if configured).
4. Mark matrix rows and cleanup bullets as Done once validated.

### Completion criteria

- No active runtime imports from deprecated roots (`src/Header`, `src/Footer`, `src/heros`, and any `src/blocks` entries marked archive/remove).
- `src/_archive/` exists with a clear README documenting purpose, boundaries, and retrieval process.
- Migration tables in this section use explicit `Done`/`Pending`/`Needs decision` statuses only.
- Cleanup validation commands pass via `pnpm` before section 14 is considered complete.

---

## 15. Launch Checklist

> Will become a standalone blog post — framework-agnostic, opinionated, shareable.

### Performance
- [ ] Lighthouse > 90, mobile and desktop, all pages
- [ ] `next/image` throughout, WebP, correct `sizes` prop
- [ ] Fonts self-served via `next/font`, zero external font requests
- [ ] `next/dynamic` for heavy client components
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### SEO
- [ ] Unique `<title>` and `<meta description>` on every page
- [ ] Open Graph tags on all pages
- [ ] OG image auto-generated per post and project
- [ ] Twitter card meta
- [ ] `robots.txt` — allow all, block `/admin`
- [ ] `sitemap.xml` — auto-generated from Payload
- [ ] Canonical URLs set
- [ ] JSON-LD structured data on Post and Project pages
- [ ] RSS linked in `<head>` as `<link rel="alternate" type="application/rss+xml">`

### Accessibility
- [ ] All images have descriptive `alt` text
- [ ] WCAG AA contrast on all text
- [ ] Keyboard navigation throughout
- [ ] Visible focus styles
- [ ] Skip-to-content link
- [ ] `aria-label` on icon-only buttons
- [ ] Semantic HTML (`<article>`, `<nav>`, `<main>`)

### Security
- [ ] No secrets in source or client bundle
- [ ] Payload admin behind Tailscale only
- [ ] Rate limiting on contact form and AI endpoints
- [ ] Security headers configured
- [ ] HTTPS enforced via Cloudflare
- [ ] `pnpm audit` passing in CI

### Analytics
- [ ] Umami installed and tracking
- [ ] Goals configured: contact form submit, project link clicks, AI tool usage
- [ ] No Google Analytics, no cookie banner required

### Monitoring
- [ ] Error tracking (Sentry free tier or self-hosted Glitchtip)

### Content
- [ ] Minimum 3 posts published
- [ ] All projects have real screenshots (no placeholders)
- [ ] Contact form tested end-to-end with a real email address
- [ ] All external links checked — no 404s
- [ ] `statusText` set correctly in Site Settings

### Code quality
- [ ] `tsc --noEmit` passes
- [ ] ESLint clean
- [ ] Vitest all passing
- [ ] Playwright all passing
- [ ] Storybook builds without errors

---

## 16. Blog & Case Study Strategy

### Voice
Write as someone figuring things out properly, not as an authority. "Here's what I tried, here's what broke, here's how I fixed it" is more useful and more credible than a definitive guide. The WordPress background is not a liability in blog content — it's relatable.

### Post ideas (priority order)

1. **Rebuilding my portfolio with AI — what actually worked** — the meta case study
2. **What moving from WordPress to Next.js + Payload actually taught me** — honest, relatable, searchable
3. **Self-hosting Payload CMS on Hetzner with Dokploy and Tailscale** — niche, useful, good DevOps story
4. **The website launch checklist I actually use** — evergreen, shareable
5. **Using git worktrees for parallel AI agent development** — practical, underused tool
6. **How I set up Cursor rules for a Next.js + Payload project** — useful for other devs
7. **Building a test suite as someone who's never really tested before** — honest, beginner-friendly
8. **RAG in plain English — building a minimal demo from scratch** — AI engineering, not just usage
9. **Using AI ethically as a freelancer** — opinion piece
10. **The security checklist nobody tells juniors about** — shows growth mindset

### Screencasting plan
Short clips (will use something like Cap.so) embedded in posts:
- Cursor generating a component, voiceover on what was accepted vs changed
- Payload admin — filling out a project entry, showing field UX
- Roast My Website in action (good for LinkedIn)
- Playwright tests running
- Dokploy deployment

---

## 17. What Employers Will See

| Signal | Where |
|---|---|
| Visual design ability | Every page — consistent, not templated |
| Frontend craft | Tailwind v4 tokens, component system, Storybook |
| Full-stack thinking | Payload collections, API routes, RSS, OG images |
| Architecture judgment | Code-driven templates where appropriate, blocks where flexible |
| AI engineering | AI page tools, Cursor rules, AI log blog posts |
| DevOps awareness | CI/CD, Dokploy, Cloudflare, Tailscale, security headers |
| Testing discipline | Vitest + Playwright, visible in repo |
| Honest communication | PLAN.md, blog posts, code comments |
| Personality | Site aesthetic, post voice, the Scottish AI roaster |
| Growth mindset | The WordPress post, the testing-from-scratch post, writing openly |

The pitch is not "hire a senior engineer." It is: "hire someone who is serious about the craft, learning fast, genuinely effective with AI, and worth taking a chance on." That's a more compelling and more sustainable position than faking seniority.

---

## 18. What's Missing / To Revisit

- **Email for contact form** — Resend is the easiest option (free tier, great DX). Decide before M4.
- **Draft mode / preview** — Next.js draft mode wired to Payload preview. Not launch-critical but worth doing.
- **Storybook deployment** — `storybook.jamjam.dev` so it's publicly linkable.
- **Second AI agent** — Claude Code for parallel work and PR audits. Revisit after M1 is settled.
- **Search** — out of scope at launch volume. Plugin retained. Future post candidate (Payload + Meilisearch).
- **RSS comments / Webmention** — nice signal that you care about the open web. Future consideration.
- **Comment system** — out of scope for now. Self-hosted Remark42 if ever needed.
- **Cloudflare Tunnel** — evaluate vs standard proxy after initial deployment works.

---

*Last updated: April 2026*
*Document owner: Jamie McNeil*
*Repo: github.com/jamjam/jamjam.dev*
