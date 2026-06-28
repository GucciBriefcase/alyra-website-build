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
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
