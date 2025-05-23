# Stage 1: (Builder) Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set default API URL if not provided at build
ARG VITE_API_URL=http://backend:3000/api/v1/chat
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Stage 2: (Runner) Production Stage
FROM nginx:alpine

#  Copy built files from build stage to the nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

#  Copy custom nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Port
EXPOSE 80

# Command to start nginx (default command in nginx:alpine image)
CMD ["nginx", "-g", "daemon off;"]  

