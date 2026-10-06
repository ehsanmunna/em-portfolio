## Why

The WhatsApp floating button is currently always visible on the site. There is no way to temporarily hide it without removing the component or clearing the phone number. A configurable flag is needed to control visibility.

## What Changes

- Add a `showWhatsapp` boolean flag to the portfolio config, defaulting to `false`
- Conditionally render the `<WhatsappFloat />` component based on this flag
- When `false`, the WhatsApp button is not rendered anywhere on the site

## Capabilities

### New Capabilities
- `whatsapp-visibility`: Feature flag controlling whether the WhatsApp floating button is displayed

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- `client/src/config/portfolio.ts` — add `showWhatsapp` flag to config
- `client/src/app/layout.tsx` — conditionally render `<WhatsappFloat />` based on flag
- No API or dependency changes
