## Purpose

Provides an accurate, browsable API contract so maintainers and API consumers can inspect the portfolio service endpoints and their request and response behavior.

## ADDED Requirements

### Requirement: Interactive API documentation
The service SHALL provide a browser-accessible Swagger UI at `/api-docs` that renders the OpenAPI contract for the portfolio API.

#### Scenario: Open API documentation
- **WHEN** a user navigates to `/api-docs`
- **THEN** the service returns an interactive Swagger UI showing the portfolio API operations

#### Scenario: Retrieve the machine-readable contract
- **WHEN** a client requests `/openapi.json`
- **THEN** the service returns a valid OpenAPI document describing the portfolio API

### Requirement: Document existing API behavior
The OpenAPI contract SHALL describe the existing `GET /`, `GET /health`, and `POST /api/contact` operations, including contact request fields, response bodies, and documented success and error status codes.

#### Scenario: Inspect contact submission
- **WHEN** a user views the contact operation in the documentation
- **THEN** the contract identifies `name`, `email`, and `message` as required string fields and describes the accepted and relevant validation, origin, size, rate-limit, and delivery responses

#### Scenario: Inspect health and service status
- **WHEN** a user views the health and root operations
- **THEN** the contract describes their successful JSON responses and the health operation's database-unavailable response

### Requirement: Documentation preserves API protections
The documentation endpoints SHALL NOT bypass or alter the existing origin checks, rate limiting, request validation, or delivery behavior of `POST /api/contact`.

#### Scenario: Submit through Swagger UI
- **WHEN** a user invokes `POST /api/contact` from Swagger UI
- **THEN** the request is handled by the same origin checks, rate limiter, validation, and delivery path as any other contact request