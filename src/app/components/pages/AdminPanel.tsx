import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { Users, Calendar, Settings, Plus, Edit, Trash2, AlertCircle, Clock, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DoctorModal } from '../DoctorModal';
import { ScheduleModal } from '../ScheduleModal';
import { ServiceModal } from '../ServiceModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';
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

export function AdminPanel() {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'doctors' | 'services' | 'schedule' | 'appointments'>('doctors');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingScheduleDoctor, setEditingScheduleDoctor] = useState<Doctor | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

  useEffect(() => {
    if (activeTab === 'doctors' || activeTab === 'schedule') {
      loadDoctors();
    } else if (activeTab === 'appointments') {
      loadAppointments();
    } else if (activeTab === 'services') {
      loadServices();
    }
  }, [activeTab]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/appointments/all`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load appointments');
      }

      const result = await response.json();
      if (result.success) {
        // Filter only user appointments (not doctor-indexed ones)
        const userAppointments = (result.data || []).filter((apt: any) => 
          apt.id.startsWith('appointment:user:')
        );
        setAppointments(userAppointments);
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    const confirmMsg = language === 'lv' 
      ? 'Vai tiešām vēlaties atcelt šo pierakstu?' 
      : language === 'ru' 
      ? 'Вы действительно хотите отменить эту запись?' 
      : 'Are you sure you want to cancel this appointment?';

    if (!confirm(confirmMsg)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/admin/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      const result = await response.json();
      if (result.success) {
        loadAppointments();
      }
    } catch (err) {
      console.error('Error canceling appointment:', err);
      alert('Failed to cancel appointment');
    }
  };

  const handleEditSchedule = (doctor: Doctor) => {
    setEditingScheduleDoctor(doctor);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = async (workingHours: any) => {
    if (!editingScheduleDoctor) return;

    try {
      const response = await fetch(`${API_BASE}/doctors/${editingScheduleDoctor.id}/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ workingHours }),
      });

      if (!response.ok) {
        throw new Error('Failed to update schedule');
      }

      const result = await response.json();
      if (result.success) {
        setShowScheduleModal(false);
        loadDoctors();
        alert(
          language === 'lv' ? 'Darba laiks veiksmīgi atjaunināts' :
          language === 'ru' ? 'Рабочее время успешно обновлено' :
          'Working hours updated successfully'
        );
      }
    } catch (err) {
      console.error('Error saving schedule:', err);
      alert('Failed to update schedule');
    }
  };

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError('');
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
        setDoctors(result.data || []);
      } else {
        setError(result.error || 'Failed to load doctors');
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleSaveDoctor = async (doctor: Doctor) => {
    try {
      setError('');
      
      // Use publicAnonKey for API requests since we're using mock auth
      const accessToken = publicAnonKey;

      const isEditing = doctor.id && doctor.id.startsWith('doctor:');
      const url = isEditing 
        ? `${API_BASE}/doctors/${doctor.id}`
        : `${API_BASE}/doctors`;
      
      const method = isEditing ? 'PUT' : 'POST';

      console.log('Saving doctor:', { method, url, doctor });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(doctor),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save doctor');
      }

      if (result.success) {
        setShowDoctorModal(false);
        loadDoctors();
      } else {
        setError(result.error || 'Failed to save doctor');
      }
    } catch (err) {
      console.error('Error saving doctor:', err);
      setError(`Failed to save doctor: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDeleteDoctor = async (doctorId: string) => {
    const confirmMsg = language === 'lv' 
      ? 'Vai tiešām vēlaties dzēst šo ārstu?' 
      : language === 'ru' 
      ? 'Вы действительно хотите удалить этого врача?' 
      : 'Are you sure you want to delete this doctor?';

    if (!confirm(confirmMsg)) {
      return;
    }

    try {
      setError('');
      
      // Use publicAnonKey for API requests since we're using mock auth
      const accessToken = publicAnonKey;

      console.log('Deleting doctor:', doctorId);

      const response = await fetch(`${API_BASE}/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Delete response status:', response.status);
      const result = await response.json();
      console.log('Delete response result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete doctor');
      }

      if (result.success) {
        loadDoctors();
      } else {
        setError(result.error || 'Failed to delete doctor');
      }
    } catch (err) {
      console.error('Error deleting doctor:', err);
      setError(`Failed to delete doctor: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE}/services`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load services');
      }

      const result = await response.json();
      if (result.success) {
        setServices(result.data || []);
      } else {
        setError(result.error || 'Failed to load services');
      }
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowServiceModal(true);
  };

  const handleSaveService = async (service: Service) => {
    try {
      setError('');
      
      // Use publicAnonKey for API requests since we're using mock auth
      const accessToken = publicAnonKey;

      const isEditing = service.id && service.id.startsWith('service:');
      const url = isEditing 
        ? `${API_BASE}/services/${service.id}`
        : `${API_BASE}/services`;
      
      const method = isEditing ? 'PUT' : 'POST';

      console.log('Saving service:', { method, url, service });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(service),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save service');
      }

      if (result.success) {
        setShowServiceModal(false);
        loadServices();
      } else {
        setError(result.error || 'Failed to save service');
      }
    } catch (err) {
      console.error('Error saving service:', err);
      setError(`Failed to save service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    const confirmMsg = language === 'lv' 
      ? 'Vai tiešām vēlaties dzēst šo pakalpojumu?' 
      : language === 'ru' 
      ? 'Вы действительно хотите удалить эту услугу?' 
      : 'Are you sure you want to delete this service?';

    if (!confirm(confirmMsg)) {
      return;
    }

    try {
      setError('');
      
      // Use publicAnonKey for API requests since we're using mock auth
      const accessToken = publicAnonKey;

      console.log('Deleting service:', serviceId);

      const response = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Delete response status:', response.status);
      const result = await response.json();
      console.log('Delete response result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete service');
      }

      if (result.success) {
        loadServices();
      } else {
        setError(result.error || 'Failed to delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      setError(`Failed to delete service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" />;
  }

  const tabs = [
    { id: 'doctors' as const, label: t('admin.doctors'), icon: Users },
    { id: 'services' as const, label: t('admin.services'), icon: Settings },
    { id: 'schedule' as const, label: t('admin.schedule'), icon: Calendar },
    { id: 'appointments' as const, label: t('admin.appointments'), icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('admin.title')}
            </h1>
            <p className="text-gray-600">
              {language === 'lv' && 'Pārvaldiet klīnikas datus un iestatījumus'}
              {language === 'ru' && 'Управляйте данными и настройками клиники'}
              {language === 'en' && 'Manage clinic data and settings'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-green border-b-2 border-green bg-mint/30'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {/* Doctors Tab */}
              {activeTab === 'doctors' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {language === 'lv' && 'Ārstu pārvaldība'}
                      {language === 'ru' && 'Управление врачами'}
                      {language === 'en' && 'Manage Doctors'}
                    </h2>
                    <button 
                      onClick={handleAddDoctor}
                      className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      {t('common.add')}
                    </button>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
                      <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                    </div>
                  ) : doctors.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {language === 'lv' && 'Nav pievienotu ārstu'}
                        {language === 'ru' && 'Нет добавленных врачей'}
                        {language === 'en' && 'No doctors added'}
                      </p>
                      <button 
                        onClick={handleAddDoctor}
                        className="px-4 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors"
                      >
                        {language === 'lv' && 'Pievienot pirmo ārstu'}
                        {language === 'ru' && 'Добавить первого врача'}
                        {language === 'en' && 'Add first doctor'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {doctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="flex items-center justify-between p-4 bg-beige rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            {doctor.image ? (
                              <ImageWithFallback
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-green" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-purple">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">
                                {doctor.specialty[language]} • {doctor.experience} {t('doctors.experience')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              doctor.active 
                                ? 'bg-green/20 text-green' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {doctor.active 
                                ? (language === 'lv' ? 'Aktīvs' : language === 'ru' ? 'Активен' : 'Active')
                                : (language === 'lv' ? 'Neaktīvs' : language === 'ru' ? 'Неактивен' : 'Inactive')
                              }
                            </span>
                            <button 
                              onClick={() => handleEditDoctor(doctor)}
                              className="p-2 text-green hover:bg-green/10 rounded-lg transition-colors"
                              title={t('common.edit')}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDoctor(doctor.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={t('common.delete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {language === 'lv' && 'Pakalpojumu pārvaldība'}
                      {language === 'ru' && 'Управление услугами'}
                      {language === 'en' && 'Manage Services'}
                    </h2>
                    <button 
                      onClick={handleAddService}
                      className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      {t('common.add')}
                    </button>
                  </div>

                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
                      <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                    </div>
                  ) : services.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {language === 'lv' && 'Nav pievienotu pakalpojumu'}
                        {language === 'ru' && 'Нет добавленных услуг'}
                        {language === 'en' && 'No services added'}
                      </p>
                      <button 
                        onClick={handleAddService}
                        className="px-4 py-2 bg-green text-white rounded-lg hover:bg-purple transition-colors"
                      >
                        {language === 'lv' && 'Pievienot pirmo pakalpojumu'}
                        {language === 'ru' && 'Добавить первую услугу'}
                        {language === 'en' && 'Add first service'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-4 bg-beige rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            {service.image ? (
                              <ImageWithFallback
                                src={service.image}
                                alt={service.name[language]}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center">
                                <Settings className="w-6 h-6 text-green" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-purple">{service.name[language]}</h3>
                              <p className="text-sm text-gray-600">
                                {service.description[language]} • {service.price} {t('services.price')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              service.active 
                                ? 'bg-green/20 text-green' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {service.active 
                                ? (language === 'lv' ? 'Aktīvs' : language === 'ru' ? 'Активен' : 'Active')
                                : (language === 'lv' ? 'Neaktīvs' : language === 'ru' ? 'Неактивен' : 'Inactive')
                              }
                            </span>
                            <button 
                              onClick={() => handleEditService(service)}
                              className="p-2 text-green hover:bg-green/10 rounded-lg transition-colors"
                              title={t('common.edit')}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={t('common.delete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-4 bg-beige rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        {doctor.image ? (
                          <ImageWithFallback
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-green" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-purple">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {doctor.specialty[language]} • {doctor.experience} {t('doctors.experience')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          doctor.active 
                            ? 'bg-green/20 text-green' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {doctor.active 
                            ? (language === 'lv' ? 'Aktīvs' : language === 'ru' ? 'Активен' : 'Active')
                            : (language === 'lv' ? 'Neaktīvs' : language === 'ru' ? 'Неактивен' : 'Inactive')
                          }
                        </span>
                        <button 
                          onClick={() => handleEditSchedule(doctor)}
                          className="p-2 text-green hover:bg-green/10 rounded-lg transition-colors"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
                      <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                    </div>
                  ) : appointments.length === 0 ? (
                    <div className="text-center py-12 bg-mint/20 rounded-lg">
                      <Calendar className="w-16 h-16 text-green mx-auto mb-4" />
                      <p className="text-gray-700">
                        {language === 'lv' && 'Nav pierakstu'}
                        {language === 'ru' && 'Нет записей'}
                        {language === 'en' && 'No appointments'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((appointment) => {
                        const doctor = doctors.find(d => d.id === appointment.doctorId);
                        const doctorName = doctor?.name || appointment.doctorId;
                        
                        return (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 bg-beige rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-green" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-purple">
                                  {appointment.userName || appointment.userEmail}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {doctorName} • {appointment.date} {appointment.time}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {t(`services.${appointment.serviceId}`) || appointment.serviceId}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full text-sm bg-green/20 text-green">
                                {appointment.status === 'confirmed' 
                                  ? (language === 'lv' ? 'Apstiprinātā' : language === 'ru' ? 'Подтверждена' : 'Confirmed')
                                  : appointment.status
                                }
                              </span>
                              <button 
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title={language === 'lv' ? 'Atcelt' : language === 'ru' ? 'Отменить' : 'Cancel'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      {showDoctorModal && (
        <DoctorModal
          doctor={editingDoctor}
          onClose={() => setShowDoctorModal(false)}
          onSave={handleSaveDoctor}
        />
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          doctor={editingScheduleDoctor}
          onClose={() => setShowScheduleModal(false)}
          onSave={handleSaveSchedule}
        />
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <ServiceModal
          service={editingService}
          onClose={() => setShowServiceModal(false)}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
}