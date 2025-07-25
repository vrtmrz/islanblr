# Client build
ARG DENO_VERSION=2.4.2
FROM denoland/deno:${DENO_VERSION} AS builder

WORKDIR /app

# Copy configuration files
COPY deno.json deno.lock* ./
COPY vite.config.ts vite.config.components.ts ./
COPY svelte.config.js ./
COPY vite-env.d.ts ./

# Copy source code
COPY app/ ./app/
COPY applib/ ./applib/
COPY lib/ ./lib/

RUN deno install
# Build the Svelte application using Deno tasks
RUN deno task build:client

# The Server application
FROM denoland/deno:${DENO_VERSION} AS app
WORKDIR /app
# Copy the built application from the builder stage
COPY deno.json deno.lock* ./
RUN deno install

COPY lib/ ./lib/
COPY server/ ./server/
COPY static/ ./static/
COPY --from=builder /app/static_app ./static_app

# Create data directory for mounting
RUN mkdir -p /app/data

# Create non-root user for security
RUN groupadd -r denouser && useradd -r -g denouser denouser
RUN chown -R denouser:denouser /app
USER denouser

# Expose port
EXPOSE 8000

# Define volume for data mounting
VOLUME ["/app/data"]

# Start the server
CMD ["deno", "task", "run:server"]