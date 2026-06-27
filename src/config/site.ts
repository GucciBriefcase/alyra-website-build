/**
 * Central site / entity configuration for ALYRA.
 *
 * This is the single source of truth for NAP (name, address, phone), entity and
 * regulatory details, default metadata, and structured-data fields. Update
 * values here — placeholders in [square brackets] must be replaced with verified
 * details before launch. Everything else (footer, schema, SEO, sitemap) reads
 * from this file.
 */

export interface SocialProfiles {
  /** Public profile URLs used for Organisation `sameAs` structured data. */
  linkedin?: string;
  instagram?: string;
  x?: string;
}

export const SITE = {
  // ---- Identity ------------------------------------------------------------
  name: "ALYRA",
  brand: "ALYRA",
  tagline: "A loan against your asset, not a sale of it.",

  /** Plain-language description of the entity (used for GEO / AI answer systems). */
  entityDescription:
    "ALYRA is a private asset-backed lending business in Australia. ALYRA provides discreet, secured loans from $50,000 to $5 million against high-value collateral including watches, jewellery and diamonds, fine art, classic and luxury cars, gold bullion and designer handbags. Clients keep ownership of the asset, which is held in secure custody for the loan term and returned once the loan is repaid.",

  // ---- URLs ----------------------------------------------------------------
  /** Base URL placeholder — replace with the production domain before launch. */
  baseUrl: "https://www.alyra.com.au",

  // ---- Contact (NAP) -------------------------------------------------------
  email: "enquiries@alyra.com.au",
  /** Phone placeholder — set to a real number once approved, or leave empty to hide. */
  phone: "",
  serviceArea: "Australia",
  serviceAreaCode: "AU",
  /** Cities served, used for areaServed structured data and the footer strip. */
  locationsServed: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
  ],
  availability: "Australia-wide enquiries · Private appointments by arrangement",

  // ---- Loan parameters -----------------------------------------------------
  loanMin: 50000,
  loanMax: 5000000,
  loanRangeLabel: "$50k–$5m",
  currency: "AUD",

  // ---- Primary asset classes (entity / GEO language) -----------------------
  assetClasses: [
    "high-value watches",
    "jewellery and diamonds",
    "fine art",
    "classic and luxury cars",
    "gold bullion",
    "designer handbags",
  ],

  // ---- Legal entity & regulatory (PLACEHOLDERS — replace before launch) -----
  legalEntity: "[Registered company name] Pty Ltd",
  abn: "[00 000 000 000]",
  pawnbrokerLicence: "[Licence number and jurisdiction]",
  secondHandDealerRegistration: "[Registration number, if applicable]",
  insuranceNote:
    "Insurance may apply while assets are in custody, subject to policy terms, asset approval, valuation limits and custody conditions.",
  regulatoryDisclaimer:
    "ALYRA provides loans secured against pledged goods under applicable pawnbroking laws. Loans are subject to valuation, approval, custody, eligibility and loan terms. Your asset is at risk if you do not meet your repayment obligations. Fees, interest, repayment terms, notices, redemption rights and enforcement processes will be disclosed before you proceed. This website contains general information only and does not constitute financial, legal or credit advice.",
  copyrightYear: 2026,

  // ---- Default metadata ----------------------------------------------------
  defaultTitle:
    "ALYRA — Private Asset-Based Lending | Loans Against Watches, Jewellery, Art & Gold",
  defaultDescription:
    "ALYRA provides discreet private loans from $50,000 to $5 million secured against high-value watches, jewellery, diamonds, fine art, classic cars and gold bullion. Keep your asset — access funds confidentially. Australia-wide enquiries.",
  /** Default Open Graph / social share image (relative to site root). */
  defaultOgImage: "/assets/og-image.jpg",
  locale: "en-AU",
  ogLocale: "en_AU",
  themeColor: "#1b1a16",

  // ---- Social profiles (placeholders for Organisation sameAs) --------------
  social: {
    linkedin: "",
    instagram: "",
    x: "",
  } as SocialProfiles,

  // ---- Enquiry / form ------------------------------------------------------
  /** Path to the dedicated confidential-valuation enquiry page. */
  enquiryPath: "/valuation/",
  /**
   * Endpoint the valuation form posts to. Leave empty until a backend is
   * connected (Astro Actions, a Vercel serverless function, Formspree, Basin,
   * HubSpot, Airtable or Google Sheets). When empty, the form does not fake a
   * submission — see src/lib/valuation.ts.
   */
  enquiryEndpoint: "",

  // ---- Attribution ---------------------------------------------------------
  attribution: {
    label: "Website & AI Search by",
    name: "SkyScale",
    url: "https://www.skyscale.com.au",
  },
} as const;

/** Absolute URL helper for canonical tags, OG URLs and structured data. */
export function absoluteUrl(path = "/"): string {
  const base = SITE.baseUrl.replace(/\/$/, "");
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

export type Site = typeof SITE;
