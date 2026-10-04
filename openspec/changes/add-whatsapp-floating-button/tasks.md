## 1. Configure WhatsApp contact

- [x] 1.1 Add `whatsapp` (`number`, `defaultMessage`, `label`) to `portfolioContent.contact` in `client/src/config/portfolio.ts` with types.
- [x] 1.2 Build the `wa.me` URL helper with digit sanitizing and `encodeURIComponent` message handling; return null when number is missing.

## 2. Build and place the floating button

- [x] 2.1 Create `WhatsappFloat` client component using `FaWhatsapp` with `aria-label`, `target="_blank"`, `rel="noopener noreferrer"`, and 56px circular affordance.
- [x] 2.2 Add fixed bottom-right styles with safe-area padding, shadow, hover lift, and visible focus state; verify no overlap on 360px mobile and desktop.
- [x] 2.3 Render `WhatsappFloat` site-wide from `RootLayout` (or `page.tsx` shell) and hide when number is unconfigured.

## 3. Verify the change

- [x] 3.1 Add Vitest coverage for `wa.me` URL building, new-tab attributes, accessible name, and hidden-when-unconfigured state.
- [x] 3.2 Run client tests, lint, and production build; manually verify placement, focus, and chat URL on desktop and mobile widths.
