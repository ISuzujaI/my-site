import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Service {
  id: string;
  name: {
    lv: string;
    ru: string;
    en: string;
  };
  description: {
    lv: string;
    ru: string;
    en: string;
  };
  price: number;
  duration: number;
  category: string;
  image?: string;
  active: boolean;
}

interface ServiceModalProps {
  service?: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
}

export function ServiceModal({ service, onClose, onSave }: ServiceModalProps) {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState<Service>({
    id: service?.id || '',
    name: service?.name || { lv: '', ru: '', en: '' },
    description: service?.description || { lv: '', ru: '', en: '' },
    price: service?.price || 0,
    duration: service?.duration || 30,
    category: service?.category || 'therapy',
    image: service?.image || '',
    active: service?.active ?? true,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  const categories = [
    { value: 'therapy', label: { lv: 'Terapija', ru: 'Терапия', en: 'Therapy' } },
    { value: 'surgery', label: { lv: 'Ķirurģija', ru: 'Хирургия', en: 'Surgery' } },
    { value: 'vaccination', label: { lv: 'Vakcinācija', ru: 'Вакцинация', en: 'Vaccination' } },
    { value: 'diagnostics', label: { lv: 'Diagnostika', ru: 'Диагностика', en: 'Diagnostics' } },
    { value: 'dentistry', label: { lv: 'Stomatoloģija', ru: 'Стоматология', en: 'Dentistry' } },
    { value: 'emergency', label: { lv: 'Neatliekamā palīdzība', ru: 'Неотложная помощь', en: 'Emergency' } },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        language === 'lv' 
          ? 'Nederīgs faila tips. Atļauti tikai JPEG, PNG un WebP' 
          : language === 'ru'
          ? 'Недопустимый тип файла. Разрешены только JPEG, PNG и WebP'
          : 'Invalid file type. Only JPEG, PNG and WebP are allowed'
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError(
        language === 'lv' 
          ? 'Fails ir pārāk liels. Maksimālais izmērs ir 5MB' 
          : language === 'ru'
          ? 'Файл слишком большой. Максимальный размер 5MB'
          : 'File too large. Maximum size is 5MB'
      );
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch(`${API_BASE}/services/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to upload image');
      }

      setFormData(prev => ({ ...prev, image: result.data.url }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setUploadError(
        language === 'lv' 
          ? 'Neizdevās augšupielādēt attēlu' 
          : language === 'ru'
          ? 'Не удалось загрузить изображение'
          : 'Failed to upload image'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleNameChange = (lang: 'lv' | 'ru' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      name: { ...prev.name, [lang]: value }
    }));
  };

  const handleDescChange = (lang: 'lv' | 'ru' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      description: { ...prev.description, [lang]: value }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {service 
              ? (language === 'lv' ? 'Rediģēt pakalpojumu' : language === 'ru' ? 'Редактировать услугу' : 'Edit Service')
              : (language === 'lv' ? 'Pievienot pakalpojumu' : language === 'ru' ? 'Добавить услугу' : 'Add Service')
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' ? 'Kategorija' : language === 'ru' ? 'Категория' : 'Category'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Name - Multi-language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'lv' ? 'Nosaukums' : language === 'ru' ? 'Название' : 'Name'}
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Latviešu</label>
                <input
                  type="text"
                  value={formData.name.lv}
                  onChange={(e) => handleNameChange('lv', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Profilaktiskā apskate"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Русский</label>
                <input
                  type="text"
                  value={formData.name.ru}
                  onChange={(e) => handleNameChange('ru', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Профилактический осмотр"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">English</label>
                <input
                  type="text"
                  value={formData.name.en}
                  onChange={(e) => handleNameChange('en', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Preventive check-up"
                />
              </div>
            </div>
          </div>

          {/* Description - Multi-language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'lv' ? 'Apraksts' : language === 'ru' ? 'Описание' : 'Description'}
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Latviešu</label>
                <textarea
                  value={formData.description.lv}
                  onChange={(e) => handleDescChange('lv', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Pilnīga dzīvnieka veselības pārbaude..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Русский</label>
                <textarea
                  value={formData.description.ru}
                  onChange={(e) => handleDescChange('ru', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Полная проверка здоровья животного..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">English</label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => handleDescChange('en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Complete animal health check..."
                />
              </div>
            </div>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'lv' ? 'Cena (€)' : language === 'ru' ? 'Цена (€)' : 'Price (€)'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                placeholder="25.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'lv' ? 'Ilgums (min)' : language === 'ru' ? 'Длительность (мин)' : 'Duration (min)'}
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                required
                min="0"
                step="15"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                placeholder="30"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-5 h-5 text-green border-gray-300 rounded focus:ring-green"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">
              {language === 'lv' ? 'Aktīvs' : language === 'ru' ? 'Активен' : 'Active'}
            </label>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' ? 'Attēls' : language === 'ru' ? 'Изображение' : 'Image'}
            </label>
            
            {formData.image && (
              <div className="flex items-center gap-4 mb-3">
                <ImageWithFallback
                  src={formData.image}
                  alt="Service preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {language === 'lv' ? 'Noņemt' : language === 'ru' ? 'Удалить' : 'Remove'}
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-mint/30 text-green hover:bg-mint/50 rounded-lg cursor-pointer transition-colors">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {uploading 
                    ? (language === 'lv' ? 'Augšupielādē...' : language === 'ru' ? 'Загружается...' : 'Uploading...')
                    : (language === 'lv' ? 'Augšupielādēt attēlu' : language === 'ru' ? 'Загрузить изображение' : 'Upload image')
                  }
                </span>
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500">
                {language === 'lv' ? 'JPEG, PNG vai WebP (max 5MB)' : language === 'ru' ? 'JPEG, PNG или WebP (макс 5MB)' : 'JPEG, PNG or WebP (max 5MB)'}
              </span>
            </div>
            
            {uploadError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {uploadError}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              {language === 'lv' ? 'Atcelt' : language === 'ru' ? 'Отмена' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green text-white rounded-lg hover:bg-purple transition-colors font-medium"
            >
              {language === 'lv' ? 'Saglabāt' : language === 'ru' ? 'Сохранить' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}