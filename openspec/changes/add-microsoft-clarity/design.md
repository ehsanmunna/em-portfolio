## Context

See `proposal.md` Why. Current state: Next.js 16 App Router client (`client/src/app/layout.tsx`), no analytics, no consent/cookie UI, env via `NEXT_PUBLIC_API_BASE_URL` in `client/.env.example`. Constraints: static/client deployment, `NEXT_PUBLIC_*` required for browser access, no new backend, privacy default opt-out.

## Goals / Non-Goals

**Goals:**
- Consent-first Clarity with persisted accept/decline and revoke path.
- Env-driven Project ID (`NEXT_PUBLIC_CLARITY_PROJECT_ID`), safe no-op when missing.
- Idempotent client-only loader + accessible banner matching dark theme.

**Non-Goals:**
- Custom analytics pipeline, A/B testing, or server-side event forwarding.
- Granular per-purpose consent categories beyond analytics accept/decline.
- Auto-blocking of other third-party scripts (none exist today).

## Decisions

- **Vanilla script injection (`https://www.clarity.ms/tag/<ID>`) in a small client component over `next/third-parties`:** zero new dependency, full control over consent timing and withdraw; alternative `@microsoft/clarity` npm package adds weight without benefit.
- **Env name `NEXT_PUBLIC_CLARITY_PROJECT_ID`:** follows existing `NEXT_PUBLIC_API_BASE_URL` pattern; documented in `client/.env.example` (authoritative) + root `.env.example` note; alternative server-only var would be invisible to browser.
- **Persist in `localStorage` key `clarity-consent` (`accepted`/`declined` + timestamp):** survives reloads, simple, no server cookie needed; alternative cookie would require server parsing for no benefit.
- **Banner + footer "Cookie settings" affordance:** non-blocking bottom banner on first visit; persistent footer entry to re-open; alternative blocking modal rejected for UX.
- **Withdraw = set `clarity` consent API to deny where available + remove `_cl*` cookies/local keys it controls + prevent reload of script:** best-effort stop; full historical deletion stays in Clarity dashboard.

## Risks / Trade-offs

- [Risk] Clarity script sets its own cookies after accept → Mitigation: never load before accept, disclose in privacy note, provide revoke that clears client-side `_clsk/_clck` where accessible.
- [Risk] Ad-blockers prevent load → Mitigation: silent no-op, no broken UI, guard `window.clarity` calls.
- [Risk] Duplicate init on SPA navigation → Mitigation: module-level guard + check for existing script tag by ID before inject.
- [Risk] Missing env in prod build bakes empty ID → Mitigation: build-time docs + runtime guard + dev warning; document `set before building the client`.

## Migration Plan

- Additive only, default off: no migration.
- Deploy: set `NEXT_PUBLIC_CLARITY_PROJECT_ID` before `next build`, redeploy client.
- Rollback: unset env or revert components; stored user consent keys become inert.

## Open Questions

- None blocking. Copy review for banner/privacy wording can happen during apply.
