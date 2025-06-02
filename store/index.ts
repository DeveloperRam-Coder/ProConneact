import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Professional, Category } from '../types';

// Auth Store
interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// App Store
interface AppState {
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  professionals: Professional[];
  loading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setProfessionals: (professionals: Professional[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  professionals: [],
  loading: false,
  error: null,
  setCategories: (categories: Category[]) => set({ categories }),
  setSelectedCategory: (selectedCategory: string | null) => set({ selectedCategory }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setProfessionals: (professionals: Professional[]) => set({ professionals }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));

// Settings Store
interface SettingsState {
  darkMode: boolean;
  notificationsEnabled: boolean;
  language: string;
  toggleDarkMode: () => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      notificationsEnabled: true,
      language: 'en',
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setNotificationsEnabled: (enabled: boolean) => set({ notificationsEnabled: enabled }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
