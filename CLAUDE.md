# Kitchen Worktop Experts — project notes for Claude

Marketing site for kitchen worktop supply and fitting (Birmingham). React + Vite, deployed on Vercel to https://www.kitchenworktopexperts.co.uk. The quote form posts leads to the CRM through a Vercel serverless function (`api/leads.js`).

## Google Ads and Google Analytics

Google Ads and Google Analytics (GA4) are two halves of one picture and should be read together. Ads shows what we pay for and which clicks come in. GA4 shows what those visitors do on the site. Use both when pulling metrics; neither is enough alone.

**Identifiers**
- Google Ads account: "Kitchen Worktop Experts", CID 711-039-9164. Same Google login also manages "Quartz Worktop Finder UK" (manager account, 868-054-6592). Do not mix the two.
- GA4 account: "Kitchen Worktop Experts", property 537204141 (full path `a394359177p537204141`).
- GA4 measurement ID is in `.env` as `VITE_GA_MEASUREMENT_ID`. It is set in Vercel too. Not secret, but do not hard-code it elsewhere.

**Current state (as of 2026-11-14)**
- No Google Ads campaigns are running; campaigns are paused or removed.
- No conversion actions exist in Google Ads ("You're not measuring any goals here right now").
- Google Ads ↔ GA4 link status is unverified. Check GA4 Admin → Product links → Google Ads links.

**Form funnel events (what we want to measure)**
The quote form (`src/components/QuoteForm.jsx`) sends these GA events via `react-ga4`:
- `form_started` (category `Lead`): fires once, the first time a material is chosen. This is "how many people start the form".
- `form_step` (category `Lead`): fires when the user leaves a step. `value` is the step number they completed (1 = material, 2 = size, 3 = postcode, 4 = contact). `label` is the step name. "How far they get" = count of `form_step` per `value`, and the step after the last one completed is where they dropped out.
- `form_submitted` (category `Lead`): fires only after the CRM returns 2xx. `label` is the material. This is the conversion.

Note: GA4's report showed `Form_started` and `Form_step` with capital letters, but the code sends lowercase. Confirm the exact event names in GA4 DebugView before building reports or conversions. As of the last check, `form_submitted` had not appeared in the last 7 days, which fits the CRM failures during the proxy rollout. Re-check after the proxy is confirmed working.

**Goal for pulling metrics**
The aim is to answer, from GA4 and Google Ads together:
1. How many people start the quote form (distinct users with `form_started`), split by traffic source (Google Ads vs organic vs direct).
2. How far they get: users reaching each step, and the drop-off between steps.
3. How many complete (`form_submitted`), and the start-to-submit rate.
4. Cost per started form and cost per submitted lead, once Ads is linked and a conversion exists.

Metrics should be pulled from both sides and compared by date range and campaign, not reported from one side only. Click-level data (gclid) only reaches GA4 if auto-tagging is on and the Ads account is linked to the GA4 property.

**Recommended setup (not done yet)**
- Link GA4 property 537204141 to Ads CID 711-039-9164 (GA4 Admin → Product links → Google Ads links → enable auto-tagging).
- Mark `form_submitted` as a key event in GA4, and import it into Google Ads as a conversion (Ads → Goals → Conversions) so Ads optimises for real leads.
- Consider a `form_step` funnel exploration in GA4 for the step-by-step drop-off view.

**How Claude should pull these metrics**
- Preferred: GA4 Data API and Google Ads API, once credentials exist (service account for GA4; developer token + OAuth for Ads). Neither is set up yet.
- Current fallback: the browser (Claude in Chrome) while signed in to the Google account. Read-only unless the user approves a change. Do not enter passwords; the user signs in themselves.
- Before changing any Ads or GA setting (linking, conversions, auto-tagging, key events), confirm with the user first. These affect live billing and tracking.

## CRM lead flow

- Client posts to same-origin `/api/leads` (`src/components/QuoteForm.jsx`).
- `api/leads.js` forwards to the CRM using server-side env vars `CRM_API_URL` and `CRM_API_KEY` (Vercel production). The CRM key must never be in client code or the `VITE_` env prefix.
- The CRM returns 201 with the created lead for a valid POST. Test leads created during debugging ("TEST Lead Delete Me", ids around 43) should be deleted from the CRM.

## Deployment

- Vercel project `kitchen-worktop-experts-v2-0`. Deploy with `npx vercel --prod --yes` from this folder.
- Git: `origin/main` on https://github.com/Mimorozu/kitchen-worktop-experts-V2.0. Commit and push only when the user asks.
- The dev server (`npm run dev`) does not run `/api/leads`; use `vercel dev` to test the form locally.

## Security

Adapted from The Slab Exchange CLAUDE.md. This site has no user accounts, so the auth and ownership rules there do not apply.

- `/api/leads` is the only public write endpoint. It is rate limited to 10 requests per IP per minute (429 with `Retry-After`). The limit is per serverless instance; add a Vercel Firewall rate limit rule for a limit across instances.
- `api/leads.js` validates every field before forwarding: name length, email, UK postcode, phone, and allowed values for `material` and `size`. It trims and uppercases the postcode, drops unknown fields, sets `source` to `Website`, and rejects invalid data with 400. Body size is capped at 2,000 characters.
- Secrets (`CRM_API_KEY`, `CRM_API_URL`) live in Vercel server env only. Never use a `VITE_` prefix for them and never import them into client code.
- Before each push, scan the changed files for keys and tokens. `.env` and `.env.local` are gitignored and untracked; keep it that way.
- HTTPS is enforced by Vercel. Log API errors and unusual request patterns from `/api/leads`.

## Performance under heavy traffic

- The site is static and served from the Vercel CDN. Keep it that way: cache anything that rarely changes (guides, materials, gallery data).
- Serve compressed images. Use WebP where possible. The brief suggests Cloudflare for this; Cloudinary is already configured (`VITE_CLOUDINARY_*`), so check which is in use before adding another.
- There is no database here, so index rules do not apply unless one is added.

## Working conventions

- Enforce rules on the server, not only in the UI.
- Keep code comments brief and useful: explain what or why, not what the line already says.
- Ask before adding a major dependency or changing a rule in this file.
- Not carried over from The Slab Exchange: marketplace rules, Stripe, Prisma, the marketplace colour tokens and mobile nav. This site has its own design.
