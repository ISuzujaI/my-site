import { useState, useEffect } from 'react';
import { X, Upload, Loader2, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Doctor {
  id: string;
  name: string;
  specialty: {
    lv: string;
    ru: string;
    en: string;
  };
  experience: number;
  description: {
    lv: string;
    ru: string;
    en: string;
  };
  specializations: {
    lv: string[];
    ru: string[];
    en: string[];
  };
  schedule: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  active: boolean;
  image?: string;
  workingHours?: {
    start: string;
    end: string;
    slotDuration: number;
  };
  workingDays?: string[];
}

interface DoctorModalProps {
  doctor?: Doctor | null;
  onClose: () => void;
  onSave: (doctor: Doctor) => void;
}

export function DoctorModal({ doctor, onClose, onSave }: DoctorModalProps) {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState<Doctor>({
    id: doctor?.id || '',
    name: doctor?.name || '',
    specialty: doctor?.specialty || { lv: '', ru: '', en: '' },
    experience: doctor?.experience || 0,
    description: doctor?.description || { lv: '', ru: '', en: '' },
    specializations: doctor?.specializations || { lv: [], ru: [], en: [] },
    schedule: doctor?.schedule || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    active: doctor?.active ?? true,
    image: doctor?.image || '',
    workingHours: doctor?.workingHours || {
      start: '09:00',
      end: '17:00',
      slotDuration: 30,
    },
    workingDays: doctor?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

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

      const response = await fetch(`${API_BASE}/doctors/upload-image`, {
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

  const handleSpecChange = (lang: 'lv' | 'ru' | 'en', value: string) => {
    setFormData(prev => ({
      ...prev,
      specialty: { ...prev.specialty, [lang]: value }
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
            {doctor 
              ? (language === 'lv' ? 'Rediģēt ārstu' : language === 'ru' ? 'Редактировать врача' : 'Edit Doctor')
              : (language === 'lv' ? 'Pievienot ārstu' : language === 'ru' ? 'Добавить врача' : 'Add Doctor')
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' ? 'Vārds' : language === 'ru' ? 'Имя' : 'Name'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
              placeholder="Dr. Anna Liepiņa"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' ? 'Pieredze (gadi)' : language === 'ru' ? 'Опыт (лет)' : 'Experience (years)'}
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
              required
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>

          {/* Specialty - Multi-language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'lv' ? 'Specialitāte' : language === 'ru' ? 'Специальность' : 'Specialty'}
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Latviešu</label>
                <input
                  type="text"
                  value={formData.specialty.lv}
                  onChange={(e) => handleSpecChange('lv', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Galvenā veterinārārste"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Русский</label>
                <input
                  type="text"
                  value={formData.specialty.ru}
                  onChange={(e) => handleSpecChange('ru', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Главный ветеринар"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">English</label>
                <input
                  type="text"
                  value={formData.specialty.en}
                  onChange={(e) => handleSpecChange('en', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Chief Veterinarian"
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
                  placeholder="Specializējas mazdzīvnieku terapijā..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Русский</label>
                <textarea
                  value={formData.description.ru}
                  onChange={(e) => handleDescChange('ru', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Специализируется на терапии мелких животных..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">English</label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => handleDescChange('en', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Specializes in small animal therapy..."
                />
              </div>
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
                  alt="Doctor preview"
                  className="w-24 h-24 object-cover rounded-lg"
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

          {/* Working Schedule */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-green" />
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'lv' ? 'Darba laiks' : language === 'ru' ? 'Рабочее время' : 'Working Hours'}
              </h3>
            </div>

            {/* Working Hours */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'lv' ? 'Sākums' : language === 'ru' ? 'Начало' : 'Start Time'}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={formData.workingHours?.start || '09:00'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours!, start: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'lv' ? 'Beigas' : language === 'ru' ? 'Конец' : 'End Time'}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={formData.workingHours?.end || '17:00'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours!, end: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'lv' ? 'Pieņemšanas ilgums' : language === 'ru' ? 'Длительность приема' : 'Slot Duration'}
                </label>
                <select
                  value={formData.workingHours?.slotDuration || 30}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    workingHours: { ...prev.workingHours!, slotDuration: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                >
                  <option value={15}>15 {language === 'lv' ? 'min' : language === 'ru' ? 'мин' : 'min'}</option>
                  <option value={30}>30 {language === 'lv' ? 'min' : language === 'ru' ? 'мин' : 'min'}</option>
                  <option value={60}>60 {language === 'lv' ? 'min' : language === 'ru' ? 'мин' : 'min'}</option>
                </select>
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'lv' ? 'Darba dienas' : language === 'ru' ? 'Рабочие дни' : 'Working Days'}
              </label>
              <div className="grid grid-cols-7 gap-2">
                {[
                  { id: 'monday', label: language === 'lv' ? 'P' : language === 'ru' ? 'Пн' : 'M' },
                  { id: 'tuesday', label: language === 'lv' ? 'O' : language === 'ru' ? 'Вт' : 'T' },
                  { id: 'wednesday', label: language === 'lv' ? 'T' : language === 'ru' ? 'Ср' : 'W' },
                  { id: 'thursday', label: language === 'lv' ? 'C' : language === 'ru' ? 'Чт' : 'T' },
                  { id: 'friday', label: language === 'lv' ? 'P' : language === 'ru' ? 'Пт' : 'F' },
                  { id: 'saturday', label: language === 'lv' ? 'S' : language === 'ru' ? 'Сб' : 'S' },
                  { id: 'sunday', label: language === 'lv' ? 'Sv' : language === 'ru' ? 'Вс' : 'S' },
                ].map((day) => {
                  const isSelected = formData.workingDays?.includes(day.id) || false;
                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => {
                        const currentDays = formData.workingDays || [];
                        const newDays = isSelected
                          ? currentDays.filter(d => d !== day.id)
                          : [...currentDays, day.id];
                        setFormData(prev => ({ ...prev, workingDays: newDays }));
                      }}
                      className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-green text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {language === 'lv' ? 'Izvēlieties dienas, kad ārsts strādā' : 
                 language === 'ru' ? 'Выберите дни, когда врач работает' : 
                 'Select days when the doctor works'}
              </p>
            </div>
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