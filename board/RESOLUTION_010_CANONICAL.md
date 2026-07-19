# Resolution #010 — Close ShedReset v4 Envelope

**Status:** APPROVED (canonical)
**Board resolution ID:** `2026-07-19-002`
**Vote tally:** 10 approve · 3 amend · 0 reject
**Emailed:** 2026-07-19 (SMTP delivered)
**Chair adjudication:** 2026-07-19 ~23:59 CEST
**Committed to durable record:** 2026-07-19

## Governance context

Two resolutions were logged to the Board store on 2026-07-19 for the same topic ("Close ShedReset v4 envelope") due to a retry after a transient upstream error on the first convene:

- `2026-07-19-002` (Track A, "Delete track", APPROVED 10/3/0) — **CANONICAL**
- `2026-07-19-003` (Track B, "Note track", AMEND 5/7/0) — **SUPERSEDED / REJECTED IN STORE**

The Chair adjudicated Track A canonical and marked `2026-07-19-003` rejected in the Board store via `POST /board/reject/{id}` with a supersession note. This durable file is the source of truth.

## Board decision (verbatim)

Close ShedReset v4 as complete on cleared Resolution #009 conditions; ringfence 13 hours for infrastructure remediation (8h durable persistence, 4h external monitoring, 1h signup deletion) owned by Byte, and release ~86 hours to founder reserve now — with the ringfenced balance returning only after restart-survival and external-alert acceptance tests pass, not on ticket creation. Delete the nine waitlist signups today without repurposing or migrating them into any future audience. PostPro #2 commercial discovery may run in parallel, but no build or reserve commitment until remediation passes and PostPro has its own approved economics.

## Resolution #009 closure evidence (verified)

### Condition 1 — Consent-box binary check + Path B
- **Binary check:** confirmed the checkbox was storing to backend `/api/admin/stats` (total 8→9 during canary tests)
- **Path B ruling:** Chair chose "remove the CTA before close, defer wiring to v4.1"
- **Live state on `https://shedreset.com/`:** "Waitlist opens soon." static block replaces the form. Copy: *"We haven't started collecting emails yet. When the list is open you'll see the details of what you're signing up for right here. Questions in the meantime? Send a note."*
- **Contact form:** retained as escape hatch (`Send a note` → existing `/api/message` endpoint)
- **Third-party fetch count on live site:** 0 (Statute Gate 5 GREEN)
- **Deploy commit:** `94bba5a` on `chrisbriffa1986-gif/shedreset-site` main
- **Verification timestamp:** 2026-07-19 ~23:37 CEST

### Condition 2 — Transfer acceptance test (Byte, 4-check bar)
- **Method:** clean checkout at `/home/user/workspace/postpro_transfer_test/`, copied ONLY scaffold (`tokens/build.js`, `tokens/tokens.json`, `fonts/*.woff2`, OFL licences). No ShedReset content.
- **Result:** PASS on all four checks
  1. `build.js` byte-identical between source and clean checkout
  2. Zero ShedReset leakage in generated PostPro CSS
  3. PostPro identity present (concept "the room, after the session", accent `#4A6F52`)
  4. Diff 25 lines, localised entirely to semantic + govern layers
- **Scaffold bug fixed on the way:** `govern` block was a shared object leaking "ShedReset" strings into every property's output. Refactored to `_shared` + per-property blocks in `tokens.json`, corresponding logic in `build.js`.
- **Evidence pack:** `/home/user/workspace/postpro_transfer_test/TRANSFER_TEST_EVIDENCE.md`

### Condition 3 — Uptime + cert monitoring
- **Scheduled task:** hourly (05 past the hour), background agent, ID `391cea4c`
- **Checks per run:** apex HTTPS 200, www HTTPS 200/301, TLS `notAfter` parse (WARN <30 days, FAIL <14 days)
- **Pattern:** silent-on-healthy; in-app notification on any FAIL or WARN
- **First-responder:** Chair (single-channel — governance defect flagged by Anchor, remediation queued in Track A action item #5: external dead-man's-switch + named second responder within the 4hr external-monitor ringfence)

### Condition 4 — HTTPS cert auto-renewal
- **GitHub Pages API state:** `approved`, domains `[shedreset.com, www.shedreset.com]`, `https_enforced: true`, expires `2026-10-17`
- **Live probe:** issuer `C=US, O=Let's Encrypt, CN=YR1`, subject `CN=shedreset.com`, valid `Jul 19 18:07:20 2026 GMT` → `Oct 17 18:07:19 2026 GMT`
- **Renewal:** GitHub-managed Let's Encrypt, auto-renews ~30 days before expiry. No manual step.

## Statute consent-review note (dated: 2026-07-19)

**Question ruled on:** Did the superseded consent notice on the waitlist form change the SCOPE of what signups agreed to, or only the CLARITY of the same scope?

**Chair ruling:** **CLARITY** — same purpose, clearer wording.

**Statute finding under CLARITY:**
- No re-permission is legally owed to the 9 stored signups.
- Consent given under the prior notice remains valid on its face.
- Because Track A calls for deletion of the 9 signups today (independent of the consent-scope question), the CLARITY finding does not trigger any customer-facing action. If the Chair had ruled SCOPE, a re-permission action would have been required regardless of deletion — but Track A pre-empts that by deleting the records without contact.
- No customer-facing deletion email is sent (Track A explicit: "without repurposing or contacting them").
- Permitted verb on the 9 records: **none** — they are being deleted, not contacted.

## Budget ledger

- **Envelope opened by Resolution #009:** 8hr verification reserve + ~95hr suspended
- **Verification burn this cycle:** ~4hr (Byte ~1.5hr, Chair ~1hr, monitoring ~0.5hr, board email pipeline fix ~1hr unbudgeted)
- **Resolution #010 ringfence:** 13hr (Byte-owned)
  - 8hr durable persistence (Postgres or reviewed-writepath equivalent)
  - 4hr external monitor outside Railway/watched workspace
  - 1hr signup deletion execution + logging
- **Released to founder unallocated reserve on this gavel:** ~86hr
- **Ringfence release rule:** unspent ringfenced hours return to founder reserve ONLY after acceptance tests pass (restart-survival + deliberate-outage alert to named founder-control). No release on ticket creation.

## Deploy identifiers

- Repo: `chrisbriffa1986-gif/shedreset-site` (GitHub Pages)
- Live URL: `https://shedreset.com/` (CNAME → `chrisbriffa1986-gif.github.io`)
- Backend: `https://shedreset.pplx.app` (site_id `396c54a0-dfa4-4062-be1b-ed309555aaeb`)
- Path B deploy commit: `94bba5a` (v4 Path B: remove live email capture per Board Resolution #009)
- Board convene service: `https://web-production-59335.up.railway.app`

## Fast-follow (queued outside this ringfence)

- SQLite/Postgres durability migration for the Board store itself (Byte, capped fast-follow resolution) — acceptance test: a resolution survives service/store loss and can be restored from backup
- Consumer Validation Sprint on next allocation cycle: capped 12hr, gated on separate resolution

## Signed
- **Chief of Staff** (Chair-delegated), 2026-07-19 ~23:59 CEST
