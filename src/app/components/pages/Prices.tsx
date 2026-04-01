import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function Prices() {
  const { t, language } = useLanguage();

  const priceCategories = [
    {
      category: {
        lv: 'Konsultācijas',
        ru: 'Консультации',
        en: 'Consultations',
      },
      services: [
        {
          name: {
            lv: 'Primārā konsultācija',
            ru: 'Первичная консультация',
            en: 'Primary consultation',
          },
          price: '€25',
        },
        {
          name: {
            lv: 'Atkārtota konsultācija',
            ru: 'Повторная консультация',
            en: 'Follow-up consultation',
          },
          price: '€20',
        },
        {
          name: {
            lv: 'Mājas vizīte',
            ru: 'Визит на дом',
            en: 'Home visit',
          },
          price: '€50',
        },
        {
          name: {
            lv: 'Neatliekamā konsultācija',
            ru: 'Экстренная консультация',
            en: 'Emergency consultation',
          },
          price: '€40',
        },
      ],
    },
    {
      category: {
        lv: 'Diagnostika',
        ru: 'Диагностика',
        en: 'Diagnostics',
      },
      services: [
        {
          name: {
            lv: 'Asins analīze (pilna)',
            ru: 'Анализ крови (полный)',
            en: 'Blood test (complete)',
          },
          price: '€35-50',
        },
        {
          name: {
            lv: 'Ultraskaņa',
            ru: 'УЗИ',
            en: 'Ultrasound',
          },
          price: '€40-60',
        },
        {
          name: {
            lv: 'Rentgens',
            ru: 'Рентген',
            en: 'X-ray',
          },
          price: '€30-45',
        },
        {
          name: {
            lv: 'EKG',
            ru: 'ЭКГ',
            en: 'ECG',
          },
          price: '€35',
        },
        {
          name: {
            lv: 'Urīna analīze',
            ru: 'Анализ мочи',
            en: 'Urine test',
          },
          price: '€20',
        },
      ],
    },
    {
      category: {
        lv: 'Vakcinācija',
        ru: 'Вакцинация',
        en: 'Vaccination',
      },
      services: [
        {
          name: {
            lv: 'Kompleksā vakcīna (suņi)',
            ru: 'Комплексная вакцина (собаки)',
            en: 'Complex vaccine (dogs)',
          },
          price: '€30',
        },
        {
          name: {
            lv: 'Kompleksā vakcīna (kaķi)',
            ru: 'Комплексная вакцина (кошки)',
            en: 'Complex vaccine (cats)',
          },
          price: '€28',
        },
        {
          name: {
            lv: 'Trakumsērgas vakcīna',
            ru: 'Вакцина от бешенства',
            en: 'Rabies vaccine',
          },
          price: '€20',
        },
        {
          name: {
            lv: 'Mikročipa uzstādīšana',
            ru: 'Установка микрочипа',
            en: 'Microchip installation',
          },
          price: '€25',
        },
      ],
    },
    {
      category: {
        lv: 'Ķirurģija',
        ru: 'Хирургия',
        en: 'Surgery',
      },
      services: [
        {
          name: {
            lv: 'Kastrācija (kaķis)',
            ru: 'Кастрация (кот)',
            en: 'Castration (cat)',
          },
          price: '€60',
        },
        {
          name: {
            lv: 'Kastrācija (suns)',
            ru: 'Кастрация (собака)',
            en: 'Castration (dog)',
          },
          price: '€80-120',
        },
        {
          name: {
            lv: 'Sterilizācija (kaķe)',
            ru: 'Стерилизация (кошка)',
            en: 'Sterilization (cat)',
          },
          price: '€80',
        },
        {
          name: {
            lv: 'Sterilizācija (kuce)',
            ru: 'Стерилизация (собака)',
            en: 'Sterilization (dog)',
          },
          price: '€100-150',
        },
        {
          name: {
            lv: 'Audzēja noņemšana',
            ru: 'Удаление опухоли',
            en: 'Tumor removal',
          },
          price: 'no €150',
        },
      ],
    },
    {
      category: {
        lv: 'Stomatoloģija',
        ru: 'Стоматология',
        en: 'Dentistry',
      },
      services: [
        {
          name: {
            lv: 'Zobu tīrīšana',
            ru: 'Чистка зубов',
            en: 'Teeth cleaning',
          },
          price: '€50-80',
        },
        {
          name: {
            lv: 'Zoba ekstrakcija',
            ru: 'Удаление зуба',
            en: 'Tooth extraction',
          },
          price: '€20-40',
        },
        {
          name: {
            lv: 'Dentālā profilakse',
            ru: 'Профилактика зубов',
            en: 'Dental prevention',
          },
          price: '€30',
        },
      ],
    },
    {
      category: {
        lv: 'Citi pakalpojumi',
        ru: 'Другие услуги',
        en: 'Other services',
      },
      services: [
        {
          name: {
            lv: 'Nagu griešana',
            ru: 'Стрижка когтей',
            en: 'Nail trimming',
          },
          price: '€10',
        },
        {
          name: {
            lv: 'Auss tīrīšana',
            ru: 'Чистка ушей',
            en: 'Ear cleaning',
          },
          price: '€15',
        },
        {
          name: {
            lv: 'Anālās dziedžeru tīrīšana',
            ru: 'Чистка анальных желез',
            en: 'Anal gland cleaning',
          },
          price: '€15',
        },
        {
          name: {
            lv: 'Eitanāzija',
            ru: 'Эвтаназия',
            en: 'Euthanasia',
          },
          price: '€50',
        },
      ],
    },
  ];

  return (
    <div className="abuvet-page py-10">
      <section className="abuvet-container">
        <div className="abuvet-soft-surface px-6 py-12 sm:px-10 text-center">
          <h1 className="text-5xl font-bold text-center mb-6 text-purple">{t('prices.title')}</h1>
          <p className="text-xl text-purple/80 text-center max-w-3xl mx-auto">
            {language === 'lv' &&
              'Caurspīdīgas cenas kvalitatīviem veterinārajiem pakalpojumiem'}
            {language === 'ru' && 'Прозрачные цены на качественные ветеринарные услуги'}
            {language === 'en' && 'Transparent prices for quality veterinary services'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-beige">
        <div className="abuvet-container">
          <div className="max-w-5xl mx-auto space-y-8">
            {priceCategories.map((category, index) => (
              <div key={index} className="abuvet-surface overflow-hidden">
                <div className="bg-mint/55 text-purple px-8 py-4 border-b border-purple/15">
                  <h2 className="text-2xl">{category.category[language]}</h2>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex justify-between items-center py-4 border-b border-mint last:border-0"
                      >
                        <span className="text-purple/85 text-lg">{service.name[language]}</span>
                        <span className="text-green font-semibold text-xl">
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-12 bg-mint/60 rounded-2xl p-8 border-2 border-green/40">
            <h3 className="text-2xl font-bold mb-4 text-purple">
              {language === 'lv' && 'Svarīga informācija'}
              {language === 'ru' && 'Важная информация'}
              {language === 'en' && 'Important information'}
            </h3>
            <ul className="space-y-2 text-purple/80">
              <li>
                • {language === 'lv' && 'Cenas ir orientējošas un var mainīties atkarībā no gadījuma sarežģītības'}
                {language === 'ru' && 'Цены являются ориентировочными и могут меняться в зависимости от сложности случая'}
                {language === 'en' && 'Prices are indicative and may vary depending on case complexity'}
              </li>
              <li>
                • {language === 'lv' && 'Neatliekamās palīdzības pakalpojumi ārpus darba laika var būt dārgāki'}
                {language === 'ru' && 'Экстренная помощь вне рабочего времени может быть дороже'}
                {language === 'en' && 'Emergency services outside working hours may be more expensive'}
              </li>
              <li>
                • {language === 'lv' && 'Operāciju cenas ietver anestēziju un pēcoperācijas aprūpi'}
                {language === 'ru' && 'Цены на операции включают анестезию и послеоперационный уход'}
                {language === 'en' && 'Surgery prices include anesthesia and post-operative care'}
              </li>
              <li>
                • {language === 'lv' && 'Pieņemam maksājumus ar karti un skaidru naudu'}
                {language === 'ru' && 'Принимаем оплату картой и наличными'}
                {language === 'en' && 'We accept card and cash payments'}
              </li>
            </ul>
          </div>

          <div className="max-w-5xl mx-auto mt-12 text-center">
            <p className="text-lg text-purple/80 mb-6">
              {language === 'lv' &&
                'Ir jautājumi par cenām? Sazinieties ar mums vai rezervējiet vizīti!'}
              {language === 'ru' &&
                'Есть вопросы о ценах? Свяжитесь с нами или забронируйте визит!'}
              {language === 'en' &&
                'Questions about prices? Contact us or book a visit!'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple text-white rounded-full hover:bg-green transition-colors font-semibold text-lg"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-beige text-purple border-2 border-purple/35 rounded-full hover:border-green hover:text-green transition-colors font-semibold text-lg"
              >
                {t('contact.title')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
