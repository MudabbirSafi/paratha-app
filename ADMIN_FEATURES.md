# Admin Features Documentation

This document describes the admin features implemented for the Paratha App, specifically the users management functionality.

## Overview

The admin features provide comprehensive user management capabilities for administrators, including:

- User listing with pagination
- Search and filtering by role
- Real-time data from the API
- Responsive UI with theme support

## API Integration

### Base Configuration

- **API Base URL**: `https://paratha-app-3c86d136e58d.herokuapp.com`
- **Admin Users Endpoint**: `/api/admin/users`
- **Authentication**: Bearer token required

### Admin Service (`services/adminService.ts`)

The admin service provides the following methods:

#### 1. Get Users with Pagination

```typescript
async getUsers(params: GetUsersParams = {}): Promise<ApiResponse<UsersListResponse>>
```

**Parameters:**

- `page`: Page number (default: 1)
- `limit`: Number of users per page (default: 10)
- `role`: Filter by user role (optional)
- `search`: Search query (optional)

**Response:**

```typescript
interface UsersListResponse {
  users: AdminUser[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

#### 2. Get User by ID

```typescript
async getUserById(userId: string): Promise<ApiResponse<AdminUser>>
```

#### 3. Update User Role

```typescript
async updateUserRole(userId: string, role: string): Promise<ApiResponse<AdminUser>>
```

#### 4. Delete User

```typescript
async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>>
```

#### 5. Get Dashboard Statistics

```typescript
async getDashboardStats(): Promise<ApiResponse<any>>
```

## Admin Store (`store/adminStore.ts`)

The admin store manages the state for users list functionality:

### State Properties

- `users`: Array of user objects
- `totalUsers`: Total number of users
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `hasNextPage`: Whether there's a next page
- `hasPrevPage`: Whether there's a previous page
- `isLoading`: Loading state
- `error`: Error message
- `selectedRole`: Currently selected role filter
- `searchQuery`: Current search query

### Actions

- `loadUsers(params)`: Load users with optional parameters
- `setPage(page)`: Change to a specific page
- `setRoleFilter(role)`: Filter by user role
- `setSearchQuery(query)`: Set search query
- `clearFilters()`: Clear all filters
- `clearError()`: Clear error state

## Users List Component (`app/admin/users-list.tsx`)

### Features

1. **User Display**: Shows user information in cards including:

   - Name and role badge
   - Email address
   - Phone number (if available)
   - Registration date

2. **Search Functionality**:

   - Real-time search input
   - Search by name or email
   - Clear search option

3. **Role Filtering**:

   - Filter by customer, business, delivery, or admin
   - "All" option to show all users
   - Clear filters option

4. **Pagination**:

   - Previous/Next buttons
   - Page information display
   - Total users count
   - Disabled states for navigation

5. **Loading States**:

   - Loading spinner during data fetch
   - Pull-to-refresh functionality
   - Error handling with retry option

6. **Theme Support**:
   - Light and dark theme compatibility
   - Consistent styling with app design system

### Usage

To access the users list:

1. Login as an admin user
2. Navigate to `/admin/users-list`
3. The component will automatically load the first page of users

### Example API Response

The component expects data in this format:

```json
[
  {
    "gender": "prefer_not_to_say",
    "_id": "6857cba46aab6d6f229a52d8",
    "name": "string",
    "email": "user@example.com",
    "role": "customer",
    "date": "2025-06-22T09:23:48.255Z",
    "__v": 0
  }
]
```

## File Structure

```
services/
├── adminService.ts          # Admin API service
└── index.ts                 # Service exports

store/
├── adminStore.ts            # Admin state management
└── index.ts                 # Store exports

app/admin/
└── users-list.tsx          # Users list component
```

## Dependencies

- `axios`: HTTP client for API requests
- `zustand`: State management
- `lucide-react-native`: Icons
- `@react-native-async-storage/async-storage`: Token storage

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: Displayed with retry option
2. **API Errors**: Server error messages shown to user
3. **Authentication Errors**: Automatic logout on 401 responses
4. **Loading States**: Proper loading indicators during API calls

## Security

- All admin endpoints require authentication
- Bearer token automatically included in requests
- Automatic logout on authentication failures
- Secure token storage using AsyncStorage

## Future Enhancements

Potential improvements for the admin features:

1. **User Management**:

   - Edit user details
   - Bulk operations (delete, role change)
   - User activity tracking

2. **Advanced Filtering**:

   - Date range filters
   - Status filters
   - Advanced search options

3. **Analytics**:

   - User growth charts
   - Role distribution statistics
   - Activity metrics

4. **Export Features**:
   - Export user data to CSV/Excel
   - Generate reports

## Testing

To test the admin features:

1. Start the development server: `npm run dev`
2. Login with admin credentials
3. Navigate to the users list
4. Test pagination, search, and filtering
5. Verify error handling with invalid requests

## Notes

- The API endpoint supports pagination with `page` and `limit` parameters
- Search functionality works on name and email fields
- Role filtering is case-insensitive
- All timestamps are in ISO format
- The component is fully responsive and works on different screen sizes
