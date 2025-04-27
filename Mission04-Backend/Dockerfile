
# Use an official Node.js image (choose a version you know works, e.g., 20)
# 'alpine' versions are smaller
FROM node:20-alpine

# Create a directory inside the container to hold the app code
WORKDIR /app/backend

# Copy ONLY package.json and package-lock.json first
# This takes advantage of Docker caching - dependencies only reinstall if these files change
COPY package*.json ./

# Install dependencies using 'npm ci' which is often faster and safer for CI/CD
RUN npm ci

# Now copy the rest of your backend application code
COPY . .

# Tell Docker the app listens on port 3001 inside the container
EXPOSE 3001

# The command to run when the container starts
CMD [ "node", "server.js" ]