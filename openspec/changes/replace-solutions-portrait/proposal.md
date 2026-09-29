## Why

The solutions section currently references the previous portrait image. Replacing it with `solutions-wriented-cartton.jpg` ensures the portfolio displays the requested image variant.

## What Changes

- Update the solutions section portrait reference from `/images/solutions-portrait.jpg` to `/images/solutions-wriented-cartton.jpg`.
- Preserve the existing alt text and presentation behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This asset-reference change does not alter system requirements; `skip_specs: true` is declared for this change.

## Impact

- `client/src/config/portfolio.ts`: solution portrait configuration.
- `client/public/images/solutions-wriented-cartton.jpg`: existing target asset.
