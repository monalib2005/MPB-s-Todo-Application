FROM node:18-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend ./

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 1000
CMD ["node", "app.js"]
