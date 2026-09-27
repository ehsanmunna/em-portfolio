## 1. Configure delivery and origins

- [x] 1.1 Add Nodemailer, exact-origin CORS, and rate-limit dependencies to the API; add the required SMTP, recipient, sender, and allowed-origin settings to safe environment examples and Compose runtime configuration.
- [x] 1.2 Add the public `NEXT_PUBLIC_API_BASE_URL` setting to the client configuration example and document local and production origin values without committing credentials.

## 2. Implement the contact endpoint

- [x] 2.1 Separate Express app construction from process listening and inject the mail sender so the endpoint can be tested without live SMTP.
- [x] 2.2 Implement `POST /api/contact` with a 16 KiB JSON limit, required string validation, trimming, email validation, 120/254/5,000-character field limits, and rejection of header injection.
- [x] 2.3 Deliver to the server-configured recipient from the verified sender, set the validated visitor email as `Reply-To`, return `202` only after SMTP acceptance, and normalize delivery/configuration failures to generic `503` responses.
- [x] 2.4 Restrict CORS to configured origins and the required method/header; apply a 5-per-IP, 15-minute contact limit and return the specified `429` response.
- [x] 2.5 Add server tests for accepted delivery, invalid and oversized requests, header injection, SMTP failure, rate limiting, and allowed/disallowed CORS preflight behavior.

## 3. Connect the contact form

- [x] 3.1 Replace the `mailto:` submit handler with a JSON request to the configured API and implement pending, accepted, HTTP-error, and network-error states; prevent duplicates and preserve values on failure.
- [x] 3.2 Add focused Vitest and React Testing Library coverage for pending state, duplicate-submit prevention, success/reset, and failure/retry behavior.

## 4. Verify the change

- [x] 4.1 Run server and client tests, client lint, and production build; verify Compose/API startup and document that real SMTP credentials and allowed origins are deployment configuration.
