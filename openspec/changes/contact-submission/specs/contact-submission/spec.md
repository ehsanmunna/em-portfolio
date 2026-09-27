## Purpose

This capability lets portfolio visitors submit contact inquiries through the site and receive a trustworthy result without depending on a local email application. The backend validates each submission and delivers accepted messages to the configured portfolio recipient.

## ADDED Requirements

### Requirement: Submit a contact inquiry
The system MUST provide a public `POST /api/contact` endpoint that accepts a JSON object containing `name`, `email`, and `message` string fields. The system MUST return success only after the configured email transport accepts the inquiry for delivery.

#### Scenario: Inquiry is accepted for delivery
- **WHEN** a visitor submits a valid name, email address, and message and the email transport accepts the message
- **THEN** the endpoint returns `202 Accepted` and the client reports that the inquiry was submitted

#### Scenario: Email delivery is unavailable
- **WHEN** the request is valid but the email transport is unavailable or rejects delivery
- **THEN** the endpoint returns a generic server error without exposing provider details and the client reports that submission failed

#### Scenario: Required fields are invalid
- **WHEN** the request omits a required field, contains a non-string field, or contains an invalid email address
- **THEN** the endpoint returns `400 Bad Request` with a stable, non-sensitive validation response

### Requirement: Validate and protect contact submissions
The system MUST trim and validate submitted values on the server, enforce documented field and request-size limits, and reject unsafe email header values. The destination recipient and sender MUST be controlled by server configuration and MUST NOT be selectable by the client. The endpoint MUST limit abusive submission rates.

#### Scenario: Values exceed configured limits
- **WHEN** a field or request body exceeds its documented limit
- **THEN** the endpoint rejects the request with an appropriate client error and does not send email

#### Scenario: Email header injection is attempted
- **WHEN** a submitted value contains line breaks or other disallowed header content
- **THEN** the endpoint rejects the request and does not send email

#### Scenario: Submission rate is exceeded
- **WHEN** a client exceeds the configured submission rate
- **THEN** the endpoint returns `429 Too Many Requests` and does not send email

### Requirement: Restrict browser access to configured origins
The API MUST allow contact submissions from explicitly configured portfolio browser origins and MUST reject browser requests from other origins. Preflight requests for the contact endpoint MUST advertise only the required method and headers.

#### Scenario: Allowed origin submits a contact inquiry
- **WHEN** a browser request originates from an allowed portfolio origin
- **THEN** the browser can complete the contact request, including any required preflight

#### Scenario: Unconfigured origin attempts a browser request
- **WHEN** a browser request originates from an origin not on the allowlist
- **THEN** the API does not grant cross-origin access

### Requirement: Communicate contact submission state
The contact form MUST prevent duplicate submissions while a request is pending, report success only after an accepted response, and preserve entered values after a failed request so the visitor can retry.

#### Scenario: Request is pending
- **WHEN** the visitor submits the form and the server has not responded
- **THEN** the form indicates submission is in progress and prevents another submission

#### Scenario: Request fails
- **WHEN** the endpoint returns an error or cannot be reached
- **THEN** the form reports failure and retains the visitor's entered values

#### Scenario: Request succeeds
- **WHEN** the endpoint returns `202 Accepted`
- **THEN** the form reports success and clears the submitted values
