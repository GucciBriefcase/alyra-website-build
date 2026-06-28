/**
 * Insights (editorial) data.
 *
 * `FEATURED` is a fully written article with a real page at
 * /insights/<slug>/. `POSTS` are upcoming articles shown on the index; they
 * have no body yet, so the index renders them as "Coming soon" cards rather
 * than dead links. To publish one, give it a `slug` + body and add a page.
 */

import type { ImageMetadata } from "astro";

// Content images optimised at build time via astro:assets.
import heroWatchesPatek from "../assets/images/hero-watches-patek.jpg";
import fineWatches from "../assets/images/fine-watches.jpg";
import fineArt from "../assets/images/fine-art.jpg";
import valuationImg from "../assets/images/valuation.jpg";
import goldBullion from "../assets/images/gold-bullion.jpg";
import classicCars from "../assets/images/classic-cars.jpg";
import jewellery from "../assets/images/jewellery.jpg";
import specialist from "../assets/images/specialist.jpg";
import heroWatches from "../assets/images/hero-watches.jpg";
import loanrangeFineart from "../assets/images/loanrange-fineart.jpg";

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
  { category: "Watches", title: "Why service history quietly moves a watch valuation.", excerpt: "A complete service record does more than reassure a buyer — it can change the realisable figure outright. Here is how we weigh it.", date: "4 Jun 2026", readTime: "6 min read", image: fineWatches, imageAlt: "Fine watch on a workbench" },
  { category: "Art", title: "Lending against blue-chip art without selling the work.", excerpt: "Provenance, catalogue raisonné status and market depth all shape how much capital a painting can responsibly secure.", date: "28 May 2026", readTime: "8 min read", image: fineArt, imageAlt: "Framed fine artwork" },
  { category: "Market", title: "The case for liquidity without giving up ownership.", excerpt: "Selling is final. Borrowing against an asset keeps the upside in your hands while solving a timing problem.", date: "21 May 2026", readTime: "5 min read", image: valuationImg, imageAlt: "Editorial still life of a high-value asset" },
  { category: "Gold", title: "Gold and bullion as collateral: a practical guide.", excerpt: "Bars, coins and allocated holdings each behave differently as security. What to expect from valuation to custody.", date: "14 May 2026", readTime: "6 min read", image: goldBullion, imageAlt: "Investment-grade gold bars" },
  { category: "Cars", title: "Which marques actually hold their value.", excerpt: "Rarity, originality and documented history separate a collector car from a depreciating asset. A specialist view.", date: "7 May 2026", readTime: "7 min read", image: classicCars, imageAlt: "Classic car detail" },
  { category: "Jewellery", title: "Signed jewellery and important stones: where price lives.", excerpt: "A signature, a certificate and a cut can matter as much as carat weight. How provenance translates into a loan figure.", date: "30 Apr 2026", readTime: "5 min read", image: jewellery, imageAlt: "Diamond ring" },
  { category: "Market", title: "Inside a private valuation appointment.", excerpt: "What happens when a specialist assesses your asset — from authentication to the figure that anchors your offer.", date: "23 Apr 2026", readTime: "6 min read", image: specialist, imageAlt: "Specialist at a desk" },
  { category: "Watches", title: "Independents, complications and the new collector market.", excerpt: "Demand has broadened well beyond the usual references. What that means for valuation and liquidity today.", date: "16 Apr 2026", readTime: "7 min read", image: heroWatches, imageAlt: "Watch movement detail" },
  { category: "Art", title: "Reading an auction result before you rely on it.", excerpt: "A single hammer price rarely tells the whole story. How specialists separate signal from noise in the salesroom.", date: "9 Apr 2026", readTime: "8 min read", image: loanrangeFineart, imageAlt: "Auction room artwork" },
];
