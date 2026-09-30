## 1. Configuration

- [x] 1.1 Add `NEXT_PUBLIC_CLARITY_PROJECT_ID=` to `client/.env.example` with comment (set before build)
- [x] 1.2 Add `NEXT_PUBLIC_CLARITY_PROJECT_ID` note to root `.env.example` / docs for discoverability
- [x] 1.3 Verify `next build` behavior with missing ID (no-op, dev-only warning, no crash)

## 2. Clarity loader + consent state

- [x] 2.1 Create client-only Clarity loader utility (idempotent inject of `https://www.clarity.ms/tag/<ID>`, guard SSR, guard duplicates, validate ID format)
- [x] 2.2 Create consent state helper (`localStorage` key `clarity-consent`: accepted/declined + timestamp, read/write/clear helpers)
- [x] 2.3 Implement withdraw path (deny consent API where available, remove `_clsk/_clck` cookies + controlled local keys, prevent re-inject)

## 3. Consent UI

- [x] 3.1 Build non-blocking consent banner (Accept/Decline, theme-matched, keyboard-accessible, no focus trap)
- [x] 3.2 Wire banner to loader: Accept persists + loads once, Decline persists + never loads
- [x] 3.3 Add footer/settings "Cookie settings" affordance to re-open and toggle choice, showing current state
- [x] 3.4 Mount banner + loader entry in `client/src/app/layout.tsx` (client boundary, no SSR tracking)

## 4. Verification

- [x] 4.1 Add Vitest coverage: no script before consent, single inject after accept, no-op on missing/invalid ID, revoke clears state
- [x] 4.2 Manual check: first visit banner, accept loads `clarity.ms/tag`, reload no re-prompt, decline/revoke stops tracking
- [x] 4.3 Run `npm run lint`, `npm run test`, `npm run build` in `client/` and fix issues
