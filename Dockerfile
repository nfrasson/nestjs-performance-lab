FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --omit=dev
RUN npm i @nestjs/cli @swc/core @swc/cli
COPY . .
RUN npm run build
RUN npm uninstall @nestjs/cli @swc/core @swc/cli

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
