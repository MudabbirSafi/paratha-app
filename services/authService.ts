import api, { ApiResponse, handleApiError } from '@/utils/api';

// Types based on the actual API documentation
export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    role: 'customer' | 'business' | 'delivery' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface Business {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    businessName: string;
    gstNumber: string;
    role: 'business';
}

export interface DeliveryPartner {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    vehicleType: string;
    licenseNumber: string;
    role: 'delivery';
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ProfileUpdateRequest {
    name?: string;
    phone?: string;
    address?: string;
    businessName?: string;
    gstNumber?: string;
    vehicleType?: string;
    licenseNumber?: string;
}

class AuthService {
    // Login user
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post('/api/auth/login', data);
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
                message: response.data.msg || 'Login successful'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Register customer
    async registerCustomer(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post('/api/auth/signup', data);
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
                message: response.data.msg || 'Registration successful'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Register business
    async registerBusiness(data: Business): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post('/api/auth/business/signup', data);
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
                message: response.data.msg || 'Registration successful'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Register delivery partner
    async registerDelivery(data: DeliveryPartner): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post('/api/auth/delivery/signup', data);
            return {
                success: true,
                token: response.data.token,
                user: response.data.user,
                message: response.data.msg || 'Registration successful'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Get current user profile
    async getProfile(): Promise<ApiResponse<User>> {
        try {
            const response = await api.get('/api/user/profile');
            return {
                success: true,
                user: response.data.user || response.data,
                message: response.data.msg || 'Profile retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Update user profile
    async updateProfile(data: ProfileUpdateRequest): Promise<ApiResponse<User>> {
        try {
            const response = await api.put('/api/user/profile', data);
            return {
                success: true,
                user: response.data.user || response.data,
                message: response.data.msg || 'Profile updated successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Change password
    async changePassword(data: { currentPassword: string, newPassword: string }): Promise<ApiResponse<{ msg: string }>> {
        try {
            const response = await api.post('/api/user/change-password', data);
            return {
                success: true,
                message: response.data.msg || 'Password changed successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Forgot password
    async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.post('/api/auth/forgot-password', { email });
            return {
                success: true,
                message: response.data.msg || 'Password reset email sent'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Reset password
    async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.post('/api/auth/reset-password', {
                token,
                newPassword,
            });
            return {
                success: true,
                message: response.data.msg || 'Password reset successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Logout
    async logout(): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.post('/api/auth/logout');
            return {
                success: true,
                message: response.data.msg || 'Logged out successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }
}

export const authService = new AuthService(); 