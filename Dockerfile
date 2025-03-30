# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

# Этап запуска
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
RUN npm install -g pnpm && pnpm install --prod

# Копируем только необходимые файлы
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
