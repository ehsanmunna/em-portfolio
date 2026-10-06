## Context

The WhatsApp floating button is currently rendered unconditionally in `client/src/app/layout.tsx`. The component (`whatsapp-float.tsx`) already has a self-hide mechanism (returns `null` when the phone number is empty), but there is no dedicated boolean flag for visibility control. The portfolio config (`client/src/config/portfolio.ts`) uses a typed `portfolioContent` object with `satisfies` assertions.

## Goals / Non-Goals

**Goals:**
- Add a `showWhatsapp` boolean flag to the portfolio config, defaulting to `false`
- Conditionally render `<WhatsappFloat />` in the layout based on this flag
- Keep the change minimal and consistent with existing config patterns

**Non-Goals:**
- No env-variable-based flag (keep it config-only for simplicity)
- No changes to the WhatsApp component internals
- No changes to styling or positioning

## Decisions

**Decision: Add `showWhatsapp` to `portfolioContent.contact` in `portfolio.ts`**

The flag lives alongside the existing WhatsApp config (`number`, `defaultMessage`, `label`) rather than at the top level. This keeps related configuration co-located and follows the existing nested structure of `portfolioContent.contact`.

Alternative considered: Top-level `featureFlags` object — rejected because there is only one flag today; a nested structure would be premature abstraction.

**Decision: Conditional render in `layout.tsx`**

The layout already imports and renders `<WhatsappFloat />`. Wrapping it with `{portfolioContent.contact.showWhatsapp && <WhatsappFloat />}` is the simplest approach and keeps the component itself unchanged.

Alternative considered: Adding the check inside `whatsapp-float.tsx` — rejected because the component already has a self-hide mechanism for empty numbers; adding a second hide path would be redundant.

## Risks / Trade-offs

- [Risk] Developer forgets to set flag to `true` when WhatsApp should be visible → Mitigation: default is `false` (hidden), which is the desired temporary state; the flag is easy to flip in config
- [Trade-off] Flag is config-only (not env-based) → requires a rebuild to toggle, but this is acceptable for a temporary hide and keeps the change minimal
