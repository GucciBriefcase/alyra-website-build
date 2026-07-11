// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site";

// Static-first marketing site. No SSR adapter is needed for Vercel: Vercel
// auto-detects the Astro static build output. Add @astrojs/vercel only if/when
// the enquiry form is wired to a serverless endpoint or Astro Actions.
export default defineConfig({
  site: SITE.baseUrl,
  output: "static",
  trailingSlash: "always",
  // Permanent (301) redirects for legacy slugs renamed during the IA pass.
  // Honoured by the dev server; emitted as redirect stubs in the static build.
  redirects: {
    "/loans/high-value-watches/": { status: 301, destination: "/loans/luxury-watches/" },
    "/loans/classic-luxury-cars/": { status: 301, destination: "/loans/classic-and-luxury-cars/" },
    "/insights/what-determines-fine-watch-value-2026/": {
      status: 301,
      destination: "/insights/what-determines-fine-watch-value/",
    },
  },
  integrations: [
    sitemap({
      // Keep legacy redirect URLs out of the sitemap.
      filter: (page) =>
        !/\/loans\/high-value-watches\/|\/loans\/classic-luxury-cars\/|\/insights\/what-determines-fine-watch-value-2026\//.test(
          page
        ),
      // lastmod for dated editorial pages only (matches each article's
      // schema dateModified — update both together when an article changes).
      // Evergreen pages carry no lastmod rather than a fake uniform date.
      serialize(item) {
        const lastmod = {
          "/insights/what-determines-fine-watch-value/": "2026-07-11",
          "/insights/gold-and-bullion-as-collateral/": "2026-07-11",
          "/insights/which-prestige-car-marques-hold-value-australia/": "2026-07-11",
          "/insights/how-much-can-i-borrow-against-a-rolex-australia/": "2026-07-11",
          "/insights/how-watch-service-history-affects-your-loan-offer/": "2026-07-11",
        }[new URL(item.url).pathname];
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  build: {
    // Inline all CSS (~8 KiB total): external stylesheets were render-blocking
    // for ~420 ms on slow 4G and gated @font-face discovery behind a request.
    inlineStylesheets: "always",
  },
});
