import { ImageSourcePropType } from 'react-native';
import paratha from '@/assets/images/paratha.png';
import chapati from "@/assets/images/chapati.png"
import wheatParatha from "@/assets/images/wheatParatha.png"
import puri from "@/assets/images/puri.png"
// Add more images when available

interface Category {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export const categories: Category[] = [
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



// Products
export const products = [
  {
    id: '1',
    name: 'Malabar Paratha',
    description: 'The traditional way of making Malabar Paratha is a bit complicated and needs expertise to make the finest of these, our dough recipe and specially trained chefs know exactly when, what and how to do it. Its a commitment we make to ourselves to serve you every time the same great taste.',
    price: 8.99,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2023/11/New-GHMP-Front.png',
    categoryId: '1',
    rating: 4.7,
    reviews: 128,
    isBestseller: true,
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
    description: 'With all the goodness of wheat and the tradition of Kerala, this wheat parotta will be an awesome food to add-on to your daily diet. Having it in breakfast, lunch or dinner no matter when, you will always crave more. So why wait? just give it a try now!.',
    price: 11.99,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
    categoryId: '2',
    rating: 4.8,
    reviews: 95,
    isBestseller: true,
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
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil on our signature crust.',
    price: 12.99,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
    categoryId: '3',
    rating: 4.6,
    reviews: 87,
    isBestseller: true,
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
    name: 'Wheat Chapati ',
    description: 'The everyday companion for breakfast, lunch and dinner for everyone in the family. We make the best chapati you can have at home or outdoors, without kneading the dough or facing the heat of the stove.',
    price: 14.99,
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Chapati-Front-1.png',
    categoryId: '4',
    rating: 4.8,
    reviews: 132,
    isBestseller: true,
    ingredients: ['Whole wheat flour, water, salt (optional), ghee/oil (optional)'],
    nutritionInfo: {
      calories: 860,
      protein: 36,
      carbs: 82,
      fat: 46
    }
  },

];

// Promotional banners
export const promotions = [
  {
    id: '1',
    title: 'Summer Special',
    description: 'Get 20% off on all Parathas!',
    image: 'https://images.pexels.com/photos/4109480/pexels-photo-4109480.jpeg',
    color: '#FF3A3A'
  },
  {
    id: '2',
    title: 'Wholesome Wheat Feast',
    description: 'Special Wheat paratha ',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/01/CH-Wheat-Paratha-Front-5pcs-1.png',
    color: '#FFC31F'
  },
  {
    id: '3',
    title: 'Fluffy Feast Deal',
    // description: 'Try our Best Product!',
    description: 'Puri ',
    image: 'https://goodhealthy.co.in/wp-content/uploads/2024/06/GH-Puri-Front-Mockup-1.png',
    color: '#10B981'
  }
];

// User data
export const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
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
  ]
};

// Orders history
export const orderHistory = [
  {
    id: '1',
    date: '2023-06-15T18:30:00Z',
    total: 24.97,
    status: 'Delivered',
    items: [
      { id: '1', productId: '1', name: 'Classic Cheeseburger', quantity: 2, price: 8.99 },
      { id: '2', productId: '8', name: 'Milkshake', quantity: 1, price: 4.99 }
    ]
  },
  {
    id: '2',
    date: '2023-06-10T19:45:00Z',
    total: 35.97,
    status: 'Delivered',
    items: [
      { id: '1', productId: '4', name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
      { id: '2', productId: '6', name: 'Spicy Chicken Wings', quantity: 1, price: 10.99 },
      { id: '3', productId: '9', name: 'Chocolate Brownie', quantity: 1, price: 5.99 }
    ]
  }
];