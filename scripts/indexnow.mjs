// IndexNow ping — runs after `astro build` (see "postbuild" in package.json).
//
// Tells Bing (and every other IndexNow engine: Yandex, Naver, Seznam, Yep…)
// which URLs exist on the site so new or changed pages are picked up within
// minutes instead of waiting for the next crawl. One POST covers all engines;
// they share submissions between themselves.
//
// The key is the 32-hex filename in public/ (served at
// https://www.alyra.com.au/<key>.txt) — the same file is the single source of
// truth for both the key value and its proof-of-ownership URL, so there is
// nothing to keep in sync. The key is public by design; it is not a secret.
//
// Only fires on Vercel production deploys. Local builds and preview deploys
// print a skip line and exit 0, so nothing about the build can break because
// of this script. Pass --force to submit from a local machine.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC = join(ROOT, "public");
const SITEMAP = join(ROOT, "dist", "sitemap-0.xml");
const ENDPOINT = "https://api.indexnow.org/indexnow";

const force = process.argv.includes("--force");
const isProd = process.env.VERCEL_ENV === "production";

if (!isProd && !force) {
  console.log(`[indexnow] skipped (VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"}; pass --force to submit)`);
  process.exit(0);
}

const keyFile = readdirSync(PUBLIC).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("[indexnow] no <key>.txt found in public/ — nothing submitted");
  process.exit(0);
}
const key = readFileSync(join(PUBLIC, keyFile), "utf8").trim();
if (key !== keyFile.replace(/\.txt$/, "")) {
  console.error(`[indexnow] ${keyFile} does not contain its own key — nothing submitted`);
  process.exit(0);
}

if (!existsSync(SITEMAP)) {
  console.error(`[indexnow] ${SITEMAP} not found — run after astro build`);
  process.exit(0);
}
const urlList = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("[indexnow] sitemap contained no URLs — nothing submitted");
  process.exit(0);
}

const host = new URL(urlList[0]).host;
const body = { host, key, keyLocation: `https://${host}/${keyFile}`, urlList };

try {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = accepted, 202 = accepted but key not yet validated (normal on the
  // first submission after adding the key file).
  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] ${res.status} — submitted ${urlList.length} URLs for ${host}`);
  } else {
    console.error(`[indexnow] ${res.status} ${res.statusText} — ${await res.text()}`);
  }
} catch (err) {
  // Never fail the deploy over a search-engine ping.
  console.error(`[indexnow] request failed: ${err?.message ?? err}`);
}
