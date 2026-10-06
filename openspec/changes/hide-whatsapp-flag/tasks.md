## 1. Config Changes

- [x] 1.1 Add `showWhatsapp: boolean` to the `WhatsappContact` type in `client/src/config/portfolio.ts`
- [x] 1.2 Set `showWhatsapp: false` in the `portfolioContent.contact.whatsapp` config object

## 2. Layout Changes

- [x] 2.1 Import `portfolioContent` in `client/src/app/layout.tsx` (if not already imported)
- [x] 2.2 Wrap `<WhatsappFloat />` with conditional render: `{portfolioContent.contact.showWhatsapp && <WhatsappFloat />}`

## 3. Verification

- [x] 3.1 Run tests to confirm nothing is broken
- [x] 3.2 Manually verify the WhatsApp button is not visible when flag is `false`
