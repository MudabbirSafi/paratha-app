// Core types for the Paratha App

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    businessPrice?: number; // Discounted price for business users
    image: string;
    categoryId: string;
    rating: number;
    reviews: number;
    isAvailable: boolean;
    isBestseller?: boolean;
    preparationTime?: number; // in minutes
    ingredients: string[];
    allergens?: string[];
    nutritionInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

export interface Category {
    id: string;
    name: string;
    image: string;
    color?: string;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    specialInstructions?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    preferences?: {
        dietaryRestrictions: string[];
        spiceLevel: 'mild' | 'medium' | 'hot';
    };
}

export interface Address {
    id: string;
    type: 'Home' | 'Work' | 'Other';
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: string;
    lastFour: string;
    expiryDate: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'Delivered';
    items: OrderItem[];
    deliveryAddress?: string;
    paymentMethod?: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
    discount?: number;
    code?: string;
    validUntil?: Date;
    minimumOrder?: number;
}

// Navigation types
export type RootStackParamList = {
    Home: undefined;
    ProductDetail: { productId: string };
    Cart: undefined;
    Checkout: undefined;
    Profile: undefined;
    Search: undefined;
    Auth: undefined;
    Onboarding: undefined;
    Business: undefined;
    Delivery: undefined;
};

// Store types
export interface CartStore {
    items: CartItem[];
    addItem: (product: Product, quantity?: number, specialInstructions?: string) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: Partial<User>) => Promise<void>;
}

export interface ThemeStore {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: (isDark: boolean) => void;
} 