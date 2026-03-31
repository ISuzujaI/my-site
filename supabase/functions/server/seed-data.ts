// Initial seed data for the veterinary clinic
// This file can be used to populate the database with sample data

export const seedDoctors = [
  {
    id: 'doctor:1',
    name: 'Dr. Anna Liepiņa',
    specialty: {
      lv: 'Galvenā veterinārārste',
      ru: 'Главный ветеринар',
      en: 'Chief Veterinarian',
    },
    experience: 15,
    description: {
      lv: 'Specializējas mazdzīvnieku terapijā un ķirurģijā. Beigusi Latvijas Lauksaimniecības universitāti ar izcilību.',
      ru: 'Специализируется на терапии и хирургии мелких животных. Окончила Латвийский сельскохозяйственный университет с отличием.',
      en: 'Specializes in small animal therapy and surgery. Graduated from Latvia University of Agriculture with honors.',
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
      sunday: [],
    },
    active: true,
    image: 'https://images.unsplash.com/photo-1753487050317-919a2b26a6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczOTgzNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'doctor:2',
    name: 'Dr. Jānis Bērziņš',
    specialty: {
      lv: 'Ortopēds',
      ru: 'Ортопед',
      en: 'Orthopedist',
    },
    experience: 12,
    description: {
      lv: 'Eksperiments ortopēdiskajā ķirurģijā un traumatoloģijā. Regulāri piedalās starptautiskās konferencēs.',
      ru: 'Эксперт в ортопедической хирургии и травматологии. Регулярно участвует в международных конференциях.',
      en: 'Expert in orthopedic surgery and traumatology. Regularly participates in international conferences.',
    },
    specializations: {
      lv: ['Ortopēdija', 'Traumatoloģija', 'Fizioterapija'],
      ru: ['Ортопедия', 'Травматология', 'Физиотерапия'],
      en: ['Orthopedics', 'Traumatology', 'Physiotherapy'],
    },
    schedule: {
      monday: ['09:00-18:00'],
      tuesday: ['09:00-18:00'],
      wednesday: ['09:00-18:00'],
      thursday: ['09:00-18:00'],
      friday: ['09:00-16:00'],
      saturday: [],
      sunday: [],
    },
    active: true,
    image: 'https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdmV0ZXJpbmFyaWFuJTIwZG9jdG9yfGVufDF8fHx8MTc3Mzk4MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'doctor:3',
    name: 'Dr. Maria Ivanova',
    specialty: {
      lv: 'Dermatoloģe',
      ru: 'Дерматолог',
      en: 'Dermatologist',
    },
    experience: 8,
    description: {
      lv: 'Specializējas ādas slimību diagnostikā un ārstēšanā. Pieredzējusi alergoloģijā.',
      ru: 'Специализируется на диагностике и лечении кожных заболеваний. Опытный аллерголог.',
      en: 'Specializes in diagnosing and treating skin conditions. Experienced in allergology.',
    },
    specializations: {
      lv: ['Dermatoloģija', 'Alergoloģija', 'Dermatoķirurģija'],
      ru: ['Дерматология', 'Аллергология', 'Дерматохирургия'],
      en: ['Dermatology', 'Allergology', 'Dermatosurgery'],
    },
    schedule: {
      monday: ['10:00-18:00'],
      tuesday: ['10:00-18:00'],
      wednesday: ['10:00-18:00'],
      thursday: ['10:00-18:00'],
      friday: ['10:00-18:00'],
      saturday: ['10:00-14:00'],
      sunday: [],
    },
    active: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzQyNTY0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'doctor:4',
    name: 'Dr. Laura Ozoliņa',
    specialty: {
      lv: 'Stomatoloģe',
      ru: 'Стоматолог',
      en: 'Dentist',
    },
    experience: 10,
    description: {
      lv: 'Veterinārā stomatoloģe ar plašu pieredzi zobu ārstēšanā un profilaksē.',
      ru: 'Ветеринарный стоматолог с обширным опытом в лечении и профилактике зубов.',
      en: 'Veterinary dentist with extensive experience in dental treatment and prevention.',
    },
    specializations: {
      lv: ['Stomatoloģija', 'Mutes dobuma ķirurģija', 'Profilakse'],
      ru: ['Стоматология', 'Хирургия полости рта', 'Профилактика'],
      en: ['Dentistry', 'Oral Surgery', 'Prevention'],
    },
    schedule: {
      monday: ['09:00-17:00'],
      tuesday: ['09:00-17:00'],
      wednesday: [],
      thursday: ['09:00-17:00'],
      friday: ['09:00-17:00'],
      saturday: ['10:00-16:00'],
      sunday: [],
    },
    active: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZW50aXN0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc0MjU2NDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const seedServices = [
  {
    id: 'service:therapy',
    name: {
      lv: 'Terapija',
      ru: 'Терапия',
      en: 'Therapy',
    },
    description: {
      lv: 'Vispārējā diagnostika, ārstēšana un profilakse',
      ru: 'Общая диагностика, лечение и профилактика',
      en: 'General diagnostics, treatment and prevention',
    },
    category: 'consultation',
    price: '25',
    currency: 'EUR',
    duration: 30,
    active: true,
  },
  {
    id: 'service:surgery',
    name: {
      lv: 'Ķirurģija',
      ru: 'Хирургия',
      en: 'Surgery',
    },
    description: {
      lv: 'Plānveida un neatliekamās operācijas',
      ru: 'Плановые и экстренные операции',
      en: 'Planned and emergency operations',
    },
    category: 'surgery',
    price: '100-150',
    currency: 'EUR',
    duration: 120,
    active: true,
  },
  {
    id: 'service:vaccination',
    name: {
      lv: 'Vakcinācija',
      ru: 'Вакцинация',
      en: 'Vaccination',
    },
    description: {
      lv: 'Vakcinācija pret dažādām slimībām',
      ru: 'Вакцинация против различных заболеваний',
      en: 'Vaccination against various diseases',
    },
    category: 'vaccination',
    price: '30',
    currency: 'EUR',
    duration: 20,
    active: true,
  },
  {
    id: 'service:diagnostics',
    name: {
      lv: 'Diagnostika',
      ru: 'Диагностика',
      en: 'Diagnostics',
    },
    description: {
      lv: 'Laboratorijas testi, ultraskaņa, rentgens',
      ru: 'Лабораторные анализы, УЗИ, рентген',
      en: 'Laboratory tests, ultrasound, X-ray',
    },
    category: 'diagnostics',
    price: '35-60',
    currency: 'EUR',
    duration: 45,
    active: true,
  },
  {
    id: 'service:dentistry',
    name: {
      lv: 'Stomatoloģija',
      ru: 'Стоматология',
      en: 'Dentistry',
    },
    description: {
      lv: 'Zobu tīrīšana un ārstēšana',
      ru: 'Чистка и лечение зубов',
      en: 'Teeth cleaning and treatment',
    },
    category: 'dentistry',
    price: '50-80',
    currency: 'EUR',
    duration: 60,
    active: true,
  },
  {
    id: 'service:emergency',
    name: {
      lv: 'Neatliekamā palīdzība',
      ru: 'Экстренная помощь',
      en: 'Emergency Care',
    },
    description: {
      lv: 'Neatliekamā medicīniskā palīdzība 24/7',
      ru: 'Неотложная медицинская помощь 24/7',
      en: 'Emergency medical care 24/7',
    },
    category: 'emergency',
    price: '40',
    currency: 'EUR',
    duration: 30,
    active: true,
  },
];

// Function to seed the database
export async function seedDatabase(kvStore: any) {
  try {
    console.log('Seeding database...');

    // Seed doctors
    for (const doctor of seedDoctors) {
      await kvStore.set(doctor.id, doctor);
      console.log(`Added doctor: ${doctor.name}`);
    }

    // Seed services
    for (const service of seedServices) {
      await kvStore.set(service.id, service);
      console.log(`Added service: ${service.id}`);
    }

    console.log('Database seeding completed!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}