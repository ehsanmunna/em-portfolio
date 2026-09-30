## 1. Point the brand at the logo asset

- [x] 1.1 Set `logo.src` to `/images/em-logo-32.png` in `client/src/config/site.ts`, keeping the existing mark and alt values as fallback/meta
- [x] 1.2 Confirm `Brand` in `client/src/components/site-header.tsx` renders the image branch with no markup or style changes

## 2. Verify

- [x] 2.1 Run the client test suite and typecheck with no regressions
- [x] 2.2 Visually verify the header shows the logo image (crisp at the 40px brand box), the "EM" text is gone, and brand name, home link, and alt text are unchanged
