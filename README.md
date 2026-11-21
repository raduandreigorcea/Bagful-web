# Bagful-web

The marketing site for [Bagful](https://github.com/raduandreigorcea/Bagful), the shared shopping list. A static
[Astro](https://astro.build) site, started from `astro-boilerplate`, with no client framework.

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # astro check (types)
npm run build    # static output in dist/
```

Set `SITE_URL` in the host's environment once there is a custom domain; the sitemap, canonical links and share image
URL follow it.

## How it is put together

- **The phones are HTML, not screenshots.** `src/components/Phone.astro` is the frame; everything inside is sized in
  `em` from the phone's own width (container query units), so one phone scales from a mobile mockup to the hero.
  The screens live in `src/components/screens/` and copy the real app's look. Product icons and fonts are copied from
  the Bagful app repo (`src/assets/product-icons`, `public/fonts`); re-copy rather than redraw when they change.
- **Two scripts, both optional.** `src/scripts/hero.ts` plays the intro (items fly into the list). The HTML ships the
  finished state, so with no JS, or `prefers-reduced-motion`, the page shows that state. `src/scripts/steps.ts` swaps
  the sticky phone's screen as each step crosses the middle of the viewport; below 60rem there is no sticky stage and
  each step carries its own phone.
- **Colour.** Brand colours match the app. Full-bleed sections with paragraphs use `--green-field`, one step darker
  than the brand green, because cream on the exact brand green is 3.7:1.
- **The web app link** points at `famcart-app.vercel.app` on purpose; that domain is permanent (see the app repo).
- **Privacy and Terms** are plain drafts of what the app does today. Have them read by someone qualified before
  linking them from a store listing.
