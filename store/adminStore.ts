import { adminService, AdminUser, UsersListResponse } from '@/services/adminService';

import { create } from 'zustand';

interface AdminStore {
    users: AdminUser[];
    isLoading: boolean;
    error: string | null;

    // Actions
    loadUsers: () => Promise<void>;
    clearError: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    loadUsers: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await adminService.getUsers();
            console.log('Admin API Response:', response);

            if (response.success && response.data) {
                const data = response.data as UsersListResponse;
                console.log('Processed data:', data);
                console.log('Users array:', data.users);

                set({
                    users: data.users || [],
                    isLoading: false,
                    error: null,
                });
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to load users'
                });
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to load users'
            });
        }
    },

    clearError: () => {
        set({ error: null });
    },
})); 