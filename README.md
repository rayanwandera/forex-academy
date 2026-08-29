# Pip & Ledger — Forex Trading Academy

A course + referral site: three lessons (forex basics, avoiding scams, using AI in trading),
gated behind a 20,000 UGX one-time Airtel Money payment, with a user dashboard (course +
referral link/count/earnings) and an admin dashboard (confirm payments, mark referral payouts,
view all users).

This is a **separate, independent site** from claude.ai — it's its own codebase you deploy to
your own Netlify account and your own Supabase project.

## How it fits together

- **Netlify** hosts the frontend (a React app) and the backend logic (small serverless
  functions in `netlify/functions/`). Netlify itself has no database.
- **Supabase** is the backend-as-a-service that gives you the database, and handles user
  login/signup (email + password) with row-level security so users can only ever see their
  own data, and admins can see everything.
- **Payments run manually by default.** The user sends 20,000 UGX via Airtel Money straight
  to your own number, then submits the phone number they paid from (plus an optional
  transaction reference) through the site. You confirm it in **Admin → Payments** with one
  click, which unlocks their course and credits their referrer. Nothing here ever asks
  anyone for a PIN. Automatic confirmation via the Airtel Money Open API can be wired in
  later — see "Switching to automatic Airtel payments" near the bottom of this file — but
  it isn't required to launch.

```
Browser (React) ──> Supabase (auth + database, direct from browser, protected by RLS)
       │
       └──> Netlify Functions (secrets live only here)
                 │
                 └──> submit-payment-claim.js (records a pending payment — no external call)
                 └──> admin-confirm-payment.js (you click "Confirm payment" in Admin)
```

## 1. Create the Supabase project

1. Go to supabase.com → New project. Pick a name/region (e.g. closest to Uganda) and a
   database password (save it somewhere safe).
2. Once it's ready, open **SQL Editor** and paste in the entire contents of
   `supabase/schema.sql` from this repo, then run it. This creates the `profiles`,
   `payments`, and `referral_earnings` tables, the referral-code trigger, and all the
   row-level security policies.
3. Go to **Project settings → API**. You'll need three values later:
   - `Project URL` → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret — Netlify Functions only,
     never put this in a `VITE_` variable or commit it anywhere)
4. Go to **Authentication → Providers** and make sure **Email** is enabled. For a faster
   start you can turn off "Confirm email" in Authentication → Settings while testing, and
   turn it back on before going live.

## 2. Set your payment number

Open `src/data/courses.js` and update `MERCHANT_PHONE_DISPLAY` to your real Airtel Money
number — this is the number shown to users on the payment screen and is purely display text,
no API keys needed for this step.

## 3. Configure environment variables

Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
```

Fill in the Supabase values from step 1. The Airtel-related variables in `.env.example` are
only needed later if you switch on automatic confirmation (see the bottom of this file) —
leave them blank for now.

## 4. Run it locally

```bash
npm install
npm install -g netlify-cli   # if you don't already have it
netlify dev
```

`netlify dev` runs the React app and the serverless functions together on
`http://localhost:8888`, which is what you want (plain `npm run dev` only runs the frontend,
so payments won't work there).

## 5. Make your own account an admin

1. Sign up for an account through the running site like any normal user.
2. In Supabase → Authentication → Users, copy your user's UUID.
3. In Supabase → SQL Editor, run:
   ```sql
   update public.profiles set is_admin = true where id = 'PASTE-YOUR-UUID-HERE';
   ```
4. Log out and back in — you'll now land on `/admin` instead of `/dashboard`.

## 6. Deploy to Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
   Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. In **Site settings → Environment variables**, add the `VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` values from
   your `.env` file.
4. Deploy. Your site is now live and can accept manually-confirmed payments.

## Payment flow, end to end (manual, default)

1. Signed-up user without `is_paid = true` sees the "Unlock the full course" card showing
   your Airtel Money number, and sends the money themselves through their own Airtel Money
   app or `*185#`.
2. They enter the phone number they paid from (and optionally a transaction reference) and
   click "I've sent the payment." `submit-payment-claim` records a `pending` row in
   `payments` — no external API call happens here.
3. You open **Admin → Payments**, check it against your own Airtel Money SMS/app history,
   and click **Confirm payment**. `admin-confirm-payment` flips the payment to `successful`,
   sets `profiles.is_paid = true`, and — if the user signed up via a referral link — creates
   a `pending` row in `referral_earnings` crediting the referrer 5,000 UGX.
4. The user refreshes their dashboard and the course is unlocked.

## Switching to automatic Airtel payments later

This project still includes `initiate-payment.js`, `check-payment-status.js`, and
`airtel-callback.js` for the Airtel Money Open API "Request to Pay" flow (push a USSD PIN
prompt straight to the customer's phone, confirmed automatically). They're just not wired
into the UI by default. To turn them on once you've got Airtel production access:

1. Follow "Sign up for Airtel Money Open API access" — register as a developer, add the
   **Merchant Collection** product, and register your business as a merchant (get a
   `relationship_id`) via a one-time API call (ask me for the exact request if you get here).
2. Fill in `AIRTEL_CLIENT_ID`, `AIRTEL_CLIENT_SECRET`, `AIRTEL_CALLBACK_SECRET`, and
   `AIRTEL_MERCHANT_RELATIONSHIP_ID` in your environment variables.
3. In `src/pages/Payment.jsx`, swap the manual "send money yourself" form back for one that
   calls `/.netlify/functions/initiate-payment` and polls `/.netlify/functions/check-payment-status`
   (this is exactly what an earlier version of this file did — ask me to restore it).
4. Set your callback URL in the Airtel portal to:
   `https://YOUR-SITE.netlify.app/.netlify/functions/airtel-callback?token=YOUR_CALLBACK_SECRET`
5. Double-check `getAirtelTransactionStatus` in `netlify/functions/_lib.js` against the
   **Payment enquiry** page in Airtel's docs — that field mapping is a best guess until
   confirmed against the real docs for your account.

## About referral payouts

The site **tracks** what you owe each referrer (visible on their dashboard and in
**Admin → Referrals**), but it does not automatically send them money — Airtel's
*disbursement* (sending money out) product is a separate approval from *collections*
(receiving money), and most merchants start with collections only. When you're ready to pay a
referrer, send it via Airtel Money yourself and click **Mark as paid** in the admin panel.

## Security notes

- The site never asks anyone to type a mobile money PIN into a web page. If you ever see a
  form field asking for a PIN in a fork of this code, that's a red flag — remove it.
- `SUPABASE_SERVICE_ROLE_KEY` and the Airtel secrets must only ever live in Netlify's
  environment variables, never in a `VITE_`-prefixed variable, never in a file you commit.
- Row-level security in `schema.sql` means even the public `anon` key can't read another
  user's payments, phone number, or referral earnings — only their own, or everything if
  their profile is flagged `is_admin`.

## What's not included (possible next steps)

- SMS/email notifications when a payment or referral payout completes.
- Multi-provider payments (MTN MoMo) — the same pattern in `netlify/functions/_lib.js` can be
  duplicated for MTN's Collections API if you expand later.
- Automated referral disbursement via Airtel's Disbursement API, once you have that approval.
