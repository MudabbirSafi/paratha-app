import api, { ApiResponse, handleApiError } from '@/utils/api';

// Types for address management based on actual API
export interface Address {
    id: string;
    label: 'home' | 'work' | 'other';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    zip: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAddressRequest {
    label: 'home' | 'work' | 'other';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    zip: string;
    latitude: number;
    longitude: number;
    isDefault?: boolean;
}

export interface UpdateAddressRequest {
    label?: 'home' | 'work' | 'other';
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    zip?: string;
    latitude?: number;
    longitude?: number;
    isDefault?: boolean;
}

export interface AddressResponse {
    msg: string;
    address: Address;
}

export interface AddressList {
    addresses: Address[];
}

class AddressService {
    // Get all addresses for the current user
    async getAddresses(): Promise<ApiResponse<Address[]>> {
        try {
            const response = await api.get('/api/addresses');
            return {
                success: true,
                data: response.data.addresses || response.data,
                message: response.data.msg || 'Addresses retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Get default address
    async getDefaultAddress(): Promise<ApiResponse<Address>> {
        try {
            const response = await api.get('/api/addresses/default');
            return {
                success: true,
                data: response.data.address,
                message: response.data.msg || 'Default address retrieved successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Create a new address
    async createAddress(data: CreateAddressRequest): Promise<ApiResponse<Address>> {
        try {
            const response = await api.post('/api/addresses', data);
            return {
                success: true,
                data: response.data.address,
                message: response.data.msg || 'Address added successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Update an existing address
    async updateAddress(id: string, data: UpdateAddressRequest): Promise<ApiResponse<Address>> {
        try {
            const response = await api.put(`/api/addresses/${id}`, data);
            return {
                success: true,
                data: response.data.address,
                message: response.data.msg || 'Address updated successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Delete an address
    async deleteAddress(id: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.delete(`/api/addresses/${id}`);
            return {
                success: true,
                message: response.data.msg || 'Address deleted successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }

    // Set an address as default
    async setDefaultAddress(id: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await api.put(`/api/addresses/${id}/default`);
            return {
                success: true,
                message: response.data.msg || 'Default address updated successfully'
            };
        } catch (error: any) {
            throw new Error(handleApiError(error));
        }
    }
}

export const addressService = new AddressService(); 