## Purpose

Provide privacy-respecting behavioral analytics for the portfolio via Microsoft Clarity, only after explicit user consent, with the Project ID supplied from environment configuration.

## ADDED Requirements

### Requirement: Consent-gated tracking
The system SHALL load Microsoft Clarity only after the visitor explicitly accepts analytics, and SHALL NOT load any Clarity script, cookie, or network request before consent.

#### Scenario: First visit with no stored choice
- **WHEN** a visitor loads any page with no stored consent choice
- **THEN** the system shows a non-blocking consent banner and does not load Clarity

#### Scenario: Visitor declines
- **WHEN** a visitor selects Decline
- **THEN** the system persists declined choice, dismisses the banner, and never loads Clarity on subsequent visits unless consent is later granted

#### Scenario: Visitor accepts
- **WHEN** a visitor selects Accept
- **THEN** the system persists accepted choice, dismisses the banner, and loads Clarity exactly once for that browser

### Requirement: Persisted and revocable consent
The system SHALL persist the visitor's analytics choice across visits and SHALL allow the visitor to change or revoke consent at any time.

#### Scenario: Consent persists across reloads
- **WHEN** a visitor with a stored accept choice reloads or navigates
- **THEN** the system does not re-show the banner and loads Clarity without re-prompting

#### Scenario: Revoke consent
- **WHEN** a visitor revokes analytics consent via the footer/settings affordance
- **THEN** the system updates the stored choice to declined, stops further Clarity tracking, clears Clarity-identifiable local state it controls, and re-shows the banner or settings state

### Requirement: Environment-configured Project ID
The system SHALL read the Clarity Project ID from environment configuration (`NEXT_PUBLIC_CLARITY_PROJECT_ID`) and SHALL NOT hardcode a Project ID in source.

#### Scenario: Project ID configured
- **WHEN** `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set to a valid Project ID and consent is accepted
- **THEN** the system loads Clarity using that Project ID

#### Scenario: Project ID missing or invalid
- **WHEN** `NEXT_PUBLIC_CLARITY_PROJECT_ID` is missing, empty, or malformed
- **THEN** the system never loads Clarity, logs a development-only warning, and consent acceptance has no tracking side effect

### Requirement: Client-side single-load lifecycle
The system SHALL initialize Clarity client-side only, exactly once per page lifecycle, and SHALL handle navigation without duplicate injection.

#### Scenario: Single injection on SPA navigation
- **WHEN** an opted-in visitor navigates between portfolio routes client-side
- **THEN** the system does not inject duplicate Clarity scripts or re-initialize tracking

#### Scenario: No server-side tracking
- **WHEN** pages are pre-rendered on the server
- **THEN** the system performs no Clarity loading during server rendering

### Requirement: Accessible consent experience
The system SHALL present consent controls that are keyboard-accessible, dismissible, and visually consistent with the site theme without blocking core content.

#### Scenario: Keyboard and dismiss flow
- **WHEN** the banner is visible and a keyboard user tabs through it
- **THEN** Accept, Decline, and Learn-more/close controls are reachable and operable, and focus does not trap page content

#### Scenario: Re-open consent settings
- **WHEN** a visitor with a stored choice opens consent settings from the footer
- **THEN** the system shows current choice and allows switching between accept and decline
