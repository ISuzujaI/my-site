# 📁 Структура файлов проекта - Быстрый справочник

## 🎯 Где что редактировать - Краткая версия

```
📦 Проект Abuvet
├── 📄 /src/app/utils/constants.ts
│   └── ✏️ Контакты клиники (адрес, телефон, email, часы работы)
│
├── 📄 /src/app/context/LanguageContext.tsx
│   └── ✏️ ВСЕ ТЕКСТЫ на 3 языках (LV, RU, EN)
│
├── 📄 /supabase/functions/server/seed-data.ts
│   ├── ✏️ Данные врачей (имена, специализации, расписание)
│   └── ✏️ Данные услуг (названия, цены, описания)
│
├── 📄 /src/styles/theme.css
│   └── ✏️ Цвета (beige, mint, green, purple)
│
├── 📄 /src/styles/fonts.css
│   └── ✏️ Шрифты (Aukim, Montserrat)
│
└── 📄 /src/app/components/pages/
    ├── Home.tsx        → ✏️ Главная страница + изображения
    ├── About.tsx       → ✏️ О нас
    ├── Services.tsx    → ✏️ Услуги
    ├── Doctors.tsx     → ✏️ Врачи + фото
    ├── Prices.tsx      → ✏️ Прайс-лист
    ├── Contact.tsx     → ✏️ Контакты
    └── Booking.tsx     → ✏️ Онлайн-запись
```

---

## 🚀 Быстрый старт редактирования

### 1️⃣ Изменить название и адрес клиники
```
Файл: /src/app/utils/constants.ts
Строки: 2-25
```

### 2️⃣ Изменить тексты на сайте
```
Файл: /src/app/context/LanguageContext.tsx
Строки: 13-389
```

### 3️⃣ Добавить/редактировать врачей
```
Файл: /supabase/functions/server/seed-data.ts
Начало: seedDoctors массив
```

### 4️⃣ Изменить цены услуг
```
Файл: /supabase/functions/server/seed-data.ts
Начало: seedServices массив
```

### 5️⃣ Заменить изображения
```
Файл: /src/app/components/pages/Home.tsx
Искать: services массив (строка ~42)
Или: reviews массив (строка ~57)
```

---

## 📋 Что редактировать для запуска

### ✅ Обязательно перед запуском:

1. **Контактные данные** → `/src/app/utils/constants.ts`
   - [ ] Телефон клиники
   - [ ] Email клиники
   - [ ] Часы работы
   - [ ] Социальные сети

2. **Данные врачей** → `/supabase/functions/server/seed-data.ts`
   - [ ] Имена врачей
   - [ ] Специализации
   - [ ] Расписание работы
   - [ ] Фотографии врачей

3. **Прайс-лист** → `/supabase/functions/server/seed-data.ts`
   - [ ] Реальные цены на услуги
   - [ ] Актуальный список услуг

4. **Изображения** → `/src/app/components/pages/Home.tsx`
   - [ ] Логотип клиники
   - [ ] Фото интерьера клиники
   - [ ] Фото врачей
   - [ ] Фото услуг

### 🎨 Опционально:

5. **Тексты** → `/src/app/context/LanguageContext.tsx`
   - [ ] Проверить переводы на трех языках
   - [ ] Адаптировать под стиль клиники

6. **Цвета** → `/src/styles/theme.css`
   - Уже настроены фирменные цвета Abuvet
   - Можно изменить при необходимости

---

## 🔍 Поиск по файлам

### Как найти нужный текст?

1. **Если текст на латышском**, ищите в:
   ```
   /src/app/context/LanguageContext.tsx
   Секция: lv: { ... }
   ```

2. **Если это контакт (телефон/адрес)**, ищите в:
   ```
   /src/app/utils/constants.ts
   Объект: CLINIC_INFO
   ```

3. **Если это данные врача**, ищите в:
   ```
   /supabase/functions/server/seed-data.ts
   Массив: seedDoctors
   ```

4. **Если это цена услуги**, ищите в:
   ```
   /supabase/functions/server/seed-data.ts
   Массив: seedServices
   ```

---

## 🗺️ Полная карта файлов

```
📦 Корень проекта
│
├── 📂 /src/app/
│   │
│   ├── 📂 /components/
│   │   ├── Header.tsx              → Шапка сайта + навигация + логотип
│   │   ├── Footer.tsx              → Подвал сайта
│   │   ├── AuthModal.tsx           → Модальное окно входа/регистрации
│   │   │
│   │   ├── 📂 /pages/
│   │   │   ├── Home.tsx            → Главная страница
│   │   │   ├── About.tsx           → О нас
│   │   │   ├── Services.tsx        → Каталог услуг
│   │   │   ├── Doctors.tsx         → Команда врачей
│   │   │   ├── Prices.tsx          → Прайс-лист
│   │   │   ├── Booking.tsx         → Онлайн-запись
│   │   │   ├── Contact.tsx         → Контакты
│   │   │   ├── Profile.tsx         → Личный кабинет
│   │   │   └── AdminPanel.tsx      → Панель администратора
│   │   │
│   │   └── 📂 /ui/
│   │       └── [UI компоненты]     → Кнопки, карточки, формы и т.д.
│   │
│   ├── 📂 /context/
│   │   ├── LanguageContext.tsx     → ВСЕ ПЕРЕВОДЫ (LV/RU/EN)
│   │   └── AuthContext.tsx         → Авторизация
│   │
│   ├── 📂 /utils/
│   │   ├── constants.ts            → КОНТАКТЫ КЛИНИКИ + настройки
│   │   ├── api.ts                  → API запросы
│   │   └── dateHelpers.ts          → Работа с датами
│   │
│   ├── routes.tsx                  → Маршруты сайта
│   └── App.tsx                     → Главный компонент
│
├── 📂 /src/styles/
│   ├── theme.css                   → ЦВЕТА и CSS переменные
│   ├── fonts.css                   → ШРИФТЫ (Aukim, Montserrat)
│   ├── tailwind.css                → Tailwind CSS
│   └── index.css                   → Основные стили
│
├── 📂 /supabase/functions/server/
│   ├── index.tsx                   → Backend сервер (API)
│   ├── seed-data.ts                → ДАННЫЕ ВРАЧЕЙ И УСЛУГ
│   └── kv_store.tsx                → База данных (защищен)
│
└── 📂 /utils/supabase/
    └── info.tsx                    → Конфигурация Supabase (защищен)
```

---

## 🎨 Где что отображается на сайте

### Главная страница (`/`)
```
┌─────────────────────────────────────┐
│ HEADER (Header.tsx)                 │ ← Логотип, меню, языки
├─────────────────────────────────────┤
│ HERO SECTION (Home.tsx)             │ ← hero.title, hero.subtitle
│ "Ваши питомцы - наш приоритет"      │
├─────────────────────────────────────┤
│ ПРЕИМУЩЕСТВА (Home.tsx)             │ ← why.modern, why.experienced и т.д.
│ 4 карточки с иконками               │
├─────────────────────────────────────┤
│ УСЛУГИ (Home.tsx)                   │ ← services массив + изображения
│ 3 карточки с фото                   │
├─────────────────────────────────────┤
│ ОТЗЫВЫ (Home.tsx)                   │ ← reviews массив
│ Карусель отзывов                    │
├─────────────────────────────────────┤
│ FOOTER (Footer.tsx)                 │ ← Контакты, соц.сети
└─────────────────────────────────────┘
```

### Страница "О нас" (`/about`)
```
About.tsx → Текст о клинике
Тексты: about.title, about.description
```

### Страница "Услуги" (`/services`)
```
Services.tsx → Каталог всех услуг
Данные: seedServices из seed-data.ts
```

### Страница "Врачи" (`/doctors`)
```
Doctors.tsx → Команда врачей с фото
Данные: seedDoctors из seed-data.ts
```

### Страница "Цены" (`/prices`)
```
Prices.tsx → Прайс-лист
Данные: seedServices (поле price) из seed-data.ts
```

### Страница "Контакты" (`/contact`)
```
Contact.tsx → Адрес, телефон, карта
Данные: CLINIC_INFO из constants.ts
```

---

## 💡 Советы по навигации

### Быстрый поиск в VS Code:
- `Ctrl + P` → Поиск файла по имени
- `Ctrl + Shift + F` → Поиск текста во всех файлах
- `Ctrl + F` → Поиск в текущем файле

### Пример: Как найти где изменить телефон?
1. Нажмите `Ctrl + Shift + F`
2. Введите `+371 20 123 456`
3. Откройте найденный файл
4. Измените на нужный номер

---

## ❓ Частые вопросы

### "Где изменить текст на главной странице?"
→ `/src/app/context/LanguageContext.tsx` (ключи `hero.*`)

### "Где добавить нового врача?"
→ `/supabase/functions/server/seed-data.ts` (массив `seedDoctors`)

### "Где изменить цену услуги?"
→ `/supabase/functions/server/seed-data.ts` (массив `seedServices`, поле `price`)

### "Где заменить фото врача?"
→ В компоненте врача добавьте поле `image: 'url'` в seed-data.ts

### "Где изменить часы работы?"
→ `/src/app/utils/constants.ts` (объект `CLINIC_INFO.workingHours`)

---

## 📚 Дополнительные ресурсы

- **Полное руководство по редактированию:** `/EDITING_GUIDE.md`
- **Информация о проекте:** `/PROJECT_INFO.md`
- **Быстрый старт:** `/QUICK_START.md`
- **Чеклист деплоя:** `/DEPLOYMENT_CHECKLIST.md`

---

**Успешного редактирования!** 🎉
