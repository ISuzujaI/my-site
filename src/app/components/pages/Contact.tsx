import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="abuvet-page py-10">
      <section className="abuvet-container">
        <div className="abuvet-soft-surface px-6 py-12 sm:px-10 text-center">
          <h1 className="text-purple text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')}</h1>
          <p className="text-xl text-purple/80 text-center max-w-3xl mx-auto font-semibold">
            {language === 'lv' &&
              'Mēs esam šeit, lai atbildētu uz jūsu jautājumiem un palīdzētu jūsu mīļajiem dzīvniekiem'}
            {language === 'ru' &&
              'Мы здесь, чтобы ответить на ваши вопросы и помочь вашим любимым питомцам'}
            {language === 'en' &&
              'We are here to answer your questions and help your beloved pets'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-beige">
        <div className="abuvet-container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-purple" style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'lv' && 'Kontaktinformācija'}
                {language === 'ru' && 'Контактная информация'}
                {language === 'en' && 'Contact Information'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-purple">{t('contact.address')}</h3>
                    <p className="text-purple/80 font-medium">
                      Vestienas 2J
                      <br />
                      Rīga, LV-1035
                      <br />
                      Latvija
                      <br />
                      <span className="text-sm">SIA Abuvet (LV50203602361)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-purple">{t('contact.phone')}</h3>
                    <p className="text-purple/80 font-medium">
                      <a href="tel:+37120123456" className="hover:text-green">
                        +371 20 123 456
                      </a>
                      <br />
                      {language === 'lv' && 'Neatliekamā palīdzība 24/7:'}
                      {language === 'ru' && 'Экстренная помощь 24/7:'}
                      {language === 'en' && 'Emergency 24/7:'}{' '}
                      <a href="tel:+37120999999" className="hover:text-green">
                        +371 20 999 999
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-purple">{t('contact.email')}</h3>
                    <p className="text-purple/80 font-medium">
                      <a href="mailto:info@abuvet.lv" className="hover:text-green">
                        info@abuvet.lv
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-purple">{t('contact.hours')}</h3>
                    <div className="text-purple/80 font-medium space-y-1">
                      <p>
                        {language === 'lv' && 'Pirmdiena - Piektdiena:'}
                        {language === 'ru' && 'Понедельник - Пятница:'}
                        {language === 'en' && 'Monday - Friday:'} 9:00 - 18:00
                      </p>
                      <p>
                        {language === 'lv' && 'Sestdiena:'}
                        {language === 'ru' && 'Суббота:'}
                        {language === 'en' && 'Saturday:'} 10:00 - 16:00
                      </p>
                      <p>
                        {language === 'lv' && 'Svētdiena:'}
                        {language === 'ru' && 'Воскресенье:'}
                        {language === 'en' && 'Sunday:'}{' '}
                        {language === 'lv' && 'Tikai neatliekamā palīdzība'}
                        {language === 'ru' && 'Только экстренная помощь'}
                        {language === 'en' && 'Emergency only'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="abuvet-surface p-8 border-2 border-green/20">
              <h2 className="text-3xl font-bold mb-6 text-purple" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.form')}</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-green" style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'lv' && 'Paldies!'}
                    {language === 'ru' && 'Спасибо!'}
                    {language === 'en' && 'Thank you!'}
                  </h3>
                  <p className="text-purple/80 font-medium">
                    {language === 'lv' && 'Mēs sazināsimies ar jums tuvākajā laikā'}
                    {language === 'ru' && 'Мы свяжемся с вами в ближайшее время'}
                    {language === 'en' && 'We will contact you soon'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-green/20 rounded-lg focus:ring-2 focus:ring-green focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-green/20 rounded-lg focus:ring-2 focus:ring-green focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+371 12345678"
                      className="w-full px-4 py-3 border-2 border-green/20 rounded-lg focus:ring-2 focus:ring-green focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-green/20 rounded-lg focus:ring-2 focus:ring-green focus:border-green resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green text-white rounded-lg hover:bg-purple transition-colors font-semibold"
                  >
                    {t('contact.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-mint">
        <div className="abuvet-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple" style={{ fontFamily: 'var(--font-heading)' }}>
              {language === 'lv' && 'Kā mūs atrast'}
              {language === 'ru' && 'Как нас найти'}
              {language === 'en' && 'How to find us'}
            </h2>
            <div className="bg-beige rounded-2xl overflow-hidden h-96 flex items-center justify-center border-4 border-green">
              <p className="text-purple/80 font-semibold">
                {language === 'lv' && 'Karte (integrējiet Google Maps)'}
                {language === 'ru' && 'Карта (интегрируйте Google Maps)'}
                {language === 'en' && 'Map (integrate Google Maps)'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}