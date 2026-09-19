/**
 * POST /api/enquiry — Vercel serverless route for the valuation enquiry form.
 *
 * Replaces the direct browser → FormSubmit hop. Each enquiry is written to the
 * Neon Postgres table `enquiries` (db/schema.sql) FIRST, then relayed to the
 * inbox, so a mail failure can no longer lose an enquiry: the row records the
 * outcome in `email_status` and the client still sees success because the
 * enquiry is safely stored.
 *
 * Email: Resend when RESEND_API_KEY is set (from ENQUIRY_FROM, e.g.
 * "ALYRA <enquiries@alyra.com.au>" — the domain must be verified in Resend);
 * otherwise FormSubmit's AJAX API, which is the pre-existing delivery path and
 * needs no credentials.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   DATABASE_URL     Neon pooled connection string (required)
 *   ENQUIRY_TO       recipient inbox; defaults to hello@alyra.com.au
 *   RESEND_API_KEY   optional — switches delivery from FormSubmit to Resend
 *   ENQUIRY_FROM     sender for Resend; defaults to onboarding@resend.dev
 *
 * Accepts JSON (the site's fetch path) and form-encoded bodies (the no-JS
 * native POST), answering the latter with a redirect back to the form.
 */
import { neon } from "@neondatabase/serverless";

const SITE_ORIGIN = "https://www.alyra.com.au";
const DEFAULT_TO = "hello@alyra.com.au";
const MAX_FIELD = 2000;

interface Payload {
  name: string;
  email: string;
  phone: string;
  assetType: string;
  estimatedValue: string;
  location: string;
  message: string;
  preferredContact: string;
  consent: boolean;
  _gotcha: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Read the body as JSON or form-encoded into one normalised, trimmed payload. */
async function readPayload(req: Request): Promise<Payload> {
  const type = req.headers.get("content-type") ?? "";
  let raw: Record<string, unknown> = {};
  if (type.includes("application/json")) {
    raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  } else if (type.includes("form")) {
    (await req.formData()).forEach((v, k) => (raw[k] = v));
  }
  const str = (k: string) => String(raw[k] ?? "").trim().slice(0, MAX_FIELD);
  const consent = raw.consent;
  return {
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    assetType: str("assetType"),
    estimatedValue: str("estimatedValue"),
    location: str("location"),
    message: str("message"),
    preferredContact: str("preferredContact"),
    consent: consent === true || consent === "true" || consent === "on" || consent === "1",
    _gotcha: str("_gotcha"),
  };
}

function validate(p: Payload): string | null {
  if (!p.name) return "Please enter your name.";
  if (!EMAIL_RE.test(p.email)) return "Please enter a valid email address.";
  if (!p.phone) return "Please enter your phone number.";
  if (!p.assetType) return "Please choose an asset type.";
  if (!p.consent) return "Please confirm your consent to be contacted.";
  return null;
}

/** Path of the page the form was on, taken from the Referer. */
function sourcePage(req: Request): string | null {
  const ref = req.headers.get("referer");
  if (!ref) return null;
  try {
    return new URL(ref).pathname;
  } catch {
    return null;
  }
}

function subjectFor(p: Payload): string {
  return `New enquiry — ${p.name}${p.assetType ? ` (${p.assetType})` : ""}`;
}

function textBody(p: Payload, id: number, page: string | null): string {
  const rows: [string, string][] = [
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Asset type", p.assetType],
    ["Estimated value", p.estimatedValue || "—"],
    ["Location", p.location || "—"],
    ["Preferred contact", p.preferredContact || "—"],
    ["Consent", p.consent ? "Yes" : "No"],
    ["Page", page || "—"],
    ["Enquiry #", String(id)],
  ];
  const width = Math.max(...rows.map(([k]) => k.length));
  return [...rows.map(([k, v]) => `${k.padEnd(width)}  ${v}`), "", "Message:", p.message || "—"].join("\n");
}

async function sendViaResend(p: Payload, id: number, page: string | null, to: string): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM || "ALYRA Enquiries <onboarding@resend.dev>",
      to: [to],
      reply_to: p.email,
      subject: subjectFor(p),
      text: textBody(p, id, page),
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function sendViaFormSubmit(p: Payload, id: number, page: string | null, to: string): Promise<void> {
  const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // FormSubmit records the submitting site from these, and its bot filter
      // rejects Node's default user agent with a 403.
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}${page ?? "/valuation/"}`,
      "User-Agent": "Mozilla/5.0 (compatible; ALYRA enquiry relay; +https://www.alyra.com.au)",
    },
    body: JSON.stringify({
      _subject: subjectFor(p),
      _template: "table",
      _replyto: p.email,
      name: p.name,
      email: p.email,
      phone: p.phone,
      assetType: p.assetType,
      estimatedValue: p.estimatedValue,
      location: p.location,
      message: p.message,
      preferredContact: p.preferredContact,
      consent: p.consent,
      page: page ?? "",
      enquiryId: id,
    }),
  });
  // FormSubmit answers 200 even when it refuses delivery and says so in the body.
  const data = (await res.json().catch(() => null)) as { success?: unknown; message?: unknown } | null;
  if (!res.ok || (data && String(data.success) === "false")) {
    throw new Error(`formsubmit ${res.status}: ${String(data?.message ?? "").slice(0, 200)}`);
  }
}

export async function POST(req: Request): Promise<Response> {
  const p = await readPayload(req);
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const page = sourcePage(req);

  // Honeypot: bots fill the hidden field. Pretend it worked so they move on.
  if (p._gotcha) {
    return wantsJson ? json(200, { ok: true }) : Response.redirect(`${SITE_ORIGIN}/valuation/?sent=1`, 303);
  }

  const error = validate(p);
  if (error) return json(400, { ok: false, error });

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("[enquiry] DATABASE_URL is not set");
    return json(500, { ok: false, error: "Enquiry service is not configured." });
  }
  const sql = neon(url);

  let id: number;
  try {
    const rows = await sql`
      INSERT INTO enquiries
        (name, email, phone, asset_type, estimated_value, location, message, preferred_contact, consent, source_page)
      VALUES
        (${p.name}, ${p.email}, ${p.phone}, ${p.assetType}, ${p.estimatedValue || null}, ${p.location || null},
         ${p.message || null}, ${p.preferredContact || null}, ${p.consent}, ${page})
      RETURNING id
    `;
    id = Number(rows[0].id);
  } catch (err) {
    console.error("[enquiry] insert failed", err);
    return json(500, {
      ok: false,
      error: "Something went wrong sending your enquiry. Please try again or email us directly.",
    });
  }

  // The row is safe; the mail hop is best-effort and its outcome is recorded.
  const to = process.env.ENQUIRY_TO || DEFAULT_TO;
  let emailStatus = "sent";
  try {
    if (process.env.RESEND_API_KEY) await sendViaResend(p, id, page, to);
    else await sendViaFormSubmit(p, id, page, to);
  } catch (err) {
    emailStatus = `failed: ${err instanceof Error ? err.message : String(err)}`.slice(0, 500);
    console.error(`[enquiry] #${id} email failed`, err);
  }
  try {
    await sql`UPDATE enquiries SET email_status = ${emailStatus} WHERE id = ${id}`;
  } catch (err) {
    console.error(`[enquiry] #${id} status update failed`, err);
  }

  return wantsJson ? json(200, { ok: true, id }) : Response.redirect(`${SITE_ORIGIN}/valuation/?sent=1`, 303);
}

export function GET(): Response {
  return json(405, { ok: false, error: "Use POST." });
}
