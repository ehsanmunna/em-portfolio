## 1. Connect contact form to EmailJS

- [x] 1.1 Add `@emailjs/browser` to `client/package.json` and read `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `ContactForm`.
- [x] 1.2 Replace the `fetch POST /api/contact` submit handler with `emailjs.send` using visitor `name`, `email`, `message` template params; fail closed with the generic failure message when any EmailJS setting is missing.
- [x] 1.3 Keep pending, duplicate-submit prevention, success/reset, and failure/preserve-values states; keep matching client-side required, email-format, trim, and length checks.
- [x] 1.4 Rewrite `contact-form.test.tsx` to mock `@emailjs/browser` send for pending/duplicate, success/reset, HTTP-style failure/retry, and missing-config/network-error cases.

## 2. Remove backend SMTP contact path

- [x] 2.1 Remove `POST /api/contact` and its `OPTIONS` preflight, contact validation, contact CORS/origin check, contact rate limiter, and contact JSON error mapper from `server/src/server.js`.
- [x] 2.2 Delete `server/src/contact-mailer.js` and remove contact-only dependencies (`nodemailer`, plus `cors`/`express-rate-limit` only if unused by remaining routes).
- [x] 2.3 Remove the contact path from `server/src/openapi.json` and delete `server/test/contact.test.js` coverage for delivery, validation, header injection, rate limiting, and CORS preflight.

## 3. Clean configuration and docs

- [x] 3.1 Replace `NEXT_PUBLIC_API_BASE_URL` in `client/.env.example` and client docs with blank `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` placeholders without committing secrets.
- [x] 3.2 Remove `SMTP_*`, `CONTACT_TO`, `MAIL_FROM`, and contact-only `ALLOWED_ORIGINS` wiring from `server/.env.example`, root `.env.example`, and `docker-compose.yml` api environment.
- [x] 3.3 Document EmailJS setup (service, template recipient/params, public key, allowed domains, client rebuild after env change) and note that `POST /api/contact` is removed.

## 4. Verify the change

- [x] 4.1 Run client tests, client lint, production build, and server tests; verify the API still serves health/docs, `POST /api/contact` returns 404, and a staged EmailJS send succeeds end to end.
