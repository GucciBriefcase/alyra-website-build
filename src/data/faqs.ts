/**
 * Homepage / general FAQ set for ALYRA.
 *
 * Used by the homepage FAQ accordion and the FAQPage structured data. Asset
 * pages carry their own FAQs in src/data/assets.ts.
 */
import type { Faq } from "./assets";

export const HOME_FAQS: Faq[] = [
  { q: "What is private asset-based lending?", a: "Private asset-based lending is a loan secured against a valuable asset you own. The asset is assessed, held securely during the loan term, and returned when the loan is repaid in accordance with the agreed terms." },
  { q: "Who is private asset-based lending suitable for?", a: "It may suit private clients and collectors who own valuable physical assets and want liquidity without publicly selling watches, jewellery, diamonds, art, classic cars or bullion." },
  { q: "What assets can secure a loan?", a: "ALYRA considers high-value watches, jewellery, diamonds, fine art, classic and luxury cars, gold bullion. Suitability depends on asset quality, provenance, market demand, valuation and custody requirements." },
  { q: "How is ALYRA different from selling through auction or a marketplace?", a: "Selling transfers ownership and may involve public exposure, fees, negotiation and timing risk. ALYRA provides a private lending process where the client retains ownership and recovers the asset after repayment." },
  { q: "What happens after I submit an enquiry?", a: "ALYRA reviews the asset details, photographs and supporting documentation. If the asset may be suitable, a specialist may contact you to discuss valuation, custody and next steps." },
  { q: "How much can I borrow?", a: "ALYRA provides loans from $50,000 to $5 million, subject to asset type, valuation, approval, custody, documentation and agreed loan terms." },
  { q: "Is this a pawn loan?", a: "ALYRA provides loans secured against pledged goods under applicable pawnbroking laws. The process is private, specialist-led and designed for high-value assets." },
  { q: "Do I keep ownership of my asset?", a: "Yes. You retain ownership of the asset while ALYRA holds it as security for the loan. Once the loan is repaid in accordance with the agreed terms, the asset is returned to you." },
  { q: "What happens to my asset while the loan is active?", a: "The asset is held in secure custody while the loan is active. Insurance may apply subject to policy terms, asset approval, valuation limits and custody conditions." },
  { q: "How quickly can I receive funds?", a: "Timing depends on the asset, documentation, valuation, approval and custody requirements. A specialist typically responds to enquiries within one business day." },
  { q: "Will my asset be listed for sale?", a: "No public listing, auction campaign or marketplace sale is required to access funds. The asset is held as security during the loan term." },
  { q: "Will this appear on my credit record?", a: "This depends on the final loan structure, applicable law and the circumstances of the loan. ALYRA will explain relevant disclosure and reporting obligations before you proceed." },
  { q: "Can I repay early?", a: "Early repayment may be available where permitted under your loan terms. Any applicable fees, interest and repayment conditions are disclosed before you proceed." },
  { q: "What happens if I do not repay?", a: "Your asset is at risk if you do not meet your repayment obligations. Fees, notices, redemption rights and enforcement processes are disclosed before you proceed." },
  { q: "Can I sell instead of borrow?", a: "You may choose to sell an asset independently instead of borrowing against it. ALYRA's primary service is lending secured against eligible physical assets." },
];
