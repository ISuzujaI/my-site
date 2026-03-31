# 📝 Руководство по редактированию контента сайта

## 🌍 1. Редактирование текстов (переводов)

Все тексты на сайте хранятся в централизованном файле переводов и автоматически меняются в зависимости от выбранного языка.

### 📍 Где находятся тексты

**Файл:** `/src/app/context/LanguageContext.tsx`

### ✏️ Как редактировать

1. Откройте файл `/src/app/context/LanguageContext.tsx`
2. Найдите объект `translations` (начинается со строки 13)
3. Внутри вы увидите три языка: `lv`, `ru`, `en`

**Пример структуры:**
```typescript
const translations: Record<Language, Record<string, string>> = {
  lv: {
    'hero.title': 'Mīļie mājdzīvnieki - mūsu prioritāte',
    'hero.subtitle': 'Profesionāla veterinārā aprūpe ar mīlestību un rūpēm',
    // ... другие тексты
  },
  ru: {
    'hero.title': 'Ваши питомцы - наш приоритет',
    'hero.subtitle': 'Профессиональный ветеринарный уход с любовью и заботой',
    // ... другие тексты
  },
  en: {
    'hero.title': 'Your Pets - Our Priority',
    'hero.subtitle': 'Professional veterinary care with love and attention',
    // ... другие тексты
  },
};
```

### 🎯 Основные секции для редактирования

#### Главная страница (Hero)
```typescript
'hero.title': 'Заголовок главной страницы'
'hero.subtitle': 'Подзаголовок главной страницы'
'hero.cta': 'Текст кнопки призыва к действию'
```

#### Навигация
```typescript
'nav.home': 'Главная'
'nav.about': 'О нас'
'nav.services': 'Услуги'
'nav.doctors': 'Врачи'
'nav.prices': 'Цены'
'nav.booking': 'Запись'
'nav.contact': 'Контакты'
```

#### Преимущества клиники
```typescript
'why.modern': 'Современное оборудование'
'why.modern.desc': 'Описание преимущества'
'why.experienced': 'Опытные специалисты'
'why.experienced.desc': 'Описание преимущества'
// ... и т.д.
```

#### Услуги
```typescript
'services.therapy': 'Терапия'
'services.therapy.desc': 'Описание услуги терапии'
'services.surgery': 'Хирургия'
'services.surgery.desc': 'Описание услуги хирургии'
// ... и т.д.
```

### ⚠️ Важно!
- Всегда редактируйте все три языка (lv, ru, en)
- Не изменяйте ключи (например, `'hero.title'`), меняйте только значения
- Сохраняйте кавычки и запятые для правильного синтаксиса

---

## 🏢 2. Редактирование информации о клинике

### 📍 Где находится

**Файл:** `/src/app/utils/constants.ts`

### ✏️ Что можно редактировать

#### Контактная информация
```typescript
export const CLINIC_INFO = {
  name: 'VetClinic',                    // Название клиники
  address: {
    street: 'Brīvības iela 123',         // Улица
    city: 'Rīga',                        // Город
    postalCode: 'LV-1001',               // Индекс
    country: 'Latvija',                  // Страна
  },
  phone: {
    main: '+371 20 123 456',             // Основной телефон
    emergency: '+371 20 999 999',        // Телефон экстренной помощи
  },
  email: 'info@vetclinic.lv',            // Email
  workingHours: {
    weekdays: '9:00 - 18:00',            // Будние дни
    saturday: '10:00 - 16:00',           // Суббота
    sunday: 'Emergency only',            // Воскресенье
  },
  social: {
    facebook: 'https://facebook.com/vetclinic',
    instagram: 'https://instagram.com/vetclinic',
    twitter: 'https://twitter.com/vetclinic',
  },
};
```

#### Статистика клиники
```typescript
export const CLINIC_STATS = {
  yearsOfExperience: 15,     // Лет опыта
  numberOfDoctors: 12,       // Количество врачей
  happyPatients: 5000,       // Счастливых пациентов
};
```

### 🔧 Пример редактирования

**Текущие данные клиники Abuvet:**
```typescript
export const CLINIC_INFO = {
  name: 'SIA Abuvet',
  address: {
    street: 'Vestienas 2J',
    city: 'Rīga',
    postalCode: 'LV-1035',
    country: 'Latvija',
  },
  phone: {
    main: '+371 67 123 456',             // Замените на реальный
    emergency: '+371 67 123 456',        // Замените на реальный
  },
  email: 'info@abuvet.lv',               // Замените на реальный
  workingHours: {
    weekdays: '9:00 - 19:00',
    saturday: '10:00 - 17:00',
    sunday: 'Pēc iepriekšējas vienošanās',
  },
  social: {
    facebook: 'https://facebook.com/abuvet',
    instagram: 'https://instagram.com/abuvet',
    twitter: '',
  },
};
```

---

## 📸 3. Редактирование изображений

### 🎨 Типы изображений на сайте

1. **Изображения с Unsplash** (тестовые)
2. **Логотип** (SVG)
3. **Фотографии врачей**

### 📍 Где находятся изображения

#### 3.1. Изображения главной страницы

**Файл:** `/src/app/components/pages/Home.tsx`

**Как изменить:**

Найдите массив `services` (около строки 42-55):

```typescript
const services = [
  {
    key: 'therapy',
    image: 'https://images.unsplash.com/photo-...',  // URL изображения
  },
  {
    key: 'surgery',
    image: 'https://images.unsplash.com/photo-...',  // URL изображения
  },
  {
    key: 'diagnostics',
    image: 'https://images.unsplash.com/photo-...',  // URL изображения
  },
];
```

**Замена на свои изображения:**

**Вариант A:** Использовать свои URL
```typescript
const services = [
  {
    key: 'therapy',
    image: 'https://ваш-сайт.lv/images/therapy.jpg',
  },
  // ...
];
```

**Вариант B:** Использовать компонент ImageWithFallback (уже импортирован)
```typescript
// В JSX коде замените:
<img src={service.image} alt={...} />

// На:
<ImageWithFallback 
  src={service.image} 
  alt={...} 
  className={...}
/>
```

#### 3.2. Фотографии врачей

**Файл:** `/src/app/components/pages/Doctors.tsx`

Аналогично, найдите где используются изображения врачей и замените URL.

#### 3.3. Логотип

**Файл:** `/src/app/components/Header.tsx`

Найдите секцию с логотипом и замените на свой SVG или изображение.

### 🖼️ Как добавить свои изображения

**Способ 1: Внешний хостинг**
1. Загрузите изображения на свой сервер или CDN
2. Скопируйте URL изображения
3. Вставьте URL в код (см. примеры выше)

**Способ 2: Использование ImageWithFallback**
```jsx
<ImageWithFallback 
  src="https://ваш-url.com/image.jpg"
  alt="Описание изображения"
  className="w-full h-64 object-cover rounded-lg"
/>
```

### 📐 Рекомендуемые размеры изображений

- **Главное изображение (Hero):** 1920x1080px
- **Карточки услуг:** 800x600px
- **Фотографии врачей:** 600x600px (квадрат)
- **Логотип:** SVG или PNG 300x100px (прозрачный фон)

---

## 👨‍⚕️ 4. Редактирование данных врачей и услуг

### 📍 Где находятся

**Файл:** `/supabase/functions/server/seed-data.ts`

### ✏️ Редактирование врачей

```typescript
export const seedDoctors = [
  {
    id: 'doctor:1',
    name: 'Dr. Anna Liepiņa',
    specialty: {
      lv: 'Galvenā veterinārārste',
      ru: 'Главный ветеринар',
      en: 'Chief Veterinarian',
    },
    experience: 15,                    // Лет опыта
    description: {
      lv: 'Описание на латышском',
      ru: 'Описание на русском',
      en: 'Description in English',
    },
    specializations: {
      lv: ['Ķirurģija', 'Terapija', 'Onkoloģija'],
      ru: ['Хирургия', 'Терапия', 'Онкология'],
      en: ['Surgery', 'Therapy', 'Oncology'],
    },
    schedule: {
      monday: ['09:00-18:00'],
      tuesday: ['09:00-18:00'],
      wednesday: ['09:00-18:00'],
      thursday: ['09:00-18:00'],
      friday: ['09:00-18:00'],
      saturday: ['10:00-16:00'],
      sunday: [],                      // Выходной
    },
    active: true,
  },
  // Добавьте больше врачей по аналогии...
];
```

### ✏️ Редактирование услуг

```typescript
export const seedServices = [
  {
    id: 'service:therapy',
    name: {
      lv: 'Terapija',
      ru: 'Терапия',
      en: 'Therapy',
    },
    description: {
      lv: 'Описание услуги',
      ru: 'Описание услуги',
      en: 'Service description',
    },
    category: 'consultation',
    price: '25',                       // Цена в EUR
    currency: 'EUR',
    duration: 30,                      // Длительность в минутах
    active: true,
  },
  // Добавьте больше услуг...
];
```

---

## 🎨 5. Редактирование цветовой схемы

### 📍 Где находится

**Файл:** `/src/styles/theme.css`

### ✏️ Фирменные цвета Abuvet

```css
:root {
  --color-beige: #F0EDE6;
  --color-mint: #DADED2;
  --color-green: #8D957E;
  --color-purple: #7E5565;
  
  --font-heading: 'Aukim', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

**Как изменить:**
1. Откройте файл `/src/styles/theme.css`
2. Найдите переменные цветов
3. Замените значения HEX кодов на нужные

---

## 📄 6. Редактирование отзывов

### 📍 Где находятся

**Файл:** `/src/app/components/pages/Home.tsx`

### ✏️ Как редактировать

Найдите массив `reviews` (около строки 57-76):

```typescript
const reviews = [
  {
    name: 'Anna Liepiņa',
    rating: 5,
    text: 'Текст отзыва...',
    date: '2026-03-15',
  },
  {
    name: 'Jānis Bērziņš',
    rating: 5,
    text: 'Текст отзыва...',
    date: '2026-03-10',
  },
  // Добавьте больше отзывов...
];
```

---

## ✅ Чек-лист обновления контента

### Для запуска с реальными данными

- [ ] Обновить название и адрес клиники в `/src/app/utils/constants.ts`
- [ ] Обновить телефоны и email в `/src/app/utils/constants.ts`
- [ ] Обновить часы работы в `/src/app/utils/constants.ts`
- [ ] Обновить социальные сети в `/src/app/utils/constants.ts`
- [ ] Заменить тестовые изображения на реальные фото
- [ ] Добавить реальные данные врачей в `/supabase/functions/server/seed-data.ts`
- [ ] Добавить реальный прайс-лист в `/supabase/functions/server/seed-data.ts`
- [ ] Обновить отзывы на реальные (или удалить секцию)
- [ ] Загрузить и установить логотип
- [ ] Проверить все тексты на трех языках

---

## 🆘 Частые вопросы

### ❓ Как добавить новый язык?

1. Откройте `/src/app/context/LanguageContext.tsx`
2. Добавьте новый язык в тип `Language` (строка 3)
3. Добавьте переводы в объект `translations`

### ❓ Как изменить фирменные шрифты?

1. Откройте `/src/styles/fonts.css`
2. Добавьте `@import` для нового шрифта (например, из Google Fonts)
3. Обновите переменные в `/src/styles/theme.css`

### ❓ Где изменить номер телефона в шапке?

Файл: `/src/app/components/Header.tsx`
Импортируется из: `CLINIC_INFO` в `/src/app/utils/constants.ts`

### ❓ Как добавить новую страницу?

1. Создайте компонент в `/src/app/components/pages/`
2. Добавьте маршрут в `/src/app/routes.tsx`
3. Добавьте ссылку в навигацию в `/src/app/components/Header.tsx`

---

## 💡 Советы

1. **Всегда сохраняйте резервную копию** перед большими изменениями
2. **Тестируйте на всех языках** после изменения текстов
3. **Оптимизируйте изображения** перед загрузкой (используйте WebP, сжатие)
4. **Проверяйте адаптивность** на мобильных устройствах
5. **Используйте консистентный стиль** в текстах и изображениях

---

## 📞 Нужна помощь?

Если возникли вопросы по редактированию, обратитесь к документации:
- `/PROJECT_INFO.md` - общая информация о проекте
- `/QUICK_START.md` - быстрый старт
- `/DEPLOYMENT_CHECKLIST.md` - подготовка к деплою

**Готово! Теперь вы знаете, как редактировать весь контент на сайте.** 🎉
