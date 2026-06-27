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
 * Submit the enquiry. With no endpoint configured this returns "unconfigured"
 * rather than faking success, so the UI can be honest about delivery.
 */
export async function submitValuation(
  endpoint: string,
  payload: ValuationPayload
): Promise<SubmitResult> {
  if (!endpoint) return { status: "unconfigured" };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
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
