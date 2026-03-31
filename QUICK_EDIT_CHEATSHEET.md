# ⚡ Шпаргалка по быстрому редактированию

## 🎯 5 самых частых правок

### 1. 📞 Изменить телефон и email

**Файл:** `/src/app/utils/constants.ts`

```typescript
// Найдите эти строки (около 11-14):
phone: {
  main: '+371 67 123 456',        // ← ИЗМЕНИТЬ ЗДЕСЬ
  emergency: '+371 67 123 456',   // ← ИЗМЕНИТЬ ЗДЕСЬ
},
email: 'info@abuvet.lv',          // ← ИЗМЕНИТЬ ЗДЕСЬ
```

---

### 2. ✍️ Изменить заголовок главной страницы

**Файл:** `/src/app/context/LanguageContext.tsx`

```typescript
// Найдите строку 35 (латышский):
'hero.title': 'Mīļie mājdzīvnieki - mūsu prioritāte',  // ← ИЗМЕНИТЬ

// Строка 160 (русский):
'hero.title': 'Ваши питомцы - наш приоритет',  // ← ИЗМЕНИТЬ

// Строка 285 (английский):
'hero.title': 'Your Pets - Our Priority',  // ← ИЗМЕНИТЬ
```

---

### 3. 👨‍⚕️ Добавить врача

**Файл:** `/supabase/functions/server/seed-data.ts`

```typescript
// Добавьте в массив seedDoctors:
{
  id: 'doctor:3',                    // Новый ID
  name: 'Dr. Ваше Имя',              // ← ИМЯ ВРАЧА
  specialty: {
    lv: 'Специальность LV',          // ← СПЕЦИАЛЬНОСТЬ
    ru: 'Специальность RU',
    en: 'Specialty EN',
  },
  experience: 10,                    // ← ЛЕТ ОПЫТА
  description: {
    lv: 'Описание...',
    ru: 'Описание...',
    en: 'Description...',
  },
  specializations: {
    lv: ['Специализация 1', 'Специализация 2'],
    ru: ['Специализация 1', 'Специализация 2'],
    en: ['Specialization 1', 'Specialization 2'],
  },
  schedule: {
    monday: ['09:00-18:00'],
    tuesday: ['09:00-18:00'],
    wednesday: ['09:00-18:00'],
    thursday: ['09:00-18:00'],
    friday: ['09:00-18:00'],
    saturday: ['10:00-16:00'],
    sunday: [],
  },
  active: true,
},
```

---

### 4. 💰 Изменить цену услуги

**Файл:** `/supabase/functions/server/seed-data.ts`

```typescript
// Найдите нужную услугу и измените price:
{
  id: 'service:therapy',
  name: { ... },
  price: '25',        // ← ИЗМЕНИТЬ ЦЕНУ ЗДЕСЬ (в EUR)
  currency: 'EUR',
  duration: 30,       // ← Длительность в минутах
  active: true,
},
```

---

### 5. 🖼️ Заменить изображение на главной

**Файл:** `/src/app/components/pages/Home.tsx`

```typescript
// Найдите массив services (около строки 42):
const services = [
  {
    key: 'therapy',
    image: 'https://новый-url.com/image.jpg',  // ← ВСТАВИТЬ URL
  },
  // ...
];
```

---

## 🔥 Экстренные правки

### 🚨 Изменить часы работы
```typescript
// Файл: /src/app/utils/constants.ts
workingHours: {
  weekdays: '9:00 - 19:00',           // ← ПН-ПТ
  saturday: '10:00 - 17:00',          // ← СБ
  sunday: 'Pēc iepriekšējas vienošanās',  // ← ВС
},
```

### 🎨 Изменить цвет кнопок
```css
/* Файл: /src/styles/theme.css */
:root {
  --color-green: #8D957E;   /* ← Основной цвет кнопок */
  --color-purple: #7E5565;  /* ← Цвет при наведении */
}
```

### 🏢 Изменить адрес клиники
```typescript
// Файл: /src/app/utils/constants.ts
address: {
  street: 'Vestienas 2J',    // ← УЛИЦА
  city: 'Rīga',              // ← ГОРОД
  postalCode: 'LV-1035',     // ← ИНДЕКС
  country: 'Latvija',        // ← СТРАНА
},
```

---

## 📋 Копируй-Вставляй шаблоны

### Шаблон нового врача
```typescript
{
  id: 'doctor:X',
  name: 'Dr. Имя Фамилия',
  specialty: {
    lv: 'Специальность латышский',
    ru: 'Специальность русский',
    en: 'Specialty English',
  },
  experience: 0,
  description: {
    lv: '',
    ru: '',
    en: '',
  },
  specializations: {
    lv: [],
    ru: [],
    en: [],
  },
  schedule: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  active: true,
}
```

### Шаблон новой услуги
```typescript
{
  id: 'service:название',
  name: {
    lv: '',
    ru: '',
    en: '',
  },
  description: {
    lv: '',
    ru: '',
    en: '',
  },
  category: 'consultation',
  price: '0',
  currency: 'EUR',
  duration: 30,
  active: true,
}
```

### Шаблон перевода
```typescript
// Латышский (lv:)
'ключ.название': 'Текст на латышском',

// Русский (ru:)
'ключ.название': 'Текст на русском',

// Английский (en:)
'ключ.название': 'Text in English',
```

---

## 🎯 Поиск и замена

### Найти все упоминания телефона
```
Ctrl + Shift + F → "+371"
```

### Найти все цены
```
Ctrl + Shift + F → "price:"
```

### Найти конкретный текст
```
Ctrl + Shift + F → "текст который ищете"
```

---

## ✅ Чеклист перед публикацией

```
Контакты:
□ Телефон клиники
□ Email клиники
□ Адрес
□ Часы работы
□ Социальные сети

Контент:
□ Данные всех врачей
□ Актуальные цены
□ Реальные фотографии
□ Переводы на 3 языках

Проверка:
□ Тест на телефоне
□ Тест на планшете
□ Тест на десктопе
□ Все ссылки работают
```

---

## 🆘 Что делать если...

### ❌ Сломался сайт после правки?
1. **Откатите изменения:** `Ctrl + Z`
2. **Проверьте синтаксис:** Не забыли запятые, кавычки, скобки?
3. **Смотрите консоль:** F12 → Console (там будет ошибка)

### ❌ Текст не поменялся?
1. **Обновите страницу:** `Ctrl + Shift + R` (жесткая перезагрузка)
2. **Очистите кеш:** Settings → Clear browsing data
3. **Проверьте файл:** Правильный ли файл редактируете?

### ❌ Изображение не загружается?
1. **Проверьте URL:** Открывается ли ссылка в браузере?
2. **Формат:** Используйте .jpg, .png, .webp
3. **HTTPS:** URL должен начинаться с https://

---

## 🚀 Быстрые команды

| Задача | Файл | Строка |
|--------|------|--------|
| Телефон | constants.ts | ~11 |
| Email | constants.ts | ~14 |
| Адрес | constants.ts | ~4-9 |
| Заголовок главной | LanguageContext.tsx | 35, 160, 285 |
| Добавить врача | seed-data.ts | Массив seedDoctors |
| Изменить цену | seed-data.ts | Массив seedServices |
| Часы работы | constants.ts | ~15-19 |
| Цвета | theme.css | ~2-6 |

---

## 📖 Подробные инструкции

Для детального руководства смотрите:
- **`/EDITING_GUIDE.md`** - Полное руководство
- **`/FILE_STRUCTURE.md`** - Карта файлов
- **`/QUICK_START.md`** - Быстрый старт

---

**Сохраните эту шпаргалку!** 📌
Она поможет быстро вносить самые частые изменения.
