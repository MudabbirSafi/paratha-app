import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { router } from 'expo-router';

import { Alert } from 'react-native';

// API Configuration
const API_BASE_URL = 'https://paratha-app-3c86d136e58d.herokuapp.com';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['x-auth-token'] = token; // Alternative auth header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            clearAuthToken();

            // Show login alert and redirect to login
            Alert.alert(
                'Authentication Required',
                'Please log in to continue.',
                [
                    {
                        text: 'Login',
                        onPress: () => router.replace('/auth/login'),
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ]
            );
        }
        return Promise.reject(error);
    }
);

// Token management functions
export const getAuthToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem('authToken');
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export const setAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Error setting auth token:', error);
    }
};

export const getUserType = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem('userType');
    } catch (error) {
        console.error('Error getting user type:', error);
        return null;
    }
};

export const setUserType = async (userType: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('userType', userType);
    } catch (error) {
        console.error('Error setting user type:', error);
    }
};

export const clearAuthToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error clearing auth token:', error);
    }
};

// API Response type
export interface ApiResponse<T = any> {
    success?: boolean;
    message?: string;
    msg?: string;
    data?: T;
    token?: string;
    user?: T;
    address?: T;
    addresses?: T[];
}

// Error handling function
export const handleApiError = (error: any): string => {
    if (error.response) {
        // Server responded with error status
        const { data, status } = error.response;

        if (data && data.message) {
            return data.message;
        }

        if (data && data.msg) {
            return data.msg;
        }

        switch (status) {
            case 400:
                return 'Invalid request data';
            case 401:
                return 'Authentication failed';
            case 403:
                return 'Access denied';
            case 404:
                return 'Resource not found';
            case 409:
                return 'Resource already exists';
            case 500:
                return 'Server error occurred';
            default:
                return `Request failed with status ${status}`;
        }
    } else if (error.request) {
        // Network error
        return 'Network error. Please check your connection.';
    } else {
        // Other error
        return error.message || 'An unexpected error occurred';
    }
};

export default api; 