# Этап сборки (builder)
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Копируем только необходимые файлы для установки зависимостей
COPY package.json pnpm-lock.yaml* ./
COPY .prettierrc ./

# 2. Устанавливаем pnpm и все зависимости
RUN npm install -g pnpm && \
    pnpm install && \
    pnpm add --save-dev prettier @trivago/prettier-plugin-sort-imports

# 3. Проверяем установку плагинов
RUN pnpm list prettier @trivago/prettier-plugin-sort-imports

# 4. Копируем остальные файлы проекта
COPY . .

# 5. Опциональная проверка форматирования (можно закомментировать)
RUN pnpm exec prettier --check . || echo "Prettier check completed"

# 6. Собираем проект
RUN pnpm build

# Этап запуска (production)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 1. Копируем только production-артефакты
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# 2. Копируем конфиг prettier (если нужен в runtime)
COPY --from=builder /app/.prettierrc ./

# 3. Устанавливаем только production зависимости
COPY --from=builder /app/package.json ./package.json
RUN npm install -g pnpm && \
    pnpm install --prod

EXPOSE 3000
CMD ["pnpm", "start"]
