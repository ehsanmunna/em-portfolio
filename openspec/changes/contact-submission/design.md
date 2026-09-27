## Context

See `proposal.md` for motivation and `specs/contact-submission/spec.md` for the behavior contract. The client is a Next.js app and the separate Express API currently exposes only status/health routes. The API already loads environment configuration and runs in Docker Compose; the client is not part of that Compose stack. Contact requests therefore cross origins, and SMTP credentials must remain on the API side.

## Goals / Non-Goals

**Goals:**
- Add a small public contact endpoint and connect the existing form directly to it.
- Keep mail destination and sender controlled by the server, with generic delivery failures.
- Make origins, SMTP settings, validation bounds, and throttling behavior explicit and testable.

**Non-Goals:**
- Store inquiries in MongoDB or expose an administrative inbox.
- Add authentication, a CMS, a portfolio-content API, CAPTCHA, or a distributed rate-limit store.
- Change the existing MongoDB health-check/runtime contract as part of this feature.

## Decisions

1. **Use SMTP through Nodemailer.** Add Nodemailer and create the transport from server-only environment values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASSWORD`). SMTP was selected over a provider-specific SDK because the requested behavior is provider-neutral and the user selected SMTP. Configure `CONTACT_TO` and a verified `MAIL_FROM` on the server; use the validated visitor address only as `Reply-To`. Never accept `to` or `from` from the request or log credentials/message contents.

2. **Keep the HTTP contract small and stable.** `POST /api/contact` accepts only `name`, `email`, and `message`. Trim values; require nonempty strings; validate email syntax; reject CR/LF in header-bound values. Use limits of 120 characters for name, 254 for email, 5,000 for message, and 16 KiB for the JSON body. Return `202` only after SMTP accepts the message, `400` for invalid fields, `413` for an oversized body, `429` for throttling, and a generic `503` if mail configuration or delivery is unavailable. Return stable JSON error codes/messages and never expose SMTP/provider diagnostics.

3. **Use exact-origin CORS for the direct browser call.** Configure a comma-separated `ALLOWED_ORIGINS` list containing complete client origins (scheme, host, and port where applicable). Permit only `POST` and the `Content-Type` request header for this route and support the corresponding preflight. Configure `NEXT_PUBLIC_API_BASE_URL` for the browser-visible Express base URL. CORS controls browsers, not non-browser clients, so it is not treated as abuse protection.

4. **Apply bounded validation and per-IP throttling at the API boundary.** Use route-level JSON parsing with a 16 KiB limit and normalize parser/validation errors into the documented responses. Add an in-memory limiter of 5 requests per IP per 15-minute window for the contact endpoint. Keep Express proxy trust disabled unless deployment explicitly configures a trusted reverse proxy; otherwise forwarded IP headers can be spoofed. If the API is later replicated, move the limiter to shared storage before scaling.

5. **Make the form state follow the server response.** Send JSON to the configured API base URL. Disable submit while pending; show success only for `202`; preserve values on HTTP/network failure and clear them only on success. Do not navigate to `mailto:`. Keep the current email address display as a normal public contact link, independent of the server's delivery recipient.

6. **Keep server startup testable.** Separate Express app construction from process listening and inject the contact mail sender, allowing request tests to exercise success and failure without connecting to a live SMTP server.

7. **Test the client form with Vitest and React Testing Library.** These cover the component's pending, success, error, and retry behavior without requiring a browser automation stack. Add only the test dependencies needed for this contact form.

8. **Keep secrets out of source control and containers' image layers.** Add blank/example SMTP and CORS settings to safe environment examples and pass runtime values through Compose, not Docker build arguments. Do not add real credentials. The client API base URL is public configuration and may be supplied at client build/runtime according to the existing Next deployment model.

## Risks / Trade-offs

- **SMTP acceptance does not guarantee inbox delivery** → Report only that the provider accepted the inquiry; do not promise final delivery.
- **In-memory rate limiting resets on restart and is per process** → Accept for the current single API container; use shared storage before running multiple replicas.
- **Incorrect production origin configuration blocks browser submissions** → Document exact origin format and verify allowed and disallowed preflights in tests and deployment setup.
- **Reverse proxies can obscure or falsify client IPs if trusted incorrectly** → Leave proxy trust disabled by default and configure only known proxy hops when deployed behind one.
- **API currently depends on MongoDB to become healthy even though contact delivery does not use it** → Preserve existing runtime behavior in this change; treat decoupling as separate scope.

## Migration Plan

No database migration is needed. Before deployment, configure SMTP credentials, a verified sender, the fixed recipient, the allowed client origins, and the public API base URL. Rollback by restoring the existing mailto form and removing the contact route/configuration; existing GET status and health endpoints remain unchanged.
