
# frontend/Dockerfile

# --- Stage 1: Build the React App ---
    FROM node:20-alpine AS builder

    WORKDIR /app/frontend
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    # This runs the 'build' script defined in your frontend's package.json
    RUN npm run build
    
    # --- Stage 2: Serve the built files with Nginx ---
    FROM nginx:stable-alpine
    
    # Copy the built static files from Stage 1 (builder) into Nginx's web root directory
    # Vite usually builds to a 'dist' folder. Check your vite.config.js if different.
    COPY --from=builder /app/frontend/dist /usr/share/nginx/html
    
    # Copy our custom Nginx configuration file
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Tell Docker that Nginx listens on port 80
    EXPOSE 80
    
    # Nginx starts automatically when the container runs based on the base image