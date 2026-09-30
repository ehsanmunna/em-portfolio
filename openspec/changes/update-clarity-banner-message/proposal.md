## Why

The current Clarity consent banner says "We use Microsoft Clarity to understand visits (clicks, scrolls) and improve usability. It runs only if you accept." The requested copy shortens this to "We observe to understand visits (clicks, scrolls) and improve usability. It runs only if you accept." — a plainer, less vendor-specific statement of what is observed and that tracking is consent-gated.

## What Changes

- Update the consent banner body text in `ClarityAnalytics` to exactly: "We observe to understand visits (clicks, scrolls) and improve usability. It runs only if you accept."
- Preserve existing banner behavior: title, Accept / Decline / Learn-more controls, consent persistence, consent-gated Clarity load, footer settings re-open, and accessibility attributes.
- Update the component test that asserts banner copy, if it asserts the old wording.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `analytics-clarity`: Update the consent banner messaging requirement to use the requested copy while keeping consent-gated loading and controls unchanged.

## Impact

- Affected code: `client/src/components/clarity-analytics.tsx` (banner copy only), `client/src/components/clarity-analytics.test.tsx` (copy assertion update if present).
- No behavior change: consent flow, storage key (`clarity-consent`), env (`NEXT_PUBLIC_CLARITY_PROJECT_ID`), loader lifecycle, and privacy guarantees unchanged.
- No API/server changes; no DB migration; no new dependencies.
