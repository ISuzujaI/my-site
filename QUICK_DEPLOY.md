# ⚡ Быстрое развертывание за 15 минут

Эта инструкция поможет вам развернуть сайт Abuvet на production за минимальное время.

## 🎯 Выбор платформы

**Рекомендуется:** Vercel (frontend) + Supabase (backend + database)

**Почему:**
- ✅ Бесплатный tier для малого и среднего трафика
- ✅ Автоматический SSL
- ✅ CDN по всему миру
- ✅ Простая настройка
- ✅ Автоматические деплои из Git

---

## 📝 Шаг 1: Подготовка (2 минуты)

### 1.1 Создайте аккаунты

1. [Supabase](https://supabase.com) - для backend и базы данных
2. [Vercel](https://vercel.com) - для frontend
3. [GitHub](https://github.com) - для хранения кода (опционально)

### 1.2 Установите необходимые инструменты

```bash
# Supabase CLI
npm install -g supabase

# Vercel CLI
npm install -g vercel
```

---

## 🗄️ Шаг 2: Настройка Supabase (5 минут)

### 2.1 Создайте проект

1. Зайдите на [supabase.com](https://supabase.com)
2. Нажмите **"New Project"**
3. Заполните:
   - **Organization**: Создайте или выберите существующую
   - **Name**: `abuvet-production`
   - **Database Password**: Придумайте надежный пароль (сохраните его!)
   - **Region**: `Europe (Frankfurt)` или `Europe (Stockholm)`
   - **Plan**: Free (для начала)
4. Нажмите **"Create new project"**
5. Подождите 2-3 минуты

### 2.2 Получите учетные данные

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIs...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIs...`

### 2.3 Инициализируйте базу данных

1. Перейдите в **SQL Editor**
2. Нажмите **"New query"**
3. Скопируйте содержимое файла `/scripts/init-database.sql`
4. Вставьте в редактор и нажмите **"Run"**
5. Дождитесь сообщения "Success"

### 2.4 Разверните Edge Functions

```bash
# В корне вашего проекта
cd /path/to/your/abuvet-project

# Логин в Supabase
supabase login

# Свяжите проект (замените xxxxxxxxxxxxx на ваш Project ID)
supabase link --project-ref xxxxxxxxxxxxx

# Разверните Edge Function
supabase functions deploy server --no-verify-jwt

# Установите секреты (замените на ваши значения)
supabase secrets set SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 2.5 Инициализируйте данные

```bash
# Замените URL и KEY на ваши
curl -X POST https://xxxxxxxxxxxxx.supabase.co/functions/v1/make-server-de695671/seed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Вы должны увидеть: `{"success":true,"message":"Database seeded successfully"}`

---

## 🌐 Шаг 3: Развертывание Frontend (5 минут)

### 3.1 Подготовьте переменные окружения

Создайте файл `.env.production`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 3.2 Разверните на Vercel

#### Вариант A: Через CLI (быстрее)

```bash
# Установите зависимости
npm install

# Логин в Vercel
vercel login

# Деплой
vercel --prod

# Следуйте инструкциям:
# - Setup and deploy? Yes
# - Which scope? Выберите ваш аккаунт
# - Link to existing project? No
# - Project name? abuvet
# - Directory? ./
# - Override settings? No
```

#### Вариант B: Через Git + Vercel Dashboard (рекомендуется для продакшена)

1. **Создайте Git репозиторий:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/abuvet.git
git push -u origin main
```

2. **Подключите к Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите **"New Project"**
   - Выберите **"Import Git Repository"**
   - Найдите и выберите ваш репозиторий `abuvet`
   - Настройки:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - **Environment Variables** - добавьте:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Нажмите **"Deploy"**

3. **Дождитесь завершения** (1-2 минуты)

### 3.3 Проверьте сайт

Vercel даст вам URL типа: `https://abuvet.vercel.app`

Откройте его и проверьте:
- ✅ Главная страница загружается
- ✅ Переключение языков работает
- ✅ Все разделы доступны

---

## 👤 Шаг 4: Создание админ пользователя (1 минута)

```bash
curl -X POST https://xxxxxxxxxxxxx.supabase.co/functions/v1/make-server-de695671/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@abuvet.lv",
    "password": "YourSecurePassword123!",
    "name": "Администратор"
  }'
```

Теперь вы можете войти:
1. Откройте сайт
2. Нажмите "Войти"
3. Введите `admin@abuvet.lv` и ваш пароль
4. Перейдите в `/admin` для управления

---

## 🌍 Шаг 5: Настройка домена (2 минуты)

### 5.1 В Vercel Dashboard

1. Перейдите в **Settings** → **Domains**
2. Добавьте ваш домен: `abuvet.lv`
3. Vercel покажет DNS записи

### 5.2 У вашего регистратора доменов

Добавьте A-запись:

```
Type: A
Name: @
Value: 76.76.21.21 (или IP от Vercel)
```

Добавьте CNAME для www:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (или значение от Vercel)
```

### 5.3 Дождитесь DNS пропагации

Обычно занимает 5-30 минут, иногда до 24 часов.

Проверить можно на [whatsmydns.net](https://www.whatsmydns.net/)

---

## ✅ Готово!

Ваш сайт теперь доступен по адресу `https://abuvet.lv`

### 🎉 Что у вас есть:

- ✅ Рабочий сайт на production
- ✅ Автоматический SSL (HTTPS)
- ✅ Backend API на Supabase
- ✅ База данных PostgreSQL
- ✅ Админ панель
- ✅ Система онлайн-записи
- ✅ Три языка (LV, RU, EN)

---

## 🔄 Обновление сайта

После первого деплоя обновления очень просты:

### Если используете Git:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически задеплоит изменения!

### Если используете CLI:

```bash
npm run build
vercel --prod
```

---

## 📋 Следующие шаги

1. **Замените тестовые данные на реальные:**
   - Зайдите в админ панель `/admin`
   - Добавьте реальных врачей
   - Обновите услуги и цены
   - Настройте расписание

2. **Замените изображения:**
   - Загрузите реальные фото клиники
   - Замените фото врачей
   - Обновите логотип

3. **Настройте email уведомления:**
   - В Supabase Dashboard → Authentication → Settings
   - Настройте SMTP сервер
   - Включите email подтверждение

4. **Добавьте аналитику:**
   - Google Analytics
   - Яндекс.Метрика

5. **Проверьте все функции:**
   - Регистрация пользователей
   - Онлайн-запись
   - Личный кабинет
   - Админ панель

---

## 🆘 Проблемы?

### Frontend не загружается
```bash
# Проверьте логи Vercel
vercel logs

# Убедитесь, что переменные окружения установлены
vercel env ls
```

### Backend не отвечает
```bash
# Проверьте логи Edge Function
supabase functions logs server

# Убедитесь, что секреты установлены
supabase secrets list
```

### База данных не инициализирована
```bash
# Повторно выполните миграцию в Supabase SQL Editor
# Файл: /scripts/init-database.sql
```

---

## 📞 Полезные ссылки

- **Документация Supabase**: https://supabase.com/docs
- **Документация Vercel**: https://vercel.com/docs
- **Статус сервисов**: 
  - Supabase: https://status.supabase.com
  - Vercel: https://www.vercel-status.com

---

## 🎊 Поздравляю!

Ваш сайт ветеринарной клиники Abuvet теперь работает в production!

**Время деплоя:** ~15 минут  
**Стоимость:** $0 (на бесплатных tierах)  
**Результат:** Профессиональный сайт с backend и базой данных

**Удачи! 🚀**
