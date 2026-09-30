## Context

See `proposal.md` Why. Current state: `client/src/components/clarity-analytics.tsx` renders banner body "We use Microsoft Clarity to understand visits (clicks, scrolls) and improve usability. It runs only if you accept." inside `.clarity-banner-text`, with `Current choice: ${status}.` appended when settings are re-opened. Consent flow, storage, loader, and footer re-open event (`clarity:open-settings`) already exist per `add-microsoft-clarity`. Constraint: copy-only change, no behavior or styling change.

## Goals / Non-Goals

**Goals:**
- Replace banner body copy with the exact approved string while preserving title, controls, persistence, and accessibility.

**Non-Goals:**
- No change to consent logic, storage key, Clarity loader lifecycle, styling, translations, or privacy semantics.
- No new components, dependencies, or env variables.

## Decisions

- **Direct string replacement in `clarity-analytics.tsx` over configurability:** single static copy change needs no prop, i18n key, or CMS field; alternative config-driven copy adds indirection for one sentence.
- **Keep `Current choice: ${status}.` suffix and all aria/role attributes unchanged:** preserves settings re-open clarity and screen-reader behavior; alternative of folding choice into new copy rejected to minimize scope.
- **Update `clarity-analytics.test.tsx` only if it asserts old wording:** keeps test aligned with spec scenario; no new test harness needed.

## Risks / Trade-offs

- [Risk] Copy omits explicit "Microsoft Clarity" vendor name while Learn-more links to clarity.microsoft.com → Mitigation: brand remains one click away; note in review if legal/privacy wants vendor name retained.
- [Risk] Exact-string test becomes brittle → Mitigation: assert single canonical string from spec scenario.

## Migration Plan

- No migration. Deploy client normally. Rollback: revert string.
- Stored consent keys unaffected.

## Open Questions

- None.
