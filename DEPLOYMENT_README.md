# 📚 Руководства по развертыванию - Полный обзор

Этот документ объясняет все файлы и руководства, созданные для развертывания вашего сайта Abuvet.

---

## 📁 Структура файлов развертывания

```
/
├── 📘 PRODUCTION_DEPLOYMENT_GUIDE.md   - Полное руководство по развертыванию
├── ⚡ QUICK_DEPLOY.md                  - Быстрый старт за 15 минут
├── 📋 PRE_LAUNCH_CHECKLIST.md          - Чеклист готовности к production
├── 🚀 DEPLOY_SUMMARY.md                - Краткая шпаргалка с командами
├── 📊 DEPLOYMENT_CHECKLIST.md          - Расширенный чеклист задач
├── 🔧 .env.production.example          - Пример файла переменных окружения
├── ⚙️  vercel.json                      - Конфигурация Vercel
├── ⚙️  netlify.toml                     - Конфигурация Netlify
├── 🤖 .github/workflows/deploy-production.yml - CI/CD для автоматического деплоя
├── 🔒 .gitignore                        - Исключения для Git
│
├── scripts/
│   ├── 📜 deploy.sh                    - Bash скрипт для быстрого деплоя
│   └── 🗄️  init-database.sql           - SQL миграция для базы данных
│
└── package.json                        - Обновлен с полезными скриптами
```

---

## 🎯 Какой файл использовать?

### Я новичок, хочу быстро развернуть
👉 **Начните с:** `/QUICK_DEPLOY.md`

Это пошаговая инструкция на 15 минут, которая проведет вас через весь процесс развертывания от создания аккаунтов до запущенного сайта.

### Я опытный разработчик, нужны детали
👉 **Читайте:** `/PRODUCTION_DEPLOYMENT_GUIDE.md`

Полное руководство с тремя вариантами развертывания:
- Supabase (backend + database)
- Vercel/Netlify (frontend)
- VPS сервер (полный контроль)

### Нужна быстрая шпаргалка по командам
👉 **Используйте:** `/DEPLOY_SUMMARY.md`

Краткий справочник со всеми основными командами для развертывания, мониторинга и отладки.

### Хочу проверить готовность к запуску
👉 **Откройте:** `/PRE_LAUNCH_CHECKLIST.md`

Подробный чеклист с категориями:
- Инфраструктура
- Безопасность
- Контент
- Функциональность
- SEO
- и многое другое

### Нужен список всех задач перед production
👉 **Смотрите:** `/DEPLOYMENT_CHECKLIST.md`

Расширенный чеклист охватывающий:
- Базовую настройку
- GDPR соответствие
- Интеграции
- Тестирование
- Маркетинг

---

## 🚀 Рекомендуемый порядок действий

### Этап 1: Подготовка (День 1)

1. **Прочитайте обзор:**
   - `/PRODUCTION_DEPLOYMENT_GUIDE.md` (секция "Архитектура")
   - `/QUICK_DEPLOY.md` (секция "Выбор платформы")

2. **Создайте аккаунты:**
   - Supabase.com
   - Vercel.com или Netlify.com
   - GitHub.com (для CI/CD)

3. **Установите инструменты:**
   ```bash
   npm install -g supabase vercel
   ```

### Этап 2: Развертывание Backend (День 1-2)

1. **Следуйте инструкциям в** `/QUICK_DEPLOY.md` → Шаг 2

2. **Выполните SQL миграцию:**
   - Откройте `/scripts/init-database.sql`
   - Скопируйте в Supabase SQL Editor
   - Запустите

3. **Разверните Edge Functions:**
   ```bash
   supabase functions deploy server --no-verify-jwt
   ```

4. **Проверьте работу:**
   ```bash
   supabase functions logs server
   ```

### Этап 3: Развертывание Frontend (День 2)

1. **Создайте .env.production:**
   ```bash
   cp .env.production.example .env.production
   # Заполните реальными значениями
   ```

2. **Соберите и разверните:**
   
   **Вариант A - Vercel CLI:**
   ```bash
   npm run build
   vercel --prod
   ```
   
   **Вариант B - Git + Vercel Dashboard:**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git push origin main
   # Затем подключите репозиторий в Vercel Dashboard
   ```

3. **Проверьте сайт** на временном URL от Vercel

### Этап 4: Инициализация данных (День 2)

1. **Загрузите начальные данные:**
   ```bash
   curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/seed \
     -H "Authorization: Bearer YOUR_ANON_KEY"
   ```

2. **Создайте админ пользователя:**
   ```bash
   curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-de695671/auth/signup \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -d '{"email": "admin@abuvet.lv", "password": "SecurePass123!", "name": "Admin"}'
   ```

3. **Войдите в админ панель** и добавьте реальных врачей

### Этап 5: Настройка домена (День 2-3)

1. **Добавьте домен в Vercel:**
   - Settings → Domains
   - Добавьте `abuvet.lv`

2. **Настройте DNS у регистратора:**
   - Следуйте инструкциям из `/DEPLOY_SUMMARY.md`

3. **Дождитесь DNS пропагации** (5-30 минут)

### Этап 6: Заполнение контента (День 3-5)

1. **Откройте** `/PRE_LAUNCH_CHECKLIST.md`

2. **Заполните раздел "Контент и Данные":**
   - Добавьте реальных врачей
   - Обновите услуги и цены
   - Замените изображения
   - Проверьте переводы

3. **Используйте CMS** для редактирования текстов:
   - Войдите как админ
   - Включите режим редактирования
   - Обновите тексты на всех страницах

### Этап 7: Настройка интеграций (День 5-7)

1. **Email уведомления:**
   - Supabase Dashboard → Authentication → Settings
   - Настройте SMTP
   - Протестируйте

2. **Аналитика:**
   - Добавьте Google Analytics
   - Добавьте Яндекс.Метрику

3. **Мониторинг:**
   - Настройте UptimeRobot
   - Настройте Sentry (опционально)

### Этап 8: Тестирование (День 7-10)

1. **Откройте** `/PRE_LAUNCH_CHECKLIST.md`

2. **Выполните раздел "Тестирование":**
   - Функциональное тестирование
   - Кроссбраузерность
   - Адаптивность
   - Производительность

3. **Используйте инструменты:**
   - Lighthouse (в Chrome DevTools)
   - PageSpeed Insights
   - GTmetrix

### Этап 9: Финальная проверка (День 10-14)

1. **Пройдите** `/PRE_LAUNCH_CHECKLIST.md` **полностью**

2. **Убедитесь:**
   - ✅ Все критичные элементы (100%)
   - ✅ Важные элементы (>80%)
   - 🟡 Желательные элементы (по возможности)

3. **Проведите финальное тестирование:**
   - Регистрация → Запись → Отмена
   - Админ панель → CRUD операции
   - Все формы
   - Email уведомления

### Этап 10: ЗАПУСК! (День 14)

1. **Последняя проверка:**
   ```bash
   # Проверьте логи
   supabase functions logs server
   vercel logs
   
   # Проверьте статус
   curl https://abuvet.lv/api/health
   ```

2. **Объявите о запуске!** 🎉

3. **Мониторьте первые 24 часа:**
   - Логи
   - Аналитика
   - User feedback

---

## 🛠️ Описание конфигурационных файлов

### `.env.production.example`

Шаблон для переменных окружения. Скопируйте в `.env.production` и заполните реальными значениями:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

### `vercel.json`

Конфигурация для Vercel deployment:
- Настройки сборки
- Rewrites для SPA routing
- Security headers
- Cache headers для статики

### `netlify.toml`

Аналогично для Netlify:
- Build команды
- Redirects для SPA
- Headers

### `.github/workflows/deploy-production.yml`

GitHub Actions workflow для автоматического развертывания:
- Триггер: push в main ветку
- Сборка frontend
- Деплой на Vercel
- Деплой Edge Functions на Supabase
- Уведомления о статусе

### `scripts/deploy.sh`

Bash скрипт для ручного деплоя:

```bash
# Использование:
./scripts/deploy.sh vercel    # Деплой на Vercel
./scripts/deploy.sh netlify   # Деплой на Netlify
./scripts/deploy.sh supabase  # Деплой Edge Functions
```

### `scripts/init-database.sql`

SQL миграция для Supabase PostgreSQL:
- Создание таблицы `kv_store_de695671`
- Индексы для производительности
- Row Level Security (RLS) политики
- Storage buckets
- Представления (views)
- Utility функции

### `package.json` (обновлен)

Добавлены полезные npm скрипты:

```json
{
  "scripts": {
    "deploy:vercel": "vercel --prod",
    "deploy:supabase": "supabase functions deploy server --no-verify-jwt",
    "deploy:all": "npm run build && npm run deploy:vercel && npm run deploy:supabase",
    "supabase:logs": "supabase functions logs server",
    "check:build": "npm run build && echo '✅ Build successful!'"
  }
}
```

---

## 📖 Описание руководств

### `PRODUCTION_DEPLOYMENT_GUIDE.md`

**Размер:** ~500 строк  
**Время чтения:** 30 минут  
**Аудитория:** Все уровни

**Содержание:**
- Обзор архитектуры приложения
- 3 варианта развертывания (Supabase, Vercel+Supabase, VPS)
- Пошаговые инструкции для каждого варианта
- Настройка CI/CD
- Мониторинг и поддержка
- Решение проблем

**Когда использовать:**
- Первое развертывание
- Нужны детали и объяснения
- Выбор между разными вариантами

### `QUICK_DEPLOY.md`

**Размер:** ~300 строк  
**Время деплоя:** 15 минут  
**Аудитория:** Все уровни

**Содержание:**
- Сжатая инструкция без лишних слов
- 5 шагов до запущенного сайта
- Копируй-вставь команды
- Минимальные объяснения

**Когда использовать:**
- Нужно быстро развернуть
- Уже знакомы с Supabase/Vercel
- Следуете рекомендуемому стеку

### `DEPLOY_SUMMARY.md`

**Размер:** ~400 строк  
**Время чтения:** 5 минут  
**Аудитория:** Опытные разработчики

**Содержание:**
- Шпаргалка с командами
- Быстрый старт (краткий)
- Все npm скрипты
- Основные команды CLI
- Troubleshooting

**Когда использовать:**
- Уже развернули раз, нужно повторить
- Нужна конкретная команда
- Быстрый lookup

### `PRE_LAUNCH_CHECKLIST.md`

**Размер:** ~400 строк  
**Формат:** Чеклист  
**Аудитория:** PM, QA, Devs

**Содержание:**
- 12 категорий проверок
- ~150 пунктов
- Приоритеты (критично, важно, желательно)
- Progress tracker

**Когда использовать:**
- Подготовка к production запуску
- QA тестирование
- Финальная проверка

### `DEPLOYMENT_CHECKLIST.md`

**Размер:** ~240 строк  
**Формат:** Расширенный чеклист  
**Аудитория:** Product team

**Содержание:**
- Контент
- GDPR и безопасность
- Интеграции (email, SMS, карты)
- Дизайн и UX
- SEO и метрики
- Опциональные улучшения

**Когда использовать:**
- Планирование запуска
- Управление проектом
- Долгосрочные цели

---

## 💡 Полезные советы

### Для новичков

1. **Начните с** `/QUICK_DEPLOY.md`
2. **Не пропускайте шаги** - они в правильном порядке
3. **Сохраняйте все учетные данные** в надежном месте (1Password, Bitwarden)
4. **Тестируйте на каждом этапе** - не ждите до конца

### Для опытных разработчиков

1. **Используйте Git** с самого начала
2. **Настройте CI/CD** через GitHub Actions
3. **Автоматизируйте** через npm скрипты
4. **Мониторьте** с первого дня

### Для команд

1. **Распределите задачи** по `/DEPLOYMENT_CHECKLIST.md`
2. **Используйте** `/PRE_LAUNCH_CHECKLIST.md` для sprint planning
3. **Настройте** review процесс перед production
4. **Документируйте** все изменения в конфигурации

---

## 🔄 Обновление после деплоя

### Автоматический деплой (Git)

```bash
# 1. Внесите изменения
# 2. Commit & push
git add .
git commit -m "Update: описание изменений"
git push origin main

# 3. GitHub Actions автоматически задеплоит
# 4. Проверьте в Vercel Dashboard
```

### Ручной деплой

```bash
# Frontend
npm run build
npm run deploy:vercel

# Backend
npm run deploy:supabase

# Или всё сразу
npm run deploy:all
```

### Откат (Rollback)

**В Vercel:**
1. Dashboard → Deployments
2. Найдите предыдущий successful deployment
3. Нажмите "..." → Promote to Production

**В Supabase:**
```bash
# Повторно разверните предыдущую версию
git checkout <previous-commit>
supabase functions deploy server --no-verify-jwt
git checkout main
```

---

## 📊 Мониторинг production

### Что мониторить

1. **Uptime** (UptimeRobot)
   - Доступность сайта
   - API endpoints

2. **Errors** (Sentry)
   - Frontend ошибки
   - Backend ошибки
   - Частота и паттерны

3. **Performance** (Lighthouse CI)
   - Скорость загрузки
   - Core Web Vitals
   - Регрессии

4. **Analytics** (Google Analytics)
   - Трафик
   - Конверсии
   - User behavior

5. **Logs** (Supabase + Vercel)
   - API requests
   - Database queries
   - Edge Function logs

### Инструменты

```bash
# Реальное время логи
supabase functions logs server --tail
vercel logs --follow

# Проверка статуса
curl https://abuvet.lv/health

# Lighthouse audit
lighthouse https://abuvet.lv --view
```

---

## 🆘 Получение помощи

### Проблемы с развертыванием

1. **Проверьте логи** (см. `/DEPLOY_SUMMARY.md` → "Мониторинг и отладка")
2. **Поиск в документации:**
   - Supabase: https://supabase.com/docs
   - Vercel: https://vercel.com/docs
3. **Community поддержка:**
   - Supabase Discord
   - Vercel Discord

### Баги в приложении

1. **Проверьте browser console**
2. **Проверьте Supabase logs**
3. **Воспроизведите локально**
4. **Создайте issue** в Git репозитории

### Консультация

Если нужна помощь:
- Создайте подробное описание проблемы
- Приложите логи и скриншоты
- Укажите шаги для воспроизведения

---

## ✅ Финальный чеклист

Перед тем как считать развертывание завершенным:

- [ ] Сайт доступен по домену с HTTPS
- [ ] Все страницы загружаются
- [ ] Админ панель работает
- [ ] Система записи функционирует
- [ ] Email уведомления отправляются
- [ ] Мониторинг настроен
- [ ] Backup настроен
- [ ] Команда обучена
- [ ] Документация обновлена
- [ ] Запуск анонсирован

---

## 🎉 Поздравляем!

Если вы читаете это, значит вы готовы к развертыванию!

**Основные файлы для старта:**
1. `/QUICK_DEPLOY.md` - начните отсюда
2. `/DEPLOY_SUMMARY.md` - держите под рукой
3. `/PRE_LAUNCH_CHECKLIST.md` - используйте перед запуском

**Время от начала до production:**
- Минимум: 15 минут (с готовыми данными)
- Реально: 2-14 дней (с заполнением контента и тестированием)

**Удачи с запуском вашей ветеринарной клиники Abuvet! 🚀**

---

*Последнее обновление: 22 марта 2026*
