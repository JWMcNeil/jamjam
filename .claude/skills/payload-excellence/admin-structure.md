# Admin structure: nav, list view, document identity

Small config options that determine whether the sidebar and list views feel organized or like a raw table dump of every collection you've ever created.

## Nav grouping

`admin.group: 'Content'` on a collection clusters it under a labeled heading in the sidebar nav instead of one long flat list. Group by how editors think about the site (Content / Commerce / Settings), not by how the code is organized.

## Document identity — `useAsTitle`

Without it, list rows and document headers show the raw `id`. Set to whatever field an editor would actually recognize:

```ts
admin: { useAsTitle: 'title' }
```

If the natural title lives on a related document (`useAsTitle` pointing at a relationship only shows the related ID), add a **virtual field** that pulls the display value and point `useAsTitle` at that instead.

## List view

- **`defaultColumns`** — which fields show as columns by default. Pick 3–5 that let someone scan the list and know what they're looking at (title, status, updatedAt) — not every field.
- **`listSearchableFields`** — which fields the search box matches against (defaults to `useAsTitle` only). Index any field you add here or admin search gets slow at scale.
- Both are per-user overridable — editors can reorder/hide columns themselves, saved as their own preference. Your defaults just set the starting point.

## Collection/Global descriptions

`admin.description` at the top level of a Collection or Global config — shows under the label in the nav/list header. Use it to say what the collection is *for*, especially for anything non-obvious to a new editor.

## Custom views

Beyond configuring the built-in List/Edit views, you can add or replace whole routes nested under a collection (`admin.components.views`) — e.g. a "Preview all drafts" dashboard, a bulk-tagging tool. Reach for this when the task genuinely isn't "edit one document" — see `custom-components.md`.

## Quick pass for a new/reviewed collection

- [ ] Is it grouped sensibly in the nav, not just dumped at the top level?
- [ ] Does `useAsTitle` show something a human recognizes?
- [ ] Do the default list columns tell you the document's status at a glance?
- [ ] Does the collection have a one-line description for anyone new to it?
