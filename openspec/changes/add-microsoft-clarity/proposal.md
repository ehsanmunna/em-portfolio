## Why

Portfolio has no behavioral analytics; we cannot see rage clicks, dead clicks, scroll depth, or session replays to improve UX. Microsoft Clarity provides privacy-friendly session analytics and heatmaps, but it must only run after explicit user consent and must be configurable per environment via `.env`.

## What Changes

- Add Microsoft Clarity loader gated behind explicit user consent (accept/decline banner, persisted choice, no tracking before consent).
- Read Clarity Project ID from env (`NEXT_PUBLIC_CLARITY_PROJECT_ID` in `client/`); never hardcode the ID; skip loading with a dev warning when missing/invalid.
- Inject official Clarity script (`https://www.clarity.ms/tag/<ID>`) once after consent, client-side only, with idempotent init and withdraw support (disable + remove cookies/local state on decline/revoke).
- Add consent UI (banner + re-open via footer/settings affordance) matching existing dark theme, accessible and non-blocking.
- Update `client/.env.example`, root `.env.example` docs, and client README env notes.

## Capabilities

### New Capabilities
- `analytics-clarity`: consent-gated Microsoft Clarity analytics — consent capture/persistence, env-configured project ID, script load/unload lifecycle, no-track default.

### Modified Capabilities
- None.

## Impact

- Affected code: `client/src/app/layout.tsx` (mount point), new `client/src/components/clarity-*` + consent banner, `client/next.config.ts` (no change expected), `client/.env.example`, root `.env.example` docs.
- No API/server changes; no DB migration; no new npm dependencies (vanilla script injection).
- Privacy: default opt-out, consent persisted in `localStorage`, Clarity cookies only after accept; must document in privacy note/footer.
