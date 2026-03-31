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
    <header className="sticky top-0 z-50 bg-beige shadow-sm border-b-2 border-green">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Abuvet" className="w-12 h-12 object-contain" />
            <span className="text-2xl font-bold text-purple" style={{ fontFamily: 'var(--font-heading)' }}>ABUVET</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-semibold transition-colors ${ 
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

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('lv')}
                className={`px-3 py-1.5 rounded font-semibold ${
                  language === 'lv'
                    ? 'bg-green text-white'
                    : 'bg-mint text-purple hover:bg-green hover:text-white'
                }`}
              >
                LV
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 rounded font-semibold ${
                  language === 'ru'
                    ? 'bg-green text-white'
                    : 'bg-mint text-purple hover:bg-green hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded font-semibold ${
                  language === 'en'
                    ? 'bg-green text-white'
                    : 'bg-mint text-purple hover:bg-green hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors font-semibold"
              >
                <User className="w-4 h-4" />
                {user?.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                to="/booking"
                className="px-6 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors font-semibold"
              >
                {t('hero.cta')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-purple"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t-2 border-green">
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
                className="px-6 py-2 bg-green text-white rounded-lg hover:bg-purple text-center font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('hero.cta')}
              </Link>

              {/* Language Switcher Mobile */}
              <div className="flex gap-2 pt-4 border-t-2 border-green">
                <button
                  onClick={() => setLanguage('lv')}
                  className={`px-3 py-2 rounded font-semibold ${
                    language === 'lv'
                      ? 'bg-green text-white'
                      : 'bg-mint text-purple'
                  }`}
                >
                  LV
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-3 py-2 rounded font-semibold ${
                    language === 'ru'
                      ? 'bg-green text-white'
                      : 'bg-mint text-purple'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-2 rounded font-semibold ${
                    language === 'en'
                      ? 'bg-green text-white'
                      : 'bg-mint text-purple'
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