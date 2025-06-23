# API Integration Documentation

This document describes the API integration implementation for the Paratha App using the backend API at `https://paratha-app-3c86d136e58d.herokuapp.com`.

## Overview

The app has been updated to use real API endpoints instead of mock data for authentication and user management. The integration includes:

- User authentication (login/register)
- Profile management
- Token-based authentication
- Error handling

## API Configuration

### Base Configuration

- **Base URL**: `https://paratha-app-3c86d136e58d.herokuapp.com`
- **Timeout**: 10 seconds
- **Content-Type**: `application/json`

### Authentication

- Uses Bearer token authentication
- Tokens are stored securely using AsyncStorage
- Automatic token injection in request headers
- Automatic logout on 401 responses

## Implemented Endpoints

### Authentication Endpoints

#### 1. Login

- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "userType": "customer" | "business" | "delivery"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "phone": "1234567890",
        "address": "User Address",
        "userType": "customer",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      },
      "token": "jwt_token_here"
    }
  }
  ```

#### 2. Register

- **Endpoint**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "User Address",
    "userType": "customer" | "business" | "delivery",
    "businessName": "Business Name", // Optional for business users
    "gstNumber": "GST1234567890123", // Optional for business users
    "vehicleType": "Motorcycle", // Optional for delivery users
    "licenseNumber": "DL123456789" // Optional for delivery users
  }
  ```
- **Response**: Same as login response

#### 3. Get Profile

- **Endpoint**: `GET /auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "phone": "1234567890",
      "address": "User Address",
      "userType": "customer",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
  ```

#### 4. Update Profile

- **Endpoint**: `PUT /auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "phone": "9876543210",
    "address": "Updated Address"
  }
  ```
- **Response**: Same as get profile response

#### 5. Logout

- **Endpoint**: `POST /auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## File Structure

### API Service Files

- `utils/api.ts` - Base API configuration and utilities
- `services/authService.ts` - Authentication service implementation
- `services/index.ts` - Service exports

### Updated Components

- `store/authStore.ts` - Updated to use real API
- `app/auth/login.tsx` - Updated login screen
- `app/auth/register.tsx` - Updated customer registration
- `app/auth/business-register.tsx` - Updated business registration
- `app/auth/delivery-register.tsx` - Updated delivery registration
- `app/(tabs)/profile.tsx` - Updated profile management

## Usage Examples

### Login

```typescript
import { useAuthStore } from '@/store/authStore';

const { login, isLoading, error } = useAuthStore();

const handleLogin = async () => {
  const success = await login(email, password, 'customer');
  if (success) {
    // Navigate to main app
  }
};
```

### Register

```typescript
import { useAuthStore } from '@/store/authStore';

const { register, isLoading, error } = useAuthStore();

const handleRegister = async () => {
  const registerData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '1234567890',
    address: '123 Main St',
    userType: 'customer' as const,
  };

  const success = await register(registerData);
  if (success) {
    // Navigate to main app
  }
};
```

### Update Profile

```typescript
import { useAuthStore } from '@/store/authStore';

const { updateProfile, isLoading, error } = useAuthStore();

const handleUpdateProfile = async () => {
  const success = await updateProfile({
    name: 'Updated Name',
    phone: '9876543210',
    address: ['Updated Address'],
  });

  if (success) {
    // Show success message
  }
};
```

## Error Handling

The API integration includes comprehensive error handling:

1. **Network Errors**: Handled with user-friendly messages
2. **API Errors**: Server error messages are displayed to users
3. **Validation Errors**: Form validation with specific error messages
4. **Authentication Errors**: Automatic logout on 401 responses

## Security Features

1. **Token Storage**: Secure token storage using AsyncStorage
2. **Automatic Token Injection**: Tokens are automatically added to API requests
3. **Token Cleanup**: Tokens are cleared on logout or authentication errors
4. **Request Interceptors**: Automatic handling of authentication headers

## Testing

To test the API integration:

1. Start the development server: `npm run dev`
2. Navigate to the login screen
3. Use valid credentials to test login
4. Test registration for different user types
5. Test profile updates in the profile screen

## Dependencies Added

- `axios` - HTTP client for API requests
- `@react-native-async-storage/async-storage` - Secure token storage

## Notes

- The API base URL is configured in `utils/api.ts`
- All API responses follow a consistent format with `success`, `message`, and `data` fields
- Error messages are user-friendly and displayed in the UI
- The integration maintains backward compatibility with existing UI components
