import { format, addDays } from 'date-fns';
import { lv, ru, enUS } from 'date-fns/locale';

const locales = {
  lv,
  ru,
  en: enUS,
};

export function formatDate(date: Date | string, formatStr: string, language: 'lv' | 'ru' | 'en' = 'lv') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: locales[language] });
}

export function generateDateRange(days: number = 14): Array<{ value: string; label: string }> {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), i);
    dates.push({
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEE, dd MMM'),
    });
  }
  return dates;
}

export function generateTimeSlots(start: number = 9, end: number = 18, interval: number = 30) {
  const slots = [];
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
}
