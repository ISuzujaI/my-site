import { Link } from 'react-router';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditMode } from '../../context/EditModeContext';
import { useAuth } from '../../context/AuthContext';
import { EditableText } from '../EditableText';
import { SmartImage } from '../SmartImage';

export function Home() {
  const { t, language } = useLanguage();
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  const features = [
    {
      title: {
        lv: 'Pieredzējuši speciālisti',
        ru: 'Опытные специалисты',
        en: 'Experienced specialists',
      },
      description: {
        lv: 'Profesionāli ārsti un pieredzējuši speciālisti',
        ru: 'Профессиональные врачи и опытные специалисты',
        en: 'Professional doctors and experienced specialists',
      },
      solid: false,
    },
    {
      title: {
        lv: 'Neatliekamā palīdzība 24/7',
        ru: 'Неотложная помощь 24/7',
        en: 'Emergency care 24/7',
      },
      description: {
        lv: 'Profesionāli ārsti un pieredzējuši speciālisti',
        ru: 'Профессиональные врачи и опытные специалисты',
        en: 'Professional doctors and experienced specialists',
      },
      solid: true,
    },
    {
      title: {
        lv: 'Moderns aprīkojums',
        ru: 'Современное оборудование',
        en: 'Modern equipment',
      },
      description: {
        lv: 'Profesionāli ārsti un pieredzējuši speciālisti',
        ru: 'Профессиональные врачи и опытные специалисты',
        en: 'Professional doctors and experienced specialists',
      },
      solid: true,
    },
    {
      title: {
        lv: 'Individuāla pieeja',
        ru: 'Индивидуальный подход',
        en: 'Individual approach',
      },
      description: {
        lv: 'Profesionāli ārsti un pieredzējuši speciālisti',
        ru: 'Профессиональные врачи и опытные специалисты',
        en: 'Professional doctors and experienced specialists',
      },
      solid: false,
    },
  ];

  const stats = [
    {
      value: '15+',
      label: {
        lv: 'Gadu pieredze',
        ru: 'Лет опыта',
        en: 'Years of experience',
      },
    },
    {
      value: '3000+',
      label: {
        lv: 'Izglābtas dzīvības',
        ru: 'Спасенных жизней',
        en: 'Saved lives',
      },
    },
    {
      value: '1000+',
      label: {
        lv: 'Veiktas operācijas',
        ru: 'Проведено операций',
        en: 'Operations completed',
      },
    },
    {
      value: '5',
      label: {
        lv: 'Profesionāli ārsti un pieredzējuši speciālisti',
        ru: 'Профессиональных врачей и специалистов',
        en: 'Professional doctors and specialists',
      },
    },
  ];

  const services = [
    {
      key: 'surgery',
      title: {
        lv: 'Ķirurģija',
        ru: 'Хирургия',
        en: 'Surgery',
      },
      description: {
        lv: 'Plānveida un neatliekamās operācijas',
        ru: 'Плановые и неотложные операции',
        en: 'Planned and emergency operations',
      },
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
      tall: true,
      tint: 'bg-mint',
    },
    {
      key: 'therapy',
      title: {
        lv: 'Terapija',
        ru: 'Терапия',
        en: 'Therapy',
      },
      description: {
        lv: 'Vispārējā diagnostika, ārstēšana un profilakse.',
        ru: 'Общая диагностика, лечение и профилактика.',
        en: 'General diagnostics, treatment and prevention.',
      },
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
      tall: false,
    },
    {
      key: 'diagnostics',
      title: {
        lv: 'Diagnostika',
        ru: 'Диагностика',
        en: 'Diagnostics',
      },
      description: {
        lv: 'Laboratorijas testi, ultraskaņa, rentgens',
        ru: 'Лабораторные тесты, УЗИ, рентген',
        en: 'Laboratory tests, ultrasound, X-ray',
      },
      image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1200&q=80',
      tall: false,
    },
  ];

  const hero = {
    badge: {
      lv: 'Veterinārā klīnika',
      ru: 'Ветеринарная клиника',
      en: 'Veterinary clinic',
    },
    title: {
      lv: 'Profesionāla veterinārā aprūpe',
      ru: 'Профессиональная ветеринарная помощь',
      en: 'Professional veterinary care',
    },
    subtitle: {
      lv: 'Ar mīlestību un rūpēm',
      ru: 'С любовью и заботой',
      en: 'With love and care',
    },
  };

  const why = {
    title: {
      lv: 'Kāpēc izvēlēties mūs?',
      ru: 'Почему выбирают нас?',
      en: 'Why choose us?',
    },
    description: {
      lv: 'Mēs esam moderna veterinārā klīnika ar vairāk nekā 15 gadu pieredzi. Mūsu komanda ir apņēmusies nodrošināt augstāko aprūpes kvalitāti Jūsu mīļajiem mājdzīvniekiem.',
      ru: 'Мы современная ветеринарная клиника с более чем 15-летним опытом. Наша команда стремится обеспечить высочайшее качество помощи вашим любимым питомцам.',
      en: 'We are a modern veterinary clinic with over 15 years of experience. Our team is committed to providing the highest quality care for your beloved pets.',
    },
  };

  const contact = {
    title: {
      lv: 'Sazinieties ar mums',
      ru: 'Свяжитесь с нами',
      en: 'Contact us',
    },
    addressLabel: {
      lv: 'Adrese',
      ru: 'Адрес',
      en: 'Address',
    },
    phoneLabel: {
      lv: 'Tālrunis',
      ru: 'Телефон',
      en: 'Phone',
    },
  };

  return (
    <div className="abuvet-page pb-20 pt-8 sm:pt-10">
      <div className="abuvet-container space-y-14">
        <section className="abuvet-hero overflow-hidden">
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            <div className="relative z-10">
              <div className="mb-7">
                <div className="text-[4.5rem] font-semibold leading-none text-white/72 sm:text-[6.2rem]" style={{ fontFamily: 'var(--font-heading)' }}>
                  ARU+
                </div>
                <span className="mt-2 block text-sm font-semibold uppercase tracking-[0.18em] text-white/86">
                  {hero.badge[language]}
                </span>
              </div>
              <EditableText
                page="home"
                contentKey="hero-title"
                defaultValue={hero.title[language]}
                as="h1"
                className="mb-4 max-w-xl text-[2.2rem] uppercase leading-[1.05] text-white sm:text-[2.9rem]"
                style={{ fontFamily: 'var(--font-heading)' }}
                isAdmin={isEditMode && user?.isAdmin}
                multiline={false}
              />
              <EditableText
                page="home"
                contentKey="hero-subtitle"
                defaultValue={hero.subtitle[language]}
                as="p"
                className="mb-8 max-w-md text-3xl font-light text-white/90 sm:text-[2.2rem]"
                isAdmin={isEditMode && user?.isAdmin}
                multiline={true}
              />
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/booking"
                  className="abuvet-button bg-purple/95 px-8 py-3 text-xl hover:bg-purple"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[330px] sm:min-h-[450px] lg:min-h-[500px]">
              <div className="absolute -right-14 top-8 h-[260px] w-[260px] rounded-full bg-white/55 blur-3xl sm:-right-8 sm:h-[360px] sm:w-[360px]" />
              <div className="absolute bottom-0 right-10 h-[140px] w-[240px] rounded-full bg-black/12 blur-2xl sm:w-[280px]" />
              <SmartImage
                page="home"
                contentKey="hero-image"
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
                alt="French bulldog"
                className="absolute bottom-0 right-[-10%] z-10 h-[114%] w-[103%] object-contain drop-shadow-[0_24px_34px_rgba(22,17,20,0.34)] sm:right-[-3%] sm:h-[120%] sm:w-[98%]"
                adminOnly
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-x-8 gap-y-10 py-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index}>
                <EditableText
                  page="home"
                  contentKey={`stat-value-${index}`}
                  defaultValue={stat.value}
                  as="div"
                  className="mb-1 text-6xl font-bold text-purple"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`stat-label-${index}`}
                  defaultValue={stat.label[language]}
                  as="div"
                  className="max-w-[11rem] text-2xl font-medium leading-tight text-purple/85"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
              </div>
            ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <Link
            to="/services?type=surgery"
            className={`group relative min-h-[360px] overflow-hidden rounded-[28px] border border-purple/15 ${services[0].tint}`}
          >
            <SmartImage
              page="home"
              contentKey="service-image-0"
              src={services[0].image}
                alt={services[0].title[language]}
              className="absolute bottom-0 right-0 h-[88%] w-[76%] object-cover mix-blend-multiply"
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
              <div>
                <h3 className="mb-2 text-white">{services[0].title[language]}</h3>
                <p className="max-w-[12rem] text-sm font-medium text-white/85">{services[0].description[language]}</p>
              </div>
              <div className="flex justify-end">
                <span className="abuvet-pill border-white/30 bg-beige/10 text-white">&#8594;</span>
              </div>
            </div>
          </Link>

          <div className="grid gap-4">
            {services.slice(1).map((service, idx) => (
              <Link
                key={service.key}
                to={`/services?type=${service.key}`}
                className="group relative min-h-[172px] overflow-hidden rounded-[28px] border border-purple/15 bg-beige"
              >
                <SmartImage
                  page="home"
                  contentKey={`service-image-${idx + 1}`}
                  src={service.image}
                  alt={service.title[language]}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/28" />
                <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                  <div className="text-right">
                    <h3 className="mb-1 text-right text-white">{service.title[language]}</h3>
                    <p className="ml-auto max-w-[15rem] text-right text-sm font-medium text-white/88">{service.description[language]}</p>
                  </div>
                  <div className="flex justify-end">
                    <span className="abuvet-pill border-white/30 bg-beige/10 text-white">&#8594;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6 py-4">
          <EditableText
            page="home"
            contentKey="why-title"
            defaultValue={why.title[language]}
            as="h2"
            className="abuvet-section-title"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <EditableText
            page="home"
            contentKey="why-description"
            defaultValue={why.description[language]}
            as="p"
            className="abuvet-section-copy max-w-3xl"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className={feature.solid ? 'abuvet-card-solid' : 'abuvet-card-outline'}>
                  <EditableText
                    page="home"
                    contentKey={`feature-title-${index}`}
                    defaultValue={feature.title[language]}
                    as="h3"
                    className={`mb-3 ${feature.solid ? 'text-white' : 'text-purple'}`}
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={false}
                  />
                  <EditableText
                    page="home"
                    contentKey={`feature-desc-${index}`}
                    defaultValue={feature.description[language]}
                    as="p"
                    className={`text-sm font-medium ${feature.solid ? 'text-white/82' : 'text-purple/70'}`}
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={true}
                  />
              </div>
            ))}
          </div>
        </section>

        <section className="abuvet-soft-surface p-8 sm:p-10">
          <EditableText
            page="home"
            contentKey="cta-title"
            defaultValue={contact.title[language]}
            as="h2"
            className="mb-6 text-center text-white sm:text-left"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-4 text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-white" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{contact.addressLabel[language]}</p>
                  <p className="text-base font-medium">Vestienas iela 2J, Rīga, LV-1035</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-white" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{contact.phoneLabel[language]}</p>
                  <p className="text-base font-medium">+371 20 123 456</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="abuvet-button bg-purple hover:bg-green">
                {t('contact.title')}
              </Link>
              <Link to="/booking" className="abuvet-button-secondary border-white/35 bg-beige/85 text-purple hover:bg-beige">
                {t('hero.cta')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
