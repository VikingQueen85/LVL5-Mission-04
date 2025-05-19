
FROM node:23-alpine3.20
RUN apk update && apk upgrade --no-cache
WORKDIR /app/backend
COPY package*.json ./
RUN npm ci && npm install winston
COPY . .
EXPOSE 3001
CMD [ "node", "server.js" ]