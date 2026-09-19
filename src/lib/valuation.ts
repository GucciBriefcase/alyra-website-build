/**
 * Confidential-valuation enquiry — submission logic, isolated from the form UI.
 *
 * The UI (src/components/forms/ValuationForm.astro and StepperForm.astro)
 * calls `submitValuation`, which POSTs the payload as JSON to
 * `SITE.enquiryEndpoint` — the Vercel route in api/enquiry.ts, which writes
 * the enquiry to Neon Postgres before relaying the email. The endpoint answers
 * `{ ok: true, id }` or `{ ok: false, error }`. FormSubmit is still supported
 * as an endpoint (the pre-Neon setup) so the site can fall back to it by
 * changing the config alone.
 */

export interface ValuationPayload {
  name: string;
  email: string;
  phone: string;
  assetType: string;
  estimatedValue: string;
  location: string;
  message: string;
  preferredContact: string;
  consent: boolean;
}

export type SubmitResult =
  | { status: "ok" }
  | { status: "error"; message: string }
  | { status: "unconfigured" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Field-level validation. Returns a map of fieldName → error message. */
export function validateValuation(p: ValuationPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!p.name.trim()) errors.name = "Please enter your name.";
  if (!p.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(p.email)) errors.email = "Please enter a valid email address.";
  if (!p.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!p.assetType) errors.assetType = "Please choose an asset type.";
  if (!p.consent) errors.consent = "Please confirm your consent to be contacted.";
  return errors;
}

/**
 * Bucket a free-text estimated value into a coarse band. The form collects an
 * exact figure, but only a band is ever exposed to analytics — an exact asset
 * value is sensitive. Returns `undefined` when no usable number was entered, so
 * the param is omitted rather than sent empty.
 */
export function valueBand(raw: string): string | undefined {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  if (!raw || !Number.isFinite(n) || n <= 0) return undefined;
  if (n < 50000) return "under_50k";
  if (n < 100000) return "50k_100k";
  if (n < 250000) return "100k_250k";
  if (n < 500000) return "250k_500k";
  if (n < 1000000) return "500k_1m";
  if (n < 5000000) return "1m_5m";
  return "5m_plus";
}

/**
 * Push a GTM `dataLayer` event marking a successful enquiry submission, for use
 * as a GA4 conversion (create a trigger on the `enquiry_submit` event in GTM).
 *
 * Privacy: deliberately carries NO personal data (no name, email, phone or
 * message) — only the asset type, a value *band* (never the exact figure) and
 * contact preference, which are useful for conversion analysis without
 * identifying the client. Safe to call when GTM isn't loaded; it lazily
 * initialises `window.dataLayer`.
 */
export function trackEnquirySuccess(payload: ValuationPayload): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "enquiry_submit",
    form_name: "confidential_valuation",
    asset_type: payload.assetType,
    estimated_value_band: valueBand(payload.estimatedValue),
    preferred_contact: payload.preferredContact || undefined,
  });
}

/** FormSubmit control fields + payload. */
function formSubmitBody(payload: ValuationPayload): Record<string, unknown> {
  // _subject sets the email subject line, _template: "table" formats the
  // fields as a readable table. The subject carries the name and asset type
  // so each enquiry is unique — Gmail threads identical subjects into one
  // conversation, which hid new enquiries inside old threads.
  const who = payload.name.trim() || "Unnamed";
  const what = payload.assetType ? ` (${payload.assetType})` : "";
  return { ...payload, _subject: `New enquiry — ${who}${what}`, _template: "table", _replyto: payload.email };
}

const GENERIC_ERROR = "Something went wrong sending your enquiry. Please try again or email us directly.";

/** POST JSON and interpret both our route's and FormSubmit's reply shapes. */
async function postJson(endpoint: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    // Our route returns `{ ok, error }` with real status codes; FormSubmit
    // answers HTTP 200 even when it does NOT deliver (e.g. the recipient
    // address hasn't clicked its activation link yet) and signals the real
    // outcome as `success: "false"`.
    const data = await res.json().catch(() => null);
    const refused = data && (data.ok === false || String(data.success) === "false");
    if (!res.ok || refused) {
      console.warn("Enquiry endpoint refused delivery:", data?.error ?? data?.message ?? res.status);
      return { status: "error", message: (typeof data?.error === "string" && data.error) || GENERIC_ERROR };
    }
    return { status: "ok" };
  } catch {
    return {
      status: "error",
      message: "We couldn't reach the server. Please check your connection or email us directly.",
    };
  }
}

/**
 * Submit the enquiry. With no endpoint configured this returns "unconfigured"
 * rather than faking success, so the UI can be honest about delivery.
 *
 * `endpoint` is normally our storing route; `relayEndpoint` (FormSubmit) is
 * then called from the browser afterwards so the inbox is notified, until a
 * server-side mail provider takes over. The relay is best-effort: the enquiry
 * is already stored, so a relay hiccup must not show the client an error.
 */
export async function submitValuation(
  endpoint: string,
  payload: ValuationPayload,
  relayEndpoint = ""
): Promise<SubmitResult> {
  if (!endpoint) return { status: "unconfigured" };

  const isFormSubmit = endpoint.includes("formsubmit.co");
  const result = await postJson(endpoint, isFormSubmit ? formSubmitBody(payload) : payload);
  if (result.status !== "ok" || isFormSubmit || !relayEndpoint) return result;

  const relay = await postJson(relayEndpoint, formSubmitBody(payload));
  if (relay.status !== "ok") console.warn("Enquiry stored but the email relay failed:", relay);
  return result;
}
