import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { theme, isDarkMode } = useThemeStore();
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrease = () => {
    if (item.isBusinessItem) {
      // For business items, increase by 50
      updateQuantity(item.id, item.quantity + 50);
    } else {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.isBusinessItem) {
      // For business items, decrease by 50, minimum 50
      if (item.quantity > 50) {
        updateQuantity(item.id, item.quantity - 50);
      } else {
        removeItem(item.id);
      }
    } else {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1);
      } else {
        removeItem(item.id);
      }
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <View
      style={[styles.container, { borderBottomColor: theme.colors.border }]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={[styles.name, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text style={[styles.price, { color: theme.colors.textSecondary }]}>
          ₹{item.price.toFixed(2)}
        </Text>

        <View style={styles.actions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  backgroundColor: isDarkMode
                    ? theme.colors.card
                    : theme.colors.border,
                },
              ]}
              onPress={handleDecrease}
            >
              {item.quantity === 1 ? (
                <Trash2 size={16} color={theme.colors.error} />
              ) : (
                <Minus size={16} color={theme.colors.primary} />
              )}
            </TouchableOpacity>

            <Text style={[styles.quantity, { color: theme.colors.text }]}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              style={[
                styles.quantityButton,
                {
                  backgroundColor: isDarkMode
                    ? theme.colors.card
                    : theme.colors.border,
                },
              ]}
              onPress={handleIncrease}
            >
              <Plus size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.totalPrice, { color: theme.colors.text }]}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
});
