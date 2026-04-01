import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../../assets/c185aac12eda49255a8fe97956980cbd0adda400.png';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="abuvet-footer border-t border-purple/10 bg-beige py-16 text-purple">
      <div className="abuvet-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Abuvet" className="w-10 h-10 object-contain" />
              <span className="text-3xl leading-none text-purple" style={{ fontFamily: 'var(--font-heading)' }}>ABU</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-purple/75">
              {t('about.description')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl text-purple" style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?type=therapy" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('services.therapy')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=surgery" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('services.surgery')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=vaccination" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('services.vaccination')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=diagnostics" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('services.diagnostics')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl text-purple" style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('nav.doctors')}
                </Link>
              </li>
              <li>
                <Link to="/prices" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('nav.prices')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-purple/75 transition-colors hover:text-green">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl text-purple" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-purple/75">Vestienas 2J, Rīga, LV-1035</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green flex-shrink-0" />
                <a href="tel:+37120123456" className="text-sm text-purple/75 transition-colors hover:text-green">
                  +371 20 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green flex-shrink-0" />
                <a href="mailto:info@abuvet.lv" className="text-sm text-purple/75 transition-colors hover:text-green">
                  info@abuvet.lv
                </a>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/abuvet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-purple/15 bg-beige transition-colors hover:border-green hover:bg-mint/40"
              >
                <Facebook className="w-4 h-4 text-purple" />
              </a>
              <a
                href="https://www.instagram.com/abuvet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-purple/15 bg-beige transition-colors hover:border-green hover:bg-mint/40"
              >
                <Instagram className="w-4 h-4 text-purple" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-purple/15 bg-beige transition-colors hover:border-green hover:bg-mint/40"
              >
                <Twitter className="w-4 h-4 text-purple" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-purple/10 pt-8 text-center text-sm">
          <p className="text-purple/65">
            &copy; 2026 SIA Abuvet (LV50203602361). {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
