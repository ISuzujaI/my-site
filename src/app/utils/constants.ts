// Clinic contact information
export const CLINIC_INFO = {
  name: 'SIA Abuvet',
  registrationNumber: 'LV50203602361',
  address: {
    street: 'Vestienas 2J',
    city: 'Rīga',
    postalCode: 'LV-1035',
    country: 'Latvija',
  },
  phone: {
    main: '+371 67 123 456', // TODO: Заменить на реальный номер
    emergency: '+371 67 123 456', // TODO: Заменить на реальный номер экстренной помощи
  },
  email: 'info@abuvet.lv', // TODO: Заменить на реальный email
  workingHours: {
    weekdays: '9:00 - 19:00',
    saturday: '10:00 - 17:00',
    sunday: 'Pēc iepriekšējas vienošanās', // По предварительной записи
  },
  social: {
    facebook: 'https://facebook.com/abuvet', // TODO: Добавить реальные ссылки
    instagram: 'https://instagram.com/abuvet',
    twitter: '',
  },
};

// Service categories
export const SERVICE_CATEGORIES = [
  'therapy',
  'surgery',
  'vaccination',
  'diagnostics',
  'dentistry',
  'emergency',
] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];

// Languages
export const LANGUAGES = ['lv', 'ru', 'en'] as const;
export type Language = typeof LANGUAGES[number];

// Appointment time slots
export const TIME_SLOT_CONFIG = {
  startHour: 9,
  endHour: 18,
  intervalMinutes: 30,
};

// Date range for booking
export const BOOKING_DATE_RANGE_DAYS = 14;

// Color scheme
export const COLORS = {
  primary: '#2563eb', // blue-600
  secondary: '#10b981', // green-500
  accent: '#8b5cf6', // purple-500
  danger: '#ef4444', // red-500
  success: '#10b981', // green-500
  warning: '#f59e0b', // amber-500
};

// API Configuration
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retries: 3,
};

// Validation rules
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  minPasswordLength: 6,
  maxNameLength: 100,
  maxMessageLength: 1000,
};

// Test accounts
export const TEST_ACCOUNTS = {
  admin: {
    email: 'admin@vet.lv',
    role: 'admin',
  },
};

// Feature flags
export const FEATURES = {
  enableEmailNotifications: false, // Set to true when SMTP is configured
  enableSMSNotifications: false, // Set to true when SMS gateway is configured
  enablePayments: false, // Set to true when payment system is integrated
  enableGoogleMaps: false, // Set to true when Google Maps API key is added
  enableChat: false, // Set to true when chat system is implemented
};

// Statistics (can be fetched from backend in production)
export const CLINIC_STATS = {
  yearsOfExperience: 15,
  numberOfDoctors: 12,
  happyPatients: 5000,
};