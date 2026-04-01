import { Award, Users, Heart, Trophy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useEditMode } from '../../context/EditModeContext';
import { useAuth } from '../../context/AuthContext';
import { SmartImage } from '../SmartImage';
import { EditableText } from '../EditableText';

export function About() {
  const { t, language } = useLanguage();
  const { isEditMode } = useEditMode();
  const { user } = useAuth();

  const history = {
    lv: 'VetClinic tika dibināta 2011. gadā ar mērķi nodrošināt augstākās kvalitātes veterināro aprūpi Rīgā un tās apkārtnē. Mūsu klīnika ir aprīkota ar modernāko medicīnisko aprīkojumu un piedāvā plašu pakalpojumu klāstu.',
    ru: 'VetClinic была основана в 2011 году с целью предоставления ветеринарной помощи высочайшего качества в Риге и окрестностях. Наша клиника оснащена самым современным медицинским оборудованием и предлагает широкий спектр услуг.',
    en: 'VetClinic was founded in 2011 with the goal of providing the highest quality veterinary care in Riga and surrounding areas. Our clinic is equipped with state-of-the-art medical equipment and offers a wide range of services.',
  };

  const values = [
    {
      icon: Heart,
      title: { lv: 'Mīlestība un rūpes', ru: 'Любовь и забота', en: 'Love and Care' },
      description: {
        lv: 'Mēs izturamies pret katru mājdzīvnieku kā pret savu',
        ru: 'Мы относимся к каждому питомцу как к своему',
        en: 'We treat every pet as our own',
      },
    },
    {
      icon: Award,
      title: { lv: 'Profesionalitāte', ru: 'Профессионализм', en: 'Professionalism' },
      description: {
        lv: 'Mūsu komandā strādā tikai sertificēti speciālisti',
        ru: 'В нашей команде работают только сертифицированные специалисты',
        en: 'Our team consists of certified specialists only',
      },
    },
    {
      icon: Users,
      title: { lv: 'Komandas darbs', ru: 'Командная работа', en: 'Teamwork' },
      description: {
        lv: 'Mēs sadarbojamies, lai nodrošinātu labāko rezultātu',
        ru: 'Мы работаем вместе для достижения лучшего результата',
        en: 'We work together to achieve the best results',
      },
    },
    {
      icon: Trophy,
      title: { lv: 'Izcilība', ru: 'Совершенство', en: 'Excellence' },
      description: {
        lv: 'Mēs vienmēr tiecamies uz augstāko kvalitāti',
        ru: 'Мы всегда стремимся к высочайшему качеству',
        en: 'We always strive for the highest quality',
      },
    },
  ];

  const equipment = [
    {
      name: { lv: 'Digitālais rentgens', ru: 'Цифровой рентген', en: 'Digital X-ray' },
      description: {
        lv: 'Augstas izšķirtspējas attēlveidošana',
        ru: 'Высокоразрешающая визуализация',
        en: 'High-resolution imaging',
      },
    },
    {
      name: { lv: 'Ultraskaņas iekārta', ru: 'УЗИ аппарат', en: 'Ultrasound machine' },
      description: {
        lv: 'Precīza iekšējo orgānu diagnostika',
        ru: 'Точная диагностика внутренних органов',
        en: 'Precise internal organ diagnostics',
      },
    },
    {
      name: { lv: 'Laboratorija', ru: 'Лаборатория', en: 'Laboratory' },
      description: {
        lv: 'Pilna analīžu spektra veikšana',
        ru: 'Полный спектр анализов',
        en: 'Full range of tests',
      },
    },
    {
      name: { lv: 'Operāciju zāle', ru: 'Операционная', en: 'Operating room' },
      description: {
        lv: 'Moderna un sterīla vide operācijām',
        ru: 'Современная и стерильная среда для операций',
        en: 'Modern and sterile environment for surgeries',
      },
    },
  ];

  const licenses = [
    {
      title: { lv: 'Veterinārā prakse', ru: 'Ветеринарная практика', en: 'Veterinary Practice' },
      number: 'VP-2011-001',
      issued: '2011-01-15',
    },
    {
      title: { lv: 'Laboratorijas licence', ru: 'Лицензия лаборатории', en: 'Laboratory License' },
      number: 'LAB-2011-045',
      issued: '2011-03-20',
    },
  ];

  return (
    <div className="abuvet-page py-10">
      <section className="abuvet-container">
        <div className="abuvet-soft-surface max-w-5xl mx-auto px-6 py-12 text-center sm:px-10">
          <h1 className="mb-6 text-purple">{t('about.title')}</h1>
          <p className="text-xl text-purple/80">{history[language]}</p>
        </div>
      </section>

      <section className="abuvet-container py-16">
        <h2 className="abuvet-section-title text-center mb-12">
          {language === 'lv' && 'Mūsu vērtības'}
          {language === 'ru' && 'Наши ценности'}
          {language === 'en' && 'Our Values'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="abuvet-surface text-center p-6">
                <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10 text-green" />
                </div>
                <h3 className="mb-2 text-purple text-2xl">{value.title[language]}</h3>
                <p className="text-purple/75">{value.description[language]}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="abuvet-container pb-16">
        <div className="abuvet-surface p-8 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="abuvet-section-title mb-6">
                {language === 'lv' && 'Moderna aprīkojums'}
                {language === 'ru' && 'Современное оборудование'}
                {language === 'en' && 'Modern Equipment'}
              </h2>
              <p className="text-lg text-purple/80 mb-8">
                {language === 'lv' &&
                  'Mūsu klīnika ir aprīkota ar jaunāko medicīnisko tehnoloģiju, lai nodrošinātu precīzu diagnostiku un efektīvu ārstēšanu.'}
                {language === 'ru' &&
                  'Наша клиника оснащена новейшими медицинскими технологиями для обеспечения точной диагностики и эффективного лечения.'}
                {language === 'en' &&
                  'Our clinic is equipped with the latest medical technology to ensure accurate diagnosis and effective treatment.'}
              </p>
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-mint rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-purple">{item.name[language]}</h4>
                      <p className="text-purple/75">{item.description[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <SmartImage
                page="about"
                contentKey="equipment-image"
                src="https://images.unsplash.com/photo-1682663947127-ac9d59d7f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwZXF1aXBtZW50JTIwbW9kZXJufGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern equipment"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="abuvet-container pb-16">
        <h2 className="abuvet-section-title text-center mb-12">
          {language === 'lv' && 'Licences un sertifikāti'}
          {language === 'ru' && 'Лицензии и сертификаты'}
          {language === 'en' && 'Licenses and Certificates'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {licenses.map((license, index) => (
            <div key={index} className="abuvet-surface p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-mint rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green" />
                </div>
                <div>
                  <h3 className="text-xl text-purple mb-2">{license.title[language]}</h3>
                  <p className="text-purple/75 mb-1">
                    {language === 'lv' && 'Numurs'}{language === 'ru' && 'Номер'}
                    {language === 'en' && 'Number'}: {license.number}
                  </p>
                  <p className="text-purple/75">
                    {language === 'lv' && 'Izsniegts'}{language === 'ru' && 'Выдано'}
                    {language === 'en' && 'Issued'}: {license.issued}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="abuvet-container pb-20">
        <h2 className="abuvet-section-title text-center mb-12">
          {language === 'lv' && 'Mūsu klīnika'}
          {language === 'ru' && 'Наша клиника'}
          {language === 'en' && 'Our Clinic'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SmartImage
            page="about"
            contentKey="gallery-image-0"
            src="https://images.unsplash.com/photo-1770836037326-d2df574278b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwc3VyZ2VyeSUyMHJvb218ZW58MXx8fHwxNzczOTAwNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Surgery room"
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
          <SmartImage
            page="about"
            contentKey="gallery-image-1"
            src="https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB2ZXRlcmluYXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Reception area"
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
          <SmartImage
            page="about"
            contentKey="gallery-image-2"
            src="https://images.unsplash.com/photo-1682663947127-ac9d59d7f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwZXF1aXBtZW50JTIwbW9kZXJufGVufDF8fHx8MTc3Mzk5Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Equipment room"
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        </div>
      </section>
    </div>
  );
}