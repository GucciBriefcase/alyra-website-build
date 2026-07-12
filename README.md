# ALYRA — marketing website

Production Astro build of the ALYRA private asset-backed lending marketing site,
converted from the approved design handoff in [`design_handoff_alyra_site/`](design_handoff_alyra_site/).

Static, SEO/AEO/GEO-focused, minimal JavaScript, deployed to Vercel. The site is
live at [`https://www.alyra.com.au`](https://www.alyra.com.au).

## Stack

- **Astro 5** (static output) · **TypeScript** (strict)
- CSS variables for design tokens (no CSS framework)
- `@astrojs/sitemap` — emits `sitemap-index.xml` (+ `sitemap-0.xml`)
- Minimal client JS: nav scroll-state + mobile menu, scroll reveals, FAQ
  accordion (native `<details>`), Insights category filter, article reading
  progress, form validation/submit

## Commands

```bash
npm install
npm run dev      # local dev server (localhost:4321)
npm run build    # static build → dist/
npm run preview  # serve the built site
npm run check    # astro check (type + template diagnostics)
```

## Project structure

```
src/
  config/site.ts            Central NAP / entity / regulatory / metadata config (single source of truth)
  data/
    assets.ts               Six asset records → homepage cards + loan template
    faqs.ts                 Homepage FAQ set
    insights.ts             Insights index cards (featured + posts; `slug` marks a published article)
  styles/global.css         Design tokens (from CLAUDE.md) + shared classes (incl. form primitives)
  layouts/BaseLayout.astro  HTML shell, fonts, Organisation + WebSite schema, Nav/Footer, GTM
  lib/
    valuation.ts            Form submission logic (isolated from UI)
    icons.ts                Inline icon set
  components/
    Seo.astro JsonLd.astro Breadcrumbs.astro Nav.astro Footer.astro Logo.astro
    MobileCta.astro LegalPage.astro AssessIcon.astro
    forms/
      ValuationForm.astro   Single-page form (used on /valuation/)
      StepperForm.astro     3-step form (embedded via RequestSection on other pages)
    sections/ TrustStrip HowItWorks SecurityCustody SpecialistCard Faq RequestSection
  pages/
    index.astro             Homepage
    loans/[slug].astro      Reusable asset-detail template (6 pages)
    loans/index.astro       Loans overview
    valuation.astro         Confidential valuation enquiry page
    insights/               Insights index + articles
    about, contact, how-it-works, security-and-custody, 404
    privacy, terms, complaints, licence  (legal pages via LegalPage)
public/
  assets/                   Images (copied from the handoff), og-*.jpg share images
  fonts/                    Self-hosted fonts (immutable-cached via vercel.json)
  robots.txt llms.txt favicon.svg apple-touch-icon.png
```

## Pages

| Route | Source |
|---|---|
| `/` | Homepage |
| `/loans/` | Loans overview |
| `/loans/luxury-watches/` | Asset template + data |
| `/loans/jewellery-and-diamonds/` | Asset template + data |
| `/loans/fine-art/` | Asset template + data |
| `/loans/classic-and-luxury-cars/` | Asset template + data |
| `/loans/gold-bullion/` | Asset template + data |
| `/loans/designer-handbags/` | Asset template + data |
| `/valuation/` | Enquiry form page |
| `/how-it-works/` · `/security-and-custody/` · `/about/` · `/contact/` | Standalone pages |
| `/insights/` | Insights index (+ 7 article pages) |
| `/privacy/` · `/terms/` · `/complaints/` · `/licence/` | Legal pages |
| `/404` | Not-found page |

Legacy slugs (`/loans/high-value-watches/`, `/loans/classic-luxury-cars/`,
`/insights/what-determines-fine-watch-value-2026/`) 301-redirect to their
current paths — see `redirects` in `astro.config.mjs` and `vercel.json`.

## Configuration

[`src/config/site.ts`](src/config/site.ts) is the single source of truth for NAP,
entity/regulatory details, metadata and structured data. Live values (domain,
legal entity, ABN, licences, GTM ID, form endpoint) are already set. Remaining
optional items:

- `phone` — empty (hidden). Set a real number to show it site-wide.
- `social` — profile URLs feed Organisation `sameAs`; empty until accounts exist.
- `newsletterEndpoint` — empty; the Insights newsletter sign-up says so honestly
  until connected.
- `public/assets/og-*.jpg` — replace with purpose-built 1200×630 share images if
  the current ones need refreshing.

## The enquiry form

Two components share the same field styling and submission logic:
`ValuationForm` (single page) and `StepperForm` (3-step, embedded on other pages
via `RequestSection`).

- Submissions POST to `SITE.enquiryEndpoint` — currently FormSubmit's AJAX API
  (`https://formsubmit.co/ajax/hello@alyra.com.au`), which delivers to that inbox
  with no account. The **first** submission from a new domain triggers a
  one-time activation email that must be confirmed before deliveries start
  (activations are per-domain).
- Without JS the form does a native `POST`; with JS it validates inline and
  submits via `fetch`, showing success/error states.
- Spam protection is a hidden honeypot field named **`_gotcha`** (renamed from an
  earlier `company`, which Chrome's address autofill was filling in and thereby
  blocking real users).
- To swap providers (Astro Actions, a serverless function, Formspree, Basin),
  change `SITE.enquiryEndpoint` and, if the payload shape differs, edit
  `submitValuation` in [`src/lib/valuation.ts`](src/lib/valuation.ts) — the form
  markup does not change. Set the endpoint to `""` to disconnect (the form then
  says so rather than faking a submission).

## Analytics

Google Tag Manager (`GTM-PW7936R9`) is the single container, loaded from
`BaseLayout`. GA4 and Microsoft Clarity are deployed as tags **inside** GTM — set
them up in the GTM dashboard, not in the codebase. Search Console / Bing
verification and sitemap submission are covered in
[`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md).

## Deployment (Vercel)

Static build — Vercel auto-detects Astro. No adapter required while the site
stays static. Build command `npm run build`, output directory `dist/`. Add the
`@astrojs/vercel` adapter and switch `output` only if the form moves to Astro
Actions or a serverless endpoint.
