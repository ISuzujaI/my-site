# 🚀 Начните здесь - Развертывание Abuvet

> **Время до запуска:** 15 минут ⏱️  
> **Сложность:** Легко 🟢  
> **Стоимость:** Бесплатно 💰

---

## 🎯 Что вы получите

После выполнения этой инструкции у вас будет:

✅ Рабочий сайт на production  
✅ Админ панель для управления  
✅ База данных с начальными данными  
✅ HTTPS и собственный домен (опционально)  
✅ Система онлайн-записи  

---

## 📋 Что нужно подготовить

Перед началом убедитесь, что у вас есть:

- [ ] Email адрес
- [ ] Телефон (для подтверждения аккаунтов)
- [ ] 15-30 минут свободного времени
- [ ] Компьютер с доступом в интернет
- [ ] Базовые знания терминала (необязательно)

---

## 🛤️ Выберите ваш путь

### Путь 1: Я новичок, хочу простую инструкцию
👉 **Читайте ниже** эту страницу полностью

### Путь 2: Я разработчик, дайте мне команды
👉 **Откройте:** `/QUICK_DEPLOY.md`

### Путь 3: Мне нужны все детали и варианты
👉 **Откройте:** `/PRODUCTION_DEPLOYMENT_GUIDE.md`

---

## 🎬 Пошаговая инструкция для новичков

### ШАГ 1: Создайте аккаунты (5 минут)

#### 1.1 Supabase (для backend)

1. Откройте 🌐 [supabase.com](https://supabase.com)
2. Нажмите **"Start your project"**
3. Войдите через GitHub (или создайте аккаунт)
4. ✅ Готово!

#### 1.2 Vercel (для frontend)

1. Откройте 🌐 [vercel.com](https://vercel.com)
2. Нажмите **"Sign Up"**
3. Войдите через GitHub (или создайте аккаунт)
4. ✅ Готово!

---

### ШАГ 2: Создайте Supabase проект (3 минуты)

1. В Supabase нажмите **"New Project"**

2. Заполните форму:
   ```
   Name: abuvet-production
   Database Password: [придумайте сложный пароль]
   Region: Europe (Frankfurt)
   Plan: Free
   ```

3. Нажмите **"Create new project"**

4. ⏳ Подождите 2-3 минуты (проект создается)

5. ✅ Когда статус станет "Active", переходите дальше

---

### ШАГ 3: Получите учетные данные (1 минута)

1. В вашем Supabase проекте найдите левое меню

2. Нажмите **⚙️ Settings** → **API**

3. Скопируйте и сохраните (можно в текстовый файл):

   ```
   📝 СОХРАНИТЕ ЭТО:
   
   Project URL: 
   [скопируйте из "Project URL"]
   
   anon/public key:
   [скопируйте из "Project API keys" → anon/public]
   
   service_role key:
   [скопируйте из "Project API keys" → service_role]
   ```

4. ⚠️ **ВАЖНО:** НЕ делитесь service_role key ни с кем!

---

### ШАГ 4: Настройте базу данных (2 минуты)

1. В Supabase перейдите **🛠️ SQL Editor**

2. Нажмите **"New query"**

3. Откройте файл `/scripts/init-database.sql` в этом проекте

4. Скопируйте **весь текст** из файла

5. Вставьте в SQL Editor в Supabase

6. Нажмите **▶️ Run** (или F5)

7. ✅ Должно появиться "Success. No rows returned"

---

### ШАГ 5: Настройте компьютер (3 минуты)

#### Windows:

1. Откройте **PowerShell** (Win + X → Windows PowerShell)

2. Установите Supabase CLI:
   ```powershell
   # Если у вас есть Scoop:
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   
   # Если нет Scoop, сначала установите его:
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   irm get.scoop.sh | iex
   ```

3. Установите Vercel CLI:
   ```powershell
   npm install -g vercel
   ```

#### macOS / Linux:

1. Откройте **Terminal**

2. Установите Supabase CLI:
   ```bash
   brew install supabase/tap/supabase
   ```

3. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

---

### ШАГ 6: Разверните Backend (4 минуты)

1. Откройте терминал в папке вашего проекта

2. Войдите в Supabase:
   ```bash
   supabase login
   ```
   (Откроется браузер для авторизации)

3. Свяжите проект (замените на ваш Project ID из Supabase):
   ```bash
   supabase link --project-ref ВАША_СТРОКА_ИЗ_URL
   ```
   
   💡 **Где найти Project ID:**
   - Ваш Supabase URL: `https://xxxxxxxxxxxxx.supabase.co`
   - Project ID: `xxxxxxxxxxxxx` (средняя часть)

4. Разверните Edge Functions:
   ```bash
   supabase functions deploy server --no-verify-jwt
   ```

5. У��тановите секреты (замените на ваши значения):
   ```bash
   supabase secrets set SUPABASE_URL=https://ВАША_СТРОКА.supabase.co
   
   supabase secrets set SUPABASE_ANON_KEY=ВАШ_ANON_KEY
   
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=ВАШ_SERVICE_ROLE_KEY
   ```

6. ✅ Backend развернут!

---

### ШАГ 7: Загрузите начальные данные (1 минута)

1. Выполните команду (замените URL и KEY):
   ```bash
   curl -X POST https://ВАШ_PROJECT.supabase.co/functions/v1/make-server-de695671/seed -H "Authorization: Bearer ВАШ_ANON_KEY"
   ```

2. ✅ Должно вернуться:
   ```json
   {"success":true,"message":"Database seeded successfully"}
   ```

---

### ШАГ 8: Разверните Frontend (5 минут)

1. Создайте файл `.env.production` в корне проекта:
   
   **Windows PowerShell:**
   ```powershell
   @"
   VITE_SUPABASE_URL=https://ВАШ_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=ВАШ_ANON_KEY
   "@ | Out-File -FilePath .env.production -Encoding utf8
   ```
   
   **macOS / Linux:**
   ```bash
   cat > .env.production << EOF
   VITE_SUPABASE_URL=https://ВАШ_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=ВАШ_ANON_KEY
   EOF
   ```

2. Соберите проект:
   ```bash
   npm install
   npm run build
   ```

3. Войдите в Vercel:
   ```bash
   vercel login
   ```

4. Разверните:
   ```bash
   vercel --prod
   ```

5. Следуйте инструкциям в терминале:
   ```
   ? Set up and deploy? Yes
   ? Which scope? [выберите ваш аккаунт]
   ? Link to existing project? No
   ? What's your project's name? abuvet
   ? In which directory is your code located? ./
   ```

6. ⏳ Подождите завершения (1-2 минуты)

7. ✅ Vercel даст вам URL! Скопируйте его.

---

### ШАГ 9: Создайте админ пользователя (1 минута)

1. Выполните (замените URL и KEY):
   ```bash
   curl -X POST https://ВАШ_PROJECT.supabase.co/functions/v1/make-server-de695671/auth/signup \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ВАШ_ANON_KEY" \
     -d '{"email": "admin@abuvet.lv", "password": "YourSecurePassword123!", "name": "Admin"}'
   ```

2. ✅ Админ создан!

---

### ШАГ 10: Проверьте сайт! (2 минуты)

1. Откройте URL от Vercel в браузере
   (обычно `https://abuvet-xxxx.vercel.app`)

2. Проверьте:
   - [ ] Главная страница загружается
   - [ ] Переключение языков работает (LV/RU/EN)
   - [ ] Можно перейти на другие страницы

3. Войдите как админ:
   - Нажмите **"Войти"** (или "Login")
   - Email: `admin@abuvet.lv`
   - Пароль: тот, что вы указали в шаге 9

4. Перейдите на `/admin`:
   - Добавьте вашего URL `/admin` 
   - Например: `https://abuvet-xxxx.vercel.app/admin`

5. ✅ Если админ панель загрузилась - **ВСЁ РАБОТАЕТ!** 🎉

---

## 🎉 ПОЗДРАВЛЯЕМ!

Ваш сайт развернут и работает!

**Что дальше:**

### 📝 Заполните контент (1-2 часа)

1. В админ панели `/admin`:
   - Добавьте реальных врачей
   - Обновите услуги и цены
   - Настройте расписание

2. Включите режим редактирования (кнопка "Режим редактирования"):
   - Обновите тексты на главной странице
   - Замените описания

### 🌐 Настройте домен (опционально, 10 минут)

1. В Vercel Dashboard:
   - Settings → Domains
   - Add Domain: `abuvet.lv`

2. У вашего регистратора доменов:
   - Добавьте A-запись или CNAME
   - Следуйте инструкциям от Vercel

3. ✅ Через 5-30 минут домен заработает

### 📧 Настройте email (опционально, 15 минут)

1. В Supabase Dashboard:
   - Authentication → Settings → SMTP Settings
   - Настройте ваш SMTP сервер

2. ✅ Теперь будут работать:
   - Подтверждение регистрации
   - Уведомления о записи
   - Восстановление пароля

---

## 📚 Полезные ссылки

### Dashboards
- 🔵 **Supabase:** https://supabase.com/dashboard
- ⚫ **Vercel:** https://vercel.com/dashboard

### Документация
- 📘 **Полное руководство:** `/PRODUCTION_DEPLOYMENT_GUIDE.md`
- ⚡ **Быстрый деплой:** `/QUICK_DEPLOY.md`
- 📋 **Чеклист:** `/PRE_LAUNCH_CHECKLIST.md`
- 🚀 **Шпаргалка:** `/DEPLOY_SUMMARY.md`

### Помощь
- 💬 **Supabase Discord:** https://discord.supabase.com
- 💬 **Vercel Discord:** https://vercel.com/discord

---

## 🆘 Что-то не работает?

### Проблема: "Command not found: supabase"

**Решение:**
```bash
# Переустановите CLI
npm install -g supabase

# Или через Homebrew (macOS/Linux)
brew install supabase/tap/supabase
```

### Проблема: "Failed to fetch" при вызове API

**Решение:**
1. Проверьте, что Edge Function развернута:
   ```bash
   supabase functions list
   ```

2. Проверьте логи:
   ```bash
   supabase functions logs server
   ```

### Проблема: Build fails

**Решение:**
```bash
# Очистите и переустановите
rm -rf node_modules dist
npm install
npm run build
```

### Проблема: Сайт показывает "500 Internal Server Error"

**Решение:**
1. Проверьте переменные окружения в Vercel:
   - Dashboard → Settings → Environment Variables
   - Убедитесь, что `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` установлены

2. Пересоберите и разверните:
   ```bash
   vercel --prod --force
   ```

---

## 📊 Чеклист развертывания

Используйте это для проверки:

- [ ] Supabase проект создан
- [ ] База данных инициализирована (SQL миграция выполнена)
- [ ] Edge Functions развернуты
- [ ] Секреты установлены в Supabase
- [ ] Начальные данные загружены (POST /seed)
- [ ] .env.production создан
- [ ] Frontend собран (npm run build)
- [ ] Vercel деплой выполнен
- [ ] Сайт доступен по URL
- [ ] Админ пользователь создан
- [ ] Админ панель работает
- [ ] Все страницы загружаются
- [ ] Переключение языков работает
- [ ] Система записи функционирует (опционально протестировать)

**Прогресс:** ___ / 14 ✅

---

## 💡 Советы для успеха

1. **Сохраняйте учетные данные** в безопасном месте (1Password, Bitwarden)

2. **Не спешите** - лучше медленно, но правильно

3. **Тестируйте на каждом шаге** - не ждите до конца

4. **Делайте скриншоты** проблем для поиска решений

5. **Используйте Git** для версионирования кода:
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   ```

6. **Настройте автоматический деплой** через GitHub Actions (см. `/PRODUCTION_DEPLOYMENT_GUIDE.md`)

---

## 🎯 Следующие шаги

После успешного развертывания:

### Сразу (1-2 дня)
- [ ] Заполните реальными данными о врачах
- [ ] Обновите цены и услуги
- [ ] Замените тестовые изображения

### Скоро (1 неделя)
- [ ] Настройте свой домен
- [ ] Настройте email уведомления
- [ ] Добавьте Google Analytics
- [ ] Проведите полное тестирование

### Опционально (1 месяц)
- [ ] SEO оптимизация
- [ ] Интеграция с платежами
- [ ] SMS уведомления
- [ ] Мобильное приложение

---

## 🏆 Вы молодец!

Если вы дошли до этого места, значит вы успешно развернули полноценный веб-сайт ветеринарной клиники с:

✅ React frontend  
✅ Supabase backend  
✅ PostgreSQL базой данных  
✅ Системой авторизации  
✅ Админ панелью  
✅ Системой онлайн-записи  
✅ Тремя языками  
✅ Адаптивным дизайном  

**Это серьезное достижение! 🎉**

---

## 📞 Нужна помощь?

Если застряли или нужна помощь:

1. ✅ Перечитайте инструкцию внимательно
2. ✅ Проверьте раздел "Что-то не работает?"
3. ✅ Посмотрите логи (`supabase functions logs server`)
4. ✅ Проверьте browser console (F12)
5. ✅ Загляните в `/DEPLOY_SUMMARY.md` → "Решение проблем"

---

**Удачи с запуском! 🚀**

*Время прочтения: 10 минут*  
*Время выполнения: 15-30 минут*  
*Уровень: Для всех*
