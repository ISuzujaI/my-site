import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/c185aac12eda49255a8fe97956980cbd0adda400.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="abuvet-header sticky top-0 z-50 border-b border-purple/10 bg-beige/95 backdrop-blur">
      <div className="abuvet-container">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Abuvet" className="h-10 w-10 object-contain" />
            <span className="text-3xl leading-none text-purple" style={{ fontFamily: 'var(--font-heading)' }}>ABU</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                isActive('/') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`font-semibold transition-colors ${
                isActive('/about') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/services"
              className={`font-semibold transition-colors ${
                location.pathname.includes('/services') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.services')}
            </Link>

            <Link
              to="/doctors"
              className={`font-semibold transition-colors ${
                isActive('/doctors') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.doctors')}
            </Link>
            <Link
              to="/prices"
              className={`font-semibold transition-colors ${
                isActive('/prices') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.prices')}
            </Link>
            <Link
              to="/contact"
              className={`font-semibold transition-colors ${
                isActive('/contact') ? 'text-green' : 'text-purple hover:text-green'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('lv')}
                className={`abuvet-pill px-3 py-1 ${
                  language === 'lv'
                    ? 'border-purple bg-purple text-white'
                    : 'bg-beige hover:border-green hover:text-green'
                }`}
              >
                LV
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`abuvet-pill px-3 py-1 ${
                  language === 'ru'
                    ? 'border-purple bg-purple text-white'
                    : 'bg-beige hover:border-green hover:text-green'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`abuvet-pill px-3 py-1 ${
                  language === 'en'
                    ? 'border-purple bg-purple text-white'
                    : 'bg-beige hover:border-green hover:text-green'
                }`}
              >
                EN
              </button>
            </div>

            {isAuthenticated ? (
              <Link
                to="/profile"
                className="abuvet-button"
              >
                <User className="w-4 h-4" />
                {user?.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/booking"
                className="abuvet-button"
              >
                {t('hero.cta')}
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full border border-purple/20 bg-beige p-2 text-purple lg:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="abuvet-surface mb-4 p-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/services"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link
                to="/doctors"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.doctors')}
              </Link>
              <Link
                to="/prices"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.prices')}
              </Link>
              <Link
                to="/contact"
                className="text-purple hover:text-green font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="text-purple hover:text-green font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
              )}
              <Link
                to="/booking"
                className="abuvet-button text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('hero.cta')}
              </Link>

              <div className="flex gap-2 border-t border-purple/10 pt-4">
                <button
                  onClick={() => setLanguage('lv')}
                  className={`abuvet-pill px-3 py-2 ${
                    language === 'lv'
                      ? 'border-purple bg-purple text-white'
                      : 'bg-beige'
                  }`}
                >
                  LV
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`abuvet-pill px-3 py-2 ${
                    language === 'ru'
                      ? 'border-purple bg-purple text-white'
                      : 'bg-beige'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`abuvet-pill px-3 py-2 ${
                    language === 'en'
                      ? 'border-purple bg-purple text-white'
                      : 'bg-beige'
                  }`}
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
