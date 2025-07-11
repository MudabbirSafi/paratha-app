import { create } from 'zustand';
import { mockProducts } from '@/constants/mockData';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (productId: string, quantity = 1) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    set(state => {
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
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