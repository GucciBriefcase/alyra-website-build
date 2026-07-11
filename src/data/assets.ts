/**
 * Asset-class data for ALYRA.
 *
 * One record per asset class drives BOTH the homepage category grid and the
 * reusable asset-detail template (src/pages/loans/[slug].astro). Copy, brand
 * lists, valuation criteria, FAQs and structured-data fields are lifted from the
 * approved design handoff; Gold Bullion and Designer Handbags are generated from
 * the same template in the established brand tone (per the handoff README).
 */

import type { ImageMetadata } from "astro";
import type { AssessIconName } from "../lib/icons";

// Content images optimised at build time via astro:assets.
import heroWatchesPatek2 from "../assets/images/hero-watches-patek2.jpg";
import heroJewellery from "../assets/images/hero-jewellery.png";
import heroFineart from "../assets/images/hero-fineart.jpeg";
import heroAventadorStudio from "../assets/images/hero-aventador-studio.jpg";
import goldBullion from "../assets/images/gold-bullion.jpg";
import designerHandbags from "../assets/images/designer-handbags.jpg";
import fineWatches from "../assets/images/fine-watches.jpg";
import loanrangeJewellery from "../assets/images/loanrange-jewellery.png";
import loanrangeFineart from "../assets/images/loanrange-fineart.jpg";
import loanrangeCars from "../assets/images/loanrange-cars.jpg";
import jewelleryImg from "../assets/images/jewellery.jpg";
import fineArtImg from "../assets/images/fine-art.jpg";
import classicCarsImg from "../assets/images/classic-cars.jpg";

export interface Faq {
  q: string;
  a: string;
}

export interface AssessItem {
  label: string;
  icon: AssessIconName;
}

export interface Asset {
  /** URL slug — page renders at /loans/<slug>/ */
  slug: string;
  /** Short label for nav / internal links, e.g. "Watches". */
  navLabel: string;
  /** Breadcrumb + related-link label, e.g. "High-Value Watches". */
  breadcrumbName: string;

  // --- Metadata ---
  title: string;
  metaDescription: string;
  ogImage: string;

  // --- Templating nouns ---
  /** Singular noun used in shared copy, e.g. "watch", "car", "piece". */
  noun: string;
  /** Word used in "Keep your ___" eyebrow, e.g. "watch", "art", "jewellery". */
  keepLabel: string;

  // --- Hero ---
  heroEyebrow: string;
  h1Lead: string;
  h1Highlight: string;
  heroIntro1: string;
  heroIntro2: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
  /** Background colour behind the hero image while it loads. */
  heroBg: string;

  // --- "A loan, not a sale" section (verbatim from the design per asset) ---
  /** Optional bold AEO lead line. The design uses this on the cars page. */
  loanNotSaleLead?: string;
  loanNotSaleP1: string;
  loanNotSaleP2: string;
  /** Closing line under the divider. */
  closingLine: string;

  // --- Brands / categories we lend against ---
  brandHeading: string;
  brandIntro: string;
  brands: string[];
  brandFootnote: string;

  // --- Loan range ---
  loanRangeIntro1: string;
  loanRangeIntro2: string;
  loanRangeImage: ImageMetadata;
  loanRangeImageAlt: string;

  // --- What we assess ---
  assessIntro: string;
  assessItems: AssessItem[];

  // --- Structured data ---
  serviceType: string;
  serviceDescription: string;

  // --- FAQs ---
  faqs: Faq[];

  // --- Enquiry form ---
  /** Asset-type chip options for the valuation form (last item is usually "Other"). */
  formChips: string[];

  // --- Homepage category card ---
  card: {
    image: ImageMetadata;
    title: string;
    blurb: string;
    ctaLabel: string;
  };

  /** Related Insights articles, rendered as "Related reading" on the loan page. */
  insights?: { title: string; href: string }[];
}

export const ASSETS: Asset[] = [
  {
    slug: "luxury-watches",
    navLabel: "Watches",
    breadcrumbName: "Luxury Watches",
    title: "Loans Against Luxury Watches | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against luxury watches — Rolex, Patek Philippe, AP, Richard Mille, Cartier and more. Keep your watch.",
    ogImage: "/assets/og-watches.jpg",
    noun: "watch",
    keepLabel: "watch",
    heroEyebrow: "Private luxury watch lending",
    h1Lead: "Loans against luxury",
    h1Highlight: "watches",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible luxury watches, without selling the watch you want to keep.",
    heroIntro2:
      "ALYRA lends against Rolex, Patek Philippe, Audemars Piguet, Richard Mille, Cartier and other collectible watches, through specialist assessment and secure custody.",
    heroImage: heroWatchesPatek2,
    heroImageAlt:
      "Patek Philippe Nautilus in rose gold with a ruby-set bezel",
    heroBg: "#1a0712",
    loanNotSaleP1: "A watch can hold significant value while remaining a piece you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against luxury watches so you can access funds without parting with yours. Your watch is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No auction. No public listing. No obligation.",
    brandHeading: "Watches we lend against.",
    brandIntro:
      "ALYRA lends against collectible watches with clear ownership and proven resale demand, including the houses below.",
    brands: [
      "Rolex",
      "Patek Philippe",
      "Audemars Piguet",
      "Richard Mille",
      "Cartier",
      "Vacheron Constantin",
      "A. Lange & Söhne",
      "Omega",
    ],
    brandFootnote:
      "Sought-after references typically support the strongest terms. If your watch is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the watch and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will review the model, condition, documents, authenticity, ownership records and current market demand before any offer is made.",
    loanRangeImage: fineWatches,
    loanRangeImageAlt: "Close detail of a luxury watch",
    assessIntro: "Every watch is reviewed individually.",
    assessItems: [
      { label: "Model & reference", icon: "tag" },
      { label: "Overall condition", icon: "activity" },
      { label: "Originality", icon: "sparkle" },
      { label: "Box & papers", icon: "file" },
      { label: "Service history", icon: "wrench" },
      { label: "Rarity", icon: "gem" },
      { label: "Current demand", icon: "trending" },
      { label: "Ownership records", icon: "file-check" },
      { label: "Authenticity", icon: "shield-check" },
    ],
    serviceType: "Asset-based loan secured against luxury watches",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible luxury watches, including Rolex, Patek Philippe, Audemars Piguet, Richard Mille, Cartier, Vacheron Constantin, A. Lange & Söhne and Omega. The watch is assessed by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against a Rolex?", a: "Yes. ALYRA considers selected Rolex watches for lending, subject to model, condition, authenticity, documents, ownership records, market demand, valuation and approval." },
      { q: "Do I need the box and papers?", a: "They help establish authenticity and value, and can support stronger terms. They are not always essential. Tell us what you have." },
      { q: "What if I have lost the papers?", a: "It is still worth enquiring. A specialist can assess the watch on its own merits." },
      { q: "How do you confirm a watch is genuine?", a: "Each watch is authenticated by a specialist as part of the assessment." },
      { q: "Do I keep ownership of my watch?", a: "Yes. You remain the owner. ALYRA holds the watch only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "Which brands do you accept?", a: "ALYRA considers a range of collectible watch brands. If yours is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your watch is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Rolex", "Patek Philippe", "Audemars Piguet", "Richard Mille", "Cartier", "Other"],
    card: {
      image: fineWatches,
      title: "Luxury Watches",
      blurb: "Rolex, Patek Philippe, Audemars Piguet, Richard Mille, and other collectible watches.",
      ctaLabel: "Lending Against Watches",
    },
    insights: [
      { title: "How much can I borrow against a Rolex in Australia?", href: "/insights/how-much-can-i-borrow-against-a-rolex-australia/" },
      { title: "How watch service history affects your loan offer", href: "/insights/how-watch-service-history-affects-your-loan-offer/" },
      { title: "What actually determines the value of a fine watch in 2026", href: "/insights/what-determines-fine-watch-value/" },
    ],
  },

  {
    slug: "jewellery-and-diamonds",
    navLabel: "Jewellery",
    breadcrumbName: "Jewellery & Diamonds",
    title: "Loans Against Jewellery & Diamonds | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against jewellery and diamonds — signed pieces, diamond rings, necklaces, loose stones and more. Keep your jewellery.",
    ogImage: "/assets/og-jewellery.jpg",
    noun: "piece",
    keepLabel: "jewellery",
    heroEyebrow: "Private jewellery & diamond lending",
    h1Lead: "Loans against jewellery &",
    h1Highlight: "diamonds",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible jewellery and diamonds, without selling the pieces you want to keep.",
    heroIntro2:
      "ALYRA lends against diamond jewellery, signed pieces, coloured stones and loose diamonds, through specialist assessment and secure custody.",
    heroImage: heroJewellery,
    heroImageAlt: "Cartier Panthère diamond bracelet in rose gold",
    heroBg: "#0f0d0c",
    loanNotSaleP1: "A piece of jewellery can hold significant value while remaining something you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against jewellery and diamonds so you can access funds without parting with them. Your piece is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No auction. No public listing. No obligation.",
    brandHeading: "Jewellery we lend against.",
    brandIntro:
      "ALYRA lends against signed and fine jewellery with clear ownership and proven resale demand, including the houses below.",
    brands: [
      "Cartier",
      "Tiffany & Co.",
      "Van Cleef & Arpels",
      "Bvlgari",
      "Harry Winston",
      "Graff",
      "Boucheron",
      "Chopard",
    ],
    brandFootnote:
      "Signed pieces and certified stones typically support the strongest terms. If your piece is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the piece and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will review the stones, certification, condition, maker, ownership records and current market demand before any offer is made.",
    loanRangeImage: loanrangeJewellery,
    loanRangeImageAlt: "Cartier Panthère diamond ring in white gold",
    assessIntro: "Every piece is reviewed individually.",
    assessItems: [
      { label: "Stones & carat weight", icon: "gem" },
      { label: "Cut & quality", icon: "sparkle" },
      { label: "Colour & clarity", icon: "droplet" },
      { label: "Certification (GIA/IGI)", icon: "award" },
      { label: "Metal & setting", icon: "layers" },
      { label: "Maker or signature", icon: "pen" },
      { label: "Market demand", icon: "trending" },
      { label: "Provenance", icon: "book" },
      { label: "Authenticity", icon: "shield-check" },
    ],
    serviceType: "Asset-based loan secured against jewellery and diamonds",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible jewellery and diamonds, including signed pieces from Cartier, Tiffany & Co., Van Cleef & Arpels, Bvlgari, Harry Winston and Graff, plus loose certified diamonds. The piece is assessed by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against a diamond ring?", a: "Yes. ALYRA considers diamond and signed jewellery for lending, subject to stones, certification, condition, maker, ownership records, market demand, valuation and approval." },
      { q: "Do I need certificates or receipts?", a: "Certificates such as GIA or IGI, and receipts, help establish authenticity and value, and can support stronger terms. They are not always essential. Tell us what you have." },
      { q: "What if I have lost the certificate?", a: "It is still worth enquiring. A specialist can assess the piece on its own merits, and stones can be re-certified where needed." },
      { q: "How do you confirm a piece is genuine?", a: "Each piece is examined by a specialist, and diamonds and gemstones are tested and verified as part of the assessment." },
      { q: "Do I keep ownership of my jewellery?", a: "Yes. You remain the owner. ALYRA holds the piece only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "Which houses do you accept?", a: "ALYRA considers signed jewellery from leading houses, as well as fine unsigned pieces and loose diamonds. If yours is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your piece is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Diamond ring", "Diamond necklace", "Signed jewellery", "Loose diamond", "Other"],
    card: {
      image: jewelleryImg,
      title: "Jewellery & Diamonds",
      blurb: "Diamond jewellery, signed pieces, coloured stones, and other high-value items.",
      ctaLabel: "Lending Against Jewellery",
    },
  },

  {
    slug: "fine-art",
    navLabel: "Fine Art",
    breadcrumbName: "Fine Art",
    title: "Loans Against Fine Art | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against fine art — established, contemporary and collectible works. Keep the art you own.",
    ogImage: "/assets/og-fineart.jpg",
    noun: "work",
    keepLabel: "art",
    heroEyebrow: "Private fine art lending",
    h1Lead: "Loans against fine",
    h1Highlight: "art",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible fine art, without selling the works you want to keep.",
    heroIntro2:
      "ALYRA lends against established, contemporary and collectible works, subject to provenance, condition, artist market and saleability.",
    heroImage: heroFineart,
    heroImageAlt:
      "Sir Alfred Munnings, horses watering — oil painting in a gilt frame",
    heroBg: "#0f0d0c",
    loanNotSaleP1: "A work of art can hold significant value while remaining something you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against fine art so you can access funds without parting with it. Your work is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No auction. No public listing. No obligation.",
    brandHeading: "Art we lend against.",
    brandIntro:
      "ALYRA lends against fine art with clear ownership, sound provenance and proven market demand, across the categories below.",
    brands: [
      "Old Masters",
      "Impressionist & Modern",
      "Post-War & Contemporary",
      "Prints & Editions",
    ],
    brandFootnote:
      "Strong provenance and a established artist market typically support the strongest terms. If your work is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the work and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will review the artist, provenance, condition, documentation and current market demand before any offer is made.",
    loanRangeImage: loanrangeFineart,
    loanRangeImageAlt: "Ivan Aivazovsky, moonlit view of Venice — oil painting",
    assessIntro: "Every work is reviewed individually.",
    assessItems: [
      { label: "Artist & attribution", icon: "pen" },
      { label: "Condition", icon: "activity" },
      { label: "Provenance", icon: "book" },
      { label: "Documentation", icon: "file" },
      { label: "Exhibition history", icon: "landmark" },
      { label: "Rarity", icon: "gem" },
      { label: "Market demand", icon: "trending" },
      { label: "Title & ownership", icon: "file-check" },
      { label: "Authenticity", icon: "shield-check" },
    ],
    serviceType: "Asset-based loan secured against fine art",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible fine art, including established, contemporary and collectible works across painting, sculpture, photography and prints. The work is assessed by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against a painting?", a: "Yes. ALYRA considers paintings and other fine art for lending, subject to artist, provenance, condition, documentation, market demand, valuation and approval." },
      { q: "Do I need provenance documents?", a: "Provenance, receipts and certificates of authenticity help establish value and can support stronger terms. They are not always essential. Tell us what you have." },
      { q: "What if I have lost the paperwork?", a: "It is still worth enquiring. A specialist can assess the work on its own merits, and provenance can sometimes be researched." },
      { q: "How do you confirm a work is authentic?", a: "Each work is reviewed by a specialist, with reference to provenance, catalogues raisonnés and expert opinion where needed." },
      { q: "Do I keep ownership of my artwork?", a: "Yes. You remain the owner. ALYRA holds the work only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "Which artists do you accept?", a: "ALYRA considers established, contemporary and collectible works across many artists and movements. If yours is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your artwork is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Painting", "Sculpture", "Photography", "Print or edition", "Other"],
    card: {
      image: fineArtImg,
      title: "Fine Art",
      blurb: "Established, contemporary, and collectible works, subject to provenance, condition, artist market, and saleability.",
      ctaLabel: "Lending Against Fine Art",
    },
  },

  {
    slug: "classic-and-luxury-cars",
    navLabel: "Cars",
    breadcrumbName: "Classic & Luxury Cars",
    title: "Loans Against Classic & Luxury Cars | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against classic and luxury cars — Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Rolls-Royce and more. Keep your car.",
    ogImage: "/assets/og-cars.jpg",
    noun: "car",
    keepLabel: "car",
    heroEyebrow: "Private classic & luxury car lending",
    h1Lead: "Loans against classic & luxury",
    h1Highlight: "cars",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible classic and luxury cars, without selling the car you want to keep.",
    heroIntro2:
      "ALYRA lends against Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Rolls-Royce and other collectible marques, through specialist assessment and secure custody.",
    heroImage: heroAventadorStudio,
    heroImageAlt: "Grey Lamborghini Aventador Ultimae studio shot",
    heroBg: "#0f0d0c",
    loanNotSaleLead:
      "In short: ALYRA lends $50,000 to $5 million against Ferrari, Porsche, Lamborghini, Aston Martin and other collectible cars — and you keep ownership throughout the loan.",
    loanNotSaleP1: "A car can hold significant value while remaining a piece you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against classic and luxury cars so you can access funds without parting with yours. Your car is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No auction. No public listing. No obligation.",
    brandHeading: "Cars we lend against.",
    brandIntro:
      "ALYRA lends against collectible marques with clear title and proven resale demand, including those below.",
    brands: [
      "Ferrari",
      "Porsche",
      "Lamborghini",
      "Aston Martin",
      "Bentley",
      "Rolls-Royce",
      "Mercedes-Benz",
      "McLaren",
    ],
    brandFootnote:
      "Sought-after models typically support the strongest terms. If your marque is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the car and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will review the make, model, condition, originality, documentation, mileage and current market demand before any offer is made.",
    loanRangeImage: loanrangeCars,
    loanRangeImageAlt: "Red Ferrari LaFerrari displayed in a showroom",
    assessIntro: "Every car is reviewed individually.",
    assessItems: [
      { label: "Make & model", icon: "tag" },
      { label: "Overall condition", icon: "activity" },
      { label: "Originality & matching numbers", icon: "hash" },
      { label: "Service history", icon: "wrench" },
      { label: "Documentation", icon: "file" },
      { label: "Mileage", icon: "gauge" },
      { label: "Rarity", icon: "gem" },
      { label: "Current demand", icon: "trending" },
      { label: "Provenance", icon: "book" },
    ],
    serviceType: "Asset-based loan secured against classic and luxury cars",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible classic and luxury cars, including Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Rolls-Royce, Mercedes-Benz and McLaren. The car is assessed by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against a Ferrari?", a: "Yes. ALYRA considers selected Ferraris for lending, subject to model, condition, originality, documentation, ownership records, market demand, valuation and approval." },
      { q: "Do I need the service history and documents?", a: "Service records, the owner's manuals and build documentation help establish value and can support stronger terms. They are not always essential. Tell us what you have." },
      { q: "What if I have lost some of the paperwork?", a: "It is still worth enquiring. A specialist can assess the car on its own merits, and history can sometimes be researched." },
      { q: "How do you confirm a car is genuine and original?", a: "Each car is inspected by a specialist, with reference to chassis and engine numbers, build records and marque expertise where needed." },
      { q: "Do I keep ownership of my car?", a: "Yes. You remain the owner. ALYRA holds the car only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "Which marques do you accept?", a: "ALYRA considers a range of collectible marques. If yours is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your car is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Ferrari", "Porsche", "Lamborghini", "Aston Martin", "Bentley", "Other"],
    card: {
      image: classicCarsImg,
      title: "Classic & Luxury Cars",
      blurb: "Selected classic, prestige, and collector vehicles, subject to title, condition, location, and custody requirements.",
      ctaLabel: "Lending Against Cars",
    },
    insights: [
      { title: "Which prestige car marques actually hold their value in Australia", href: "/insights/which-prestige-car-marques-hold-value-australia/" },
    ],
  },

  {
    slug: "gold-bullion",
    navLabel: "Bullion",
    breadcrumbName: "Gold Bullion",
    title: "Loans Against Gold Bullion | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against investment-grade gold bullion — bars and coins, subject to weight, purity and authenticity. Keep your gold.",
    ogImage: "/assets/og-bullion.jpg",
    noun: "gold",
    keepLabel: "gold",
    heroEyebrow: "Private gold bullion lending",
    h1Lead: "Loans against gold",
    h1Highlight: "bullion",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible investment-grade gold bullion, without selling the gold you want to keep.",
    heroIntro2:
      "ALYRA lends against recognised bars and coins, subject to verification of weight, purity, ownership and authenticity, through specialist assessment and secure custody.",
    heroImage: goldBullion,
    heroImageAlt: "Stacked investment-grade gold bullion bars",
    heroBg: "#1a1408",
    loanNotSaleP1: "Gold bullion can hold significant value while remaining an asset you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against investment-grade gold so you can access funds without parting with it. Your bullion is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No public sale. No exchange listing. No obligation.",
    brandHeading: "Bullion we lend against.",
    brandIntro:
      "ALYRA lends against recognised investment-grade bullion with verifiable weight, purity and ownership, including the forms below.",
    brands: [
      "Cast & minted bars",
      "Gold coins",
      "LBMA good delivery",
      "Recognised refiners",
    ],
    brandFootnote:
      "Recognised refiners and assayed bars typically support the strongest terms. If your bullion is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the bullion and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will verify the weight, purity, refiner, ownership and authenticity, with reference to current market pricing, before any offer is made.",
    loanRangeImage: goldBullion,
    loanRangeImageAlt: "Close detail of investment-grade gold bars",
    assessIntro: "Every holding is reviewed individually.",
    assessItems: [
      { label: "Weight", icon: "scale" },
      { label: "Purity & fineness", icon: "sparkle" },
      { label: "Refiner or mint", icon: "factory" },
      { label: "Assay & serial numbers", icon: "hash" },
      { label: "Form (bar or coin)", icon: "coin" },
      { label: "Condition", icon: "activity" },
      { label: "Market price", icon: "trending" },
      { label: "Ownership records", icon: "file-check" },
      { label: "Authenticity", icon: "shield-check" },
    ],
    serviceType: "Asset-based loan secured against gold bullion",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible investment-grade gold bullion, including cast and minted bars and recognised coins. The bullion is verified for weight, purity and authenticity by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against gold bars?", a: "Yes. ALYRA considers investment-grade gold bars for lending, subject to weight, purity, refiner, authenticity, ownership records, market price, valuation and approval." },
      { q: "Do you lend against gold coins?", a: "Yes. Recognised investment and collectible gold coins may be considered, subject to verification of weight, purity, condition and authenticity." },
      { q: "How is my gold valued?", a: "Value is based on verified weight and purity with reference to current market pricing, alongside any collectible premium for recognised coins." },
      { q: "How do you confirm bullion is genuine?", a: "Bullion is verified by a specialist, including weight, purity and refiner or mint markings, with assay testing where needed." },
      { q: "Do I keep ownership of my gold?", a: "Yes. You remain the owner. ALYRA holds the bullion only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "What forms of bullion do you accept?", a: "ALYRA considers recognised bars and coins from established refiners and mints. If your bullion is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your gold is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Gold bars", "Gold coins", "Mixed bullion", "Other"],
    card: {
      image: goldBullion,
      title: "Gold Bullion",
      blurb: "Investment-grade bars and coins, subject to verification of weight, purity, ownership, and authenticity.",
      ctaLabel: "Lending Against Bullion",
    },
    insights: [
      { title: "Gold and bullion as collateral: a practical guide", href: "/insights/gold-and-bullion-as-collateral/" },
    ],
  },

  {
    slug: "designer-handbags",
    navLabel: "Handbags",
    breadcrumbName: "Designer Handbags",
    title: "Loans Against Designer Handbags | ALYRA",
    metaDescription:
      "Private loans from $50,000–$5 million against collector handbags — Hermès, Chanel, Louis Vuitton and more, subject to condition and authenticity. Keep your handbag.",
    ogImage: "/assets/og-handbags.jpg",
    noun: "handbag",
    keepLabel: "handbag",
    heroEyebrow: "Private designer handbag lending",
    h1Lead: "Loans against designer",
    h1Highlight: "handbags",
    heroIntro1:
      "Access loans from $50,000 to $5 million secured against eligible collector handbags, without selling the handbag you want to keep.",
    heroIntro2:
      "ALYRA lends against Hermès, Chanel, Louis Vuitton and other collector handbags, subject to condition, provenance, authenticity and resale demand, through specialist assessment and secure custody.",
    heroImage: designerHandbags,
    heroImageAlt: "Hermès handbag in detail",
    heroBg: "#171210",
    loanNotSaleP1: "A designer handbag can hold significant value while remaining a piece you want to keep.",
    loanNotSaleP2:
      "ALYRA lends against collector handbags so you can access funds without parting with yours. Your handbag is assessed privately, held securely for the agreed term, and returned once the loan is repaid.",
    closingLine: "No auction. No public listing. No obligation.",
    brandHeading: "Handbags we lend against.",
    brandIntro:
      "ALYRA lends against collector handbags with clear ownership and proven resale demand, including the houses below.",
    brands: [
      "Hermès",
      "Chanel",
      "Louis Vuitton",
      "Dior",
      "Bottega Veneta",
      "Gucci",
    ],
    brandFootnote:
      "Sought-after models such as the Hermès Birkin and Kelly typically support the strongest terms. If your handbag is not listed, you are still welcome to enquire.",
    loanRangeIntro1:
      "Loans range from $50,000 to $5 million. The amount available depends on the handbag and its suitability as loan security.",
    loanRangeIntro2:
      "A specialist will review the house, model, condition, materials, provenance, authenticity and current market demand before any offer is made.",
    loanRangeImage: designerHandbags,
    loanRangeImageAlt: "Close detail of a collector designer handbag",
    assessIntro: "Every handbag is reviewed individually.",
    assessItems: [
      { label: "House & model", icon: "tag" },
      { label: "Overall condition", icon: "activity" },
      { label: "Materials & hardware", icon: "layers" },
      { label: "Date & stamp codes", icon: "hash" },
      { label: "Box, dust bag & receipts", icon: "file" },
      { label: "Rarity", icon: "gem" },
      { label: "Market demand", icon: "trending" },
      { label: "Provenance", icon: "book" },
      { label: "Authenticity", icon: "shield-check" },
    ],
    serviceType: "Asset-based loan secured against designer handbags",
    serviceDescription:
      "Private loans from $50,000 to $5 million secured against eligible collector handbags, including Hermès, Chanel, Louis Vuitton, Dior, Bottega Veneta and Gucci. The handbag is assessed and authenticated by a specialist, held securely for the agreed term, and returned once the loan is repaid.",
    faqs: [
      { q: "Can I borrow against a Hermès Birkin?", a: "Yes. ALYRA considers collector handbags such as the Hermès Birkin and Kelly for lending, subject to model, condition, materials, authenticity, ownership records, market demand, valuation and approval." },
      { q: "Do I need the box and receipts?", a: "The box, dust bag and original receipts help establish authenticity and value, and can support stronger terms. They are not always essential. Tell us what you have." },
      { q: "What if I have lost the receipt?", a: "It is still worth enquiring. A specialist can assess the handbag on its own merits, including date and stamp codes." },
      { q: "How do you confirm a handbag is genuine?", a: "Each handbag is authenticated by a specialist, including materials, hardware and stamp codes, as part of the assessment." },
      { q: "Do I keep ownership of my handbag?", a: "Yes. You remain the owner. ALYRA holds the handbag only as security until the loan is repaid." },
      { q: "Can I repay early?", a: "Yes. Early repayment terms are set out in your offer before you proceed." },
      { q: "Which houses do you accept?", a: "ALYRA considers collector handbags from leading houses. If yours is not listed, you are welcome to ask." },
      { q: "What happens if I do not repay?", a: "Your handbag is at risk if repayment obligations are not met. The consequences of non-repayment are set out in your written loan terms before you proceed." },
    ],
    formChips: ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Other"],
    card: {
      image: designerHandbags,
      title: "Designer Handbags",
      blurb: "Hermès, Chanel, Louis Vuitton, and other collector handbags, subject to condition, provenance, authenticity, and resale demand.",
      ctaLabel: "Lending Against Handbags",
    },
  },
];

/** Lookup by slug. */
export function getAsset(slug: string): Asset | undefined {
  return ASSETS.find((a) => a.slug === slug);
}

/** Related assets for internal linking (all others, in order). */
export function relatedAssets(slug: string): Asset[] {
  return ASSETS.filter((a) => a.slug !== slug);
}
