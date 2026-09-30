## Why

The site header brand currently renders plain "EM" text because no logo image is configured. Using the existing `em-logo-32.png` asset gives the header a proper branded mark.

## What Changes

- Point the header brand logo at the existing `/images/em-logo-32.png` asset so the header renders the image instead of the "EM" text mark.
- Keep the brand name, home link, alt text, and existing brand sizing/styling unchanged.

## Capabilities

### New Capabilities
- `portfolio-visuals`: Header brand renders the configured logo image asset instead of the text mark.

### Modified Capabilities
- None.

## Impact

- Affected code: `client/src/config/site.ts` (logo source), rendering via `client/src/components/site-header.tsx` `Brand` (no structural change expected).
- Uses the existing asset at `client/public/images/em-logo-32.png`; no new files, API, or dependency changes.

## Assumptions

- The request's "public/image folder" refers to the existing `client/public/images/em-logo-32.png` asset, which already exists on disk.
- The existing 40px brand box and alt text ("Ehsan Munna") are kept; the file name suggests a 32px source, and sharpness is checked during apply.
