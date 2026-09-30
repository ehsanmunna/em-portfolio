## 1. Size the logo with padding

- [x] 1.1 Split `.brand-image` sizing out of the shared brand rule in `client/src/app/globals.css`: 48px box with 8px padding on desktop (32px image), keeping `.brand-mark` at its current size
- [x] 1.2 Step the mobile (`max-width: 760px`) `.brand-image` tile down to a 44px box with 8px padding, leaving other mobile header rules untouched
- [x] 1.3 Update the Next.js `Image` props in `client/src/components/site-header.tsx` `Brand` to `width={32} height={32}`, with no other markup or style changes

## 2. Verify

- [x] 2.1 Run the client test suite and typecheck with no regressions
- [x] 2.2 Visually verify the logo shows at 32px with even 8px padding inside its tile at desktop and mobile widths, with header alignment, brand name, link, and alt text unchanged
