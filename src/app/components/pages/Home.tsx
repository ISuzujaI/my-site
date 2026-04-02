import { Link } from 'react-router';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditMode } from '../../context/EditModeContext';
import { useAuth } from '../../context/AuthContext';
import { EditableText } from '../EditableText';
import { SmartImage } from '../SmartImage';
import heroLogo from '../../../assets/ABU - logo - white - VET.png';
import heroDog from '../../../assets/dog-transparent.png';

export function Home() {
  const { t } = useLanguage();
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  const features = [
    {
      title: 'PIEREDZĒJUŠI SPECIĀLISTI',
      description: 'Profesionāli ārsti un pieredzējuši speciālisti',
      tone: 'light',
    },
    {
      title: 'NEATLIEKAMĀ PALĪDZĪBA 24/7',
      description: 'Profesionāli ārsti un pieredzējuši speciālisti',
      tone: 'dark',
    },
    {
      title: 'MODERNS APRĪKOJUMS',
      description: 'Profesionāli ārsti un pieredzējuši speciālisti',
      tone: 'dark',
    },
    {
      title: 'INDIVIDUĀLA PIEEJA',
      description: 'Profesionāli ārsti un pieredzējuši speciālisti',
      tone: 'light',
    },
  ];

  const stats = [
    { value: '15+', label: 'Gadu pieredze' },
    { value: '3000+', label: 'Izglābtas dzīvības' },
    { value: '1000+', label: 'Veiktas operācijas' },
    { value: '5', label: 'Profesionāli ārsti un pieredzējuši speciālisti' },
  ];

  const services = [
    {
      title: 'KIRURGIJA',
      subtitle: 'Plānveida un neatliekamās operācijas',
      contentKey: 'surgery',
      imageKey: 'surgery',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      title: 'TERAPIJA',
      subtitle: 'Vispārējā diagnostika, ārstēšana un profilakse',
      contentKey: 'therapy',
      imageKey: 'therapy',
      key: 'therapy',
      image: 'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'DIAGNOSTIKA',
      subtitle: 'Laboratorijas testi, ultraskaņa, rentgens',
      contentKey: 'diagnostics',
      imageKey: 'diagnostics',
      key: 'diagnostics',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[24px] bg-[#d1d3ca] px-5 py-8 sm:px-10 sm:py-10 min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] flex items-center">
            <SmartImage
              page="home"
              contentKey="hero-image-transparent"
              src={heroDog}
              alt="French bulldog"
              className="pointer-events-none absolute bottom-0 right-[2%] z-0 h-[86%] sm:right-[4%] sm:h-[94%] lg:right-[6%] lg:h-[100%] w-auto object-contain object-bottom drop-shadow-[0_24px_34px_rgba(22,17,20,0.34)]"
            />
            <div className="relative z-10 max-w-[52%] sm:max-w-[46%]">
              <img
                src={heroLogo}
                alt="ABU Vet logo"
                className="mb-5 w-[180px] sm:mb-6 sm:w-[240px] lg:w-[600px]"
              />
              <EditableText
                page="home"
                contentKey="hero-title"
                defaultValue={t('hero.title')}
                as="h1"
                className="mt-2 sm:mt-3 mb-3 text-[2rem] uppercase leading-[1.02] text-white sm:text-[2.6rem] lg:text-[3rem]"
                style={{ fontFamily: 'var(--font-heading)' }}
                isAdmin={isEditMode && user?.isAdmin}
                multiline={false}
              />
              <EditableText
                page="home"
                contentKey="hero-subtitle"
                defaultValue={t('hero.subtitle')}
                as="p"
                className="mb-6 text-base font-light text-white/90 sm:text-lg lg:text-xl"
                isAdmin={isEditMode && user?.isAdmin}
                multiline={true}
              />
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-xl font-semibold text-white transition-colors hover:bg-purple/90"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2">
            {stats.map((stat, index) => (
              <div key={index} className="py-5 pr-4">
                <EditableText
                  page="home"
                  contentKey={`stat-value-${index}`}
                  defaultValue={stat.value}
                  as="div"
                  className="mb-1 text-[3.2rem] font-bold leading-none text-purple"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`stat-label-${index}`}
                  defaultValue={stat.label}
                  as="div"
                  className="max-w-[140px] text-sm font-medium leading-snug text-purple/80"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.15fr_1fr] md:items-start">
            <Link
              to="/services?type=surgery"
              className="group relative h-[220px] overflow-hidden rounded-[14px] md:h-[360px]"
            >
              <SmartImage
                page="home"
                contentKey="service-image-surgery"
                src={services[0].image}
                alt={services[0].title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/10" />
              <div className="absolute left-3 top-3 text-white">
                <div className="flex items-center gap-1">
                  <EditableText
                    page="home"
                    contentKey="service-title-surgery"
                    defaultValue={services[0].title}
                    as="h3"
                    className="text-[1.65rem] uppercase leading-none"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={false}
                  />
                  <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0" />
                </div>
                <EditableText
                  page="home"
                  contentKey="service-subtitle-surgery"
                  defaultValue={services[0].subtitle}
                  as="p"
                  className="mt-1 max-w-[160px] text-[11px] text-white/85"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={true}
                />
              </div>
              <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-white/70" />
            </Link>

            <div className="grid gap-2 md:content-start">
              {services.slice(1).map((service) => (
                <Link
                  key={service.key}
                  to={`/services?type=${service.key}`}
                  className="group relative h-[150px] overflow-hidden rounded-[14px] md:h-[176px]"
                >
                  <SmartImage
                    page="home"
                    contentKey={`service-image-${service.imageKey}`}
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
                  <div className="absolute right-2.5 top-2.5 text-right text-white">
                    <EditableText
                      page="home"
                      contentKey={`service-title-${service.contentKey}`}
                      defaultValue={service.title}
                      as="h3"
                      className="text-[1.25rem] uppercase leading-none"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      isAdmin={isEditMode && user?.isAdmin}
                      multiline={false}
                    />
                    <EditableText
                      page="home"
                      contentKey={`service-subtitle-${service.contentKey}`}
                      defaultValue={service.subtitle}
                      as="p"
                      className="ml-auto mt-0.5 max-w-[140px] text-[10px] text-white/85"
                      isAdmin={isEditMode && user?.isAdmin}
                      multiline={true}
                    />
                  </div>
                  <ArrowRight className="absolute bottom-2.5 right-2.5 h-4 w-4 text-white/70" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-4 pb-6">
        <div className="container mx-auto px-4">
          <EditableText
            page="home"
            contentKey="why-title"
            defaultValue="KĀPĒC IZVĒLĒTIES MŪS?"
            as="h2"
            className="mb-5 text-[2.5rem] uppercase leading-[1.0] text-purple"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <EditableText
            page="home"
            contentKey="why-description-1"
            defaultValue="Mēs esam moderna veterinārā klīnika ar vairāk nekā 15 gadu pieredzi."
            as="p"
            className="mb-3 text-lg font-medium leading-snug text-purple"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <EditableText
            page="home"
            contentKey="why-description-2"
            defaultValue="Mūsu komanda ir apņēmusies nodrošināt augstāko aprūpes kvalitāti Jūsu mīļajiem mājdzīvniekiem."
            as="p"
            className="mb-6 text-base leading-snug text-purple/80"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <div className="grid grid-cols-2 gap-2.5">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-[12px] border p-3.5 ${feature.tone === 'dark' ? 'border-purple bg-purple text-white' : 'border-purple/30 bg-white text-purple'}`}
              >
                <EditableText
                  page="home"
                  contentKey={`feature-title-${index}`}
                  defaultValue={feature.title}
                  as="h3"
                  className="text-[1.3rem] uppercase leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`feature-desc-${index}`}
                  defaultValue={feature.description}
                  as="p"
                  className={`${feature.tone === 'dark' ? 'text-white/80' : 'text-purple/65'} mt-1.5 text-[11px] leading-snug`}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-6 pb-8">
        <div className="container mx-auto px-4">
          <div className="rounded-[18px] bg-[#d5d7cf] px-5 py-10 text-center sm:px-8">
            <EditableText
              page="home"
              contentKey="contact-title"
              defaultValue="SAZINIETIES AR MUMS"
              as="h2"
              className="mb-5 text-[2rem] uppercase text-purple"
              style={{ fontFamily: 'var(--font-heading)' }}
              isAdmin={isEditMode && user?.isAdmin}
              multiline={false}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-purple/80">
                <MapPin className="h-4 w-4 text-purple/60" />
                <EditableText
                  page="home"
                  contentKey="contact-address"
                  defaultValue="Veterinārā iela 23, Rīga, LV-1050"
                  as="span"
                  className="font-medium text-purple/80"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-purple/80">
                <Phone className="h-4 w-4 text-purple/60" />
                <EditableText
                  page="home"
                  contentKey="contact-phone"
                  defaultValue="+371 20 123 456"
                  as="span"
                  className="font-medium text-purple/80"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}