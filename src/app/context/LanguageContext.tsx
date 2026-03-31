import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'lv' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  lv: {
    // Navigation
    'nav.home': 'Sākums',
    'nav.about': 'Par mums',
    'nav.services': 'Pakalpojumi',
    'nav.doctors': 'Ārsti',
    'nav.prices': 'Cenas',
    'nav.booking': 'Pieraksts',
    'nav.contact': 'Kontakti',
    'nav.profile': 'Profils',
    'nav.admin': 'Administrācija',
    
    // Services submenu
    'services.therapy': 'Terapija',
    'services.surgery': 'Ķirurģija',
    'services.vaccination': 'Vakcinācija',
    'services.diagnostics': 'Diagnostika',
    'services.dentistry': 'Stomatoloģija',
    'services.emergency': 'Neatliekamā palīdzība',
    
    // Hero section
    'hero.title': 'Mīļie mājdzīvnieki - mūsu prioritāte',
    'hero.subtitle': 'Profesionāla veterinārā aprūpe ar mīlestību un rūpēm',
    'hero.cta': 'Pierakstīties',
    
    // About section
    'about.title': 'Par mūsu klīniku',
    'about.description': 'Mēs esam moderna veterinārā klīnika ar vairāk nekā 15 gadu pieredzi. Mūsu komanda ir apņēmusies nodrošināt augstāko aprūpes kvalitāti jūsu mīļajiem mājdzīvniekiem.',
    'about.experience': 'Gadu pieredze',
    'about.doctors': 'Profesionāli ārsti',
    'about.patients': 'Laimīgi pacienti',
    
    // Why choose us
    'why.title': 'Kāpēc izvēlēties mūs?',
    'why.modern': 'Moderna aprīkojums',
    'why.modern.desc': 'Jaunākās tehnoloģijas diagnostikai un ārstēšanai',
    'why.experienced': 'Pieredzējuši speciālisti',
    'why.experienced.desc': 'Kvalificēti ārsti ar starptautisku pieredzi',
    'why.emergency': 'Neatliekamā palīdzība 24/7',
    'why.emergency.desc': 'Vienmēr pieejami, kad jūsu mājdzīvniekam nepieciešama palīdzība',
    'why.care': 'Individuāla pieeja',
    'why.care.desc': 'Personalizēta aprūpe katram pacientam',
    
    // Services
    'services.title': 'Mūsu pakalpojumi',
    'services.therapy.desc': 'Vispārējā diagnostika, ārstēšana un profilakse',
    'services.surgery.desc': 'Plānveida un neatliekamās operācijas',
    'services.vaccination.desc': 'Vakcinācija pret dažādām slimībām',
    'services.diagnostics.desc': 'Laboratorijas testi, ultraskaņa, rentgens',
    'services.dentistry.desc': 'Zobu tīrīšana un ārstēšana',
    'services.emergency.desc': 'Neatliekamā medicīniskā palīdzība',
    
    // Doctors
    'doctors.title': 'Mūsu ārsti',
    'doctors.experience': 'gadu pieredze',
    'doctors.bookWith': 'Pierakstīties pie',
    
    // Reviews
    'reviews.title': 'Ko saka mūsu klienti',
    
    // Prices
    'prices.title': 'Cenrādis',
    'prices.service': 'Pakalpojums',
    'prices.price': 'Cena',
    
    // Booking
    'booking.title': 'Pieraksts uz apmeklējumu',
    'booking.selectService': 'Izvēlieties pakalpojumu',
    'booking.selectDoctor': 'Izvēlieties ārstu',
    'booking.selectDate': 'Izvēlieties datumu',
    'booking.selectTime': 'Izvēlieties laiku',
    'booking.confirm': 'Apstiprināt',
    'booking.success': 'Pieraksts veiksmīgs!',
    'booking.login': 'Ieiet',
    'booking.signup': 'Reģistrēties',
    'booking.loginRequired': 'Lai pierakstītos, lūdzu, ieejiet vai reģistrējieties',
    
    // Profile
    'profile.title': 'Mans profils',
    'profile.appointments': 'Mani pieraksti',
    'profile.history': 'Apmeklējumu vēsture',
    'profile.upcoming': 'Gaidāmie pieraksti',
    'profile.cancel': 'Atcelt',
    'profile.reschedule': 'Pārcelt',
    'profile.logout': 'Iziet',
    
    // Contact
    'contact.title': 'Sazinieties ar mums',
    'contact.address': 'Adrese',
    'contact.phone': 'Tālrunis',
    'contact.email': 'E-pasts',
    'contact.hours': 'Darba laiks',
    'contact.form': 'Atgriezeniskās saites forma',
    'contact.name': 'Vārds',
    'contact.message': 'Ziņojums',
    'contact.send': 'Nosūtīt',
    
    // Auth
    'auth.email': 'E-pasta adrese',
    'auth.password': 'Parole',
    'auth.name': 'Vārds, uzvārds',
    'auth.phone': 'Tālrunis',
    'auth.login': 'Ieiet',
    'auth.signup': 'Reģistrēties',
    'auth.haveAccount': 'Jau ir konts?',
    'auth.noAccount': 'Nav konta?',
    
    // Admin
    'admin.title': 'Administrācijas panelis',
    'admin.doctors': 'Ārstu pārvaldība',
    'admin.services': 'Pakalpojumu pārvaldība',
    'admin.schedule': 'Grafika pārvaldība',
    'admin.appointments': 'Pierakstu pārvaldība',
    
    // Common
    'common.loading': 'Ielādē...',
    'common.save': 'Saglabāt',
    'common.cancel': 'Atcelt',
    'common.edit': 'Rediģēt',
    'common.delete': 'Dzēst',
    'common.add': 'Pievienot',
    
    // Footer
    'footer.rights': 'Visas tiesības aizsargātas',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.doctors': 'Врачи',
    'nav.prices': 'Цены',
    'nav.booking': 'Запись',
    'nav.contact': 'Контакты',
    'nav.profile': 'Профиль',
    'nav.admin': 'Админ',
    
    // Services submenu
    'services.therapy': 'Терапия',
    'services.surgery': 'Хирургия',
    'services.vaccination': 'Вакцинация',
    'services.diagnostics': 'Диагностика',
    'services.dentistry': 'Стоматология',
    'services.emergency': 'Экстренная помощь',
    
    // Hero section
    'hero.title': 'Ваши питомцы - наш приоритет',
    'hero.subtitle': 'Профессиональный ветеринарный уход с любовью и заботой',
    'hero.cta': 'Записаться',
    
    // About section
    'about.title': 'О нашей клинике',
    'about.description': 'Мы - современная ветеринарная клиника с более чем 15-летним опытом. Наша команда стремится обеспечить наивысшее качество ухода за вашими любимыми питомцами.',
    'about.experience': 'Лет опыта',
    'about.doctors': 'Профессиональных врачей',
    'about.patients': 'Счастливых пациентов',
    
    // Why choose us
    'why.title': 'Почему выбирают нас?',
    'why.modern': 'Современное оборудование',
    'why.modern.desc': 'Новейшие технологии для диагностики и лечения',
    'why.experienced': 'Опытные специалисты',
    'why.experienced.desc': 'Квалифицированные врачи с международным опытом',
    'why.emergency': 'Экстренная помощь 24/7',
    'why.emergency.desc': 'Всегда доступны, когда вашему питомцу нужна помощь',
    'why.care': 'Индивидуальный подход',
    'why.care.desc': 'Персонализированный уход для каждого пациента',
    
    // Services
    'services.title': 'Наши услуги',
    'services.therapy.desc': 'Общая диагностика, лечение и профилактика',
    'services.surgery.desc': 'Плановые и экстренные операции',
    'services.vaccination.desc': 'Вакцинация против различных заболеваний',
    'services.diagnostics.desc': 'Лабораторные анализы, УЗИ, рентген',
    'services.dentistry.desc': 'Чистка и лечение зубов',
    'services.emergency.desc': 'Неотложная медицинская помощь',
    
    // Doctors
    'doctors.title': 'Наши врачи',
    'doctors.experience': 'лет опыта',
    'doctors.bookWith': 'Записаться к',
    
    // Reviews
    'reviews.title': 'Отзывы наших клиентов',
    
    // Prices
    'prices.title': 'Прайс-лист',
    'prices.service': 'Услуга',
    'prices.price': 'Цена',
    
    // Booking
    'booking.title': 'Запись на приём',
    'booking.selectService': 'Выберите услугу',
    'booking.selectDoctor': 'Выберите врача',
    'booking.selectDate': 'Выберите дату',
    'booking.selectTime': 'Выберите время',
    'booking.confirm': 'Подтвердить',
    'booking.success': 'Запись успешна!',
    'booking.login': 'Войти',
    'booking.signup': 'Регистрация',
    'booking.loginRequired': 'Для записи необходимо войти или зарегистрироваться',
    
    // Profile
    'profile.title': 'Мой профиль',
    'profile.appointments': 'Мои записи',
    'profile.history': 'История посещений',
    'profile.upcoming': 'Предстоящие записи',
    'profile.cancel': 'Отменить',
    'profile.reschedule': 'Перенести',
    'profile.logout': 'Выйти',
    
    // Contact
    'contact.title': 'Свяжитесь с нами',
    'contact.address': 'Адрес',
    'contact.phone': 'Телефон',
    'contact.email': 'Эл. почта',
    'contact.hours': 'Часы работы',
    'contact.form': 'Форма обратной связи',
    'contact.name': 'Имя',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.name': 'Имя и фамилия',
    'auth.phone': 'Телефон',
    'auth.login': 'Войти',
    'auth.signup': 'Зарегистрироваться',
    'auth.haveAccount': 'Уже есть аккаунт?',
    'auth.noAccount': 'Нет аккаунта?',
    
    // Admin
    'admin.title': 'Панель администратора',
    'admin.doctors': 'Управление врачами',
    'admin.services': 'Управление услугами',
    'admin.schedule': 'Управление графиком',
    'admin.appointments': 'Управление записями',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.add': 'Добавить',
    
    // Footer
    'footer.rights': 'Все права защищены',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.doctors': 'Doctors',
    'nav.prices': 'Prices',
    'nav.booking': 'Booking',
    'nav.contact': 'Contact',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    
    // Services submenu
    'services.therapy': 'Therapy',
    'services.surgery': 'Surgery',
    'services.vaccination': 'Vaccination',
    'services.diagnostics': 'Diagnostics',
    'services.dentistry': 'Dentistry',
    'services.emergency': 'Emergency Care',
    
    // Hero section
    'hero.title': 'Your Pets - Our Priority',
    'hero.subtitle': 'Professional veterinary care with love and attention',
    'hero.cta': 'Book Appointment',
    
    // About section
    'about.title': 'About Our Clinic',
    'about.description': 'We are a modern veterinary clinic with over 15 years of experience. Our team is committed to providing the highest quality care for your beloved pets.',
    'about.experience': 'Years Experience',
    'about.doctors': 'Professional Doctors',
    'about.patients': 'Happy Patients',
    
    // Why choose us
    'why.title': 'Why Choose Us?',
    'why.modern': 'Modern Equipment',
    'why.modern.desc': 'Latest technology for diagnostics and treatment',
    'why.experienced': 'Experienced Specialists',
    'why.experienced.desc': 'Qualified doctors with international experience',
    'why.emergency': 'Emergency Care 24/7',
    'why.emergency.desc': 'Always available when your pet needs help',
    'why.care': 'Individual Approach',
    'why.care.desc': 'Personalized care for each patient',
    
    // Services
    'services.title': 'Our Services',
    'services.therapy.desc': 'General diagnostics, treatment and prevention',
    'services.surgery.desc': 'Planned and emergency operations',
    'services.vaccination.desc': 'Vaccination against various diseases',
    'services.diagnostics.desc': 'Laboratory tests, ultrasound, X-ray',
    'services.dentistry.desc': 'Teeth cleaning and treatment',
    'services.emergency.desc': 'Emergency medical care',
    
    // Doctors
    'doctors.title': 'Our Doctors',
    'doctors.experience': 'years experience',
    'doctors.bookWith': 'Book with',
    
    // Reviews
    'reviews.title': 'What Our Clients Say',
    
    // Prices
    'prices.title': 'Price List',
    'prices.service': 'Service',
    'prices.price': 'Price',
    
    // Booking
    'booking.title': 'Book an Appointment',
    'booking.selectService': 'Select Service',
    'booking.selectDoctor': 'Select Doctor',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.confirm': 'Confirm',
    'booking.success': 'Booking successful!',
    'booking.login': 'Login',
    'booking.signup': 'Sign Up',
    'booking.loginRequired': 'Please login or sign up to book an appointment',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.appointments': 'My Appointments',
    'profile.history': 'Visit History',
    'profile.upcoming': 'Upcoming Appointments',
    'profile.cancel': 'Cancel',
    'profile.reschedule': 'Reschedule',
    'profile.logout': 'Logout',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.form': 'Contact Form',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.send': 'Send',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.haveAccount': 'Already have account?',
    'auth.noAccount': 'No account?',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.doctors': 'Manage Doctors',
    'admin.services': 'Manage Services',
    'admin.schedule': 'Manage Schedule',
    'admin.appointments': 'Manage Appointments',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    
    // Footer
    'footer.rights': 'All rights reserved',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('lv');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};