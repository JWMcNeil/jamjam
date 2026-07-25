# Live Preview: let editors see it before they publish

This is Payload's answer to "I hit save and had no idea what it'd look like." Renders your front end in an iframe right beside the form, updating as the editor types — no save/publish required to see it.

## Setup

Enable at root, collection, or global `admin.livePreview`:

```ts
admin: {
  livePreview: {
    url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${data.slug}`,
    collections: ['pages'],
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
    ],
  },
}
```

`url` can be a static string or a function of the current document data (needed whenever the preview URL depends on a slug/id). `breakpoints` add device-size options to the toolbar dropdown; "Responsive" (fills the panel) is always available for free.

## Front end: server-side vs. client-side

- **Server-side (preferred if your framework supports it)** — on every change, Payload triggers a re-fetch (in Next.js, just `router.refresh()` via Payload's `RefreshRouteOnChange`). Simpler and more performant. Pair with **Autosave** (see `versions-drafts.md`) so the round-trip actually has fresh data to fetch.
- **Client-side** — use `useLivePreview` from `@payloadcms/live-preview-react`, pass `serverURL` + `initialData`, get back live `data` to render directly. Needed when you can't do server round-trips per keystroke.

## Gotchas

- If your front end sets a Content-Security-Policy, the admin panel's iframe may be blocked — whitelist the admin domain via `frame-ancestors`.
- Cross-domain front end (different domain than Payload) needs CORS configured or relationship/upload data won't resolve inside the preview.

## When this is worth setting up

High-value for anything visually composed (pages, blocks, hero sections) where the gap between "data I entered" and "what it looks like" is large. Lower value for content that's purely structured data with no direct visual rendering (e.g. a pricing config, a tag taxonomy) — skip it there rather than building a preview no one needs.
