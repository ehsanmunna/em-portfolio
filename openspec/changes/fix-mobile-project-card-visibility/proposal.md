## Why

On mobile viewports the "API Gateway Microservice" card in "My Recent Works" shows its image but the content below it (category, title, description, tags) is not visible, so visitors cannot read the third project on phones.

## What Changes

- Fix the mobile (`max-width: 760px`) styling of the last project card so its `.project-info` content renders below the image instead of being clipped or pushed out of view.
- Preserve the existing desktop 3-column grid and the tablet 2-column layout with full-width last card.
- Add a regression check that all three project cards expose their post-image content at mobile width.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `portfolio-experience`: Require every project card's post-image info to remain visible and stacked below its image on mobile viewports.

## Impact

- Affected code: `client/src/app/globals.css` (responsive project-card rules), possibly `client/src/components/portfolio-sections.tsx` only if markup needs a structural fix.
- No content, API, or dependency changes; desktop and tablet layouts unchanged in intent.
- Risk: low; CSS-only fix scoped to the mobile breakpoint.

## Assumptions

- Suspected cause is the tablet (`max-width: 1120px`) rule for `.project-card:last-child .project-image-wrap` (`height: 100%`) leaking into the mobile breakpoint, where it combines with `overflow: hidden` on the card and hides `.project-info`; to be confirmed during apply with a mobile-viewport check.
