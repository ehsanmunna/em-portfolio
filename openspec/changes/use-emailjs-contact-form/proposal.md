## Why

The current contact flow requires running, configuring, and securing a backend SMTP path (Nodemailer, credentials, CORS allowlist, rate limiting) just to deliver a portfolio inquiry. Using EmailJS directly from the browser removes that operational burden and lets the static Next.js form send email without an Express dependency.

## What Changes

- Send contact inquiries directly from the Next.js contact form through EmailJS using public service/template/key configuration.
- Replace the `fetch POST /api/contact` submit flow with an EmailJS send call while keeping pending, success, and failure states.
- **BREAKING** Remove the public `POST /api/contact` endpoint and its validation, CORS, and rate-limit handling from the Express API.
- **BREAKING** Remove Nodemailer, the server `contact-mailer` module, and SMTP/recipient/origin settings (`SMTP_*`, `CONTACT_TO`, `MAIL_FROM`, contact `ALLOWED_ORIGINS` wiring) from server config, examples, and Compose.
- Replace client `NEXT_PUBLIC_API_BASE_URL` contact wiring with public EmailJS settings (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`).
- Update client tests and docs for the EmailJS flow; remove server contact endpoint tests.

## Capabilities

### New Capabilities
- `emailjs-contact-form`: Browser contact form validates input and delivers inquiries directly through EmailJS with clear pending, success, and failure states.

### Modified Capabilities

None.

## Impact

- `client/` contact form (`contact-form.tsx`), its Vitest coverage, client env example, and client docs.
- `server/` Express app (`server.js`), `contact-mailer.js`, `openapi.json` contact route if present, server tests, Nodemailer/rate-limit/CORS dependencies where contact-only, server env examples, and root `.env.example`.
- `docker-compose.yml` contact-related environment passthrough.
- Deployment: EmailJS service/template/public-key setup replaces SMTP credential and allowed-origin setup for contact delivery.
