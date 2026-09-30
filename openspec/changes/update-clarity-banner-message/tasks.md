## 1. Update consent banner copy

- [x] 1.1 Replace banner body text in `client/src/components/clarity-analytics.tsx` with exactly "We observe to understand visits (clicks, scrolls) and improve usability. It runs only if you accept."
- [x] 1.2 Preserve title, Accept / Decline / Learn-more controls, `Current choice` suffix, aria attributes, and styling
- [x] 1.3 Update `client/src/components/clarity-analytics.test.tsx` copy assertion if it references the old wording

## 2. Verify

- [x] 2.1 Run `clarity-analytics` component tests and `clarity` lib tests in `client/` with no regressions
- [x] 2.2 Manually verify banner shows new copy on first visit, and settings re-open still shows current choice
