FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both client and server
RUN cd client && npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Build server
RUN cd server && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built client from builder stage
COPY --from=builder /app/client/dist ./client/dist

# Copy server build and package.json
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/

# Install production dependencies only
RUN cd server && npm install --only=production

# Copy .env file (if it exists)
COPY --from=builder /app/server/.env ./server/.env

# Expose port
EXPOSE 8000

# Set working directory to server
WORKDIR /app/server

# Start the server
CMD ["node", "dist/index.js"] 