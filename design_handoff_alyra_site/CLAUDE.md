# ALYRA — Canonical Palette & Token System

Warm, premium, restrained: **cream + ink + gold**, with a desaturated warm-grey range for text.
This build styles **inline** (no global stylesheet / `:root`). Treat the token names below as the
source of truth and map them cleanly into inline style values. Do **not** introduce new colours
unless there is a clear accessibility or state requirement.

## Tokens

### Core neutrals
| Token | Hex | Use |
|---|---|---|
| `--cream` | `#f4f1ea` | Page background |
| `--surface` | `#fbfaf6` | Cards / panels (instead of pure white) |
| `--surface-white` | `#ffffff` | Large full-bleed section backgrounds |

### Ink
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1b1a16` | Primary text, dark sections |
| `--ink-deep` | `#16150f` | Footer |
| `--ink-gold-button` | `#1b1509` | Text on gold buttons |

### Gold
| Token | Hex | Use |
|---|---|---|
| `--gold` | `#c4a567` | Primary gold: button fill, focus outline, hero display highlight, accents on dark |
| `--gold-light` | `#d4b777` | Top stop of gold gradient |
| `--gold-hover` | `#a8884e` | (legacy mid-gold; avoid as small foreground on light) |
| `--gold-soft` | `#d8c79a` | Text selection, soft card-hover borders |
| `--gold-fg` | `#9a6a3c` | **Eyebrows / accent labels on light bg** — site-wide eyebrow colour |
| `--gold-ink` | `#6f5a26` | **Gold used as a small foreground on light bg** — step numbers, list dashes, small icons, location dots, FAQ sign, chip icons |

### Text
| Token | Hex | Use |
|---|---|---|
| `--text-muted` | `#6b6657` | Body copy |
| `--text-soft` | `#7c7766` | Secondary body |
| `--text-chip` | `#46453f` | Chip labels |
| `--text-on-dark` | `#e9e3d6` | Text on dark sections |
| `--text-muted-on-dark` | `#b4ae9f` | Footer links |

### Borders
| Token | Hex | Use |
|---|---|---|
| `--border` | `#e4ded1` | Card borders / hairlines |
| `--border-strong` | `#d8d0bf` | Chips, inputs, dividers |
| `--border-gold-soft` | `#d8c79a` | Gold-tinted hover borders |

### Semantic states
| Token | Hex | Use |
|---|---|---|
| `--success` | `#4f6f46` | Form success text |
| `--success-soft` | `#edf4e9` | Form success background |
| `--error` | `#8a3a2f` | Form error text (e.g. invalid email) |
| `--error-soft` | `#f7ebe8` | Form error background |

## Mapping rules (inline build)

- **Gold as a small foreground on light** → `--gold-ink #6f5a26` (better contrast, more premium).
  Gold as a **fill** (buttons), the **hero display highlight**, or any gold **on a dark background**
  stays `--gold #c4a567` / `--gold-light`.
- **Cards / discrete panels** → `--surface #fbfaf6`. Large section backgrounds may stay
  `--surface-white #ffffff` for contrast against the cream page.
- **Hover that changes `background` / `color` / `background-position` must be JS-driven.**
  This runtime applies base styles inline, which beats any generated `:hover` rule, so CSS `:hover`
  silently fails for those properties. Use `onMouseEnter`/`onMouseLeave` handlers that set inline
  styles directly (see `fx`/`unfx` + `onInkIn`/`onLeftIn`/`onChipIn` in `ALYRA Homepage.dc.html`).
  `transform`-only hovers can stay as `style-hover`.

## Type
- Display / headings: **Poppins** (600).
- Body / labels / eyebrows: **Inter** (400/500/600).

## Analytics event contract

The enquiry forms push a GTM `dataLayer` event only after a successful enquiry submission.

Source files:

- `src/lib/valuation.ts`
- `src/components/forms/ValuationForm.astro`
- `src/components/forms/StepperForm.astro`

Event shape:

```ts
{
  event: "enquiry_submit";
  form_name: "confidential_valuation";
  asset_type?: string;
  estimated_value_band?: string; // coarse band only, never the exact value
  preferred_contact?: string;
}
```

`estimated_value_band` values (the only values `valueBand()` can emit — aligned to the $50k–$5m loan range):

| Band | Range (AUD) |
|---|---|
| `under_50k` | below $50,000 |
| `50k_100k` | $50,000 – $99,999 |
| `100k_250k` | $100,000 – $249,999 |
| `250k_500k` | $250,000 – $499,999 |
| `500k_1m` | $500,000 – $999,999 |
| `1m_5m` | $1,000,000 – $4,999,999 |
| `5m_plus` | $5,000,000 and above |

When the field is blank or no number can be parsed, `estimated_value_band` is omitted from the event entirely (not sent empty). Note: the form collects an exact figure — banding happens only for analytics. The exact `estimatedValue` is still sent to the business enquiry endpoint via `submitValuation`; only the `dataLayer` event is coarsened by `valueBand()`.

Privacy constraint: do not push personally identifiable information into `dataLayer`. Do not include name, email, phone, message content, address, or any free-text financial details. `estimated_value_band` must be a coarse band, never an exact asset value.

GTM configuration:

- Trigger type: Custom Event
- Event name: `enquiry_submit`

GA4 configuration:

- GA4 event name: `generate_lead`
- Suggested parameters:
  - `form_name`
  - `asset_type`
  - `estimated_value_band`
  - `preferred_contact`
- Register these custom parameters in GA4 (as custom dimensions) if they need to be used in reports.

This event should represent a successful lead submission only. Do not fire it on button click, validation failure, form start, or failed endpoint response.

Architecture note: `enquiry_submit` is the internal GTM/`dataLayer` event; `generate_lead` is the GA4 event name it maps to in GTM.
