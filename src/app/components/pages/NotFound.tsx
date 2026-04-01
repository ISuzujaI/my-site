import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="abuvet-page flex items-center justify-center px-4">
      <div className="text-center px-4">
        <h1 className="text-9xl text-green mb-4" style={{ fontFamily: 'var(--font-heading)' }}>404</h1>
        <h2 className="text-4xl text-purple mb-4">
          {language === 'lv' && 'Lapa nav atrasta'}
          {language === 'ru' && 'Страница не найдена'}
          {language === 'en' && 'Page Not Found'}
        </h2>
        <p className="text-xl text-purple/75 mb-8 max-w-md mx-auto">
          {language === 'lv' &&
            'Diemžēl lapa, kuru meklējat, nepastāv vai tika pārvietota'}
          {language === 'ru' &&
            'К сожалению, страница, которую вы ищете, не существует или была перемещена'}
          {language === 'en' &&
            'Unfortunately, the page you are looking for does not exist or has been moved'}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple text-white rounded-full hover:bg-green transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            {language === 'lv' && 'Uz sākumu'}
            {language === 'ru' && 'На главную'}
            {language === 'en' && 'Go Home'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-beige text-purple border-2 border-purple/30 rounded-full hover:border-green hover:text-green transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'lv' && 'Atpakaļ'}
            {language === 'ru' && 'Назад'}
            {language === 'en' && 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
}

