## Context

The repository includes a `server/` directory but does not yet define a standard stack for running a Node.js Express application with MongoDB in a containerized local environment. This change creates the runtime architecture for that service pair and sets the expectations for environment variables, dependency wiring, and startup behavior.

## Goals / Non-Goals

**Goals:**
- Provide a Docker Compose setup for MongoDB and a Node.js Express API.
- Define predictable service-to-service communication and port mapping.
- Keep local development setup portable and easy to reproduce.

**Non-Goals:**
- Build a full production Kubernetes deployment.
- Introduce application-specific business logic or database schema beyond the required runtime support.
- Rework the client portfolio architecture or its styling.

## Decisions

### Use Docker Compose as the local runtime entrypoint

The backend will be launched through Docker Compose so that the MongoDB service and the API service can start together with consistent configuration. This reduces developer environment drift and makes the startup flow easier to script.

### Standardize service communication via environment variables

The Express API should connect to MongoDB using environment-driven configuration such as host, port, database name, and credentials. This keeps the runtime configuration explicit and portable while allowing it to vary by environment.

### Keep the API service independent from the client

The client app remains a separate concern. The API should expose a clear port and runtime contract without depending on the portfolio UI implementation or client build process.

## Risks / Trade-offs

- [MongoDB startup timing can vary] → Add health checks or readiness waits to keep the API from starting before the database is available.
- [If environment variables are not documented, local setup becomes fragile] → Require a clear `.env.example`-style contract and compose defaults.
- [Over-scoping the stack could create unnecessary complexity] → Keep the setup focused on a local development runtime and a standard Express + MongoDB baseline.

## Migration Plan

- Define the Docker Compose service layout for MongoDB and the Express API.
- Add environment configuration and container startup expectations.
- Validate the stack boots together and the API can connect to MongoDB.
- Keep the portfolio client unaffected and separately operable.
