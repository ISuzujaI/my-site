# 📊 Диаграмма процесса развертывания Abuvet

Визуальное представление архитектуры и процесса развертывания.

---

## 🏗️ Архитектура приложения

```
┌─────────────────────────────────────────────────────────────────┐
│                         ПОЛЬЗОВАТЕЛИ                            │
│  🌐 Browser │ 📱 Mobile │ 💻 Desktop │ 🖥️ Tablet                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel/Netlify)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React Application (SPA)                                 │   │
│  │  ├── React Router (routing)                              │   │
│  │  ├── Tailwind CSS (styling)                              │   │
│  │  ├── Context API (state management)                      │   │
│  │  └── Components                                           │   │
│  │      ├── Pages (Home, About, Services, etc.)             │   │
│  │      ├── Admin Panel                                      │   │
│  │      ├── CMS Components (EditableText, EditableImage)    │   │
│  │      └── UI Components (shadcn/ui)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  📦 Static Files:                                                │
│  ├── HTML, CSS, JS (bundled)                                    │
│  ├── Images, Fonts                                               │
│  └── CDN Distribution                                            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │ REST API calls
                         │ Authorization: Bearer <token>
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Supabase Edge Functions)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Hono Web Server (Deno Runtime)                          │   │
│  │  ├── Routes:                                              │   │
│  │  │   ├── /make-server-de695671/doctors                   │   │
│  │  │   ├── /make-server-de695671/services                  │   │
│  │  │   ├── /make-server-de695671/bookings                  │   │
│  │  │   ├── /make-server-de695671/schedule                  │   │
│  │  │   ├── /make-server-de695671/auth/*                    │   │
│  │  │   ├── /make-server-de695671/content/*                 │   │
│  │  │   └── /make-server-de695671/upload                    │   │
│  │  │                                                         │   │
│  │  ├── Middleware:                                          │   │
│  │  │   ├── CORS                                             │   │
│  │  │   ├── Logger                                           │   │
│  │  │   └── Error Handler                                    │   │
│  │  │                                                         │   │
│  │  └── Features:                                            │   │
│  │      ├── Retry logic                                      │   │
│  │      ├── Graceful fallbacks                               │   │
│  │      └── Connection pooling                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │ SQL queries
                         │ Service role key
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (Supabase PostgreSQL)                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Tables:                                                  │   │
│  │  └── kv_store_de695671 (Key-Value storage)               │   │
│  │      ├── key: TEXT (PRIMARY KEY)                          │   │
│  │      ├── value: JSONB                                     │   │
│  │      ├── created_at: TIMESTAMP                            │   │
│  │      └── updated_at: TIMESTAMP                            │   │
│  │                                                            │   │
│  │  Data stored:                                              │   │
│  │  ├── doctor:* (врачи)                                     │   │
│  │  ├── service:* (услуги)                                   │   │
│  │  ├── booking:* (записи)                                   │   │
│  │  ├── schedule:* (расписание)                              │   │
│  │  ├── content:* (CMS контент)                              │   │
│  │  └── settings:* (настройки)                               │   │
│  │                                                            │   │
│  │  Indexes:                                                  │   │
│  │  ├── idx_kv_store_key_prefix (для поиска по префиксу)     │   │
│  │  └── idx_kv_store_value_gin (для JSONB поиска)            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  🔒 Security:                                                    │
│  ├── Row Level Security (RLS)                                   │
│  ├── Policies для каждой таблицы                                │
│  └── Encrypted at rest                                           │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│             STORAGE (Supabase Storage Buckets)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Buckets:                                                 │   │
│  │  ├── make-de695671-doctors (фото врачей)                  │   │
│  │  └── make-de695671-content (изображения контента)         │   │
│  │                                                            │   │
│  │  Features:                                                 │   │
│  │  ├── Automatic resize                                     │   │
│  │  ├── CDN delivery                                          │   │
│  │  ├── Signed URLs (private access)                         │   │
│  │  └── Image transformations                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION (Supabase Auth)                 │
│  ├── Email/Password authentication                              │
│  ├── Session management                                          │
│  ├── JWT tokens                                                  │
│  └── Password reset                                              │
└─────────────────────────────��───────────────────────────────────┘
```

---

## 🔄 Процесс развертывания

### Шаг 1: Подготовка

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Создать аккаунты:       │
│ ✓ Supabase.com          │
│ ✓ Vercel.com            │
│ ✓ GitHub.com (optional) │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Установить инструменты: │
│ ✓ Node.js               │
│ ✓ Supabase CLI          │
│ ✓ Vercel CLI            │
└──────┬──────────────────┘
       │
       ▼
```

### Шаг 2: Настройка Supabase (Backend)

```
       │
       ▼
┌─────────────────────────┐
│ Создать Supabase проект │
│ - Name: abuvet          │
│ - Region: Europe        │
│ - Plan: Free/Pro        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Получить credentials:   │
│ - Project URL           │
│ - anon key              │
│ - service_role key      │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Выполнить SQL миграцию: │
│ /scripts/init-database  │
│ .sql                    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Развернуть Edge Func:   │
│ supabase functions      │
│ deploy server           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Установить секреты:     │
│ - SUPABASE_URL          │
│ - SUPABASE_ANON_KEY     │
│ - SERVICE_ROLE_KEY      │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Загрузить seed данные:  │
│ POST /seed              │
└──────┬──────────────────┘
       │
       ▼
   ✅ Backend готов
```

### Шаг 3: Настройка Vercel (Frontend)

```
       │
       ▼
┌─────────────────────────┐
│ Создать .env.production │
│ - VITE_SUPABASE_URL     │
│ - VITE_SUPABASE_ANON    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Собрать приложение:     │
│ npm run build           │
└──────┬──────────────────┘
       │
       ▼
   ┌──┴──┐
   │ Git?│
   └──┬──┘
      │
 ┌────┴────┐
 │         │
Yes       No
 │         │
 │         ▼
 │    ┌─────────────────┐
 │    │ Vercel CLI:     │
 │    │ vercel --prod   │
 │    └────────┬────────┘
 │             │
 ▼             │
┌──────────────┴──────┐
│ Git + Vercel:       │
│ 1. git push         │
│ 2. Connect repo     │
│ 3. Auto deploy      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────┐
│ Настроить env vars в    │
│ Vercel Dashboard        │
└──────┬──────────────────┘
       │
       ▼
   ✅ Frontend готов
```

### Шаг 4: Финализация

```
       │
       ▼
┌─────────────────────────┐
│ Создать админ юзера:    │
│ POST /auth/signup       │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Настроить домен:        │
│ - Добавить в Vercel     │
│ - Настроить DNS         │
│ - SSL автоматически     │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Протестировать:         │
│ ✓ Все страницы          │
│ ✓ Авторизация           │
│ ✓ Админ панель          │
│ ✓ Онлайн-запись         │
│ ✓ CMS редактирование    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Настроить мониторинг:   │
│ - Uptime Robot          │
│ - Sentry                │
│ - Google Analytics      │
└──────┬──────────────────┘
       │
       ▼
┌─────────────┐
│  🎉 ГОТОВО! │
└─────────────┘
```

---

## 🔄 Процесс обновления после деплоя

### Автоматический (через Git)

```
┌──────────────┐
│ Изменения в  │
│ коде         │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ git commit   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ git push     │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ GitHub Actions       │
│ (CI/CD pipeline)     │
│ ├── npm install      │
│ ├── npm run build    │
│ ├── Tests            │
│ └── Deploy           │
└──────┬───────────────┘
       │
   ┌───┴───┐
   │       │
   ▼       ▼
Frontend  Backend
Deploy    Deploy
   │       │
   │       ▼
   │  ┌────────────┐
   │  │ Supabase   │
   │  │ Edge Func  │
   │  └────────────┘
   │
   ▼
┌────────────┐
│ Vercel     │
│ Production │
└──────┬─────┘
       │
       ▼
   ✅ Live
```

### Ручной (через CLI)

```
┌──────────────┐
│ Изменения в  │
│ коде         │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ npm run build│
└──────┬───────┘
       │
   ┌───┴────┐
   │ Что?   │
   └───┬────┘
       │
  ┌────┴────┐
  │         │
Frontend  Backend
  │         │
  ▼         ▼
vercel    supabase
--prod    functions
          deploy
  │         │
  └────┬────┘
       │
       ▼
   ✅ Live
```

---

## 📊 Поток данных

### Создание записи на прием

```
┌─────────┐
│ User    │
│ fills   │
│ form    │
└────┬────┘
     │
     ▼
┌──────────────────┐
│ Frontend         │
│ validates data   │
└────┬─────────────┘
     │
     │ POST /bookings
     │ Authorization: Bearer <token>
     │ Body: { doctorId, date, time, ... }
     │
     ▼
┌──────────────────────────┐
│ Backend                  │
│ (Edge Function)          │
│ ├── Authenticate user    │
│ ├── Validate input       │
│ ├── Check availability   │
│ └── Create booking       │
└────┬─────────────────────┘
     │
     │ INSERT INTO kv_store
     │ key: booking:<id>
     │ value: {...}
     │
     ▼
┌──────────────────┐
│ Database         │
│ stores booking   │
└────┬─────────────┘
     │
     │ Success response
     │
     ▼
┌──────────────────┐
│ Backend          │
│ returns data     │
└────┬─────────────┘
     │
     │ { success: true, bookingId: "..." }
     │
     ▼
┌──────────────────┐
│ Frontend         │
│ shows success    │
│ & redirect       │
└──────────────────┘
```

### Редактирование контента через CMS

```
┌─────────┐
│ Admin   │
│ enables │
│ edit    │
│ mode    │
└────┬────┘
     │
     ▼
┌──────────────────┐
│ EditableText     │
│ component        │
│ becomes editable │
└────┬─────────────┘
     │
     │ User edits text
     │
     ▼
┌──────────────────┐
│ Auto-save        │
│ (debounced)      │
└────┬─────────────┘
     │
     │ PATCH /content/:key
     │ Body: { value: "..." }
     │
     ▼
┌──────────────────────────┐
│ Backend with Retry       │
│ ├── Attempt 1            │
│ ├── Attempt 2 (if fail)  │
│ └── Attempt 3 (if fail)  │
└────┬─────────────────────┘
     │
     │ UPDATE kv_store
     │ SET value = ...
     │ WHERE key = content:...
     │
     ▼
┌──────────────────┐
│ Database         │
│ updates content  │
└────┬─────────────┘
     │
     │ Success
     │
     ▼
┌──────────────────┐
│ Frontend         │
│ shows toast      │
│ "Saved!"         │
└──────────────────┘
```

---

## 🔐 Безопасность

### Уровни защиты

```
┌───────────────────────────────────────┐
│  Layer 1: Network                     │
│  ├── HTTPS (SSL/TLS)                  │
│  ├── CORS                             │
│  └── Rate Limiting                    │
└─────────────┬─────────────────────────┘
              │
┌─────────────▼─────────────────────────┐
│  Layer 2: Authentication              │
│  ├── JWT tokens                       │
│  ├── Session management               │
│  └── Password hashing (bcrypt)        │
└─────────────┬─────────────────────────┘
              │
┌─────────────▼─────────────────────────┐
│  Layer 3: Authorization               │
│  ├── Role-based access                │
│  ├── Admin-only routes                │
│  └── User ownership checks            │
└─────────────┬─────────────────────────┘
              │
┌─────────────▼─────────────────────────┐
│  Layer 4: Database                    │
│  ├── Row Level Security (RLS)         │
│  ├── Parameterized queries            │
│  └── Encrypted at rest                │
└─────────────┬─────────────────────────┘
              │
┌─────────────▼─────────────────────────┐
│  Layer 5: Application                 │
│  ├── Input validation                 │
│  ├── XSS protection (React escaping)  │
│  ├── CSRF protection                  │
│  └── Sanitization                     │
└───────────────────────────────────────┘
```

---

## 📈 Масштабирование

### Текущая архитектура (до 10,000 пользователей/месяц)

```
Vercel Free Tier:
├── 100GB bandwidth
├── Unlimited sites
└── Automatic scaling

Supabase Free Tier:
├── 500MB database
├── 1GB storage
├── 2GB bandwidth
└── 500,000 Edge Function invocations/month
```

### Рост до 100,000 пользователей/месяц

```
Vercel Pro ($20/month):
├── 1TB bandwidth
├── Unlimited builds
└── Advanced analytics

Supabase Pro ($25/month):
├── 8GB database
├── 100GB storage
├── 250GB bandwidth
└── 2M Edge Function invocations/month
```

### Enterprise (1M+ пользователей)

```
Custom plan:
├── Dedicated instances
├── Custom SLA
├── Premium support
└── Advanced security
```

---

## 🎯 Оптимизация производительности

### Frontend

```
Code Splitting
     │
     ▼
Lazy Loading
     │
     ▼
Image Optimization
     │
     ▼
CDN Caching
     │
     ▼
Minification
     │
     ▼
Tree Shaking
     │
     ▼
⚡ Fast Load Time
```

### Backend

```
Connection Pooling
     │
     ▼
Query Optimization
     │
     ▼
Caching (Redis)
     │
     ▼
Rate Limiting
     │
     ▼
Async Processing
     │
     ▼
⚡ Fast Response
```

---

## 📊 Мониторинг

```
┌─────────────────────────────────────────────┐
│  Uptime Monitoring (UptimeRobot)            │
│  ├── Check every 5 minutes                  │
│  ├── Alert if down                          │
│  └── 99.9% uptime target                    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Error Tracking (Sentry)                    │
│  ├── Frontend errors                        │
│  ├── Backend errors                         │
│  └── Real-time alerts                       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Analytics (Google Analytics)               │
│  ├── User behavior                          │
│  ├── Conversion tracking                    │
│  └── Performance metrics                    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Logging (Supabase + Vercel)                │
│  ├── API requests                           │
│  ├── Database queries                       │
│  └── Performance traces                     │
└─────────────────────────────────────────────┘
```

---

*Эта диаграмма показывает полную архитектуру и процесс развертывания проекта Abuvet*
