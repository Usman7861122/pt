# PT Site

Physical therapy website. Astro + React islands + Tailwind v4 + framer-motion.

## Run
```
npm install
npm run dev
npm run build
```

## Where things live
- `src/data/*` all content (site, services, conditions, press, local SEO). Pages only render data.
- `src/layouts/` BaseLayout (home) and PageLayout (inner pages with PageHero).
- `src/components/sections/` home and shared sections. `Header.tsx`, `SpineRail.tsx`, `Reveal.tsx` are React islands.
- `src/styles/global.css` Tailwind v4 tokens (`@theme`). Design goes here later.
- Every Book button uses `site.bookingUrl`.

## TODO
Real domain in `astro.config.mjs`, content, images in `public/images`, design, form endpoint, legal review.

## Homepage notes
- Fonts: Playfair Display (headings) + Inter (body), loaded from Google Fonts in `BaseLayout.astro`.
- Home content lives in `src/data/home.ts` (hero slides, conditions, team, gallery, insurance, locations) and `src/data/site.ts`.
- Images are in `public/images/{brentwood,coolsprings,nolensville,insurance}`. Square, slightly rounded images use the `.img-sq` class.
- Open items: real booking link, office hours, social links, Bluegrass logo, Midtown Nashville photo.
