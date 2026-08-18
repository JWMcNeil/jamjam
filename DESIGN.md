---
name: jamjam.dev
description: Dark terminal portfolio for a creative developer — technical, playful, confident.
colors:
  page: "#0a0a0a"
  card: "#0c0c0c"
  card-hover: "#0f0f0f"
  accent: "#629168"
  accent-hover: "#66ccbb"
  accent-dot: "#3a9a3a"
  primary-teal: "#44aa99"
  foreground: "#dddddd"
  text-heading: "#f0f0f0"
  text-primary: "#cccccc"
  text-secondary: "#999999"
  text-muted: "#888888"
  text-nav: "#888888"
  text-prompt: "#888888"
  text-dim: "#7a7a7a"
  text-prose: "#aaaaaa"
  border: "#1e1e1e"
  border-subtle: "#1e1e1e"
  muted: "#161616"
  input-bg: "#111111"
  ring: "#629168"
  destructive: "#e05555"
  success: "#3a9a3a"
typography:
  display:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'Courier New', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  mono-sm:
    fontFamily: "'JetBrains Mono', ui-monospace, 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  post-title:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
spacing:
  section-y: "4rem"
  section-y-lg: "6rem"
  card-padding: "1rem"
  card-padding-md: "1.25rem"
components:
  button-outline:
    backgroundColor: "{colors.page}"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  button-outline-hover:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  button-default:
    backgroundColor: "#222222"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  tag-pill:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.text-nav}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
  input-default:
    backgroundColor: "rgba(12, 12, 12, 0.5)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
    height: "2.75rem"
---

# Design System: jamjam.dev

## Overview

**Creative North Star: "The Late-Night Terminal"**

jamjam.dev reads like a developer's workspace after hours: dark surfaces, green accent glow, mono prompts that wink without cosplay. The system is brand-register work where personality is the product; hiring visitors should feel Jamie's craft and humor before they read a project list. Density is moderate: generous hero type, tight mono labels, bordered containers instead of floating card shadows.

The aesthetic is committed, not hedged. Near-black backgrounds carry the page; green accent appears on links, status, selection, and focus rings. Terminal metaphors (`jamjam:~$`, `// section`, `$` button prefixes) are voice, used where they add wayfinding or delight.

This system explicitly rejects generic SaaS landing pages (cream backgrounds, hero metrics, identical feature grids), template portfolios (Inter stacks, purple gradients, repeated icon-card grids), and corporate brochures (stock photography, buzzword copy).

**Key Characteristics:**

- Dark-first tonal layering (`page` → `card` → `border`) instead of shadows
- Schibsted Grotesk for display and body; JetBrains Mono for terminal voice
- Green accent as rare signal, not wallpaper
- Subtle borders (`#1e1e1e`) define structure on dark surfaces
- Motion: GSAP reveals on heroes; 200ms ease-out micro-interactions on links and arrows
- `prefers-reduced-motion`: ping animations and hover transforms disabled

## Colors

A restrained dark neutral base with one green accent family and a teal primary for links and interactive emphasis.

### Primary

- **Studio Green** (`#629168`): Accent color for selection highlights, focus rings, status dot, and semantic emphasis. Used sparingly; rarity is the point.
- **Terminal Teal** (`#44aa99`): Primary interactive color for links, prompt prefixes, and bracket accents in terminal-style buttons.
- **Live Status Green** (`#3a9a3a`): Pulsing status dot on the home hero; signals "currently building."

### Secondary

- **Accent Hover Mint** (`#66ccbb`): Hover state for accent-tinted interactive elements.

### Neutral

- **Void Black** (`#0a0a0a`): Page background. The default canvas for every surface.
- **Panel Black** (`#0c0c0c`): Card and popover backgrounds.
- **Panel Lift** (`#0f0f0f`): Card hover state; subtle tonal shift, not a shadow.
- **Input Well** (`#111111`): Form field backgrounds.
- **Divider** (`#161616`): Muted surfaces and dividers.
- **Hairline Border** (`#1e1e1e`): Default border color for cards, header chrome, inputs.
- **Heading White** (`#f0f0f0`): Primary headings and hero emphasis.
- **Body Default** (`#dddddd`): Default body text on dark surfaces.
- **Body Mid** (`#cccccc`): Secondary emphasis text.
- **Body Dim** (`#999999`): Supporting copy and excerpts. Meets AA on `#0a0a0a`.
- **Nav Muted** (`#888888`): Navigation labels and de-emphasized UI text.
- **Prompt Muted** (`#888888`): Terminal prompt prefixes and mono metadata.

### Named Rules

**The One Glow Rule.** Green accent appears on ≤10% of any screen: selection, focus, status, links, and one deliberate highlight. If everything glows, nothing reads as signal.

**The No Cream Rule.** Never introduce warm near-white body backgrounds. Warmth lives in accent, typography, and imagery, not in `#faf7f2` paper tones.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui fallback)
**Body Font:** Schibsted Grotesk (same family, weight contrast carries hierarchy)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Courier New fallback)

**Character:** Schibsted Grotesk at black weight (900) for hero statements; JetBrains Mono for terminal voice. Humanist sans with Nordic clarity: technical without geometric flatness, distinct from template portfolio defaults.

### Hierarchy

- **Display** (900, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.1): Home hero and page-defining headlines. Max visual weight on the site.
- **Post title** (700, `2.125rem` at large breakpoints, line-height 1.2): Article `h1` on `/posts/[slug]`. Between headline and display so the post is a document, not a marketing hero.
- **Headline** (600, 1.125–1.5rem, line-height 1.375): Project titles, section headings within cards.
- **Body** (400, 1rem, line-height 1.625): Prose, excerpts, form labels. Cap line length at 65–75ch for long-form posts.
- **Label** (400, 0.75rem mono): Section eyebrows (`// featured projects`), lifecycle badges, tag pills. Lowercase or hash-prefixed; not all-caps tracked eyebrows on every section.

### Named Rules

**The Terminal Earned Rule.** Mono labels belong on section headers, status lines, project metadata, and nav prompts. Do not put `jamjam:~$` on every heading; earned placement only.

**The Weight Contrast Rule.** Hierarchy comes from scale + weight (900 display vs 400 body), not from adding a third typeface.

## Elevation

This system is flat by default. Depth is conveyed through tonal layering (page → card → hover lift) and 1px borders, not box shadows. Cards sit on `card` background with `border-border`; hover shifts to `card-hover`. The sticky header uses solid `background` with a bordered chrome bar, not blur or glass.

Header chrome includes a diagonal stripe fill (`repeating-linear-gradient`) as texture, not elevation.

### Shadow Vocabulary

No shadow scale is defined. Interactive depth uses border + background shift only. Focus states use `ring-2 ring-ring` (green) with offset, not glow shadows.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Hover is a tonal nudge (`card` → `card-hover`), never a lifted shadow card.

**The No Glass Rule.** No glassmorphism, backdrop blur cards, or frosted panels unless a specific experiment in Lab calls for it.

## Components

### Buttons

- **Shape:** Slightly rounded corners (`rounded-sm`, 4px)
- **Shell:** Mono font, inline-flex, `transition-colors`, focus ring on `ring` green
- **Outline (default nav CTA):** `bg-page` + `border-border`, hover `bg-card`
- **Default:** `bg-grey-100` (`#222222`) + border, hover `bg-grey-150`
- **Link variant:** Text-only primary teal with underline offset
- **Terminal content:** Optional `$` prefix, `->` arrow on hover with 200ms translate (respects `motion-safe`)
- **Accent-bracket variant:** `[ label ]` with teal brackets for special CTAs

### Chips / Tags

- **Style:** Mono `text-xs`, `rounded-sm`, tinted background per colour token (emerald, indigo, amber, etc.), 1px border matching hue
- **Format:** Hash-prefixed labels (`#nextjs`, `#ai`)
- **State:** Static; no toggle/filter animation

### Cards / Containers

- **Corner Style:** `rounded-sm` (4px)
- **Background:** `bg-card` (`#0c0c0c`), hover `bg-card-hover`
- **Shadow Strategy:** None; border-only (`border-border`)
- **Border:** 1px solid `#1e1e1e`
- **Internal Padding:** `p-4 md:p-5` on project cards; `p-4` on about panel
- **Project cards:** Aspect-video media top, mono type prompt + lifecycle badge row, title, excerpt, tag row

### Inputs / Fields

- **Style:** `rounded-lg` (8px), `border-border`, semi-transparent `bg-card/50`, height 44px
- **Focus:** `ring-2 ring-ring` green, border shifts to `ring/50`
- **Placeholder:** `text-muted-foreground` (`#888888`); verify contrast on dark bg

### Navigation

- **Header:** Sticky, `z-[150]`, solid dark background, max-width 7xl centered
- **Chrome bar:** 56px height, segmented layout (logo | breadcrumb | stripe texture | nav)
- **Logo:** MotoGuy badge + `jamjam.dev` in `font-black` at md+
- **Mobile:** Sheet dropdown anchored to header bar; backdrop fade at `bg-background/80`
- **Nav text:** Muted default; accent on active/hover paths

### Status Dot (signature)

- Pulsing green dot beside home hero status line
- 3s ping animation; `motion-reduce:animate-none` for reduced motion
- Uses `accent-dot` color

## Do's and Don'ts

### Do:

- **Do** keep the page background at Void Black (`#0a0a0a`) and build hierarchy through borders and tonal shifts.
- **Do** use Terminal Teal (`#44aa99`) for links and Studio Green (`#629168`) for focus, selection, and status.
- **Do** write section labels in mono with `//` or shell-style prompts where they add personality.
- **Do** use GSAP `power3.out` for hero reveals and respect `prefers-reduced-motion` with instant or crossfade fallbacks.
- **Do** show real project imagery and writing; design frames the work.
- **Do** use tag pills with hash prefixes and hue-tinted backgrounds from the tag palette.

### Don't:

- **Don't** build generic SaaS landing pages: no cream backgrounds, hero metrics, identical feature card grids, or buzzword copy.
- **Don't** ship template portfolio patterns: no Inter/default sans swaps, purple gradients, or endless same-sized icon + heading + blurb cards.
- **Don't** slide into corporate brochure tone: no stock photography fillers or "we leverage synergies" language.
- **Don't** use border-left or border-right accent stripes on cards or callouts.
- **Don't** apply gradient text (`background-clip: text`) for emphasis.
- **Don't** add glassmorphism or decorative blur cards by default.
- **Don't** put a tiny uppercase tracked eyebrow above every section.
- **Don't** use body text below `#7a7a7a` on `#0a0a0a` (the `text-dim` floor).
- **Don't** nest cards inside cards.
