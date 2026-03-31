import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Calendar as CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../AuthModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { format, addDays } from 'date-fns';
import { lv, ru, enUS } from 'date-fns/locale';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { supabase } from '/utils/supabase/client';

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
  active: boolean;
  image?: string;
}

export function Booking() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  // Load doctors from API
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const response = await fetch(`${API_BASE}/doctors`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load doctors');
      }

      const result = await response.json();
      if (result.success) {
        // Filter only active doctors
        const activeDoctors = (result.data || []).filter((doctor: Doctor) => doctor.active);
        setDoctors(activeDoctors);
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const services = [
    { id: 'therapy', name: t('services.therapy') },
    { id: 'surgery', name: t('services.surgery') },
    { id: 'vaccination', name: t('services.vaccination') },
    { id: 'diagnostics', name: t('services.diagnostics') },
    { id: 'dentistry', name: t('services.dentistry') },
    { id: 'emergency', name: t('services.emergency') },
  ];

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEE, dd MMM', { locale: language === 'lv' ? lv : language === 'ru' ? ru : enUS }),
    };
  });

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const start = 9;
    const end = 18;
    for (let hour = start; hour < end; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Mock: some slots are already booked
        const isBooked = Math.random() > 0.7;
        slots.push({ time, available: !isBooked });
      }
    }
    return slots;
  };

  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());

  useEffect(() => {
    // Load time slots when date and doctor changes
    if (selectedDate && selectedDoctor) {
      loadAvailableSlots();
    }
  }, [selectedDate, selectedDoctor]);

  const loadAvailableSlots = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/available-slots?doctorId=${selectedDoctor}&date=${selectedDate}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load available slots');
      }

      const result = await response.json();
      if (result.success) {
        setTimeSlots(result.data);
      }
    } catch (err) {
      console.error('Error loading available slots:', err);
      // Fallback to generated slots
      setTimeSlots(generateTimeSlots());
    }
  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      // Get user session for access token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setShowAuthModal(true);
        return;
      }

      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          serviceId: selectedService,
          doctorId: selectedDoctor,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      const result = await response.json();
      if (result.success) {
        setBookingComplete(true);
      } else {
        alert(result.error || 'Failed to create appointment');
      }
    } catch (err) {
      console.error('Error creating appointment:', err);
      alert('Failed to create appointment. Please try again.');
    }
  };

  const canProceed = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return selectedService !== '';
      case 2:
        return selectedDoctor !== '';
      case 3:
        return selectedDate !== '';
      case 4:
        return selectedTime !== '';
      default:
        return false;
    }
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('booking.success')}</h2>
            <p className="text-gray-600 mb-6">
              {language === 'lv' &&
                'Jūsu pieraksts ir veiksmīgi saglabāts. Apstiprinājumu saņemsiet e-pastā.'}
              {language === 'ru' &&
                'Ваша запись успешно сохранена. Вы получите подтверждение п электронной почте.'}
              {language === 'en' &&
                'Your booking has been successfully saved. You will receive confirmation by email.'}
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('booking.selectService')}:</span>
                <span className="font-semibold">
                  {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('booking.selectDoctor')}:</span>
                <span className="font-semibold">
                  {doctors.find((d) => d.id === selectedDoctor)?.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('booking.selectDate')}:</span>
                <span className="font-semibold">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('booking.selectTime')}:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = '/profile')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t('nav.profile')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('booking.title')}</h1>
            <p className="text-xl text-gray-600">
              {language === 'lv' && 'Sekojiet soļiem, lai rezervētu vizīti'}
              {language === 'ru' && 'Следуйте шагам, чтобы забронировать визит'}
              {language === 'en' && 'Follow the steps to book your visit'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                      stepNum <= step
                        ? 'bg-green text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div
                      className={`w-16 lg:w-24 h-1 mx-2 transition-colors ${
                        stepNum < step ? 'bg-green' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('booking.selectService')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        selectedService === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600">{t(`services.${service.id}.desc`)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Doctor */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('booking.selectDoctor')}</h2>
                {loadingDoctors ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
                    <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                  </div>
                ) : doctors.length === 0 ? (
                  <div className="text-center py-12 bg-beige rounded-lg">
                    <p className="text-gray-600">
                      {language === 'lv' && 'Nav pieejamu ārstu. Lūdzu, sazinieties ar mums.'}
                      {language === 'ru' && 'Нет доступных врачей. Пожалуйста, свяжитесь с нами.'}
                      {language === 'en' && 'No doctors available. Please contact us.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={`w-full p-6 rounded-lg border-2 text-left transition-all flex items-center gap-4 ${
                          selectedDoctor === doctor.id
                            ? 'border-green bg-mint/30'
                            : 'border-gray-200 hover:border-green/50'
                        }`}
                      >
                        {doctor.image ? (
                          <ImageWithFallback
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-8 h-8 text-green" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-purple">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty[language]}</p>
                          {doctor.experience && (
                            <p className="text-xs text-gray-500 mt-1">
                              {doctor.experience} {t('doctors.experience')}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Select Date */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('booking.selectDate')}</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedDate === date.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{date.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Select Time */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('booking.selectTime')}</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTime === slot.time
                          ? 'border-blue-600 bg-blue-50'
                          : slot.available
                          ? 'border-gray-200 hover:border-blue-300'
                          : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  {language === 'lv' && 'Atpakaļ'}
                  {language === 'ru' && 'Назад'}
                  {language === 'en' && 'Back'}
                </button>
              )}
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed(step)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed(step)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {language === 'lv' && 'Turpināt'}
                  {language === 'ru' && 'Продолжить'}
                  {language === 'en' && 'Continue'}
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  disabled={!canProceed(step)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed(step)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('booking.confirm')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}