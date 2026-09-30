## Context

See `proposal.md` Why. Current state in `client/src/app/globals.css`: `.brand-mark, .brand-image` share a 40px box (36px in the `max-width: 760px` query), and `.brand-image` adds `object-fit: cover` so the logo fills the tile edge-to-edge. The Next.js `Image` in `Brand` uses `width={40} height={40}`. The global `box-sizing: border-box` means declared width/height include padding. Constraint: the 8px padding applies to the logo image only; the "EM" text fallback keeps its current box.

## Goals / Non-Goals

**Goals:**
- Render the logo at 32px with 8px padding on desktop and a slightly smaller tile on mobile, with no other header changes.

**Non-Goals:**
- No asset, alt-text, brand-name, link, radius, or background changes; no change to the text fallback sizing.

## Decisions

- **Split `.brand-image` sizing out of the shared `.brand-mark, .brand-image` rule and give it a 48px box with 8px padding (32px content) on desktop:** under `border-box` this yields exactly the requested 32px image + 8px padding; alternative of `width: 32px` plus padding would shrink the visible image to 16px and is rejected.
- **Step the mobile tile down to a 44px box with the same 8px padding (28px content):** preserves the existing 4px desktop→mobile step-down pattern (40→36 today); alternative of leaving mobile at 36px would squeeze the logo to 20px content and is rejected.
- **Update the Next.js `Image` props to `width={32} height={32}`:** keeps the intrinsic size hint aligned with the rendered content box and avoids a 40px intrinsic image being downscaled needlessly; layout stays CSS-driven either way.

## Risks / Trade-offs

- [Risk] The 8px padding ring shows the accent tile background around the logo → Mitigation: this matches the existing tile treatment (background already behind the image box); confirm visually during apply and flag if a transparent tile is preferred.
- [Risk] Larger 48px tile shifts header alignment → Mitigation: header uses flex with centered items; visual check at desktop and mobile widths during apply.

## Migration Plan

- No migration. CSS + props-only change; deploy client normally. Rollback: revert the sizing rules and props.
