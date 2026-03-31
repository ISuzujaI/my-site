import { Link } from 'react-router';
import { Heart, Award, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditMode } from '../../context/EditModeContext';
import { useAuth } from '../../context/AuthContext';
import { EditableText } from '../EditableText';
import { SmartImage } from '../SmartImage';

export function Home() {
  const { t } = useLanguage();
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  const features = [
    {
      icon: Award,
      title: t('why.modern'),
      description: t('why.modern.desc'),
      color: 'green',
    },
    {
      icon: Heart,
      title: t('why.experienced'),
      description: t('why.experienced.desc'),
      color: 'purple',
    },
    {
      icon: Clock,
      title: t('why.emergency'),
      description: t('why.emergency.desc'),
      color: 'green',
    },
    {
      icon: Shield,
      title: t('why.care'),
      description: t('why.care.desc'),
      color: 'purple',
    },
  ];

  const stats = [
    { value: '15+', label: t('about.experience') },
    { value: '12', label: t('about.doctors') },
    { value: '5000+', label: t('about.patients') },
  ];

  const services = [
    {
      key: 'therapy',
      image: 'https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      key: 'surgery',
      image: 'https://images.unsplash.com/photo-1770836037326-d2df574278b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwc3VyZ2VyeSUyMHJvb218ZW58MXx8fHwxNzczOTAwNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      key: 'diagnostics',
      image: 'https://images.unsplash.com/photo-1682663947127-ac9d59d7f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwZXF1aXBtZW50JTIwbW9kZXJufGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const reviews = [
    {
      name: 'Anna Liepiņa',
      rating: 5,
      text: 'Brīnišķīga klīnika! Ārsti ir ļoti profesionāli un rūpīgi. Mans suns tika labi aprūpēts.',
      date: '2026-03-15',
    },
    {
      name: 'Jānis Bērziņš',
      rating: 5,
      text: 'Ātrs un kvalitatīvs serviss. Paldies par palīdzību mūsu kaķim!',
      date: '2026-03-10',
    },
    {
      name: 'Marija Ivanova',
      rating: 5,
      text: 'Lieliska klīnika! Ārsti ir ļoti uzmanīgi un profesionāli.',
      date: '2026-03-05',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-beige via-mint to-beige py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                page="home"
                contentKey="hero-title"
                defaultValue={t('hero.title')}
                as="h1"
                className="text-purple mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem' }}
                isAdmin={isEditMode && user?.isAdmin}
                multiline={false}
              />
              <EditableText
                page="home"
                contentKey="hero-subtitle"
                defaultValue={t('hero.subtitle')}
                as="p"
                className="text-xl text-purple/80 mb-8 font-semibold"
                isAdmin={isEditMode && user?.isAdmin}
                multiline={true}
              />
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="px-8 py-4 bg-green text-white rounded-lg hover:bg-purple transition-colors font-semibold text-lg inline-flex items-center gap-2"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-purple border-2 border-green rounded-lg hover:bg-mint transition-colors font-semibold text-lg"
                >
                  {t('contact.title')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <SmartImage
                page="home"
                contentKey="hero-image"
                src="https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy cat with veterinarian"
                className="rounded-2xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover border-4 border-green"
                adminOnly
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <EditableText
                  page="home"
                  contentKey={`stat-value-${index}`}
                  defaultValue={stat.value}
                  as="div"
                  className="text-5xl font-bold text-green mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
                <EditableText
                  page="home"
                  contentKey={`stat-label-${index}`}
                  defaultValue={stat.label}
                  as="div"
                  className="text-purple text-lg font-semibold"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-mint">
        <div className="container mx-auto px-4">
          <EditableText
            page="home"
            contentKey="why-title"
            defaultValue={t('why.title')}
            as="h2"
            className="text-purple text-center mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <EditableText
            page="home"
            contentKey="why-description"
            defaultValue={t('about.description')}
            as="p"
            className="text-xl text-purple/80 text-center mb-12 max-w-2xl mx-auto font-medium"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isGreen = feature.color === 'green';
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border-2 border-green/20"
                >
                  <div
                    className={`w-16 h-16 ${isGreen ? 'bg-green' : 'bg-purple'} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <EditableText
                    page="home"
                    contentKey={`feature-title-${index}`}
                    defaultValue={feature.title}
                    as="h3"
                    className="text-xl font-bold mb-3 text-purple"
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={false}
                  />
                  <EditableText
                    page="home"
                    contentKey={`feature-desc-${index}`}
                    defaultValue={feature.description}
                    as="p"
                    className="text-purple/70 font-medium"
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <EditableText
              page="home"
              contentKey="services-title"
              defaultValue={t('services.title')}
              as="h2"
              className="text-purple mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
              isAdmin={isEditMode && user?.isAdmin}
              multiline={false}
            />
            <Link
              to="/services"
              className="text-green hover:text-purple font-semibold inline-flex items-center gap-2"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link
                key={service.key}
                to={`/services?type=${service.key}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow border-4 border-green"
              >
                <div className="relative h-64">
                  <SmartImage
                    page="home"
                    contentKey={`service-image-${idx}`}
                    src={service.image}
                    alt={t(`services.${service.key}`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/90 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(`services.${service.key}`)}</h3>
                  <p className="text-sm opacity-90 font-medium">{t(`services.${service.key}.desc`)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-mint">
        <div className="container mx-auto px-4">
          <EditableText
            page="home"
            contentKey="reviews-title"
            defaultValue={t('reviews.title')}
            as="h2"
            className="text-purple text-center mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-2 border-purple/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-green text-green" />
                  ))}
                </div>
                <EditableText
                  page="home"
                  contentKey={`review-text-${index}`}
                  defaultValue={review.text}
                  as="p"
                  className="text-purple/80 mb-4 font-medium"
                  isAdmin={isEditMode && user?.isAdmin}
                  multiline={true}
                />
                <div className="flex items-center justify-between text-sm">
                  <EditableText
                    page="home"
                    contentKey={`review-name-${index}`}
                    defaultValue={review.name}
                    as="span"
                    className="font-bold text-purple"
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={false}
                  />
                  <EditableText
                    page="home"
                    contentKey={`review-date-${index}`}
                    defaultValue={review.date}
                    as="span"
                    className="text-purple/60"
                    isAdmin={isEditMode && user?.isAdmin}
                    multiline={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green to-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <EditableText
            page="home"
            contentKey="cta-title"
            defaultValue="Ready to care for your pet?"
            as="h2"
            className="mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem' }}
            isAdmin={isEditMode && user?.isAdmin}
            multiline={false}
          />
          <EditableText
            page="home"
            contentKey="cta-description"
            defaultValue="Book an appointment today and give your pet the professional care they deserve"
            as="p"
            className="text-xl mb-8 max-w-2xl mx-auto font-medium"
            isAdmin={isEditMode && user?.isAdmin}
            multiline={true}
          />
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green rounded-lg hover:bg-beige hover:text-purple transition-colors font-bold text-lg border-2 border-white"
          >
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}