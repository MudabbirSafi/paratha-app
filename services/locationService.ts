import * as Location from 'expo-location';

export interface LocationData {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export interface LocationPermission {
    granted: boolean;
    message?: string;
}

class LocationService {
    // Request location permissions
    async requestPermissions(): Promise<LocationPermission> {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                return { granted: true };
            } else {
                return {
                    granted: false,
                    message: 'Location permission is required to get your current address'
                };
            }
        } catch (error: any) {
            return {
                granted: false,
                message: error.message || 'Failed to request location permission'
            };
        }
    }

    // Get current location with coordinates
    async getCurrentLocation(): Promise<LocationData | null> {
        try {
            const permission = await this.requestPermissions();
            if (!permission.granted) {
                throw new Error(permission.message);
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 5000,
                distanceInterval: 10,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        } catch (error: any) {
            throw new Error(error.message || 'Failed to get current location');
        }
    }

    // Get address from coordinates (reverse geocoding)
    async getAddressFromCoordinates(latitude: number, longitude: number): Promise<LocationData> {
        try {
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (reverseGeocode.length > 0) {
                const address = reverseGeocode[0];
                return {
                    latitude,
                    longitude,
                    address: this.formatAddress(address),
                    city: address.city || '',
                    state: address.region || '',
                    zipCode: address.postalCode || '',
                };
            } else {
                throw new Error('No address found for these coordinates');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Failed to get address from coordinates');
        }
    }

    // Get current location with full address
    async getCurrentLocationWithAddress(): Promise<LocationData> {
        try {
            const location = await this.getCurrentLocation();
            if (!location) {
                throw new Error('Failed to get current location');
            }

            const addressData = await this.getAddressFromCoordinates(
                location.latitude,
                location.longitude
            );

            return addressData;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to get current location with address');
        }
    }

    // Format address from reverse geocoding result
    private formatAddress(address: any): string {
        const parts = [];

        if (address.street) parts.push(address.street);
        if (address.streetNumber) parts.push(address.streetNumber);
        if (address.name) parts.push(address.name);

        return parts.join(' ');
    }

    // Check if location services are enabled
    async isLocationEnabled(): Promise<boolean> {
        try {
            const enabled = await Location.hasServicesEnabledAsync();
            return enabled;
        } catch (error) {
            return false;
        }
    }
}

export const locationService = new LocationService(); 