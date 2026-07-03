---
target: homepage (src/app/(frontend)/page.tsx)
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-07-03T04-04-31Z
slug: src-app-frontend-page-tsx
---
# Design Critique: Homepage (`src/app/(frontend)/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Status line + active nav work; no explicit "you are here" beyond breadcrumb on home |
| 2 | Match System / Real World | 4 | Terminal voice lands for dev/hiring audience; labels are plain ("Projects", "Posts") |
| 3 | User Control and Freedom | 3 | Standard nav + mobile sheet; no traps |
| 4 | Consistency and Standards | 4 | Mono section labels, buttons, cards, and header chrome are cohesive |
| 5 | Error Prevention | 2 | No empty state if zero featured projects; CMS-dependent gaps possible |
| 6 | Recognition Rather Than Recall | 3 | Nav always visible; contact only in header + about email at page bottom |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts or power paths; fine for portfolio |
| 8 | Aesthetic and Minimalist Design | 3 | Focused dark UI, but long scroll stacks four similar section rhythms |
| 9 | Error Recovery | 2 | n/a for marketing surface |
| 10 | Help and Documentation | 2 | Contact exists but no obvious "work with me" path above the fold |
| **Total** | | **28/40** | **Good — solid foundation, targeted fixes will lift hiring impact** |

## Anti-Patterns Verdict

**LLM assessment:** Does not read as generic AI slop. The segmented header chrome, diagonal stripe fill, terminal status line, and project-type mono prompts (`// client`, `// demo`) feel authored. This is intentional identity from PRODUCT.md, not a template swap.

**Caveat (second-order):** "Dark terminal dev portfolio" is a crowded lane. A skeptical viewer might still file it under "developer dark mode site" before noticing the craft. That is acceptable given your stated intent to refine, not reinvent — but personality must come from copy, imagery, and motion, not from more `$` prompts.

**Deterministic scan:** `detect.mjs` on homepage component tree returned **0 findings** (clean).

**Visual overlays:** Browser script injection was not available in this session. No live overlay tab; assessment used source review + screenshot + accessibility snapshot instead.

## Overall Impression

The homepage already communicates technical confidence and a distinct voice. The single biggest opportunity is **hiring conversion without betraying the brand**: make "available for work" and contact paths impossible to miss while keeping the terminal aesthetic earned, not louder.

## What's Working

1. **Header chrome** — Segmented bar (logo | breadcrumb | stripe | nav) is memorable and avoids generic sticky-nav blur. It reads as jamjam.dev, not a Payload template.
2. **Hero status line** — `jamjam:~$ available for work` with the pulsing dot is the right amount of terminal personality: one moment, high impact.
3. **Project cards** — Real thumbnails, lifecycle badges, type prompts, and hash tags give evaluators scannable proof without identical icon-card grids.

## Priority Issues

### [P1] Muted text contrast on dark surfaces
- **What:** Hero subline uses `text-text-secondary` (#555), intro prose uses `text-text-secondary` / `text-text-muted` (#444–#555), about email uses `text-text-dim` (#333). Several sit below 4.5:1 on `#0a0a0a`.
- **Why it matters:** Hiring managers skim quickly; low-contrast body copy reads as "unfinished" and fails PRODUCT.md's sensible-defaults a11y bar.
- **Fix:** Bump secondary body to ≥ `#888888` (nav level) or `#aaaaaa` for prose; keep dimmer tones for decorative mono labels only, not sentences.
- **Suggested command:** `/impeccable audit src/styles/globals.css`

### [P1] Hire path is under-signaled for primary audience
- **What:** "Available for work" lives in the status line and about footer. Contact is nav-only; no hero CTA to `/contact` or `mailto:`.
- **Why it matters:** PRODUCT.md success = personality + hiring evaluators reaching out. Personality is visible; the action is buried below three sections.
- **Fix:** Add one terminal-native CTA in the hero (`contact` outline button or `[ say hello ]` bracket variant) without adding a SaaS-style conversion block.
- **Suggested command:** `/impeccable layout src/app/(frontend)/page.tsx`

### [P2] About section is late for hiring scanners
- **What:** Bio, photo, and email sit after projects and posts (~4 scroll depths on desktop).
- **Why it matters:** Time-poor evaluators may leave with "nice projects" but no face/name/email anchor.
- **Fix:** Shorten path to identity: trim hero-to-about distance, or add a compact bio strip after the hero (photo + one line + email).
- **Suggested command:** `/impeccable layout src/app/(frontend)/page.tsx`

### [P2] Missing homepage metadata title
- **What:** Browser tab title was empty at runtime; `page.tsx` has no `generateMetadata`.
- **Why it matters:** Looks broken in tabs/bookmarks; hurts trust for detail-oriented hiring managers.
- **Fix:** Add `generateMetadata` with `jamjam.dev` + description from site settings.
- **Suggested command:** `/impeccable harden src/app/(frontend)/page.tsx`

### [P2] Featured projects empty state
- **What:** If no featured projects publish, the grid renders empty with no message (LatestPosts handles empty; projects section does not).
- **Why it matters:** Riley/stress-test gap; broken first impression during CMS setup.
- **Fix:** Mirror LatestPosts pattern: mono empty line or link to `/projects`.
- **Suggested command:** `/impeccable harden src/app/(frontend)/page.tsx`

## Persona Red Flags

**Jordan (Confused First-Timer):** Nav labels are clear. Red flag: no obvious "what do I do next?" after reading the hero — only scroll discovery. Contact is not labeled "Work with me" or similar for non-dev hiring managers.

**Casey (Mobile User):** Hamburger + thumb-reachable cards work. Red flag: email link only at bottom of long about panel; high friction on phone.

**Sam (Accessibility-Dependent):** Focus rings on links/buttons are present. Red flags: contrast failures on secondary prose; status dot conveys state with color + motion but no text alternative beyond adjacent status string (acceptable if status text always present).

**Morgan (Hiring Manager — project-specific):** Wants proof + person + low friction outreach in under 60 seconds. Red flags: must scroll past 3 projects + 3 posts to reach bio/email; no calendar or contact CTA in hero despite "available for work" signal.

## Minor Observations

- Hero `h1` lacks `text-wrap: balance` (DESIGN.md typography guidance).
- Three project cards in a uniform grid is borderline "identical card grid" ban, but saved by varied imagery and metadata — watch if a 4th template-looking card appears.
- `// featured projects` and `// latest posts` are two mono eyebrows — within "earned" limit; do not add a third on the same page.
- Document title empty; layout-level OG metadata exists but page title should be explicit.

## Questions to Consider

- What if the hero ended with one action: contact, not another scroll section?
- Does "available for work" deserve a `[ hire me ]` bracket button next to the status line?
- Would moving a cropped about photo beside the hero headline increase trust without feeling like a LinkedIn template?
