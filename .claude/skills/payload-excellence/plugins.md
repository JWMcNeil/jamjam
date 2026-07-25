# Plugins: extend instead of reinvent

A Payload plugin is just a function that takes the config and returns a modified one — it can inject fields, collections, hooks, or whole admin views. Before building any of the authoring-experience features below yourself, check whether an official plugin already solves it well.

## Official plugins worth knowing for authoring UX specifically

- **SEO plugin** — adds a `meta` field group (title/description/image) to chosen collections/globals, with a live search-result preview, character-count hints, and a "regenerate" button you can wire to custom logic (e.g. auto-fill from an excerpt field). This is the single best off-the-shelf example of "authoring excellence" done for you — worth reading as a reference pattern even if you don't use it verbatim.
- **Form Builder plugin** — lets editors build forms from the admin panel itself (fields, validation, email notifications) instead of a developer hardcoding every form.
- **Search plugin** — syncs a lightweight, indexed copy of key fields (title, excerpt, slug) into a dedicated search collection for fast querying — separate concern from `listSearchableFields` (`admin-structure.md`), which only affects the admin List view search box.
- **Nested Docs plugin** — auto-generates breadcrumbs/hierarchy for self-referential collections (categories, page trees) — saves building parent/breadcrumb logic by hand.
- **Redirects plugin** — a redirects collection with UI, common companion to any URL/slug-driven content model.

Install via `plugins: [seoPlugin({ collections: ['pages'] })]` etc. in `payload.config.ts` — each has its own options object, check the specific plugin's docs for details.

## When to write your own vs. use an existing one

Write a custom plugin when the same authoring pattern needs to be shared across multiple Payload projects (e.g. across [[client-portal]] and future Zero Saints client builds) — bundling it as a plugin, even a private/internal one, beats copy-pasting field configs between projects. For a one-off, single-project need, a plain field/component in the collection config is simpler and fine.
