# 🚀 Руководство по развертыванию на production сервер

## Архитектура вашего приложения

Ваше приложение состоит из трех компонентов:

1. **Frontend** - React приложение (Vite + React Router)
2. **Backend** - Supabase Edge Functions (Hono сервер на Deno)
3. **Database** - PostgreSQL (через Supabase)

## 📋 Варианты развертывания

### Вариант 1: Полностью на Supabase (РЕКОМЕНДУЕТСЯ)
Самый простой и быстрый вариант.

### Вариант 2: Frontend на Vercel/Netlify + Supabase Backend
Оптимален для высокой производительности frontend.

### Вариант 3: Собственный сервер (VPS)
Максимальный контроль, требует больше настройки.

---

## 🎯 ВАРИАНТ 1: Развертывание на Supabase (РЕКОМЕНДУЕТСЯ)

Это самый простой способ, так как ваше приложение уже использует Supabase.

### Шаг 1: Создание Supabase проекта

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте аккаунт или войдите
3. Нажмите "New Project"
4. Заполните:
   - **Name**: abuvet-production
   - **Database Password**: (сохраните надежный пароль!)
   - **Region**: Europe (Frankfurt) - ближайший к Латвии
   - **Pricing plan**: Выберите подходящий (есть бесплатный tier)

5. Дождитесь создания проекта (2-3 минуты)

### Шаг 2: Получение учетных данных

В настройках проекта (Settings → API) найдите:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Шаг 3: Настройка базы данных

Supabase автоматически создает PostgreSQL базу. Вам нужно инициализировать данные.

#### Опция A: Через Supabase SQL Editor

1. В Supabase Dashboard → SQL Editor
2. Создайте новый query
3. Выполните миграцию для создания таблицы kv_store:

```sql
-- Создание таблицы kv_store
CREATE TABLE IF NOT EXISTS kv_store_de695671 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска по префиксу
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix ON kv_store_de695671 (key text_pattern_ops);

-- Row Level Security (RLS) - отключаем для server-side доступа
ALTER TABLE kv_store_de695671 ENABLE ROW LEVEL SECURITY;

-- Политика: разрешить все операции для service_role
CREATE POLICY "Allow all for service role" ON kv_store_de695671
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

#### Опция B: Через API endpoint (после деплоя Edge Function)

Просто вызовите `POST /make-server-de695671/seed` через Postman или curl.

### Шаг 4: Развертывание Edge Functions (Backend)

#### 4.1 Установка Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows (через Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

#### 4.2 Логин в Supabase

```bash
supabase login
```

Это откроет браузер для авторизации.

#### 4.3 Связать проект

```bash
# В корневой директории вашего проекта
supabase link --project-ref xxxxxxxxxxxxx
```

Замените `xxxxxxxxxxxxx` на ваш Project Reference ID (из Supabase Dashboard → Settings → General).

#### 4.4 Подготовка Edge Function

Ваша Edge Function уже готова в `/supabase/functions/server/`. Убедитесь, что структура правильная:

```
supabase/
  functions/
    server/
      index.tsx          # основной файл
      kv_store.tsx       # утилиты KV
      seed-data.ts       # начальные данные
```

#### 4.5 Развертывание функции

```bash
# Из корневой директории проекта
supabase functions deploy server --no-verify-jwt
```

Флаг `--no-verify-jwt` важен, так как ваша функция обрабатывает собственную авторизацию.

#### 4.6 Установка переменных окружения для Edge Function

```bash
# Установка секретов для Edge Function
supabase secrets set SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Шаг 5: Сборка и развертывание Frontend

#### 5.1 Обновление конфигурации

Создайте файл `.env.production` в корне проекта:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 5.2 Обновление `/utils/supabase/info.tsx`

Измените файл для использования переменных окружения:

```tsx
export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || '';
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
```

#### 5.3 Сборка приложения

```bash
# Установка зависимостей (если еще не установлены)
npm install
# или
pnpm install

# Сборка production версии
npm run build
```

Это создаст папку `dist/` с готовым приложением.

#### 5.4 Опции для хостинга Frontend

**Опция A: Vercel (РЕКОМЕНДУЕТСЯ)**

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Деплой:
```bash
vercel --prod
```

3. Следуйте инструкциям:
   - Project name: abuvet
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

4. Добавьте переменные окружения в Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Опция B: Netlify**

1. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Деплой:
```bash
netlify deploy --prod
```

3. Укажите:
   - Publish directory: `dist`

4. Добавьте переменные окружения в Netlify Dashboard

**Опция C: Supabase Storage (для простого статического хостинга)**

Примечание: Supabase не предоставляет встроенный хостинг для SPA, но вы можете использовать бакет Storage с публичным доступом в качестве временного решения.

### Шаг 6: Настройка домена

#### Для Vercel:
1. В Vercel Dashboard → Settings → Domains
2. Добавьте `abuvet.lv` (или ваш домен)
3. Следуйте инструкциям для настройки DNS

#### DNS записи (у вашего регистратора доменов):
```
Type: A
Name: @
Value: [IP от Vercel/Netlify]

Type: CNAME
Name: www
Value: [домен от Vercel/Netlify]
```

### Шаг 7: Настройка SSL

Vercel и Netlify автоматически выдают SSL сертификат через Let's Encrypt.

### Шаг 8: Инициализация данных

После деплоя вызовите endpoint для создания начальных данных:

```bash
curl -X POST https://xxxxxxxxxxxxx.supabase.co/functions/v1/make-server-de695671/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Шаг 9: Создание админ пользователя

```bash
curl -X POST https://xxxxxxxxxxxxx.supabase.co/functions/v1/make-server-de695671/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@abuvet.lv",
    "password": "secure_password_here",
    "name": "Admin"
  }'
```

---

## 🎯 ВАРИАНТ 2: Frontend на Vercel + Backend на Supabase

Этот вариант аналогичен Варианту 1, но с акцентом на Vercel для frontend:

### Отличия:
- Frontend: Vercel (CDN, автоматический деплой из Git)
- Backend: Supabase Edge Functions
- Database: Supabase PostgreSQL

### Преимущества:
- Автоматический деплой при push в Git
- Превью для каждого PR
- Лучшая производительность CDN

### Настройка:

1. Создайте Git репозиторий (GitHub/GitLab/Bitbucket)
2. Загрузите код:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/abuvet.git
git push -u origin main
```

3. Подключите репозиторий к Vercel:
   - Зайдите на [vercel.com](https://vercel.com)
   - New Project
   - Import Git Repository
   - Выберите ваш репозиторий
   - Настройки:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Environment Variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. Deploy! Vercel автоматически будет деплоить при каждом push.

---

## 🎯 ВАРИАНТ 3: Собственный VPS сервер

Для полного контроля можно развернуть на собственном сервере.

### Требования:
- VPS сервер (DigitalOcean, Linode, Hetzner, и т.д.)
- Ubuntu 22.04 LTS
- Минимум: 2GB RAM, 1 vCPU, 20GB SSD

### Шаг 1: Настройка сервера

```bash
# Подключение к серверу
ssh root@your_server_ip

# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установка PostgreSQL
apt install -y postgresql postgresql-contrib

# Установка Nginx
apt install -y nginx

# Установка Certbot (для SSL)
apt install -y certbot python3-certbot-nginx

# Установка Deno (для Edge Functions)
curl -fsSL https://deno.land/install.sh | sh
echo 'export DENO_INSTALL="/root/.deno"' >> ~/.bashrc
echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Шаг 2: Настройка PostgreSQL

```bash
# Создание базы данных
sudo -u postgres psql
CREATE DATABASE abuvet_prod;
CREATE USER abuvet WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE abuvet_prod TO abuvet;
\q
```

### Шаг 3: Настройка backend

```bash
# Создание директории для приложения
mkdir -p /var/www/abuvet
cd /var/www/abuvet

# Клонирование или копирование кода
# (предполагается, что код уже на сервере)

# Создание .env файла для backend
cat > /var/www/abuvet/backend/.env << EOF
DATABASE_URL=postgresql://abuvet:your_secure_password@localhost:5432/abuvet_prod
PORT=3001
NODE_ENV=production
EOF

# Запуск Deno сервера как systemd service
cat > /etc/systemd/system/abuvet-backend.service << EOF
[Unit]
Description=Abuvet Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/abuvet/supabase/functions/server
ExecStart=/root/.deno/bin/deno run --allow-net --allow-env --allow-read index.tsx
Restart=always
RestartSec=10
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable abuvet-backend
systemctl start abuvet-backend
```

### Шаг 4: Настройка frontend

```bash
# Сборка frontend
cd /var/www/abuvet
npm install
npm run build

# Копирование в директорию Nginx
cp -r dist/* /var/www/html/
```

### Шаг 5: Настройка Nginx

```bash
cat > /etc/nginx/sites-available/abuvet << 'EOF'
server {
    listen 80;
    server_name abuvet.lv www.abuvet.lv;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name abuvet.lv www.abuvet.lv;

    # SSL certificates (будут созданы Certbot)
    ssl_certificate /etc/letsencrypt/live/abuvet.lv/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abuvet.lv/privkey.pem;

    # Frontend
    root /var/www/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
EOF

# Активация конфигурации
ln -s /etc/nginx/sites-available/abuvet /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Шаг 6: Получение SSL сертификата

```bash
certbot --nginx -d abuvet.lv -d www.abuvet.lv
```

---

## 🔧 Настройка CI/CD (опционально)

### GitHub Actions для автоматического деплоя

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 📊 Мониторинг и поддержка

### Настройка Error Tracking (Sentry)

1. Создайте аккаунт на [sentry.io](https://sentry.io)
2. Установите SDK:
```bash
npm install @sentry/react @sentry/vite-plugin
```

3. Добавьте в `src/app/App.tsx`:
```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

### Uptime мониторинг

Используйте сервисы:
- [UptimeRobot](https://uptimerobot.com) (бесплатно)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

---

## ✅ Чеклист перед запуском

- [ ] Supabase проект создан
- [ ] База данных инициализирована
- [ ] Edge Functions развернуты
- [ ] Frontend собран и развернут
- [ ] SSL настроен
- [ ] Домен привязан
- [ ] Админ пользователь создан
- [ ] Начальные данные загружены (врачи, услуги)
- [ ] Email уведомления настроены
- [ ] Переменные окружения установлены
- [ ] Мониторинг настроен
- [ ] Backup настроен
- [ ] Протестировано на production

---

## 🆘 Решение проблем

### Проблема: Edge Function не работает
```bash
# Проверка логов
supabase functions logs server

# Повторный деплой
supabase functions deploy server --no-verify-jwt
```

### Проблема: CORS ошибки
Убедитесь, что в `supabase/functions/server/index.tsx` настроен CORS:
```tsx
app.use('*', cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
}));
```

### Проблема: База данных не инициализирована
```bash
curl -X POST https://xxxxxxxxxxxxx.supabase.co/functions/v1/make-server-de695671/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи Supabase Edge Functions
2. Проверьте browser console для frontend ошибок
3. Проверьте Network tab в DevTools
4. Убедитесь, что все переменные окружения установлены

---

## 🎉 Готово!

После выполнения всех шагов ваш сайт будет доступен по адресу `https://abuvet.lv` (или вашему домену).

**Следующие шаги:**
1. Заполните реальными данными через админ панель
2. Замените Unsplash изображения на фото клиники
3. Настройте email уведомления
4. Добавьте аналитику (Google Analytics)
5. Настройте SEO метатеги

**Удачи с запуском! 🚀**
