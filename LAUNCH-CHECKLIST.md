# ALYRA — Launch-day checklist

Everything below assumes the code on `main` (forms, analytics, schema, footer)
is already live on the Vercel deployment. Work top to bottom.

## Before launch day (any time)

- [ ] **GA4 key event** — Admin → Key events → toggle `enquiry_submit` on
      (appears up to 24 h after the first event was received).
- [ ] **Clarity ↔ GA4 integration** — Clarity → Settings → Setup →
      Google Analytics integration → connect to the ALYRA property.
- [ ] **Production build check** — `npm run build` completes clean.
- [ ] **Content sign-off** — phone number (add to `src/config/site.ts` `phone`
      or leave hidden), social profile URLs (`social:` in site.ts) if accounts
      exist, final read-through of legal pages.

## 1 · Connect the domain (Vercel)

- [ ] Vercel project → Settings → Domains → add `www.alyra.com.au` **and**
      `alyra.com.au` (set apex to redirect → `www` — the site's canonical
      URLs use `www`).
- [ ] At the DNS registrar, add the records Vercel shows (A record for apex,
      CNAME for `www`). **Do not touch MX records** — email for
      `hello@alyra.com.au` must keep working.
- [ ] Wait for DNS + SSL, then confirm:
  - [ ] `https://www.alyra.com.au` loads with a valid certificate
  - [ ] `alyra.com.au` → redirects to `https://www.alyra.com.au`
  - [ ] `http://` → redirects to `https://`

## 2 · Activate form delivery for the production domain

FormSubmit activations are per-domain; localhost and vercel.app activations
do not carry over.

- [ ] Submit one test enquiry on the live site (label it "test — please ignore").
- [ ] Open `hello@alyra.com.au` inbox → click the **Activate Form** link.
- [ ] Submit a second test enquiry → confirm it arrives in the inbox.
- [ ] If it landed in spam, mark "not spam".

## 3 · Search engine verification & sitemap

- [ ] **Google Search Console** — add property `alyra.com.au` (Domain type,
      DNS TXT verification at the registrar) → Sitemaps → submit
      `https://www.alyra.com.au/sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** — "Import from Google Search Console" (fastest)
      → confirm the sitemap imported.
- [ ] Optional: in GSC, URL Inspection → Request indexing for `/`, `/loans/`,
      `/valuation/`.

## 4 · Analytics sanity check (no changes needed — verify only)

GTM (`GTM-PW7936R9`), GA4 (`G-2C3NWQD4TJ`) and Clarity are domain-agnostic.

- [ ] GA4 → Reports → Realtime shows your visit on the live domain.
- [ ] The test enquiry from step 2 appears as `enquiry_submit`.
- [ ] Clarity → Recordings shows a session from the live domain.

## 5 · Share/social preview

- [ ] Paste `https://www.alyra.com.au/` into a share-preview tool
      (e.g. opengraph.xyz) or a private WhatsApp/LinkedIn message → the OG
      image and title render correctly.

## 6 · Live smoke test

- [ ] Home, an asset page, /how-it-works/, /valuation/, /about/, /contact/,
      legal pages all load.
- [ ] Full enquiry flow on desktop **and** mobile: form → confirmation screen
      → email received.
- [ ] `https://www.alyra.com.au/llms.txt` and `/robots.txt` serve correctly.

## First week after launch

- [ ] GSC → Pages: confirm pages are being indexed, no coverage errors.
- [ ] GA4: traffic arriving; mark `enquiry_submit` as key event if not done.
- [ ] Clarity: watch a few session recordings for UX friction.
- [ ] Confirm real (non-test) enquiries deliver reliably.
