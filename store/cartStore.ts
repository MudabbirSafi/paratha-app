import { mockProducts } from '@/constants/MockData';

import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isBusinessItem?: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, isBusinessUser?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (productId: string, quantity = 1, isBusinessUser = false) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    // For business users, ensure quantity is in multiples of 50
    const adjustedQuantity = isBusinessUser ? Math.max(50, Math.ceil(quantity / 50) * 50) : quantity;
    const displayPrice = isBusinessUser && product.businessPrice ? product.businessPrice : product.price;

    set(state => {
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + adjustedQuantity }
              : item
          ),
        };
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: displayPrice,
          image: product.image,
          quantity: adjustedQuantity,
          isBusinessItem: isBusinessUser,
        };
        return {
          items: [...state.items, newItem],
        };
      }
    });
  },

  removeItem: (itemId: string) => {
    set(state => ({
      items: state.items.filter(item => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    set(state => ({
      items: state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}));