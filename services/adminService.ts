import api, { ApiResponse, handleApiError } from '@/utils/api';

// Types for admin functionality
export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    gender: string;
    role: 'customer' | 'business' | 'delivery' | 'admin';
    date: string;
    __v: number;
}

export interface UsersListResponse {
    users: AdminUser[];
    totalUsers?: number;
    currentPage?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
}

// GetUsersParams removed since we're not using pagination

class AdminService {
    // Get all users
    async getUsers(): Promise<ApiResponse<UsersListResponse>> {
        try {
            const response = await api.get('/api/admin/users');

            // Handle both array response and paginated response
            const responseData = response.data;
            let usersData: UsersListResponse;

            if (Array.isArray(responseData)) {
                // API returns array directly
                usersData = {
                    users: responseData,
                    totalUsers: responseData.length,
                    currentPage: 1,
                    totalPages: 1,
                    hasNextPage: false,
                    hasPrevPage: false,
                };
            } else {
                // API returns paginated object
                usersData = {
                    users: responseData.users || responseData,
                    totalUsers: responseData.totalUsers || responseData.users?.length || 0,
                    currentPage: responseData.currentPage || 1,
                    totalPages: responseData.totalPages || 1,
                    hasNextPage: responseData.hasNextPage || false,
                    hasPrevPage: responseData.hasPrevPage || false,
                };
            }

            return {
                success: true,
                data: usersData,
                message: response.data.msg || 'Users retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Get user by ID
    async getUserById(userId: string): Promise<ApiResponse<AdminUser>> {
        try {
            const response = await api.get(`/api/admin/users/${userId}`);

            return {
                success: true,
                data: response.data.user || response.data,
                message: response.data.msg || 'User retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Update user role
    async updateUserRole(userId: string, role: string): Promise<ApiResponse<AdminUser>> {
        try {
            const response = await api.put(`/api/admin/users/${userId}/role`, { role });

            return {
                success: true,
                data: response.data.user || response.data,
                message: response.data.msg || 'User role updated successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Delete user
    async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.delete(`/api/admin/users/${userId}`);

            return {
                success: true,
                message: response.data.msg || 'User deleted successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Get dashboard statistics
    async getDashboardStats(): Promise<ApiResponse<any>> {
        try {
            const response = await api.get('/api/admin/dashboard/stats');

            return {
                success: true,
                data: response.data,
                message: response.data.msg || 'Dashboard stats retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }
}

export const adminService = new AdminService(); 