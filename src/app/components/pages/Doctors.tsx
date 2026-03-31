import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Doctor {
  id: string;
  name: string;
  specialty: {
    lv: string;
    ru: string;
    en: string;
  };
  experience: number;
  description: {
    lv: string;
    ru: string;
    en: string;
  };
  specializations: {
    lv: string[];
    ru: string[];
    en: string[];
  };
  active: boolean;
  image?: string;
}

export function Doctors() {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/doctors`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load doctors');
      }

      const result = await response.json();
      if (result.success) {
        // Filter only active doctors for public display
        const activeDoctors = (result.data || []).filter((doctor: Doctor) => doctor.active);
        setDoctors(activeDoctors);
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fallback image for doctors without photos
  const defaultDoctorImage = 'https://images.unsplash.com/photo-1753487050317-919a2b26a6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB2ZXRlcmluYXJpYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczOTgzNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-beige to-mint py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('doctors.title')}
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            {language === 'lv' &&
              'Mūsu komandā strādā pieredzējuši un augsti kvalificēti veterinārārsti'}
            {language === 'ru' &&
              'В нашей команде работают опытные и высококвалифицированные ветеринары'}
            {language === 'en' &&
              'Our team consists of experienced and highly qualified veterinarians'}
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green"></div>
              <p className="mt-4 text-gray-600">{t('common.loading')}</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 bg-beige rounded-2xl">
              <p className="text-xl text-gray-600">
                {language === 'lv' && 'Informācija par ārstiem tiks pievienota drīzumā'}
                {language === 'ru' && 'Информация о врачах будет добавлена в ближайшее время'}
                {language === 'en' && 'Doctor information will be added soon'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={doctor.image || defaultDoctorImage}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2">
                      <Award className="w-4 h-4 text-green" />
                      <span className="text-sm font-semibold">
                        {doctor.experience} {t('doctors.experience')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-purple">{doctor.name}</h3>
                    <p className="text-green font-medium mb-4">{doctor.specialty[language]}</p>
                    {doctor.description[language] && (
                      <p className="text-gray-600 mb-4">{doctor.description[language]}</p>
                    )}
                    {doctor.specializations?.[language]?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">
                          {language === 'lv' && 'Specializācijas:'}
                          {language === 'ru' && 'Специализации:'}
                          {language === 'en' && 'Specializations:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.specializations[language].map((spec, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-mint/50 text-green rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link
                      to={`/booking?doctor=${doctor.id}`}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-purple transition-colors font-medium"
                    >
                      <Calendar className="w-4 h-4" />
                      {t('doctors.bookWith')} {doctor.name.split(' ')[1] || doctor.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}