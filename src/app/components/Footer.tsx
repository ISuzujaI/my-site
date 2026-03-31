import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../../assets/c185aac12eda49255a8fe97956980cbd0adda400.png';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-purple text-beige">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Abuvet" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>ABUVET</span>
            </div>
            <p className="text-sm leading-relaxed text-mint">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?type=therapy" className="text-sm text-mint hover:text-green transition-colors">
                  {t('services.therapy')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=surgery" className="text-sm text-mint hover:text-green transition-colors">
                  {t('services.surgery')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=vaccination" className="text-sm text-mint hover:text-green transition-colors">
                  {t('services.vaccination')}
                </Link>
              </li>
              <li>
                <Link to="/services?type=diagnostics" className="text-sm text-mint hover:text-green transition-colors">
                  {t('services.diagnostics')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('nav.home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-mint hover:text-green transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-sm text-mint hover:text-green transition-colors">
                  {t('nav.doctors')}
                </Link>
              </li>
              <li>
                <Link to="/prices" className="text-sm text-mint hover:text-green transition-colors">
                  {t('nav.prices')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-mint hover:text-green transition-colors">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-mint hover:text-green transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-mint">Vestienas 2J, Rīga, LV-1035</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green flex-shrink-0" />
                <a href="tel:+37120123456" className="text-sm text-mint hover:text-green transition-colors">
                  +371 20 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green flex-shrink-0" />
                <a href="mailto:info@abuvet.lv" className="text-sm text-mint hover:text-green transition-colors">
                  info@abuvet.lv
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/abuvet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green/20 rounded-full flex items-center justify-center hover:bg-green transition-colors"
              >
                <Facebook className="w-4 h-4 text-mint" />
              </a>
              <a
                href="https://www.instagram.com/abuvet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green/20 rounded-full flex items-center justify-center hover:bg-green transition-colors"
              >
                <Instagram className="w-4 h-4 text-mint" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-green/20 rounded-full flex items-center justify-center hover:bg-green transition-colors"
              >
                <Twitter className="w-4 h-4 text-mint" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green/30 mt-12 pt-8 text-center text-sm">
          <p className="text-mint">
            &copy; 2026 SIA Abuvet (LV50203602361). {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}