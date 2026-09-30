## Why

The header logo currently renders full-bleed at 40px with no breathing room. Displaying it at 32px with 8px padding gives the mark proper spacing inside its tile.

## What Changes

- Size the header logo image (`.brand-image`) to 32px with 8px padding on desktop.
- Keep the logo asset, alt text, brand name, home link, tile styling (radius, background), and the "EM" text fallback unchanged.
- Keep a slightly smaller presentation on mobile, consistent with the existing desktop/mobile step-down.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `portfolio-visuals`: Header brand logo renders at 32px with 8px padding instead of full-bleed 40px.

## Impact

- Affected code: `client/src/app/globals.css` (brand-image sizing rules, desktop + mobile breakpoint), possibly the Next.js `Image` width/height props in `client/src/components/site-header.tsx` to match the 32px render size.
- No asset, content, API, or dependency changes.

## Assumptions

- "32px and padding 8px" means the logo image displays at 32×32 with 8px padding around it (48px total tile on desktop, given the global `border-box` sizing).
- The 8px padding applies to the logo image only; the "EM" text fallback mark keeps its current sizing.
- Mobile keeps the existing step-down pattern (slightly smaller than desktop); exact mobile values are set during apply and checked visually.
