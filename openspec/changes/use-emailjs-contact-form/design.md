## Context

See `proposal.md` for motivation and `specs/emailjs-contact-form/spec.md` for the behavior contract. The current flow is `ContactForm (fetch) -> POST /api/contact (Express) -> Nodemailer SMTP`, with exact-origin CORS, in-memory rate limiting, and server env (`SMTP_*`, `CONTACT_TO`, `MAIL_FROM`, `ALLOWED_ORIGINS`) plus client `NEXT_PUBLIC_API_BASE_URL`. Per user decision, this change goes client-direct EmailJS and fully removes the SMTP path (no fallback, no backend proxy).

## Goals / Non-Goals

**Goals:**
- Send inquiries from the Next.js form directly through EmailJS with the same pending/success/failure UX.
- Make EmailJS service/template/public-key configuration explicit via public client env.
- Fully remove the Express contact endpoint, mailer, and contact-only config, deps, tests, and docs.

**Non-Goals:**
- Keep an SMTP fallback, backend proxy, or server-side validation/rate limiting for contact.
- Add CAPTCHA, backend persistence, admin inbox, or EmailJS server-side SDK usage.
- Change MongoDB health-check or other non-contact API routes.

## Decisions

1. **Use `@emailjs/browser` in the client.** Call `emailjs.send(serviceId, templateId, templateParams, { publicKey })` from the submit handler. Chosen over `emailjs-com` (deprecated) and over backend EmailJS REST (rejected per user choice to eliminate the backend path). Template params map to `name`, `email`, `message` (plus `reply_to` set to visitor email if the template uses it).

2. **Keep the existing form state machine.** Reuse `isSubmitting` guard, `Sending your message...` / success + `form.reset()` / failure + preserve-values behavior; only the transport call changes. This keeps the UX contract and test shape stable.

3. **Fail closed on missing public config.** If any of `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is absent, report failure without calling EmailJS. Rationale: avoids silent no-ops and matches prior behavior when `apiBaseUrl` was unconfigured.

4. **Do client-side validation only (required + email type + trim + nonempty + length caps).** Server-side 120/254/5000 limits, 16 KiB body cap, header-injection checks, and 5-per-15min IP throttling go away with the endpoint. Mitigate by keeping matching client length caps (`maxLength` + JS check) and relying on EmailJS dashboard limits/quotas and domain restrictions for abuse control.

5. **Remove backend contact code wholesale.** Delete the `/api/contact` route (including `OPTIONS` preflight), `validateContactSubmission`, contact CORS/limiter, error mapper, `contact-mailer.js`, and contact tests. Remove `nodemailer` from `server/package.json` only if nothing else imports it; keep `cors`/`express-rate-limit` only if used by remaining routes (currently contact-only, so expect removal). Remove the contact path from `openapi.json` and Swagger docs.

6. **Clean env and Compose wiring.** Remove `SMTP_*`, `CONTACT_TO`, `MAIL_FROM` from `server/.env.example`, root `.env.example`, and `docker-compose.yml` api environment; remove contact `ALLOWED_ORIGINS` wiring if no other route uses it. Replace `client/.env.example` `NEXT_PUBLIC_API_BASE_URL` with the three `NEXT_PUBLIC_EMAILJS_*` placeholders (blank values, no secrets). Note: `NEXT_PUBLIC_*` values are embedded at Next.js build time, so changing them requires a rebuild.

## Risks / Trade-offs

- **Public key and template IDs are visible in the browser bundle by design** → Restrict allowed domains/senders in the EmailJS dashboard and keep the service configured to only send to the portfolio owner address.
- **No server-side rate limiting or validation** → Spam/abuse now depends on EmailJS quotas, template/domain restrictions, and optional future CAPTCHA; client checks are bypassable.
- **Misconfigured service/template ID fails at runtime** → Fail closed with the generic failure message; verify with a real send in staging and document EmailJS setup steps.
- **Build-time public env requires rebuild after key rotation** → Document that rotation means updating env and rebuilding/redeploying the client.
- **Removing `POST /api/contact` is breaking for any external caller** → Acceptable for a portfolio (only the form calls it); rollback is restoring the endpoint from version control.

## Migration Plan

1. Create EmailJS service + template (to: owner address, params: name/email/message/reply_to) and capture service ID, template ID, public key.
2. Deploy client with the three `NEXT_PUBLIC_EMAILJS_*` values; verify success and failure states.
3. Deploy API without the contact route/config; verify health/docs still serve and contact path returns 404.
4. Rollback: revert client to prior build and restore the Express contact route/config from git; re-add SMTP and origin settings.

## Open Questions

None. EmailJS account, service, and template identifiers are deployment inputs, not design unknowns.
