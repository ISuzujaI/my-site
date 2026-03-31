import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Stethoscope, Scissors, Syringe, Activity, Smile, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
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

export function Services() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const selectedType = searchParams.get('type') || 'all';
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  // Icon mapping for categories
  const categoryIcons: Record<string, any> = {
    therapy: Stethoscope,
    surgery: Scissors,
    vaccination: Syringe,
    diagnostics: Activity,
    dentistry: Smile,
    emergency: AlertCircle,
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
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
        // Filter only active services
        const activeServices = (result.data || []).filter((s: Service) => s.active);
        setServices(activeServices);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Category names mapping (must be before usage)
  const categoryNames: Record<string, { lv: string; ru: string; en: string }> = {
    therapy: { lv: 'Terapija', ru: 'Терапия', en: 'Therapy' },
    surgery: { lv: 'Ķirurģija', ru: 'Хирургия', en: 'Surgery' },
    vaccination: { lv: 'Vakcinācija', ru: 'Вакцинация', en: 'Vaccination' },
    diagnostics: { lv: 'Diagnostika', ru: 'Диагностика', en: 'Diagnostics' },
    dentistry: { lv: 'Stomatoloģija', ru: 'Стоматология', en: 'Dentistry' },
    emergency: { lv: 'Neatliekamā palīdzība', ru: 'Неотложная помощь', en: 'Emergency' },
  };

  // Group services by category
  const servicesByCategory: Record<string, Service[]> = {};
  services.forEach(service => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = [];
    }
    servicesByCategory[service.category].push(service);
  });

  // Get unique categories
  const categories = Object.keys(servicesByCategory).map(cat => ({
    id: cat,
    name: {
      lv: categoryNames[cat]?.lv || cat,
      ru: categoryNames[cat]?.ru || cat,
      en: categoryNames[cat]?.en || cat,
    }
  }));

  const filteredServices =
    selectedType === 'all' ? services : services.filter((s) => s.category === selectedType);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-beige via-mint to-beige py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6 text-purple">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            {language === 'lv' &&
              'Mēs piedāvājam pilnu veterināro pakalpojumu klāstu - no ikdienas aprūpes līdz sarežģītām operācijām'}
            {language === 'ru' &&
              'Мы предлагаем полный спектр ветеринарных услуг - от повседневного ухода до сложных операций'}
            {language === 'en' &&
              'We offer a full range of veterinary services - from daily care to complex operations'}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Link
              to="/services"
              className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedType === 'all'
                  ? 'bg-green text-white'
                  : 'bg-mint text-gray-700 hover:bg-beige'
              }`}
            >
              {language === 'lv' && 'Visi pakalpojumi'}
              {language === 'ru' && 'Все услуги'}
              {language === 'en' && 'All Services'}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/services?type=${category.id}`}
                className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedType === category.id
                    ? 'bg-green text-white'
                    : 'bg-mint text-gray-700 hover:bg-beige'
                }`}
              >
                {category.name[language]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-beige">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 text-green mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">
                {language === 'lv' && 'Ielādē pakalpojumus...'}
                {language === 'ru' && 'Загружаем услуги...'}
                {language === 'en' && 'Loading services...'}
              </p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {language === 'lv' && 'Nav pievienotu pakalpojumu'}
                {language === 'ru' && 'Нет добавленных услуг'}
                {language === 'en' && 'No services available'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const Icon = categoryIcons[service.category];
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-square">
                      <ImageWithFallback
                        src={service.image || 'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080'}
                        alt={service.name[language]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                            {Icon && <Icon className="w-6 h-6 text-green" />}
                          </div>
                          <h2 className="text-2xl font-bold text-white line-clamp-2">{service.name[language]}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-base text-gray-600 mb-4 line-clamp-3 flex-1">{service.description[language]}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green rounded-full flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            <strong className="text-purple">{language === 'lv' ? 'Cena' : language === 'ru' ? 'Цена' : 'Price'}:</strong> {service.price.toFixed(2)} EUR
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green rounded-full flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            <strong className="text-purple">{language === 'lv' ? 'Ilgums' : language === 'ru' ? 'Длительность' : 'Duration'}:</strong> {service.duration} {language === 'lv' ? 'min' : language === 'ru' ? 'мін' : 'min'}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/booking"
                        className="inline-block px-6 py-3 bg-green text-white rounded-lg hover:bg-purple transition-colors font-medium text-center"
                      >
                        {t('hero.cta')}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}