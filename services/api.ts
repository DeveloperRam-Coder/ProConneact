import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Professional, Booking, Category, User } from '../types';
import { getData } from './data';
import users from '../data/users.json';

// Demo credentials for testing:
// email: demo@proconnect.com
// password: demo123

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

// Add mock API handlers
const mockApi = {
  login: () => {
    const user = getData.getUserById('user1');
    return { user, token: DEMO_TOKEN };
  },
  getCategories: () => getData.categories(),
  getProfessionals: () => getData.professionals(),
  getBookings: () => getData.bookings(),
  getUser: (id: string) => getData.getUserById(id),
};

// Add a request interceptor to include auth token
api.interceptors.request.use(async (config) => {
  try {
    const authStorage = await AsyncStorage.getItem('auth-storage');
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
  } catch (error) {
    console.error('Error reading token from AsyncStorage:', error);
  }
  return config;
});

// Authentication
export const auth = {
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: 'dummy-token-' + user.id
    };
  },

  register: async (data: { email: string; password: string; name: string; phoneNumber: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUser = users.users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: String(users.users.length + 1),
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=random`,
      bookings: []
    };

    return {
      user: newUser,
      token: 'dummy-token-' + newUser.id
    };
  },

  checkAuth: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: null };
  },

  logout: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};

// Professionals
export const professionals = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    // In demo mode, return mock data
    if (process.env.NODE_ENV === 'development') {
      return mockApiResponse(mockApi.getProfessionals());
    }
    const response = await api.get<Professional[]>('/professionals', { params });
    return response.data;
  },
  getById: async (id: string) => {
    // In demo mode, return mock data
    if (process.env.NODE_ENV === 'development') {
      const professionals = mockApi.getProfessionals();
      const professional = professionals.find(p => p.id === id);
      return mockApiResponse(professional);
    }
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
    // In demo mode, return mock data
    if (process.env.NODE_ENV === 'development') {
      return mockApiResponse(mockApi.getCategories());
    }
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};

// Bookings
export const bookings = {
  create: async (bookingData: Partial<Booking>) => {
    if (process.env.NODE_ENV === 'development') {
      const mockBookings = mockApi.getBookings();
      const newBooking = {
        ...bookingData,
        id: `booking-${mockBookings.length + 1}`,
        status: 'confirmed'
      };
      return mockApiResponse(newBooking);
    }
    const response = await api.post<Booking>('/bookings', bookingData);
    return response.data;
  },
  getAll: async () => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiResponse(mockApi.getBookings());
    }
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
