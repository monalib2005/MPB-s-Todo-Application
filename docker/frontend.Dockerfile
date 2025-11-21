# Stage 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json from frontend folder
COPY frontend/package*.json ./
RUN npm install


# Copy the rest of the frontend code
COPY frontend ./ 

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config (optional)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build folder from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
