## 1. Reproduce and fix

- [x] 1.1 Reproduce at a mobile viewport (~375px) that the "API Gateway Microservice" card shows its image but its post-image content is not visible
- [x] 1.2 Scope the fix to the mobile breakpoint in `client/src/app/globals.css` so the last project card stacks image-then-info with nothing clipped (reset the leaking tablet image-wrapper height rule), leaving tablet/desktop rules untouched
- [x] 1.3 Extend `client/src/components/portfolio-sections.test.tsx` to assert all three project cards render their post-image content (category, title, description, tags)

## 2. Verify

- [x] 2.1 Run the client portfolio-sections tests with no regressions
- [x] 2.2 Verify at 360–390px widths that all three cards show image plus info, and spot-check one tablet and one desktop width for unchanged layouts
