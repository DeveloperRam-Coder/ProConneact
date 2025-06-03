import axios from 'axios';
import { Professional, Booking, Category, User } from '../types';

// Demo credentials for testing:
// email: demo@proconnect.com
// password: demo123

// Demo user data
const DEMO_USER: User = {
  id: 'demo-user-1',
  name: 'Demo User',
  email: 'demo@proconnect.com',
  phone: '+1234567890',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User'
};

const DEMO_TOKEN = 'demo-jwt-token';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  timeout: 10000,
});

// Mock API responses for demo testing
const mockApiResponse = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 500);
  });
};


// Add a request interceptor to include auth token
api.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error reading token from AsyncStorage:', error);
  }
  return config;
});

// Authentication
export const auth = {
  login: async (email: string, password: string) => {
    // Demo login
    if (email === 'demo@proconnect.com' && password === 'demo123') {
      return mockApiResponse({
        user: DEMO_USER,
        token: DEMO_TOKEN,
      });
    }
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: Partial<User>) => {
    // Demo register
    if (userData.email === 'demo@proconnect.com') {
      return mockApiResponse({
        user: DEMO_USER,
        token: DEMO_TOKEN,
      });
    }
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Professionals
export const professionals = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    const response = await api.get<Professional[]>('/professionals', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Professional>(`/professionals/${id}`);
    return response.data;
  },
  getAvailability: async (id: string, date: string) => {
    const response = await api.get(`/professionals/${id}/availability`, {
      params: { date },
    });
    return response.data;
  },
};

// Categories
export const categories = {
  getAll: async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};

// Bookings
export const bookings = {
  create: async (bookingData: Partial<Booking>) => {
    const response = await api.post<Booking>('/bookings', bookingData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
  },
  cancel: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel`);
    return response.data;
  },
  reschedule: async (id: string, newDate: string, newTime: string) => {
    const response = await api.post(`/bookings/${id}/reschedule`, {
      date: newDate,
      time: newTime,
    });
    return response.data;
  },
};

// User Profile
export const profile = {
  get: async () => {
    const response = await api.get<User>('/profile');
    return response.data;
  },
  update: async (userData: Partial<User>) => {
    const response = await api.put<User>('/profile', userData);
    return response.data;
  },
  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Settings
export const settings = {
  getPreferences: async () => {
    const response = await api.get('/settings/preferences');
    return response.data;
  },
  updatePreferences: async (preferences: any) => {
    const response = await api.put('/settings/preferences', preferences);
    return response.data;
  },
};
