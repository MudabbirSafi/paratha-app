import { authService, LoginRequest, User as ApiUser, Business, DeliveryPartner } from '@/services/authService';
import { setAuthToken, getAuthToken, clearAuthToken, setUserType } from '@/utils/api';

import { create } from 'zustand';

import { router } from 'expo-router';

export type UserType = 'customer' | 'business' | 'delivery' | 'admin';

// Local user type for the store
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string[];
  role: UserType;
  businessName?: string;
  gstNumber?: string;
  vehicleType?: string;
  licenseNumber?: string;
}

// Convert API user to store user
const convertApiUserToStoreUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone,
    address: apiUser.address ? [apiUser.address] : [],
    role: apiUser.role,
  };
};

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  isLoading: boolean;
  isRehydrating: boolean;
  error: string | null;
  rehydrateAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  registerCustomer: (data: Omit<User, 'id' | 'type'> & { password: string }) => Promise<boolean>;
  registerBusiness: (data: Business) => Promise<boolean>;
  registerDelivery: (data: DeliveryPartner) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  changePassword: (data: { currentPassword: string, newPassword: string }) => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  userType: null,
  isLoading: false,
  isRehydrating: true,
  error: null,

  rehydrateAuth: async () => {
    try {
      const token = await getAuthToken();
      if (token) {
        const response = await authService.getProfile();
        if (response.success && response.user) {
          const user = convertApiUserToStoreUser(response.user);
          set({
            user,
            isAuthenticated: true,
            userType: user.role,
          });
        } else {
          await clearAuthToken();
        }
      }
    } catch (error) {
      console.error('Rehydration failed', error);
      await clearAuthToken();
    } finally {
      set({ isRehydrating: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const loginData: LoginRequest = {
        email,
        password,
      };

      const response = await authService.login(loginData);

      if (response.success && response.token && response.user) {
        console.log(response)        // response.user is of type AuthResponse, so we need to access the user property within it
        const userData = (response.user as any).user || response.user;
        const user = convertApiUserToStoreUser(userData as ApiUser);
        await setUserType(userData.role || 'customer');


        // Store the token
        await setAuthToken(response.token);
        set({
          user,
          isAuthenticated: true,
          userType: user.role,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.message || 'Login failed'
        });
        return false;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Login failed'
      });
      return false;
    }
  },

  registerCustomer: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address?.[0] || '',
        role: 'customer' as const,
      };

      const response = await authService.registerCustomer(registerData);

      if (response.success && response.token && response.user) {
        // response.user is of type AuthResponse, so we need to access the user property within it
        const userData = (response.user as any).user || response.user;
        const user = convertApiUserToStoreUser(userData as ApiUser);

        // Store the token
        await setAuthToken(response.token);

        set({
          user,
          isAuthenticated: true,
          userType: user.role,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.message || 'Registration failed'
        });
        return false;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Registration failed'
      });
      return false;
    }
  },

  registerBusiness: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.registerBusiness(data);

      if (response.success && response.token && response.user) {
        // response.user is of type AuthResponse, so we need to access the user property within it
        const userData = (response.user as any).user || response.user;
        const user = convertApiUserToStoreUser(userData as ApiUser);

        // Store the token
        await setAuthToken(response.token);

        set({
          user,
          isAuthenticated: true,
          userType: user.role,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.message || 'Registration failed'
        });
        return false;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Registration failed'
      });
      return false;
    }
  },

  registerDelivery: async (data) => {
    set({ isLoading: true, error: null });

    try {
      debugger

      const response = await authService.registerDelivery(data);

      if (response.success && response.token && response.user) {
        // response.user is of type AuthResponse, so we need to access the user property within it
        const userData = (response.user as any).user || response.user;
        const user = convertApiUserToStoreUser(userData as ApiUser);
        // Store the token
        console.log(userData.role)
        await setAuthToken(response.token);

        set({
          user,
          isAuthenticated: true,
          userType: user.role,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.message || 'Registration failed'
        });
        return false;
      }
    } catch (error: any) {
      debugger

      set({
        isLoading: false,
        error: error.message || 'Registration failed'
      });
      return false;
    }
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.getProfile();

      if (response.success && response.user) {
        const userFromApi = response.user;
        set((state) => {
          const newUser = convertApiUserToStoreUser(userFromApi);
          const mergedUser = { ...state.user, ...newUser };

          // If there was a user before, keep their original role.
          // This is a workaround for the /api/user/profile endpoint
          // returning an incorrect userType. The role from login/signup is trusted.
          if (state.user && state.user.role) {
            mergedUser.role = state.user.role;
          }

          return {
            user: mergedUser,
            userType: mergedUser.role,
            isLoading: false,
            error: null,
          };
        });
      } else {
        set({
          isLoading: false,
          error: response.message || 'Failed to get profile',
        });
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to get profile',
      });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isLoading: true, error: null });

    try {
      const updateData = {
        name: data.name,
        phone: data.phone,
        address: data.address?.[0], // Convert array to string for API
        businessName: data.businessName,
        gstNumber: data.gstNumber,
        vehicleType: data.vehicleType,
        licenseNumber: data.licenseNumber,
      };

      const response = await authService.updateProfile(updateData);

      if (response.success && response.user) {
        const user = convertApiUserToStoreUser(response.user);
        set({ user, isLoading: false });
        return true;
      } else {
        set({ isLoading: false, error: response.message || 'Update failed' });
        return false;
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Update failed' });
      return false;
    }
  },

  changePassword: async (data: { currentPassword: string, newPassword: string }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.changePassword(data);
      if (response.success) {
        set({ isLoading: false, error: null });
        return true;
      }
      set({ isLoading: false, error: response.message || 'Password change failed' });
      return false;
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Password change failed' });
      return false;
    }
  },

  logout: async () => {
    console.log('AuthStore logout called');
    try {
      console.log('Calling authService.logout()');
      await authService.logout();
      console.log('authService.logout() completed successfully');
    } catch (error) {
      console.log('Logout API call failed, but continuing with local logout:', error);
    } finally {
      console.log('Clearing auth token and state');
      await clearAuthToken();
      set({ user: null, isAuthenticated: false, userType: null });
      console.log('Logout completed - state cleared');
      console.log('Navigating to login screen');
      try {
        router.replace('/auth/login');
        console.log('Navigation completed');
      } catch (navError) {
        console.error('Navigation error:', navError);
        // Try alternative navigation method
        router.push('/auth/login');
      }
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));