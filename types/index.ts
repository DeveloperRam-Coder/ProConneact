export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  price: number;
  avatar: string;
  description: string;
  specialties: string[];
  availability: {
    [key: string]: string[];
  };
}

export interface Booking {
  id: string;
  professionalId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
