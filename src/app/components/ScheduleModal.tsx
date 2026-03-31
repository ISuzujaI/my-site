import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WorkingHours {
  start: string;
  end: string;
  slotDuration: number;
  daysOff: number[];
}

interface ScheduleModalProps {
  doctor: any;
  onClose: () => void;
  onSave: (schedule: WorkingHours) => void;
}

export function ScheduleModal({ doctor, onClose, onSave }: ScheduleModalProps) {
  const { language } = useLanguage();
  
  const [schedule, setSchedule] = useState<WorkingHours>({
    start: doctor.workingHours?.start || '09:00',
    end: doctor.workingHours?.end || '18:00',
    slotDuration: doctor.workingHours?.slotDuration || 30,
    daysOff: doctor.workingHours?.daysOff || [],
  });

  const daysOfWeek = [
    { value: 1, label: { lv: 'Pirmd', ru: 'Пн', en: 'Mon' } },
    { value: 2, label: { lv: 'Otrd', ru: 'Вт', en: 'Tue' } },
    { value: 3, label: { lv: 'Trešd', ru: 'Ср', en: 'Wed' } },
    { value: 4, label: { lv: 'Ceturtd', ru: 'Чт', en: 'Thu' } },
    { value: 5, label: { lv: 'Piektd', ru: 'Пт', en: 'Fri' } },
    { value: 6, label: { lv: 'Sestd', ru: 'Сб', en: 'Sat' } },
    { value: 0, label: { lv: 'Svētd', ru: 'Вс', en: 'Sun' } },
  ];

  const toggleDayOff = (day: number) => {
    if (schedule.daysOff.includes(day)) {
      setSchedule({
        ...schedule,
        daysOff: schedule.daysOff.filter(d => d !== day),
      });
    } else {
      setSchedule({
        ...schedule,
        daysOff: [...schedule.daysOff, day],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(schedule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {language === 'lv' && `Darba laiks - ${doctor.name}`}
            {language === 'ru' && `Рабочее время - ${doctor.name}`}
            {language === 'en' && `Working Hours - ${doctor.name}`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Working Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' && 'Darba laiks'}
              {language === 'ru' && 'Часы работы'}
              {language === 'en' && 'Working Hours'}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {language === 'lv' && 'Sākums'}
                  {language === 'ru' && 'Начало'}
                  {language === 'en' && 'Start'}
                </label>
                <input
                  type="time"
                  value={schedule.start}
                  onChange={(e) => setSchedule({ ...schedule, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {language === 'lv' && 'Beigas'}
                  {language === 'ru' && 'Конец'}
                  {language === 'en' && 'End'}
                </label>
                <input
                  type="time"
                  value={schedule.end}
                  onChange={(e) => setSchedule({ ...schedule, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Slot Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' && 'Vizītes ilgums (minūtes)'}
              {language === 'ru' && 'Длительность приема (минуты)'}
              {language === 'en' && 'Appointment Duration (minutes)'}
            </label>
            <select
              value={schedule.slotDuration}
              onChange={(e) => setSchedule({ ...schedule, slotDuration: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            >
              <option value={15}>15 {language === 'lv' ? 'minūtes' : language === 'ru' ? 'минут' : 'minutes'}</option>
              <option value={30}>30 {language === 'lv' ? 'minūtes' : language === 'ru' ? 'минут' : 'minutes'}</option>
              <option value={60}>60 {language === 'lv' ? 'minūtes' : language === 'ru' ? 'минут' : 'minutes'}</option>
            </select>
          </div>

          {/* Days Off */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'lv' && 'Brīvdienas'}
              {language === 'ru' && 'Выходные дни'}
              {language === 'en' && 'Days Off'}
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDayOff(day.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    schedule.daysOff.includes(day.value)
                      ? 'bg-red-500 text-white'
                      : 'bg-green/20 text-green hover:bg-green/30'
                  }`}
                >
                  {day.label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-beige rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green" />
              <span className="font-semibold">
                {language === 'lv' && 'Priekšskatījums'}
                {language === 'ru' && 'Предпросмотр'}
                {language === 'en' && 'Preview'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {language === 'lv' && `Darba laiks: ${schedule.start} - ${schedule.end}`}
              {language === 'ru' && `Рабочее время: ${schedule.start} - ${schedule.end}`}
              {language === 'en' && `Working hours: ${schedule.start} - ${schedule.end}`}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'lv' && `Vizītes ilgums: ${schedule.slotDuration} minūtes`}
              {language === 'ru' && `Длительность приема: ${schedule.slotDuration} минут`}
              {language === 'en' && `Appointment duration: ${schedule.slotDuration} minutes`}
            </p>
            {schedule.daysOff.length > 0 && (
              <p className="text-sm text-gray-600">
                {language === 'lv' && 'Brīvdienas: '}
                {language === 'ru' && 'Выходные: '}
                {language === 'en' && 'Days off: '}
                {schedule.daysOff.map(d => daysOfWeek.find(day => day.value === d)?.label[language]).join(', ')}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {language === 'lv' && 'Atcelt'}
              {language === 'ru' && 'Отмена'}
              {language === 'en' && 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 transition-colors font-medium"
            >
              {language === 'lv' && 'Saglabāt'}
              {language === 'ru' && 'Сохранить'}
              {language === 'en' && 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
