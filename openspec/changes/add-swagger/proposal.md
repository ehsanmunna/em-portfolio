## Why

The Express API has no discoverable contract, making it harder to understand and manually exercise its endpoints. Adding OpenAPI documentation with Swagger UI gives maintainers a browsable reference that stays aligned with the API's existing behavior.

## What Changes

- Add an OpenAPI document for the existing root, health, and contact endpoints, including request and response schemas and relevant status codes.
- Serve interactive Swagger UI from the API at `/api-docs` and make the OpenAPI document available to it.
- Keep the documented contract consistent with current validation, origin restriction, rate limiting, and delivery behavior.

## Capabilities

### New Capabilities
- `api-documentation`: Provides interactive Swagger UI and an OpenAPI contract for the portfolio API.

### Modified Capabilities

## Impact

- Affects the Express server in `server/src/server.js` and its dependencies in `server/package.json`.
- Adds the `/api-docs` documentation route and a machine-readable OpenAPI document.
- Does not change the behavior or availability of existing API endpoints.