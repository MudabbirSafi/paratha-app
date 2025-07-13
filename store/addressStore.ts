import { create } from 'zustand';
import { addressService, Address as ApiAddress, CreateAddressRequest, UpdateAddressRequest } from '@/services/addressService';

// Local address type for the store
export interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    isDefault: boolean;
}

// Convert API address to store address
const convertApiAddressToStoreAddress = (apiAddress: ApiAddress): Address => {
    return {
        id: apiAddress.id,
        type: apiAddress.label,
        address: apiAddress.street,
        city: apiAddress.city,
        state: apiAddress.state,
        zipCode: apiAddress.zipCode,
        latitude: apiAddress.latitude,
        longitude: apiAddress.longitude,
        isDefault: apiAddress.isDefault,
    };
};

// Convert store address to API address
const convertStoreAddressToApiAddress = (storeAddress: Omit<Address, 'id'>): CreateAddressRequest => {
    return {
        label: storeAddress.type,
        street: storeAddress.address || '', // Ensure empty string is sent if no address
        city: storeAddress.city,
        state: storeAddress.state,
        zipCode: storeAddress.zipCode,
        zip: storeAddress.zipCode, // API requires both zipCode and zip
        latitude: storeAddress.latitude || 0,
        longitude: storeAddress.longitude || 0,
        isDefault: storeAddress.isDefault,
    };
};

interface AddressStore {
    addresses: Address[];
    isLoading: boolean;
    error: string | null;
    loadAddresses: () => Promise<void>;
    addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
    updateAddress: (id: string, address: Partial<Address>) => Promise<boolean>;
    deleteAddress: (id: string) => Promise<boolean>;
    setDefaultAddress: (id: string) => Promise<boolean>;
    clearError: () => void;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
    addresses: [],
    isLoading: false,
    error: null,

    loadAddresses: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await addressService.getAddresses();

            if (response.success && response.data) {
                const addresses = response.data.map(convertApiAddressToStoreAddress);
                set({ addresses, isLoading: false });
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to load addresses'
                });
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to load addresses'
            });
        }
    },

    addAddress: async (address) => {
        set({ isLoading: true, error: null });

        try {
            const apiAddress = convertStoreAddressToApiAddress(address);
            const response = await addressService.createAddress(apiAddress);

            if (response.success && response.data) {
                const newAddress = convertApiAddressToStoreAddress(response.data);
                set(state => ({
                    addresses: [...state.addresses, newAddress],
                    isLoading: false,
                    error: null,
                }));
                return true;
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to add address'
                });
                return false;
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to add address'
            });
            return false;
        }
    },

    updateAddress: async (id, address) => {
        set({ isLoading: true, error: null });

        try {
            const updateData: UpdateAddressRequest = {};

            if (address.type !== undefined) updateData.label = address.type;
            if (address.address !== undefined) updateData.street = address.address || '';
            if (address.city !== undefined) updateData.city = address.city;
            if (address.state !== undefined) updateData.state = address.state;
            if (address.zipCode !== undefined) {
                updateData.zipCode = address.zipCode;
                updateData.zip = address.zipCode; // API requires both
            }
            if (address.latitude !== undefined) updateData.latitude = address.latitude;
            if (address.longitude !== undefined) updateData.longitude = address.longitude;
            if (address.isDefault !== undefined) updateData.isDefault = address.isDefault;

            const response = await addressService.updateAddress(id, updateData);

            if (response.success && response.data) {
                const updatedAddress = convertApiAddressToStoreAddress(response.data);
                set(state => ({
                    addresses: state.addresses.map(addr =>
                        addr.id === id ? updatedAddress : addr
                    ),
                    isLoading: false,
                    error: null,
                }));
                return true;
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to update address'
                });
                return false;
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to update address'
            });
            return false;
        }
    },

    deleteAddress: async (id) => {
        set({ isLoading: true, error: null });

        try {
            const response = await addressService.deleteAddress(id);

            if (response.success) {
                set(state => ({
                    addresses: state.addresses.filter(addr => addr.id !== id),
                    isLoading: false,
                    error: null,
                }));
                return true;
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to delete address'
                });
                return false;
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to delete address'
            });
            return false;
        }
    },

    setDefaultAddress: async (id) => {
        set({ isLoading: true, error: null });

        try {
            const response = await addressService.setDefaultAddress(id);

            if (response.success) {
                set(state => ({
                    addresses: state.addresses.map(addr => ({
                        ...addr,
                        isDefault: addr.id === id
                    })),
                    isLoading: false,
                    error: null,
                }));
                return true;
            } else {
                set({
                    isLoading: false,
                    error: response.message || 'Failed to set default address'
                });
                return false;
            }
        } catch (error: any) {
            set({
                isLoading: false,
                error: error.message || 'Failed to set default address'
            });
            return false;
        }
    },

    clearError: () => {
        set({ error: null });
    },
})); 