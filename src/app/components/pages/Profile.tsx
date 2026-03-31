import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router';
import { User, Calendar, Clock, Mail, LogOut, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { supabase } from '/utils/supabase/client';

interface Appointment {
  id: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
  doctorName?: string;
  serviceName?: string;
}

export function Profile() {
  const { t, language } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<any[]>([]);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  useEffect(() => {
    if (isAuthenticated) {
      loadAppointments();
      loadDoctors();
    }
  }, [isAuthenticated]);

  const loadDoctors = async () => {
    try {
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
        setDoctors(result.data);
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
    }
  };

  const loadAppointments = async () => {
    try {
      setLoading(true);
      
      // Get user session for access token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/appointments`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load appointments');
      }

      const result = await response.json();
      if (result.success) {
        setAppointments(result.data || []);
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    const confirmMessage = 
      language === 'lv' ? 'Vai tiešām vēlaties atcelt pierakstu?' : 
      language === 'ru' ? 'Вы действительно хотите отменить запись?' : 
      'Are you sure you want to cancel this appointment?';
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      // Get user session for access token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        alert('Session expired. Please log in again.');
        return;
      }

      const response = await fetch(`${API_BASE}/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      const result = await response.json();
      if (result.success) {
        // Remove from local state
        setAppointments(appointments.filter(apt => apt.id !== appointmentId));
        
        const successMessage = 
          language === 'lv' ? 'Pieraksts veiksmīgi atcelts' : 
          language === 'ru' ? 'Запись успешно отменена' : 
          'Appointment cancelled successfully';
        alert(successMessage);
      }
    } catch (err) {
      console.error('Error canceling appointment:', err);
      const errorMessage = 
        language === 'lv' ? 'Neizdevās atcelt pierakstu' : 
        language === 'ru' ? 'Не удалось отменить запись' : 
        'Failed to cancel appointment';
      alert(errorMessage);
    }
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor?.name || doctorId;
  };

  const getServiceName = (serviceId: string) => {
    return t(`services.${serviceId}`) || serviceId;
  };

  const isUpcoming = (appointment: Appointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    return appointmentDate > new Date();
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/booking" />;
  }

  const upcomingAppointments = appointments.filter(isUpcoming);
  const pastAppointments = appointments.filter((apt) => apt.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-gray-600">{user?.phone}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('profile.logout')}
              </button>
            </div>
          </div>

          {/* Admin Link */}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-2">{t('admin.title')}</h2>
              <p className="opacity-90">
                {language === 'lv' && 'Pārvaldiet klīnikas iestatījumus un datus'}
                {language === 'ru' && 'Управляйте настройками и данными клиники'}
                {language === 'en' && 'Manage clinic settings and data'}
              </p>
            </Link>
          )}

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('profile.upcoming')}</h2>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {language === 'lv' && 'Nav gaidāmo pierakstu'}
                  {language === 'ru' && 'Нет предстоящих записей'}
                  {language === 'en' && 'No upcoming appointments'}
                </p>
                <Link
                  to="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {t('hero.cta')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">
                          {getServiceName(appointment.serviceId)}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{getDoctorName(appointment.doctorId)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                          {t('profile.cancel')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{t('profile.history')}</h2>
            {pastAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {language === 'lv' && 'Nav iepriekšējo apmeklējumu'}
                  {language === 'ru' && 'Нет прошлых посещений'}
                  {language === 'en' && 'No past visits'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">
                          {getServiceName(appointment.serviceId)}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{getDoctorName(appointment.doctorId)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {language === 'lv' && 'Pabeigts'}
                        {language === 'ru' && 'Завершено'}
                        {language === 'en' && 'Completed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}