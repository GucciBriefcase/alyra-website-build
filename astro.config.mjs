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
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
