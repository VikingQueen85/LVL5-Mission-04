
FROM node:20-alpine AS builder
RUN apk update && apk upgrade --no-cache
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]