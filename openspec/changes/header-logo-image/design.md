## Context

See `proposal.md` Why. Current state: `siteConfig.logo.src` is `null`, so `Brand` in `client/src/components/site-header.tsx` renders the `brand-mark` span with "EM" text. The component already supports an image path via Next.js `Image` with the `brand-image` class (40px box, `object-fit: cover`). The asset `client/public/images/em-logo-32.png` exists. Constraint: keep brand name, home link, alt text, and sizing/styling unchanged.

## Goals / Non-Goals

**Goals:**
- Render the logo image in place of the "EM" text through the existing config-driven branch, with no markup or style changes.

**Non-Goals:**
- No redesign of the header, no new assets, no alt-text or sizing changes.

## Decisions

- **Set `logo.src` to `/images/em-logo-32.png` in `client/src/config/site.ts` over hardcoding the path in the header component:** follows the existing config-driven pattern (`siteConfig` already owns the mark/alt) and needs no `site-header.tsx` change; alternative of a hardcoded `src` in the component rejected to keep brand content in config.
- **Keep the existing 40px render box and check sharpness during apply over resizing to 32px:** the `brand-image` style already handles the box consistently with the old mark; a 32px source upscaled to 40px may soften slightly, so visual check decides whether to keep it or adjust — no layout change either way.

## Risks / Trade-offs

- [Risk] 32px source rendered at 40px looks soft → Mitigation: visual check during apply; keep as-is if crisp, otherwise size the image box to the asset.
- [Risk] Missing/renamed asset breaks the brand image → Mitigation: asset verified on disk at planning time; Next.js build fails loudly on a missing local image.

## Migration Plan

- No migration. Config-only change; deploy client normally. Rollback: revert `logo.src` to `null`.
