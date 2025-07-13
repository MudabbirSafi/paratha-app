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

    // Get current location with coordinates only (no reverse geocoding)
    async getCurrentLocationWithAddress(): Promise<LocationData> {
        try {
            const location = await this.getCurrentLocation();
            if (!location) {
                throw new Error('Failed to get current location');
            }

            // Return just the coordinates since reverse geocoding is deprecated
            return {
                latitude: parseFloat(location.latitude.toFixed(8)),
                longitude: parseFloat(location.longitude.toFixed(8)),
                address: '', // Leave empty since we can't get address
                city: '', // Leave empty since we can't get city
                state: '', // Leave empty since we can't get state
                zipCode: '', // Leave empty since we can't get zip code
            };
        } catch (error: any) {
            throw new Error(error.message || 'Failed to get current location');
        }
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