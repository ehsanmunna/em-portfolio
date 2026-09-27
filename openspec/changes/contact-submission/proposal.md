## Why

The portfolio contact form currently hands the message to the visitor's local email application, which can fail or be unavailable and gives the site no reliable submission result. Submit through the backend instead so visitors can send inquiries directly from the page and receive clear success or failure feedback.

## What Changes

- Add a public `POST /api/contact` endpoint that validates contact details and sends the inquiry through an SMTP transport.
- Replace the client-side `mailto:` submit flow with an asynchronous request and pending, success, and failure states.
- Configure SMTP delivery and an explicit browser-origin allowlist through server-side environment settings.
- Add request validation, payload bounds, and abuse controls for the public endpoint.
- Keep inquiry delivery email-only; do not persist submissions or expose portfolio content through an API.

## Capabilities

### New Capabilities
- `contact-submission`: Browser contact form submissions validated and delivered by the backend over SMTP.

### Modified Capabilities

None.

## Impact

- Express API in `server/`, including an SMTP mail transport dependency and environment configuration.
- Next.js contact form in `client/` and its direct cross-origin request to Express.
- Docker Compose/environment examples for allowed origins and SMTP settings.
- Automated tests for request validation, abuse controls, delivery outcomes, CORS, and client submission states.
