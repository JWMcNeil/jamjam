# Localization: multi-language authoring

Payload localizes at the **field** level, not the document level — one document, each localized field internally holds a value per locale. This matters for authoring UX: editors don't duplicate documents per language, they just switch a locale selector.

## Setup

```ts
localization: {
  locales: [
    { label: 'English', code: 'en' },
    { label: 'Arabic', code: 'ar', rtl: true },
  ],
  defaultLocale: 'en',
  fallback: true, // API returns default-locale value when a translation is missing
}
```

Then mark individual fields: `{ name: 'title', type: 'text', localized: true }`. Nested field types (group/array/blocks) propagate localization to their children when the wrapper is marked localized.

## Authoring-experience gotchas worth designing around

- **The admin UI only shows the active locale's value** — `fallback: true` only affects API responses, not what an editor sees while writing. If `es` is empty, the field looks empty even though `en` has content — editors can mistake "not yet translated" for "broken." Consider a custom field description/component that surfaces the default-locale value as a hint when the current locale is empty (a common enough need that write one if you're localizing seriously).
- **Not everything should be localized.** Don't mark structural/config fields (slugs, feature flags, layout choice) as localized — only actual translatable content. Over-localizing bloats the editing form with locale-switching for fields that never differ.
- **RTL locales** — set `rtl: true` on the locale entry to opt fields into right-to-left text alignment automatically.

## Where locale is set

Passed per-request: `?locale=es&fallback-locale=none` (REST), `locale: es` (GraphQL/Local API). In the Admin Panel it's a persistent selector in the toolbar — the whole edit view re-renders for the selected locale.
