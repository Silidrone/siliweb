# Stage 1: Build the React app
FROM node:22-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx configs
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
