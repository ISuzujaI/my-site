import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-de695671`;

interface ApiOptions {
  method?: string;
  body?: unknown;
  requiresAuth?: boolean;
}

async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, requiresAuth = false } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${publicAnonKey}`,
  };

  // If auth is required, get access token from localStorage
  if (requiresAuth) {
    const user = localStorage.getItem('user');
    if (user) {
      const { accessToken } = JSON.parse(user);
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// Doctors API
export const doctorsApi = {
  getAll: () => apiRequest<{ success: boolean; data: any[] }>('/doctors'),
  getById: (id: string) => apiRequest<{ success: boolean; data: any }>(`/doctors/${id}`),
  create: (doctor: any) =>
    apiRequest<{ success: boolean; data: any }>('/doctors', {
      method: 'POST',
      body: doctor,
      requiresAuth: true,
    }),
};

// Services API
export const servicesApi = {
  getAll: () => apiRequest<{ success: boolean; data: any[] }>('/services'),
};

// Appointments API
export const appointmentsApi = {
  getMyAppointments: () =>
    apiRequest<{ success: boolean; data: any[] }>('/appointments', {
      requiresAuth: true,
    }),
  create: (appointment: any) =>
    apiRequest<{ success: boolean; data: any }>('/appointments', {
      method: 'POST',
      body: appointment,
      requiresAuth: true,
    }),
  cancel: (id: string) =>
    apiRequest<{ success: boolean }>(`/appointments/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    }),
  getAvailableSlots: (doctorId: string, date: string) =>
    apiRequest<{ success: boolean; data: any[] }>(
      `/available-slots?doctorId=${doctorId}&date=${date}`
    ),
};

// Auth API
export const authApi = {
  signup: (data: { email: string; password: string; name: string; phone: string }) =>
    apiRequest<{ success: boolean; data: any }>('/signup', {
      method: 'POST',
      body: data,
    }),
};

// Contact API
export const contactApi = {
  submit: (data: { name: string; email: string; phone: string; message: string }) =>
    apiRequest<{ success: boolean }>('/contact', {
      method: 'POST',
      body: data,
    }),
};
