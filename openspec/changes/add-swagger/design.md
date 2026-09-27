## Context

The server is a CommonJS Express API with three existing operations and no OpenAPI or Swagger dependencies. The contact operation applies origin checks, rate limiting, validation, and mail delivery in its existing route chain. See [proposal.md](proposal.md) and [api-documentation spec](specs/api-documentation/spec.md) for scope and behavior.

## Goals / Non-Goals

**Goals:**
- Render the existing API contract through Swagger UI at `/api-docs`.
- Serve the machine-readable OpenAPI document at `/openapi.json`.
- Keep documentation available without requiring a MongoDB connection.

**Non-Goals:**
- Change API route behavior, CORS policy, origin allowlist, rate limits, or contact delivery.
- Add authentication or authorization to the documentation endpoints.
- Generate the OpenAPI document from source annotations.

## Decisions

- **Keep the OpenAPI contract as a checked-in JSON file.** Store the OpenAPI 3.0 document with the server and load it from the application. This keeps the contract explicit and avoids scattering documentation annotations through route code. Source annotations with `swagger-jsdoc` were considered, but add generation and coupling for only a few routes.
- **Use `swagger-ui-express` to serve the UI.** It fits the existing Express/CommonJS stack and allows the UI and contract endpoint to be served by the same process. A separately hosted docs site was considered but would add deployment and cross-origin configuration.
- **Keep `/api-docs` and `/openapi.json` outside database-dependent behavior.** These routes only serve static documentation and must remain available if MongoDB is unavailable.
- **Preserve the contact middleware chain.** Swagger UI requests to the contact operation go through the same origin check, rate limiter, validation, and delivery logic. The OpenAPI contract must include the relevant error responses; configuring `ALLOWED_ORIGINS` remains the operator's responsibility.
- **Use a relative OpenAPI server URL.** Swagger UI calls the API on the same origin from which the documentation was loaded, avoiding a hard-coded host across local, container, and deployed environments.

## Risks / Trade-offs

- [The hand-maintained OpenAPI file can drift from Express behavior] → Add focused tests for documentation routes and verify the contract covers current endpoint schemas and response statuses.
- [Swagger UI's Try it out can receive 403 when the docs origin is absent from `ALLOWED_ORIGINS`] → Document and test the existing origin restriction; do not weaken or bypass it to make the UI more permissive.
- [Swagger UI adds a runtime dependency and serves a larger static UI] → Limit the dependency to `swagger-ui-express` and serve only the existing API documentation.

## Migration Plan

No data migration is required. Add the documentation dependency and contract, then deploy the server as usual. Rollback by removing the docs routes, contract file, and dependency; existing API endpoints remain unchanged.