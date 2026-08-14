/**
 * Insights (editorial) data.
 *
 * `FEATURED` is a fully written article with a real page at
 * /insights/<slug>/. `POSTS` are shown on the index grid: entries with a
 * `slug` are published (the card links to /insights/<slug>/); entries without
 * one render as "Coming soon" cards rather than dead links. To publish one,
 * add a page under src/pages/insights/ and set its `slug` here.
 */

import type { ImageMetadata } from "astro";

// Content images optimised at build time via astro:assets.
import heroWatchesPatek from "../assets/images/hero-watches-patek.jpg";
import patekAquanaut from "../assets/images/patek-aquanaut-hero.jpg";
import fineArt from "../assets/images/fine-art.jpg";
import valuationImg from "../assets/images/valuation.jpg";
import goldBullion from "../assets/images/gold-bullion.jpg";
import classicCars from "../assets/images/classic-cars.jpg";
import jewellery from "../assets/images/jewellery.jpg";
import heroWatches from "../assets/images/hero-watches.jpg";
import heroFineart from "../assets/images/hero-fineart.jpeg";
import argylePinkDiamonds from "../assets/images/argyle-pink-diamonds-hero.jpg";
import rolexLoanHero from "../assets/images/rolex-loan-hero.jpg";
import watchServiceHero from "../assets/images/watch-service-hero.jpg";

export type InsightCategory =
  | "Watches"
  | "Art"
  | "Jewellery"
  | "Cars"
  | "Gold"
  | "Market";

export interface InsightCard {
  category: InsightCategory;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: ImageMetadata;
  imageAlt: string;
  /** Set once the article page exists at /insights/<slug>/ — the index then links the card. */
  slug?: string;
}

/** Filter chips shown on the index ("All" is prepended in the UI). */
export const INSIGHT_CATEGORIES: InsightCategory[] = [
  "Watches",
  "Art",
  "Jewellery",
  "Cars",
  "Gold",
  "Market",
];

export const FEATURED: InsightCard & { slug: string } = {
  slug: "what-determines-fine-watch-value",
  category: "Watches",
  title: "What actually determines the value of a fine watch in 2026.",
  excerpt:
    "Brand and reference are only the beginning. Condition, provenance, service history, market timing and the channel you sell through can move a realisable figure by tens of thousands. A specialist walks through what we weigh first.",
  date: "24 June 2026",
  readTime: "11 min read",
  image: heroWatchesPatek,
  imageAlt: "Close detail of a fine watch dial and bezel",
};

export const POSTS: InsightCard[] = [
  { slug: "lending-against-argyle-pink-diamonds", category: "Jewellery", title: "Lending against Argyle pink diamonds.", excerpt: "The mine has closed and the supply is finite — but a lender still assesses one stone at a time. What has to be established about identity, colour, documentation and demand.", date: "14 Aug 2026", readTime: "9 min read", image: argylePinkDiamonds, imageAlt: "Argyle pink, purple and blue diamonds arranged on pink silk" },
  { slug: "liquidity-without-giving-up-ownership", category: "Market", title: "The case for liquidity without giving up ownership.", excerpt: "Selling is final. Borrowing against an asset can preserve ownership and future value exposure while solving a timing problem — but only when the costs, controls and repayment plan are credible.", date: "3 Aug 2026", readTime: "13 min read", image: valuationImg, imageAlt: "Diamond-set rose-gold Patek Philippe Aquanaut" },
  { slug: "reading-an-auction-result-before-you-rely-on-it", category: "Art", title: "Reading an auction result before you rely on it.", excerpt: "A single hammer price rarely tells the whole story. Price basis, lot identity, condition, sale mechanics and bidder depth decide whether a published result is a comparable at all.", date: "3 Aug 2026", readTime: "14 min read", image: heroFineart, imageAlt: "A gilt-framed oil painting of horses crossing a river" },
  { slug: "how-lenders-assess-rolex-patek-philippe-richard-mille-watches-australia", category: "Watches", title: "How lenders assess Rolex, Patek Philippe and Richard Mille watches in Australia.", excerpt: "Established secondary markets can provide stronger completed-sale evidence, but financeability still depends on the exact watch, its condition and documentation, and the proposed legal, custody and sale structure.", date: "3 Aug 2026", readTime: "13 min read", image: patekAquanaut, imageAlt: "A white-gold Patek Philippe Aquanaut with a sapphire-set bezel and gem-set dial" },
  { slug: "how-lenders-assess-independent-and-complicated-watches", category: "Watches", title: "How lenders assess independent and complicated watches.", excerpt: "Independents, dress watches and complications now attract a wider collector base — but liquidity is still proven at the exact reference and configuration level, one watch at a time.", date: "12 Jul 2026", readTime: "11 min read", image: heroWatches, imageAlt: "Gem-set Patek Philippe and Audemars Piguet watches in a collector's case" },
  { slug: "how-lenders-assess-blue-chip-art-as-collateral", category: "Art", title: "How lenders assess blue-chip art as collateral.", excerpt: "There is no universal loan-to-value figure for a painting. Identity, liquidity and control — provenance, catalogue raisonné status, market depth and condition — decide what a work can responsibly secure.", date: "12 Jul 2026", readTime: "11 min read", image: fineArt, imageAlt: "Framed fine artwork" },
  { slug: "how-much-can-i-borrow-against-a-rolex-australia", category: "Watches", title: "How much can I borrow against a Rolex in Australia?", excerpt: "There is no fixed figure. Realisable market value, condition, documentation and ALYRA's $50,000 minimum decide what a Rolex — or a collection — can actually support.", date: "11 Jul 2026", readTime: "10 min read", image: rolexLoanHero, imageAlt: "A Rolex watch reviewed by a specialist against paperwork" },
  { slug: "how-watch-service-history-affects-your-loan-offer", category: "Watches", title: "How watch service history affects your loan offer.", excerpt: "Documented, authorised servicing can strengthen an offer — but replacing original parts can quietly cut it. How a specialist actually weighs the record.", date: "11 Jul 2026", readTime: "8 min read", image: watchServiceHero, imageAlt: "A watchmaker servicing a luxury watch movement on a workbench" },
  { slug: "gold-and-bullion-as-collateral", category: "Gold", title: "Gold and bullion as collateral: a practical guide.", excerpt: "Physical gold can be a useful private asset, but it is not automatically good collateral. How bullion is assessed — purity, ownership, storage, control, valuation, liquidity and enforceability.", date: "3 Jul 2026", readTime: "12 min read", image: goldBullion, imageAlt: "Investment-grade gold bullion bars" },
  { slug: "which-prestige-car-marques-hold-value-australia", category: "Cars", title: "Which prestige car marques actually hold their value in Australia in 2026.", excerpt: "Ferrari and Porsche lead the conversation, but the badge is only the beginning. Model, specification, kilometres, documentation and sale channel decide the real number.", date: "2 Jul 2026", readTime: "10 min read", image: classicCars, imageAlt: "Classic car detail" },
  { category: "Jewellery", title: "Signed jewellery and important stones: where price lives.", excerpt: "A signature, a certificate and a cut can matter as much as carat weight. How provenance translates into a loan figure.", date: "30 Apr 2026", readTime: "5 min read", image: jewellery, imageAlt: "Diamond ring" },
];
