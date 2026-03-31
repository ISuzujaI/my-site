# 🚀 Краткое руководство по развертыванию Abuvet

## 📋 Оглавление
1. [Быстрый старт](#быстрый-старт)
2. [Основные команды](#основные-команды)
3. [Полезные ссылки](#полезные-ссылки)

---

## ⚡ Быстрый старт

### 1. Supabase (Backend + Database)

```bash
# 1. Создайте проект на supabase.com
# 2. Скопируйте URL и ключи из Settings → API

# 3. Установите CLI
npm install -g supabase

# 4. Логин
supabase login

# 5. Свяжите проект
supabase link --project-ref YOUR_PROJECT_ID

# 6. Выполните миграцию базы данных
# Скопируйте содержимое /scripts/init-database.sql
# и выполните в Supabase SQL Editor

# 7. Разверните Edge Functions
supabase functions deploy server --no-verify-jwt

# 8. Установите секреты
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT.supabase.co
supabase secrets set SUPABASE_ANON_KEY=YOUR_ANON_KEY
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# 9. Инициализируйте данные
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 2. Vercel (Frontend)

```bash
# 1. Создайте .env.production
cat > .env.production << EOF
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
EOF

# 2. Установите CLI
npm install -g vercel

# 3. Логин
vercel login

# 4. Deploy
npm run build
vercel --prod

# Или через Git:
# - Загрузите код на GitHub
# - Подключите репозиторий на vercel.com
# - Установите переменные окружения в Vercel Dashboard
```

### 3. Создание админа

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@abuvet.lv",
    "password": "SecurePassword123!",
    "name": "Администратор"
  }'
```

---

## 📝 Основные команды

### Разработка

```bash
npm run dev              # Запустить dev сервер
npm run build            # Собрать production версию
npm run preview          # Превью production сборки
npm run check:build      # Проверить, что сборка работает
```

### Деплой

```bash
npm run deploy:vercel    # Деплой на Vercel
npm run deploy:netlify   # Деплой на Netlify
npm run deploy:supabase  # Деплой Edge Functions
npm run deploy:all       # Деплой всего (frontend + backend)
```

### Supabase

```bash
npm run supabase:login   # Логин в Supabase
npm run supabase:link    # Связать с проектом
npm run supabase:logs    # Просмотр логов Edge Functions
npm run supabase:secrets # Список секретов

# Или напрямую:
supabase functions deploy server --no-verify-jwt
supabase functions logs server
supabase secrets set KEY=value
supabase secrets list
```

### Проверка готовности

```bash
# Проверка сборки
npm run build

# Проверка типов (если TypeScript)
npm run check:types

# Размер bundle
npm run analyze
```

---

## 🌐 Настройка домена

### DNS записи

У вашего регистратора доменов добавьте:

**Для Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Для Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### В Vercel/Netlify Dashboard

1. Settings → Domains
2. Add domain: `abuvet.lv`
3. Добавьте также: `www.abuvet.lv`
4. SSL автоматически настроится через Let's Encrypt

---

## 🔧 Переменные окружения

### Frontend (.env.production)

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Backend (Supabase Secrets)

```bash
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

### Vercel/Netlify Dashboard

Добавьте в Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 🔍 Мониторинг и отладка

### Логи Supabase Edge Functions

```bash
# Реальное время
supabase functions logs server --tail

# Последние 100 записей
supabase functions logs server --limit 100

# Только ошибки
supabase functions logs server --level error
```

### Логи Vercel

```bash
vercel logs
vercel logs --follow  # реальное время
```

### Browser Console

Откройте DevTools → Console для frontend ошибок

### Проверка API

```bash
# Проверка здоровья backend
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/health

# Проверка списка врачей
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/doctors \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 🆘 Решение проблем

### Проблема: "Failed to fetch" ошибки

**Решение:**
```bash
# Проверьте CORS в supabase/functions/server/index.tsx
# Убедитесь, что домен добавлен в origin

# Проверьте, что Edge Function развернута
supabase functions list
```

### Проблема: База данных не инициализирована

**Решение:**
```bash
# Повторно выполните SQL миграцию
# В Supabase Dashboard → SQL Editor
# Вставьте содержимое /scripts/init-database.sql

# Или повторно вызовите seed endpoint
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Проблема: Build fails

**Решение:**
```bash
# Очистите кеш
rm -rf node_modules
rm -rf dist
rm -rf .vite

# Переустановите зависимости
npm install

# Проверьте .env.production
cat .env.production

# Попробуйте снова
npm run build
```

### Проблема: Edge Function timeout

**Решение:**
```bash
# Проверьте логи
supabase functions logs server

# Увеличьте retry логику в коде
# Проверьте соединение с базой данных
```

---

## 📊 Чеклисты

### Перед первым деплоем
- [ ] Supabase проект создан
- [ ] База данных инициализирована
- [ ] .env.production создан
- [ ] Переменные окружения установлены

### Перед production запуском
- [ ] Все тестовые данные заменены
- [ ] Реальные изображения загружены
- [ ] Email уведомления настроены
- [ ] Домен привязан
- [ ] SSL работает
- [ ] Мониторинг настроен

Полный чеклист: `/PRE_LAUNCH_CHECKLIST.md`

---

## 📚 Полезные ссылки

### Документация

- **Полное руководство:** `/PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Быстрый деплой:** `/QUICK_DEPLOY.md`
- **Чеклист запуска:** `/PRE_LAUNCH_CHECKLIST.md`
- **Чеклист деплоя:** `/DEPLOYMENT_CHECKLIST.md`
- **Админ панель:** `/ADMIN_PANEL_GUIDE.md`
- **Редактирование:** `/EDITING_GUIDE.md`

### Сервисы

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Netlify Dashboard:** https://app.netlify.com

### Документация платформ

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Docs:** https://vitejs.dev

### Мониторинг

- **Supabase Status:** https://status.supabase.com
- **Vercel Status:** https://www.vercel-status.com
- **Uptime Robot:** https://uptimerobot.com

---

## 💡 Советы

1. **Всегда тестируйте локально** перед деплоем:
   ```bash
   npm run build
   npm run preview
   ```

2. **Используйте Git** для версионирования:
   ```bash
   git add .
   git commit -m "Описание изменений"
   git push
   ```

3. **Мониторьте логи** после каждого деплоя:
   ```bash
   supabase functions logs server --tail
   ```

4. **Делайте backup** базы данных регулярно:
   - Supabase Dashboard → Database → Backups

5. **Используйте Preview deployments** в Vercel:
   - Каждый PR автоматически получает preview URL

---

## 🎯 Следующие шаги после деплоя

1. ✅ Проверьте все страницы сайта
2. ✅ Протестируйте онлайн-запись
3. ✅ Настройте email уведомления
4. ✅ Замените тестовые изображения
5. ✅ Добавьте реальных врачей
6. ✅ Обновите услуги и цены
7. ✅ Настройте Google Analytics
8. ✅ Подключите Search Console
9. ✅ Добавьте sitemap.xml
10. ✅ Настройте backup

---

## 📞 Поддержка

Если возникли проблемы:

1. Проверьте логи:
   - Frontend: Browser Console
   - Backend: `supabase functions logs server`

2. Проверьте статус сервисов:
   - https://status.supabase.com
   - https://www.vercel-status.com

3. Проверьте документацию в репозитории

4. Создайте issue в Git репозитории

---

## 🎉 Готово!

Ваш сайт развернут и работает!

**URL:** https://abuvet.lv (ваш домен)  
**Админ панель:** https://abuvet.lv/admin  
**API:** https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671

**Удачи! 🚀**
