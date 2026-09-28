## Why

The repository has a Next.js portfolio client and a MongoDB-backed Express API, but the local Compose stack does not start the client. Extending it to include all three processes gives developers one repeatable way to run and verify the integrated portfolio locally while leaving the Vercel production deployment path separate.

## What Changes

- Extend the local Docker Compose setup to start MongoDB, the Node.js/Express API, and the Next.js client.
- Configure the client and API ports and the browser-facing API URL and origin needed for local contact-form requests.
- Document the complete local-stack workflow while keeping Vercel production deployment outside Compose.

## Capabilities

### New Capabilities
- `dockerized-node-stack`: A containerized local development stack that runs the portfolio client, Express API, and MongoDB together through Docker Compose.

### Modified Capabilities
- The existing `server/` area gains a defined local runtime configuration and service wiring.

## Impact

- Updates `docker-compose.yml` and adds client container configuration and local-stack documentation.
- Keeps the stack scoped to local development; Vercel remains the production host for the client.
- Does not change the client or API's product behavior beyond making their existing local integration runnable through Compose.
