---
name: payload-authoring-excellence
description: Best practices for making a Payload CMS admin panel a genuinely excellent authoring experience — not just a default config. Use whenever the user is designing or reviewing Payload Collections/Globals, writing field configs, setting up access control, building custom admin components, configuring Live Preview, structuring the admin nav, working with drafts/versions, adding localization, or picking/writing Payload plugins. Trigger this even if the user just says "make this Payload collection nicer for editors" or "set up Payload the right way" — don't wait for them to name a specific feature.
---

# Payload Authoring Excellence

A companion for going beyond Payload's default admin config — modeled on Sanity's "Studio Excellence" course, adapted to Payload's actual primitives. The goal in every case is the same: the person who has to fill out this form every day should not hate it.

## How to use this skill

1. Figure out which layer of the problem the user is in (see table below) and read the matching reference file. Several often apply to one request — e.g. "build a blog collection" touches `fields.md` and `admin-structure.md` at minimum.
2. Explain the *why* briefly (what breaks/feels bad without it), then write the actual Payload config code — fields, components, hooks. Don't just describe it in prose.
3. Prefer real, working TypeScript matching Payload 3.x config conventions (`CollectionConfig`, `Field`, etc.) over pseudocode.
4. If the user's project already has Payload conventions (check for an existing `payload.config.ts`, `collections/` folder, custom component patterns), match those conventions rather than introducing new ones.

## Topic map

| User is trying to... | Read |
|---|---|
| Write clearer field labels/descriptions, add validation, conditional fields, group/tab a long form | `references/fields.md` |
| Show different fields/collections to different roles, lock down who can publish | `references/access-control.md` |
| Build a custom input, replace a default component, add a bespoke admin view | `references/custom-components.md` |
| Let editors see their draft rendered against the real site before publishing | `references/live-preview.md` |
| Organize the sidebar nav, customize list/document views, set useful document titles | `references/admin-structure.md` |
| Add draft/publish workflow, autosave, compare versions | `references/versions-drafts.md` |
| Support multiple languages/locales | `references/localization.md` |
| Extend Payload with a plugin, or decide whether to write one | `references/plugins.md` |

## Principle

Payload's default config is functional but generic. Excellence work is almost always: (a) naming things the way an editor thinks about them, not the way the schema is structured, (b) hiding complexity until it's needed (conditional fields, tabs, role-based visibility), and (c) closing the gap between "I saved this" and "I know what it'll look like." Every reference file below is organized around one of those three moves.
