import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'lv' && 'Lapa nav atrasta'}
          {language === 'ru' && 'Страница не найдена'}
          {language === 'en' && 'Page Not Found'}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            {language === 'lv' && 'Uz sākumu'}
            {language === 'ru' && 'На главную'}
            {language === 'en' && 'Go Home'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
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
