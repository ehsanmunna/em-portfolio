## Context

See `proposal.md` for motivation and `specs/whatsapp-floating-button/spec.md` for the behavior contract. The client is Next.js 16 + React 19 with a config-driven portfolio (`src/config/portfolio.ts`, `src/config/site.ts`). Site chrome is composed in `src/app/page.tsx` (`SiteHeader` / sections / `SiteFooter`) inside `src/app/layout.tsx`. Social icons use `react-icons/fa6` via `src/components/icons.tsx`; no WhatsApp entry exists yet.

## Goals / Non-Goals

**Goals:**
- Render one floating WhatsApp entry point fixed bottom-right, visible on all routes without layout shifts.
- Build the `wa.me` link from config (E.164 digits + optional prefilled text) with correct encoding and safe new-tab attributes.
- Match the existing icon/config patterns and keep the button accessible and mobile-safe.

**Non-Goals:**
- Embedded chat widget, unread badges, online-status, or message history.
- Backend proxy, analytics events, or per-page visibility rules.
- Changing contact form, social links, or theme tokens beyond the button's own styles.

## Decisions

1. **New `WhatsappFloat` client component rendered site-wide.** Render in `RootLayout` (or `page.tsx` alongside header/footer if layout must stay server-only) so it persists across sections. Chosen over placing it inside `ContactSection` so it is visible from hero/services/portfolio without scrolling. Alternative of duplicating per-section was rejected to avoid multiple tab stops.

2. **Config in `portfolioContent.contact.whatsapp` (`number`, `defaultMessage`, `label`).** Keeps owner number/message editable without code changes, consistent with existing contact/socials config. Number stored as digits-only E.164 (e.g. `8801XXXXXXXXX`); component strips non-digits defensively. `defaultMessage` URL-encoded via `encodeURIComponent` only when non-empty.

3. **Icon via `react-icons/fa6` (`FaWhatsapp`), fallback to Lucide `MessageCircle`.** Matches `SocialIcon` pattern and avoids a new dependency. WhatsApp brand green `#25D366` for the affordance with white glyph, circular 56px target, shadow, hover lift + focus-visible outline.

4. **Placement `position: fixed; right: 1.25rem; bottom: 1.25rem;` with `safe-area-inset` and high `z-index` below header overlay if needed.** Keeps it clear of submit buttons and footer links; add `aria-label` (configurable, default "Chat on WhatsApp"), `target="_blank"`, `rel="noopener noreferrer"`.

## Risks / Trade-offs

- **Placeholder number ships if owner number unknown** → Mitigation: default config to empty and render nothing when number missing; document where to set it.
- **Brand green vs. dark theme contrast** → Mitigation: white glyph on `#25D366` passes contrast; keep focus ring using theme accent.
- **Overlap with mobile browser UI / cookie banners** → Mitigation: safe-area padding and modest size; verify on 360px width.
- **Prefilled message encoding edge cases (emoji, newlines)** → Mitigation: single `encodeURIComponent` path covered by unit test.

## Migration Plan

1. Add config + component + styles; render site-wide behind no flag.
2. Verify desktop/mobile placement, keyboard focus, and `wa.me` URL in dev and production build.
3. Rollback: remove the single render call (or set number empty to hide).

## Open Questions

None. Owner WhatsApp number and default greeting are deployment inputs, not design unknowns.
