-- ALYRA enquiries — one row per confidential-valuation submission.
--
-- Applied once to the Neon project "alyra" (Sydney, ap-southeast-2). The
-- Vercel route api/enquiry.ts inserts here before it relays the email, so an
-- enquiry is on disk even if the mail hop fails. Re-runnable: everything is
-- IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS enquiries (
  id                 bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at         timestamptz NOT NULL DEFAULT now(),
  name               text NOT NULL,
  email              text NOT NULL,
  phone              text NOT NULL,
  asset_type         text NOT NULL,
  estimated_value    text,
  location           text,
  message            text,
  preferred_contact  text,
  consent            boolean NOT NULL,
  -- Path of the page the form was on (e.g. /loans/luxury-watches/), for
  -- attribution. No IP or user agent is kept: the privacy policy doesn't
  -- promise either and they aren't needed to follow up an enquiry.
  source_page        text,
  -- Outcome of the email hop: 'sent' (Resend), 'browser-relay' (no server
  -- mail provider configured — the visitor's browser relayed to FormSubmit,
  -- outcome unknown here), or 'failed: <reason>'. A 'failed' row needs a
  -- manual follow-up — nobody was notified.
  email_status       text NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
