## Context

See `proposal.md` Why. Current state in `client/src/app/globals.css`: the tablet query (`max-width: 1120px`) restyles `.project-card:last-child` into a 2-column grid with `.project-image-wrap { height: 100%; aspect-ratio: auto; }`. The mobile query (`max-width: 760px`) resets the card to `display: block` with `aspect-ratio: 1.6` on the image wrapper but does not reset `height: 100%`. Since both queries match at phone widths and the card has `overflow: hidden`, the leftover height rule is the prime suspect for the third card's post-image content being clipped. Markup in `ProjectsSection` renders all cards identically, so a CSS-scoped fix should suffice. Constraint: desktop 3-column and tablet presentations must not change.

## Goals / Non-Goals

**Goals:**
- Make the last project card stack image-then-info on mobile with nothing clipped.
- Keep the fix scoped to the mobile breakpoint so tablet/desktop rendering is untouched.

**Non-Goals:**
- No redesign of the projects grid, no content or image changes, no new breakpoints or dependencies.

## Decisions

- **Reset the leaking tablet rule inside the mobile query (e.g. `height: auto` on the last card's image wrapper) over restructuring markup:** the markup is uniform across cards and the bug affects only `:last-child` at phone widths, which points at cascading breakpoint rules rather than structure; alternative of changing `ProjectsSection` markup rejected unless the mobile-viewport check disproves the CSS hypothesis.
- **Verify with a real mobile-viewport render (DevTools responsive mode or equivalent) rather than code inspection alone:** clipping/overflow behavior depends on how the browser resolves percentage heights against `aspect-ratio`, so visual confirmation at ~375px plus tablet/desktop spot-checks is the acceptance gate; alternative of unit tests alone cannot observe this CSS interaction.
- **Extend the existing `ProjectsSection` test only with an assertion that is meaningful without layout (e.g. all cards render info content), and rely on the manual viewport check for visibility:** jsdom does not apply media-query layout, so automated tests can guard content presence while the viewport check guards visibility.

## Risks / Trade-offs

- [Risk] Root cause differs from the suspected `height: 100%` leak (e.g. image aspect or Next.js Image sizing) → Mitigation: confirm in the mobile-viewport check first and adjust the scoped rule accordingly; no markup change until confirmed.
- [Risk] Touching the shared mobile query affects other grids → Mitigation: scope selectors to the last project card's image wrapper only and spot-check services/certifications grids at phone width.
- [Risk] Fix verified only at one phone width → Mitigation: check at least 360–390px wide plus one tablet and one desktop width.

## Migration Plan

- No migration. CSS-only change; deploy client normally. Rollback: revert the mobile-query rule.
