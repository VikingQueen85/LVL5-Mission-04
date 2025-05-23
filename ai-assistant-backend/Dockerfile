# Stage 1: (Builder) Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Stage 2: (Runner) Production Stage
FROM node:18-alpine

# --- Set working directory`
WORKDIR /app

# --- Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# --- Copy necessary files from build stage (build artficats and node_modules)
COPY --from=build --chown=appuser:appgroup /app/package*.json ./
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/src ./src
COPY --from=build --chown=appuser:appgroup /app/server.js ./

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "server.js"] 