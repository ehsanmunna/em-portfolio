## Purpose

Lets portfolio visitors send contact inquiries directly from the browser through EmailJS, without requiring a backend SMTP service or Express contact endpoint.

## ADDED Requirements

### Requirement: Submit a contact inquiry through EmailJS
The system MUST provide a browser contact form that validates name, email, and message and delivers accepted inquiries through the configured EmailJS service and template. The system MUST report success only after EmailJS confirms acceptance.

#### Scenario: Inquiry is accepted by EmailJS
- **WHEN** a visitor submits a valid name, email address, and message and EmailJS accepts the send request
- **THEN** the form reports that the inquiry was submitted and clears the entered values

#### Scenario: EmailJS delivery fails
- **WHEN** the request is valid but EmailJS rejects delivery, the configuration is missing, or the network request fails
- **THEN** the form reports that submission failed without exposing provider diagnostics and preserves the entered values for retry

#### Scenario: Required fields are invalid
- **WHEN** a visitor submits a missing name, email, or message, or an invalid email address
- **THEN** the form blocks submission client-side and does not call EmailJS

### Requirement: Communicate contact submission state
The contact form MUST prevent duplicate submissions while a send request is pending, indicate sending progress, report success only after EmailJS acceptance, and preserve entered values after a failed request so the visitor can retry.

#### Scenario: Request is pending
- **WHEN** the visitor submits the form and EmailJS has not responded
- **THEN** the form indicates submission is in progress and prevents another submission

#### Scenario: Request fails
- **WHEN** EmailJS returns an error, configuration is missing, or the service cannot be reached
- **THEN** the form reports failure and retains the visitor's entered values

#### Scenario: Request succeeds
- **WHEN** EmailJS confirms acceptance
- **THEN** the form reports success and clears the submitted values

### Requirement: Configure EmailJS with public settings
The client MUST read EmailJS identifiers from public build-time settings and MUST NOT require backend SMTP credentials, recipient addresses, or API base URLs for contact delivery.

#### Scenario: EmailJS settings are configured
- **WHEN** service ID, template ID, and public key are present
- **THEN** the form attempts delivery through EmailJS with the visitor name, email, and message as template parameters

#### Scenario: EmailJS settings are missing
- **WHEN** any required EmailJS setting is absent
- **THEN** the form reports failure without attempting delivery and preserves entered values

## REMOVED Requirements

### Requirement: Backend SMTP contact endpoint
**Reason**: Replaced by direct browser delivery through EmailJS; no backend mail transport is needed for portfolio inquiries.
**Migration**: Configure `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in the client environment; stop calling `POST /api/contact` and remove SMTP recipient/sender and allowed-origin contact configuration from deployment.
