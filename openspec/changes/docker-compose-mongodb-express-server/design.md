## Context

The repository contains a Next.js client and an Express API backed by MongoDB. The existing Compose stack covers the API and database; this design extends the local runtime to include the client and its browser-to-API configuration. Production hosting of the client remains on Vercel.

## Goals / Non-Goals

**Goals:**
- Start the Next.js client, Express API, and MongoDB through one local Compose workflow.
- Define predictable host ports, service readiness, and browser-to-API configuration.
- Keep the Vercel production deployment independent from the local Compose stack.

**Non-Goals:**
- Package the Vercel production deployment or replace Vercel with Compose.
- Introduce application-specific business logic or database schema beyond the required runtime support.
- Rework the client portfolio architecture or its styling.

## Decisions

### Use Docker Compose for the complete local runtime

The client, API, and MongoDB will be launched through Docker Compose so developers can start and validate the integrated application with one command. The client will be exposed on port 3000, the API on port 4000, and MongoDB will retain its existing configuration.

### Use a browser-resolvable API URL for the client

The client contact form runs in the browser, so its `NEXT_PUBLIC_API_BASE_URL` must use the host-published API address (`http://localhost:4000`), not the Compose-only service hostname. Configure the API's exact-origin allowlist for the local client origin (`http://localhost:3000`). Keep MongoDB connection settings environment-driven as they are today.

### Keep local Compose separate from Vercel production

Compose is a local development workflow. Vercel continues to build and host the production client; this change does not make the client container the production deployment artifact.

## Risks / Trade-offs

- [The browser cannot resolve Compose service hostnames] → Use the API's published localhost port in the public client URL and allow the exact local client origin in API CORS configuration.
- [MongoDB startup timing can vary] → Retain health checks or readiness waits before API-dependent validation.
- [Local container setup could be mistaken for production hosting] → Document Compose as local development only and keep Vercel configuration separate.

## Migration Plan

- Add the client container configuration and Compose service while retaining the existing API and MongoDB services.
- Configure and document local ports, the browser-facing API URL, and the allowed client origin.
- Validate that all three services start and that the client can submit a contact request through the local API when mail transport is configured.
- Vercel production deployment is unchanged; rollback by removing the client service and its container configuration from the local stack.
