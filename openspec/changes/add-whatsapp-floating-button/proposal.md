## Why

Portfolio visitors often prefer WhatsApp for quick inquiries over filling a contact form. A persistent floating WhatsApp button gives a one-tap path to start a conversation from any section.

## What Changes

- Add a floating WhatsApp action button fixed to the bottom-right of the viewport, visible site-wide.
- Link the button to a configurable WhatsApp number via `wa.me` with an optional prefilled message, opening in a new tab.
- Make the number/message configurable from portfolio/site config without hardcoding in the component.
- Keep the button accessible (label, keyboard focus, sufficient contrast) and non-intrusive on mobile and desktop.

## Capabilities

### New Capabilities

- `whatsapp-floating-button`: Persistent floating button that opens a WhatsApp chat with the portfolio owner using a configured number and prefilled message.

### Modified Capabilities

None.

## Impact

- `client/` layout (`src/app/layout.tsx` or page shell) to render the button site-wide, new button component, site/portfolio config for WhatsApp number and default message, and styles for floating bottom-right placement.
- No backend, API, or env-file changes expected; uses public `wa.me` link only.
