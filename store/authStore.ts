import { create } from 'zustand';

export type UserType = 'customer' | 'business' | 'delivery' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  phone?: string;
  address?: string[];
};

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  isLoading: boolean;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  register: (data: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  userType: null,
  isLoading: false,

  login: async (email: string, password: string, type: UserType) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      set({
        user: {
          id: '1',
          name: 'John Doe',
          email,
          type,
          phone: '+1234567890',
          address: ['123 Main St, City, Country']
        },
        isAuthenticated: true,
        userType: type,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        user: {
          id: '1',
          name: data.name || '',
          email: data.email || '',
          type: data.type || 'customer',
          phone: data.phone,
          address: data.address || []
        },
        isAuthenticated: true,
        userType: data.type || 'customer',
        isLoading: false
      });
      
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      userType: null
    });
  }
}));