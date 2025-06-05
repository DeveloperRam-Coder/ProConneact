import categories from '../data/categories.json';
import professionals from '../data/professionals.json';
import bookings from '../data/bookings.json';
import users from '../data/users.json';
import { Category, Professional, Booking, User } from '../types';

export const getData = {
  categories: (): Category[] => categories.categories,
  professionals: (): Professional[] =>
    professionals.professionals.map((p: any) => ({
      ...p,
      availability: Object.fromEntries(
        Object.entries(p.availability).map(([day, slots]) => [day, slots ?? []])
      ),
    })),
  bookings: (): Booking[] =>
    bookings.bookings.map((b: any) => ({
      ...b,
      status: b.status as "confirmed" | "pending" | "completed" | "cancelled",
    })),
  users: (): User[] => users.users,

  // Helper functions
  getProfessionalById: (id: string): Professional | undefined => {
    const p = professionals.professionals.find(p => p.id === id);
    return p
      ? {
          ...p,
          availability: Object.fromEntries(
            Object.entries(p.availability).map(([day, slots]) => [day, slots ?? []])
          ),
        }
      : undefined;
  },

  getUserById: (id: string): User | undefined => {
    return users.users.find(u => u.id === id);
  },

  getBookingsByUserId: (userId: string): Booking[] => {
    return bookings.bookings
      .filter(b => b.userId === userId)
      .map((b: any) => ({
        ...b,
        status: b.status as "confirmed" | "pending" | "completed" | "cancelled",
      }));
  },

  getBookingsByProfessionalId: (professionalId: string): Booking[] => {
    return bookings.bookings
      .filter(b => b.professionalId === professionalId)
      .map((b: any) => ({
        ...b,
        status: b.status as "confirmed" | "pending" | "completed" | "cancelled",
      }));
  },

  getProfessionalsByCategory: (category: string): Professional[] => {
    return professionals.professionals
      .filter(p => p.profession === category)
      .map((p: any) => ({
        ...p,
        availability: Object.fromEntries(
          Object.entries(p.availability).map(([day, slots]) => [day, slots ?? []])
        ),
      }));
  },
};

export default getData;