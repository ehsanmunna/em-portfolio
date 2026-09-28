## 1. Define the runtime stack

- [x] 1.1 Identify the required Node.js runtime version and Express API entrypoint for the server directory.
- [x] 1.2 Define the Docker Compose service model for MongoDB and the API service.
- [x] 1.3 Confirm local port mappings, service naming, and startup ordering assumptions.

## 2. Configure environment and connectivity

- [x] 2.1 Add environment variable definitions for MongoDB host, port, database name, and credentials.
- [x] 2.2 Ensure the Express service receives the database connection values through the compose environment.
- [x] 2.3 Add startup health checks or dependency ordering to avoid race conditions during boot.

## 3. Wire the Express server to MongoDB

- [x] 3.1 Create the Node.js Express server bootstrap and application config required by the runtime contract.
- [x] 3.2 Add MongoDB connection logic using the standardized environment variables.
- [ ] 3.3 Validate that the API service can initialize and connect successfully to MongoDB in the local stack.

## 4. Add and verify the client service

- [ ] 4.1 Add client container configuration and a Compose service for the Next.js application.
- [ ] 4.2 Configure and document the browser-facing API URL and allowed local client origin.
- [ ] 4.3 Run the full Compose stack and verify the client, API, and MongoDB start and respond on their documented ports.
- [ ] 4.4 Verify a contact-form submission reaches the API from the local client when mail transport is configured.
