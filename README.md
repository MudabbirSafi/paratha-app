# Paratha App

A React Native food delivery app built with Expo Router, TypeScript, and Zustand for state management.

## 🏗️ Project Structure

```
Paratha App/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── cart.tsx       # Cart screen
│   │   ├── profile.tsx    # Profile screen
│   │   └── product/       # Product detail screens
│   ├── auth/              # Authentication screens
│   ├── onboarding/        # Onboarding screens
│   ├── checkout/          # Checkout flow
│   ├── business/          # Business dashboard
│   ├── delivery/          # Delivery tracking
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   │   └── Button.tsx    # Button component
│   ├── ui/               # UI-specific components
│   │   ├── Badge.tsx     # Badge component
│   │   ├── Card.tsx      # Card component
│   │   ├── Input.tsx     # Input component
│   │   ├── ProductCard.tsx # Product card
│   │   ├── CartItem.tsx  # Cart item component
│   │   ├── CategoryButton.tsx # Category button
│   │   └── PromotionCard.tsx # Promotion card
│   └── index.ts          # Component exports
├── constants/            # App constants and configuration
│   ├── Colors.ts         # Color definitions
│   ├── Theme.ts          # Theme configuration
│   ├── mockData.ts       # Mock data for development
│   └── index.ts          # Constants exports
├── types/                # TypeScript type definitions
│   └── index.ts          # All app types
├── store/                # Zustand state management
│   ├── authStore.ts      # Authentication state
│   ├── cartStore.ts      # Shopping cart state
│   └── themeStore.ts     # Theme state
├── hooks/                # Custom React hooks
│   └── useFrameworkReady.ts
├── utils/                # Utility functions
│   ├── formatUtils.ts    # Formatting utilities
│   ├── notifications.ts  # Notification utilities
│   └── validation.ts     # Validation utilities
├── assets/               # Static assets
│   └── images/           # Image assets
└── package.json          # Dependencies and scripts
```

## 📝 Naming Conventions

### Files and Directories

- **PascalCase**: React components (e.g., `ProductCard.tsx`, `CategoryButton.tsx`)
- **camelCase**: Utilities, hooks, stores (e.g., `formatUtils.ts`, `useFrameworkReady.ts`, `authStore.ts`)
- **kebab-case**: Directories with multiple words (e.g., `product-detail/`)
- **snake_case**: Avoided in this project

### Components

- **PascalCase**: Component names (e.g., `ProductCard`, `CategoryButton`)
- **camelCase**: Props and variables (e.g., `productName`, `onPress`)
- **UPPER_CASE**: Constants (e.g., `API_ENDPOINTS`, `DEFAULT_TIMEOUT`)

### TypeScript

- **PascalCase**: Interfaces and types (e.g., `Product`, `CartItem`)
- **camelCase**: Variables and functions (e.g., `mockProducts`, `getTotal`)
- **UPPER_CASE**: Enums (e.g., `ORDER_STATUS`)

## 🎨 Design System

### Colors

Colors are organized in a nested structure with different shades:

```typescript
Colors.primary[500]; // Main primary color
Colors.secondary[400]; // Secondary color shade
Colors.neutral[100]; // Light neutral color
```

### Theme

The app supports light and dark themes with consistent spacing, typography, and color schemes.

### Components

All UI components follow a consistent design pattern with:

- Proper TypeScript interfaces
- Theme integration
- Responsive design
- Accessibility support

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Run on device/simulator**:
   ```bash
   npx expo start
   ```

## 📱 Features

- **Product Catalog**: Browse different types of parathas
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login/register functionality
- **Order Management**: Track orders and delivery
- **Theme Support**: Light and dark mode
- **Responsive Design**: Works on different screen sizes

## 🛠️ Tech Stack

- **React Native**: Mobile app framework
- **Expo Router**: File-based routing
- **TypeScript**: Type safety
- **Zustand**: State management
- **React Navigation**: Navigation library
- **Expo**: Development platform

## 📦 State Management

The app uses Zustand for state management with three main stores:

1. **AuthStore**: User authentication and profile
2. **CartStore**: Shopping cart functionality
3. **ThemeStore**: App theme and appearance

## 🔧 Development Guidelines

1. **Type Safety**: Always use TypeScript interfaces for props and data
2. **Component Structure**: Follow the established component hierarchy
3. **Naming**: Use consistent naming conventions throughout
4. **Imports**: Use the index files for clean imports
5. **Testing**: Write tests for critical functionality

## 📄 License

This project is licensed under the MIT License.
