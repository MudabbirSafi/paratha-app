import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { Plus, Star, Tag } from 'lucide-react-native';

import { router } from 'expo-router';

import { Card } from './Card';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  businessPrice?: number;
  image: string;
  rating: number;
  isBestseller?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  businessPrice,
  image,
  rating,
  isBestseller = false,
}) => {
  const { theme } = useThemeStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  const isBusinessUser = user?.role === 'business';
  const displayPrice = isBusinessUser && businessPrice ? businessPrice : price;

  const handlePress = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    // For business users, add in multiples of 50
    const quantity = isBusinessUser ? 50 : 1;
    addItem(id, quantity, isBusinessUser);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card style={styles.card} padding="none">
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          {isBestseller && (
            <View
              style={[
                styles.bestsellerBadge,
                { backgroundColor: theme.colors.secondary },
              ]}
            >
              <Text style={styles.bestsellerText}>Bestseller</Text>
            </View>
          )}
          {isBusinessUser && businessPrice && (
            <View
              style={[
                styles.businessBadge,
                { backgroundColor: theme.colors.accent },
              ]}
            >
              <Tag size={12} color="white" />
              <Text style={styles.businessBadgeText}>Business</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text
            style={[styles.name, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View style={styles.ratingContainer}>
            <Star
              size={16}
              color={theme.colors.secondary}
              fill={theme.colors.secondary}
            />
            <Text
              style={[styles.rating, { color: theme.colors.textSecondary }]}
            >
              {rating.toFixed(1)}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              {isBusinessUser && businessPrice && (
                <Text
                  style={[
                    styles.originalPrice,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  ₹{price.toFixed(2)}
                </Text>
              )}
              <Text style={[styles.price, { color: theme.colors.text }]}>
                ₹{displayPrice.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleAddToCart}
            >
              <Plus size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    width: 170,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  bestsellerText: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
  },
  businessBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  businessBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
