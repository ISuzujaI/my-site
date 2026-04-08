import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditMode } from '../../context/EditModeContext';
import { useAuth } from '../../context/AuthContext';
import { EditableText } from '../EditableText';
import { SmartImage } from '../SmartImage';
import heroLogo from '../../../assets/ABU - logo - white - VET.png';
import heroDog from '../../../assets/dog-transparent.png';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Service {
  id: string;
  name: {
    lv: string;
    ru: string;
    en: string;
  };
  description: {
    lv: string;
    ru: string;
    en: string;
  };
  price: number;
  duration: number;
  category: string;
  image?: string;
  active: boolean;
}

export function Home() {
  const { t, language } = useLanguage();
  const { isEditMode } = useEditMode();
  const { user } = useAuth();
  const [loadedServices, setLoadedServices] = useState<Service[]>([]);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch(`${API_BASE}/services`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load services');
      }

      const result = await response.json();
      if (result.success) {
        const activeServices = (result.data || []).filter((s: Service) => s.active);
        setLoadedServices(activeServices);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    }
  };

  // Get services by category for display
  const getSurfaceServiceByCategory = (category: string): Service | undefined => {
    return loadedServices.find(s => s.category === category);
  };

  const features = [
    {
      titleKey: 'feature.experienced',
      descKey: 'feature.experienced.desc',
      tone: 'light',
    },
    {
      titleKey: 'feature.emergency',
      descKey: 'feature.emergency.desc',
      tone: 'dark',
    },
    {
      titleKey: 'feature.equipment',
      descKey: 'feature.equipment.desc',
      tone: 'dark',
    },
    {
      titleKey: 'feature.approach',
      descKey: 'feature.approach.desc',
      tone: 'light',
    },
  ];

  const stats = [
    { value: '15+', labelKey: 'stats.experience' },
    { value: '3000+', labelKey: 'stats.savedLives' },
    { value: '1000+', labelKey: 'stats.operations' },
    { value: '5', labelKey: 'stats.doctors' },
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
              className="pointer-events-none absolute bottom-0 right-[-44%] z-0 h-[calc(100%+1rem)] sm:right-[-22%] sm:h-[calc(100%+2.2rem)] lg:right-[-8%] lg:h-[calc(100%+3rem)] w-auto object-contain object-bottom drop-shadow-[0_24px_34px_rgba(22,17,20,0.34)] translate-y-3"
            />
            <div className="relative z-10 max-w-[50%] sm:max-w-[46%]">
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
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="py-5 pr-4">
                <EditableText
                  page="home"
                  contentKey={`stat-value-${index}`}
                  defaultValue={stat.value}
                  as="div"
                  className="mb-1 text-[2.75rem] sm:text-[3.2rem] font-bold leading-none text-purple"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`stat-label-${index}`}
                  defaultValue={t(stat.labelKey)}
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
            {/* Surgery Service */}
            {getSurfaceServiceByCategory('surgery') && (
              <Link
                to="/services?type=surgery"
                className="group relative h-[220px] overflow-hidden rounded-[14px] md:h-[360px]"
              >
                <SmartImage
                  page="home"
                  contentKey="service-image-surgery"
                  src={getSurfaceServiceByCategory('surgery')?.image || ''}
                  alt="Surgery Service"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/10" />
                <div className="absolute left-3 top-3 text-white">
                  <div className="flex items-center gap-1">
                    <h3 className="text-[1.65rem] uppercase leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                      {getSurfaceServiceByCategory('surgery')?.name[language] || t('services.surgery')}
                    </h3>
                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  </div>
                  <p className="mt-1 max-w-[160px] text-[11px] text-white/85">
                    {getSurfaceServiceByCategory('surgery')?.description[language] || ''}
                  </p>
                </div>
                <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-white/70" />
              </Link>
            )}

            <div className="grid gap-2 md:content-start">
              {/* Therapy and Diagnostics Services */}
              {['therapy', 'diagnostics'].map((category) => {
                const service = getSurfaceServiceByCategory(category);
                if (!service) return null;
                return (
                  <Link
                    key={service.id}
                    to={`/services?type=${category}`}
                    className="group relative h-[150px] overflow-hidden rounded-[14px] md:h-[176px]"
                  >
                    <SmartImage
                      page="home"
                      contentKey={`service-image-${category}`}
                      src={service.image || ''}
                      alt={service.name[language]}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
                    <div className="absolute right-2.5 top-2.5 text-right text-white">
                      <h3 className="text-[1.25rem] uppercase leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                        {service.name[language]}
                      </h3>
                      <p className="ml-auto mt-0.5 max-w-[140px] text-[10px] text-white/85">
                        {service.description[language]}
                      </p>
                    </div>
                    <ArrowRight className="absolute bottom-2.5 right-2.5 h-4 w-4 text-white/70" />
                  </Link>
                );
              })}
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
            defaultValue={t('why.title')}
            as="h2"
            className="mb-5 text-[2.5rem] uppercase leading-[1.0] text-purple"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <EditableText
            page="home"
            contentKey="why-description-1"
            defaultValue={t('why.whyChoose')}
            as="p"
            className="mb-3 text-lg font-medium leading-snug text-purple"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <EditableText
            page="home"
            contentKey="why-description-2"
            defaultValue={t('why.whyChooseDesc')}
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
                  defaultValue={t(feature.titleKey)}
                  as="h3"
                  className="text-[1.02rem] sm:text-[1.3rem] uppercase leading-tight break-words"
                  style={{ fontFamily: 'var(--font-heading)', hyphens: 'auto', overflowWrap: 'anywhere' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`feature-desc-${index}`}
                  defaultValue={t(feature.descKey)}
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
              defaultValue={t('contact.contactTitle')}
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
                  defaultValue={t('contact.contactAddress')}
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
                  defaultValue={t('contact.contactPhone')}
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