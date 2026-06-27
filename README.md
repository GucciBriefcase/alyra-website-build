# ALYRA — marketing website

Production Astro build of the ALYRA private asset-backed lending marketing site,
converted from the approved design handoff in [`design_handoff_alyra_site/`](design_handoff_alyra_site/).

Static, SEO/AEO/GEO-focused, minimal JavaScript, deployable to Vercel.

## Stack

- **Astro 5** (static output) · **TypeScript** (strict)
- CSS variables for design tokens (no CSS framework)
- `@astrojs/sitemap` for `sitemap-index.xml`
- Minimal client JS: nav scroll-state + mobile menu, scroll reveals, FAQ accordion (native `<details>`), form validation/submit

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # serve the built site
npm run check    # astro check (type + template diagnostics)
```

## Project structure

```
src/
  config/site.ts            Central NAP / entity / regulatory / metadata config (single source of truth)
  data/assets.ts            Six asset records → homepage cards + asset template
  data/faqs.ts              Homepage FAQ set
  styles/global.css         Design tokens (from CLAUDE.md) + shared classes
  layouts/BaseLayout.astro  HTML shell, fonts, Organisation + WebSite schema, Nav/Footer
  components/
    Seo.astro JsonLd.astro Breadcrumbs.astro Nav.astro Footer.astro Logo.astro
    forms/ValuationForm.astro
    sections/ TrustStrip HowItWorks SecurityCustody SpecialistCard Faq RequestSection
  lib/valuation.ts          Form submission logic (isolated from UI)
  pages/
    index.astro             Homepage
    loans/[slug].astro      Reusable asset-detail template (6 pages)
    valuation.astro         Confidential valuation enquiry page
public/
  assets/                   Images (copied from the handoff)
  robots.txt favicon.svg
```

## Pages

| Route | Source |
|---|---|
| `/` | Homepage |
| `/loans/high-value-watches/` | Asset template + data |
| `/loans/jewellery-and-diamonds/` | Asset template + data |
| `/loans/fine-art/` | Asset template + data |
| `/loans/classic-luxury-cars/` | Asset template + data |
| `/loans/gold-bullion/` | Asset template + data |
| `/loans/designer-handbags/` | Asset template + data |
| `/valuation/` | Enquiry form page |

## Before launch — replace placeholders

All in [`src/config/site.ts`](src/config/site.ts):

- `baseUrl` — production domain (also used for canonical, OG, sitemap, schema)
- `phone` — leave empty to hide, or set a real number
- `legalEntity`, `abn`, `pawnbrokerLicence`, `secondHandDealerRegistration`
- `social` — profile URLs (feed Organisation `sameAs`)
- Replace the generated OG images in `public/assets/og-*.jpg` with purpose-built 1200×630 share images
- Add real `/privacy/`, `/terms/`, `/complaints/`, `/licence/` pages (footer links currently point to these paths)

## Wiring the enquiry form

The form (`src/components/forms/ValuationForm.astro`) is intentionally **not**
faking submissions. To connect a backend:

1. Set `SITE.enquiryEndpoint` in `src/config/site.ts` to your endpoint
   (Formspree/Basin URL, a Vercel serverless function, etc.).
2. If the payload shape needs adjusting, edit `submitValuation` in
   [`src/lib/valuation.ts`](src/lib/valuation.ts) — the form markup does not change.

Without JS the form does a native `POST` to the endpoint; with JS it validates
inline and submits via `fetch`, showing success/error states. A honeypot field
(`company`) provides basic spam protection. For Astro Actions or a serverless
endpoint, add the `@astrojs/vercel` adapter and switch `output` accordingly.

## Deployment (Vercel)

Static build — Vercel auto-detects Astro. No adapter required while the site
stays static. Build command `npm run build`, output directory `dist/`.

## Not yet built (available to add)

The handoff also includes an **Insights index** and **Article** template
(`design_handoff_alyra_site/pages/ALYRA Insights.dc.html`, `ALYRA Article - Watch Value 2026.dc.html`).
These were out of the current scope; the layout, tokens and components are ready to extend to them.
