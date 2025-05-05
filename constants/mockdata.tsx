import { ImageSourcePropType } from 'react-native';
import paratha from '@/assets/images/paratha.png';
import chapati from "@/assets/images/chapati.png"
import wheatParatha from "@/assets/images/wheatParatha.png"
import puri from "@/assets/images/puri.png"

// Business Interface
interface Business {
    id: string;
    name: string;
    email: string;
    businessType: 'Shop' | 'Mall' | 'Food Bazaar';
    address: string;
    phone: string;
    registrationDate: string;
    isVerified: boolean;
}

// Business Categories
interface Category {
    id: string;
    name: string;
    image: ImageSourcePropType;
}

export const businessCategories: Category[] = [
    {
        id: '1',
        name: 'Malabar Paratha',
        image: paratha,
    },
    {
        id: '2',
        name: 'Wheat Paratha',
        image: wheatParatha,
    },
    {
        id: '3',
        name: 'Puri',
        image: puri,
    },
    {
        id: '4',
        name: 'Wheat Chapati',
        image: chapati,
    },
];

// Business Products with wholesale prices
export const businessProducts = [
    {
        id: '1',
        name: 'Malabar Paratha',
        description: 'The traditional way of making Malabar Paratha...',
        wholesalePrice: 5.50, // Lower than customer price
        retailPrice: 8.99,
        image: 'https://goodhealthy.co.in/wp-content/uploads/2023/11/New-GHMP-Front.png',
        categoryId: '1',
        stock: 500,
        minOrderQuantity: 50,
        rating: 4.7,
        ingredients: ['All-purpose flour, whole wheat flour, water, sugar, salt, oil, milk (optional)'],
        nutritionInfo: {
            calories: 650,
            protein: 35,
            carbs: 40,
            fat: 42
        }
    },
    {
        id: '2',
        name: 'Wheat Paratha',
        description: 'With all the goodness of wheat and the tradition of Kerala...',
        wholesalePrice: 7.25,
        retailPrice: 11.99,
        image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
        categoryId: '2',
        stock: 350,
        minOrderQuantity: 30,
        rating: 4.8,
        ingredients: ['Whole wheat flour, water, salt, ghee/oil (for cooking), optional stuffing (potato, paneer, vegetables)'],
        nutritionInfo: {
            calories: 950,
            protein: 56,
            carbs: 45,
            fat: 62
        }
    },
    {
        id: '3',
        name: 'Puri',
        description: 'Classic puri made with whole wheat flour...',
        wholesalePrice: 6.80,
        retailPrice: 12.99,
        image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
        categoryId: '3',
        stock: 400,
        minOrderQuantity: 40,
        rating: 4.6,
        ingredients: ['Whole wheat flour, semolina (optional), salt, water, oil (for dough and frying)'],
        nutritionInfo: {
            calories: 780,
            protein: 24,
            carbs: 86,
            fat: 36
        }
    },
    {
        id: '4',
        name: 'Wheat Chapati',
        description: 'The everyday companion for breakfast, lunch and dinner...',
        wholesalePrice: 8.20,
        retailPrice: 14.99,
        image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Chapati-Front-1.png',
        categoryId: '4',
        stock: 600,
        minOrderQuantity: 60,
        rating: 4.8,
        ingredients: ['Whole wheat flour, water, salt (optional), ghee/oil (optional)'],
        nutritionInfo: {
            calories: 860,
            protein: 36,
            carbs: 82,
            fat: 46
        }
    },
];

// Business Orders
export const businessOrders = [
    {
        id: '1',
        businessId: 'biz123',
        date: '2023-06-15T18:30:00Z',
        total: 275.00,
        status: 'Completed',
        customer: {
            id: 'cust456',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890'
        },
        items: [
            { id: '1', productId: '1', name: 'Malabar Paratha', quantity: 30, unitPrice: 5.50, total: 165.00 },
            { id: '2', productId: '3', name: 'Puri', quantity: 20, unitPrice: 6.80, total: 136.00 }
        ],
        paymentMethod: 'Bank Transfer',
        deliveryAddress: '123 Main St, San Francisco, CA 94105'
    },
    {
        id: '2',
        businessId: 'biz123',
        date: '2023-06-10T19:45:00Z',
        total: 420.50,
        status: 'Processing',
        customer: {
            id: 'cust789',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1987654321'
        },
        items: [
            { id: '1', productId: '2', name: 'Wheat Paratha', quantity: 50, unitPrice: 7.25, total: 362.50 },
            { id: '2', productId: '4', name: 'Wheat Chapati', quantity: 20, unitPrice: 8.20, total: 164.00 }
        ],
        paymentMethod: 'Credit Card',
        deliveryAddress: '456 Market St, San Francisco, CA 94103'
    }
];

// Business Promotions
export const businessPromotions = [
    {
        id: '1',
        title: 'Bulk Order Discount',
        description: 'Order 100+ items and get 15% off!',
        discountType: 'percentage',
        discountValue: 15,
        minOrder: 100,
        startDate: '2023-07-01',
        endDate: '2023-07-31',
        isActive: true
    },
    {
        id: '2',
        title: 'Seasonal Clearance',
        description: 'Clearance sale on Wheat Paratha - Limited stock!',
        discountType: 'fixed',
        discountValue: 1.50,
        productId: '2',
        startDate: '2023-07-15',
        endDate: '2023-07-30',
        isActive: true
    }
];

// Business Analytics
export const businessAnalytics = {
    totalSales: 4895.75,
    monthlySales: [
        { month: 'Jan', sales: 1250.50 },
        { month: 'Feb', sales: 980.25 },
        { month: 'Mar', sales: 1450.75 },
        { month: 'Apr', sales: 1214.25 },
    ],
    topProducts: [
        { productId: '1', name: 'Malabar Paratha', sales: 1850.00 },
        { productId: '2', name: 'Wheat Paratha', sales: 1250.50 },
        { productId: '4', name: 'Wheat Chapati', sales: 950.25 },
        { productId: '3', name: 'Puri', sales: 845.00 },
    ],
    customerGrowth: 28 // percentage
};

// Current Business User
export const currentBusiness: Business = {
    id: 'biz123',
    name: 'Delicious Paratha House',
    email: 'business@deliciousparatha.com',
    businessType: 'Shop',
    address: '789 Food Street, Mumbai, India',
    phone: '+919876543210',
    registrationDate: '2023-01-15',
    isVerified: true
};