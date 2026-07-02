/**
 * Confidential-valuation enquiry — submission logic, isolated from the form UI.
 *
 * The UI (src/components/forms/ValuationForm.astro) calls `submitValuation`. To
 * connect a backend later (Astro Actions, a Vercel serverless function,
 * Formspree, Basin, HubSpot, Airtable or Google Sheets), set
 * `SITE.enquiryEndpoint` and, if needed, adjust the request shape below — the
 * form markup does not need to change.
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

/**
 * Submit the enquiry. With no endpoint configured this returns "unconfigured"
 * rather than faking success, so the UI can be honest about delivery.
 */
export async function submitValuation(
  endpoint: string,
  payload: ValuationPayload
): Promise<SubmitResult> {
  if (!endpoint) return { status: "unconfigured" };

  // FormSubmit reads control fields from the body: _subject sets the email
  // subject line, _template: "table" formats the fields as a readable table.
  const body: Record<string, unknown> = { ...payload };
  if (endpoint.includes("formsubmit.co")) {
    body._subject = "New confidential valuation enquiry — alyra.com.au";
    body._template = "table";
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return {
        status: "error",
        message: "Something went wrong sending your enquiry. Please try again or email us directly.",
      };
    }
    // FormSubmit answers HTTP 200 even when it does NOT deliver (e.g. the
    // recipient address hasn't clicked its activation link yet) and signals
    // the real outcome in the body. Only an explicit `success: "false"` is a
    // failure, so other backends without that field are unaffected.
    const data = await res.json().catch(() => null);
    if (data && String(data.success) === "false") {
      console.warn("Enquiry endpoint refused delivery:", data.message);
      return {
        status: "error",
        message: "Something went wrong sending your enquiry. Please try again or email us directly.",
      };
    }
    return { status: "ok" };
  } catch {
    return {
      status: "error",
      message: "We couldn't reach the server. Please check your connection or email us directly.",
    };
  }
}
