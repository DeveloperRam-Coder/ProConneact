export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export type Professional = {
  id: string;
  name: string;
  profession: string;
  categoryId: string;
  rating: number;
  reviews: number;
  price: number;
  avatar: string;
  description: string;
  specialties: string[];
  availability: {
    [key: string]: string[];
  };
  location: string;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
  ProfessionalDetail: { professional: Professional };
  Booking: { professional: Professional };
  Barber: undefined;
  Tutor: undefined;
  Doctor: undefined;
  Trainer: undefined;
  Login: undefined;
  Register: undefined;
  EditProfile: undefined;
  ForgotPassword: undefined;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};
