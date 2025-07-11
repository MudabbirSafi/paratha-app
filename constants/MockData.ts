import { Product, Category, User, Order, Promotion } from '@/types';

import { ImageSourcePropType } from 'react-native';

// Import images (you'll need to add these to your assets)
// import paratha from '@/assets/images/paratha.png';
// import chapati from '@/assets/images/chapati.png';
// import wheatParatha from '@/assets/images/wheatParatha.png';
// import puri from '@/assets/images/puri.png';

// Mock Categories Data
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Malabar Paratha',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2023/11/New-GHMP-Front.png',
    color: '#FF6B6B'
  },
  {
    id: '2',
    name: 'Wheat Paratha',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
    color: '#4ECDC4'
  },
  {
    id: '3',
    name: 'Puri',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
    color: '#45B7D1'
  },
  {
    id: '4',
    name: 'Wheat Chapati',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Chapati-Front-1.png',
    color: '#96CEB4'
  }
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Malabar Paratha',
    description: 'The traditional way of making Malabar Paratha is a bit complicated and needs expertise to make the finest of these, our dough recipe and specially trained chefs know exactly when, what and how to do it. Its a commitment we make to ourselves to serve you every time the same great taste.',
    price: 120,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2023/11/New-GHMP-Front.png',
    categoryId: '1',
    rating: 4.7,
    reviews: 128,
    isAvailable: true,
    isBestseller: true,
    preparationTime: 15,
    ingredients: ['All-purpose flour', 'whole wheat flour', 'water', 'sugar', 'salt', 'oil', 'milk (optional)'],
    allergens: ['Gluten'],
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
    description: 'With all the goodness of wheat and the tradition of Kerala, this wheat parotta will be an awesome food to add-on to your daily diet. Having it in breakfast, lunch or dinner no matter when, you will always crave more. So why wait? just give it a try now!.',
    price: 150,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
    categoryId: '2',
    rating: 4.8,
    reviews: 95,
    isAvailable: true,
    isBestseller: true,
    preparationTime: 20,
    ingredients: ['Whole wheat flour', 'water', 'salt', 'ghee/oil (for cooking)', 'optional stuffing (potato, paneer, vegetables)'],
    allergens: ['Gluten'],
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
    description: 'Classic puri with perfect texture and taste, made with whole wheat flour and traditional spices.',
    price: 120,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
    categoryId: '3',
    rating: 4.6,
    reviews: 87,
    isAvailable: true,
    isBestseller: true,
    preparationTime: 12,
    ingredients: ['Whole wheat flour', 'semolina (optional)', 'salt', 'water', 'oil (for dough and frying)'],
    allergens: ['Gluten'],
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
    description: 'The everyday companion for breakfast, lunch and dinner for everyone in the family. We make the best chapati you can have at home or outdoors, without kneading the dough or facing the heat of the stove.',
    price: 200,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Chapati-Front-1.png',
    categoryId: '4',
    rating: 4.8,
    reviews: 132,
    isAvailable: true,
    isBestseller: true,
    preparationTime: 10,
    ingredients: ['Whole wheat flour', 'water', 'salt (optional)', 'ghee/oil (optional)'],
    allergens: ['Gluten'],
    nutritionInfo: {
      calories: 860,
      protein: 36,
      carbs: 82,
      fat: 46
    }
  }
];

// Mock User Data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  addresses: [
    {
      id: '1',
      type: 'Home',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      isDefault: true
    },
    {
      id: '2',
      type: 'Work',
      address: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'Visa',
      lastFour: '4242',
      expiryDate: '04/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '5555',
      expiryDate: '05/26',
      isDefault: false
    }
  ],
  preferences: {
    dietaryRestrictions: [],
    spiceLevel: 'medium'
  }
};

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: '1',
    date: '2023-06-15T18:30:00Z',
    total: 24.97,
    status: 'Delivered',
    items: [
      { id: '1', productId: '1', name: 'Malabar Paratha', quantity: 2, price: 8.99 },
      { id: '2', productId: '3', name: 'Puri', quantity: 1, price: 4.99 }
    ]
  },
  {
    id: '2',
    date: '2023-06-10T19:45:00Z',
    total: 35.97,
    status: 'Delivered',
    items: [
      { id: '3', productId: '2', name: 'Wheat Paratha', quantity: 3, price: 11.99 }
    ]
  }
];

// Mock Promotions Data
export const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Summer Special',
    description: 'Get 20% off on all Parathas!',
    image: 'https://images.pexels.com/photos/4109480/pexels-photo-4109480.jpeg',
    color: '#FF3A3A',
    discount: 20,
    code: 'SUMMER20',
    validUntil: new Date('2024-12-31'),
    minimumOrder: 15
  },
  {
    id: '2',
    title: 'Wholesome Wheat Feast',
    description: 'Special Wheat paratha',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
    color: '#FFC31F',
    discount: 15,
    code: 'WHEAT15',
    validUntil: new Date('2024-12-31'),
    minimumOrder: 20
  },
  {
    id: '3',
    title: 'Fluffy Feast Deal',
    description: 'Puri',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
    color: '#10B981',
    discount: 10,
    code: 'PURI10',
    validUntil: new Date('2024-12-31'),
    minimumOrder: 10
  }
]; 