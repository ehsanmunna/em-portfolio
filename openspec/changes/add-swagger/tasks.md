## 1. OpenAPI Contract and Dependency

- [x] 1.1 Add `swagger-ui-express` to the server dependencies and update `server/package-lock.json`.
- [x] 1.2 Create a checked-in OpenAPI 3.0 JSON contract for `GET /`, `GET /health`, and `POST /api/contact`, including request schemas and current success and error responses.

## 2. Documentation Routes

- [x] 2.1 Serve the OpenAPI document at `/openapi.json` and mount Swagger UI at `/api-docs` without requiring a database connection.
- [x] 2.2 Keep contact requests from Swagger UI on the existing origin-check, rate-limit, validation, and delivery middleware path.

## 3. Verification

- [x] 3.1 Add server tests for the OpenAPI JSON and Swagger UI routes, including their availability when no MongoDB connection is needed.
- [x] 3.2 Verify the OpenAPI contract covers documented contact validation, origin, payload-size, rate-limit, and delivery responses, plus health database-unavailable behavior.
- [x] 3.3 Run the server test suite and OpenSpec validation; confirm existing endpoint behavior remains unchanged.