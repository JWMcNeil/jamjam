# Versions, drafts, autosave: safe-to-edit workflows

Editing should never feel dangerous. This is the layer that separates "I'm afraid to touch this because it's live" from "I can experiment freely and publish when ready."

## Enabling

Drafts build on Versions; Autosave builds on Drafts. Layer them:

```ts
versions: {
  maxPerDoc: 40,
  drafts: {
    autosave: { interval: 2000 }, // ms
    schedulePublish: true,
  },
}
```

Enabling drafts injects a `_status` field (`draft`/`published`) and swaps the Save button for separate **Save Draft** / **Publish** actions — this alone is often the single highest-impact change for an editorial team, since it decouples "saved my work" from "made it live."

## What each layer buys you

- **Versions alone** — history + diff view + restore, no draft/publish split. Good for audit trail on content that's always live (e.g. settings).
- **+ Drafts** — work-in-progress that isn't public until explicitly published. Combine with Live Preview (`live-preview.md`) so editors can see the draft rendered before publishing.
- **+ Autosave** — periodic background saves as a draft version while typing; doesn't touch the published version. Removes "did I lose my work" anxiety entirely.
- **+ `schedulePublish`** — editors pick a future date; requires Payload's Jobs Queue running to actually execute the publish/unpublish.

## Access control interplay

For non-admin roles, scope `update` access to `_status: { not_equals: 'published' }` so editors can freely edit drafts but can't silently overwrite what's live — publishing becomes a deliberate, separately-permissioned action. See `access-control.md`.

## When to skip it

Not every collection needs this ceremony. Settings/config-style Globals that only admins touch, or reference data with no "in progress" state, are usually fine with plain Versions (or nothing) — don't add Draft/Publish friction where there's no real draft phase.
