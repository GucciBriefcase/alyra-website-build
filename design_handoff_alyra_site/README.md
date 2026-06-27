# Handoff: ALYRA — Private Asset-Based Lending (marketing site)

## Overview
ALYRA is a discreet private lender offering loans ($50k–$5m) secured against high-value
assets (watches, jewellery & diamonds, fine art, classic & luxury cars, gold bullion,
designer handbags). This package contains the approved **design references** for the
marketing site: a homepage, an asset-detail page template, an insights index, and an
article template, plus the canonical colour/type token system.

The goal of the build is a small, fast, SEO-strong static marketing site with a shared
nav + footer, a repeatable asset-detail template, and a working confidential-enquiry form.

## About the Design Files
The files in `pages/` are **design references created in HTML** — high-fidelity prototypes
showing the intended look, copy, and behaviour. **They are not production code to ship as-is.**

They are authored as "Design Components" (`.dc.html`) — a custom runtime (`support.js`) that
renders an `<x-dc>` template + a `class Component extends DCLogic` logic block. **Do not port
the DC runtime.** Treat each file as a visual + behavioural spec and rebuild it in a real
framework using normal components. The inline styles, exact hex values, copy, and SVG icons
are all meant to be lifted verbatim; the DC plumbing (`<x-dc>`, `<sc-for>`, `<sc-if>`,
`renderVals()`, `support.js`) is not.

To preview a file as intended, open it in a browser — `support.js` + `image-slot.js` sit
alongside the pages and the runtime renders them.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy, icons, and interactions.
Recreate pixel-for-pixel using the target stack's patterns. Exact hex values and the type
scale are in **Design Tokens** below and in `CLAUDE.md`.

## Recommended architecture
No codebase exists yet — pick a static-first stack. Suggested: **Astro** (or Next.js
static export) for islands + great SEO, plain CSS or Tailwind, deployed to a static host.

Key reasons this handoff exists (the pain points to solve in code):
- **Shared nav + footer** — currently duplicated in every HTML file. Make them ONE component
  each. A footer/nav change must be a one-file edit.
- **Asset-detail template** — Watches, Cars, Fine Art, Jewellery are ~90% identical. Build
  **one** `AssetPage` template + per-asset data (hero image, copy, brand list, FAQ); generate
  the rest from data. Don't hand-build six near-identical pages.
- **Enquiry form** — the 3-step form is mocked client-side only. Wire it to a real endpoint
  (email/CRM) with server-side validation + spam protection.
- **SEO/AEO** — the prototypes already contain hand-tuned `<title>`, meta, Open Graph, and
  JSON-LD structured data (`FinancialService`, `Service`, `FAQPage`, `Person`). Preserve and
  templatise these; generate a sitemap.

## Page types (build these; everything else is a variation)

### 1. Homepage — `pages/ALYRA Homepage v3.dc.html`
Single long scroll. Sections top→bottom:
1. **Sticky nav** (transparent over hero; turns dark `#1b1a16` after 40px scroll — JS scroll listener).
2. **Hero** — centred, cream bg, eyebrow + H1 ("Access funds without selling what you **value**") + sub + primary CTA + reassurance line. Staggered fade-up entrance on `.hin` elements.
3. **Credibility / trust strip** — dark band, 5 icon+label items (Licensed pawnbroker, Specialist valuation, Secure custody, Loans $50k–$5m, Australia-wide).
4. **What is ALYRA** — white bg, centred definition statement.
5. **Asset categories** — 3-col card grid (6 cards), each: image, title, blurb, "Lending Against X →" link.
6. **How it works** — white bg, 4 numbered steps (01–04) + CTA + risk disclaimer.
7. **Why ALYRA** — 4 icon features.
8. **Valuation & specialist** — white bg, image + copy, plus a specialist bio card (Eden John).
9. **Security & custody** — dark bg, copy + 4-step custody timeline.
10. **Borrow or Sell** — two comparison cards (dark "Borrow"/featured + light "Sell").
11. **FAQ** — white bg, split layout: heading/CTA left, accordion (15 Q&A) right.
12. **Request a confidential valuation** — dark bg, 3-step enquiry form (asset → details → confirm) with success state.
13. **Footer** — see Shared Components.

### 2. Asset-detail template — `pages/ALYRA High-Value Watches.dc.html` (canonical)
Variations supplied so you can extract what differs per asset:
`ALYRA Classic & Luxury Cars.dc.html`, `ALYRA Fine Art.dc.html`, `ALYRA Jewellery and Diamonds.dc.html`.
Per-asset data to factor out: hero image + headline, intro copy, accepted brands/marques list,
"what we assess" points, asset-specific FAQ, related-asset links. Shared chrome: nav, trust
elements, enquiry CTA, footer.

### 3. Insights index — `pages/ALYRA Insights.dc.html`
Article listing / blog index.

### 4. Article — `pages/ALYRA Article - Watch Value 2026.dc.html`
Long-form article template (prose layout). Use for all insight posts.

### Mobile reference — `pages/ALYRA Mobile.dc.html`
Shows intended mobile composition. All pages are responsive; breakpoints are in the inline
`@media` rules inside each file's `<helmet><style>` block (notably 860px nav collapse,
900/600px asset-grid reflow, 760/480px footer columns, 820px FAQ stack).

## Shared components (build once, use everywhere)

### Nav
Fixed top. Transparent over the hero; on scroll >40px it gains `background:#1b1a16`, a soft
shadow, reduced padding, and the logo/links/CTA flip to light. Centre links: Assets · How it
Works · Valuation · Security & Custody · Insights. Right: "Request a Confidential Valuation"
button. Links hidden below 860px (add a mobile menu). Logo wordmark in `assets/`
(`alyra-logo-ink.png` / `alyra-logo-cream.png` / `alyra-wordmark.svg`).

### Footer (`background:#16150f`)
Closing band (wordmark + "Private appointments by arrangement." + enquiry link) → 4 columns
(brand blurb + contact / Assets / Company / Legal) → Locations served strip → Regulatory &
entity block (placeholder legal/ABN/licence fields) → bottom legal paragraph + © → SkyScale
attribution badge (animated mask wipe on hover). Note: the homepage and asset pages have
slightly different footer variants in the prototypes — **standardise on one** in code.

### Enquiry form
3 steps with a progress stepper: (1) asset chips + estimated value, (2) name/email/phone/
location + preferred contact, (3) summary + notes + file upload + timeframe. Email validated
with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; "Continue" disabled until the step is valid; final step
shows a success panel. Currently state-only — wire to a backend.

## Interactions & behaviour
- **Nav scroll transition** — JS scroll listener at 40px toggles the styles above (transition ~.3s).
- **Hero entrance** — `.hin` elements fade up `translateY(16px)→0`, 650ms, `cubic-bezier(.2,.7,.2,1)`, staggered ~90ms.
- **Reveal on scroll** — `.reveal` elements fade/translate-up in via IntersectionObserver (`rootMargin: 0px 0px -8% 0px`, threshold .08), one-shot.
- **Card hover** — lift `translateY(-5px)` + shadow; inner image scales 1.06.
- **FAQ accordion** — single-open; `+` rotates 45°; `max-height` + opacity transition.
- **Respect `prefers-reduced-motion`** — all entrance animations are disabled under it. Keep this.
- ⚠ **Hover that changes background/color/background-position is JS-driven** in these
  prototypes (a quirk of the DC runtime). In a normal codebase use CSS `:hover` — but keep
  the *visual result*. Transform-only hovers can stay pure CSS.

## Design Tokens
Authoritative source: `CLAUDE.md`. Summary:

**Neutrals** — page `#f4f1ea` (cream) · card/panel `#fbfaf6` · full-bleed white `#ffffff`
**Ink** — primary `#1b1a16` · footer `#16150f` · text-on-gold `#1b1509`
**Gold** — primary/fill `#c4a567` · light (gradient top) `#d4b777` · soft `#d8c79a` ·
  **gold-on-light foreground** (eyebrows, dashes, small icons) `#6f5a26`
**Text** — body `#6b6657` · secondary `#7c7766` · chip `#46453f` · on-dark `#e9e3d6` · muted-on-dark `#b4ae9f`
**Borders** — hairline `#e4ded1` · strong `#d8d0bf` · gold-soft `#d8c79a`
**States** — success `#4f6f46` / `#edf4e9` · error `#8a3a2f` / `#f7ebe8`

> Note: some prototype sections still use `#9a6a3c` for eyebrows. `CLAUDE.md` standardises
> small gold-on-light foreground to `#6f5a26` — follow `CLAUDE.md` for new work.

**Type** — Display/headings: **Poppins** 600. Body/labels/eyebrows: **Inter** 400/500/600.
(Google Fonts.) Eyebrows: 12px, `letter-spacing:3px`, uppercase. H1 clamp(42–72px). Section
H2 clamp(28–44px), `letter-spacing:-0.8px`. Body 15–19px, `line-height` ~1.7–1.8.

**Spacing** — section padding `clamp(64px,8vw,104px)` vertical, `clamp(24px,5vw,72px)`
horizontal; final CTA slightly taller (`clamp(72px,9vw,120px)`). Max content width 1200px
(text sections 760–820px). Radii: cards 14px, buttons/inputs 8px, chips 6–8px.

**Focus** — `outline:2px solid #c4a567; outline-offset:3px`. Selection bg `#d8c79a`.

## Assets (`pages/assets/`)
- Logos: `alyra-logo-ink.png`, `alyra-logo-cream.png`, `alyra-wordmark.svg`
- Category/hero/loan-range photography: `fine-watches.jpg`, `jewellery.jpg`, `fine-art.jpg`,
  `classic-cars.jpg`, `gold-bullion.jpg`, `designer-handbags.jpg`, `valuation.jpg`,
  `specialist.jpg`, and the various `hero-*` and `loanrange-*` images.
- `skyscale-logo.png` — footer attribution (SkyScale; links to skyscale.com.au).
Some prototype slots use a drag-drop placeholder (`image-slot.js`); replace with real `<img>`.

## Files in this package
- `pages/` — the 8 reference HTML pages + `support.js` + `image-slot.js` + `assets/`
- `CLAUDE.md` — canonical token/colour system (source of truth)
- `README.md` — this document

## Build checklist
- [ ] Choose static-first stack; set up Poppins + Inter, tokens as CSS vars / Tailwind theme.
- [ ] Shared `Nav` (with scroll state + mobile menu) and shared `Footer` (single standardised variant).
- [ ] Homepage from section list above.
- [ ] One `AssetPage` template + per-asset data; generate Watches/Cars/Fine Art/Jewellery (+ Bullion/Handbags).
- [ ] Insights index + Article template.
- [ ] Enquiry form wired to a real endpoint with server validation + spam protection.
- [ ] Port JSON-LD/meta/OG per page; generate sitemap + robots.
- [ ] Keep `prefers-reduced-motion` handling and AA focus styles.
