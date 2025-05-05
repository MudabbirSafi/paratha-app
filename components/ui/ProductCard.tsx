import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { Plus, Star } from 'lucide-react-native';
import { Card } from './Card';
import { router } from 'expo-router';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  isBestseller?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  isBestseller = false,
}) => {
  const { theme } = useThemeStore();
  const { addItem } = useCartStore();
  
  const handlePress = () => {
    router.push(`/product/${id}`);
  };
  
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addItem(id);
  };
  
  return (
    <Card 
      style={styles.card}
      onPress={handlePress}
      elevation={3}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {isBestseller && (
          <View style={[styles.bestsellerBadge, { backgroundColor: theme.colors.secondary }]}>
            <Text style={styles.bestsellerText}>Bestseller</Text>
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
          <Star size={16} color={theme.colors.secondary} fill={theme.colors.secondary} />
          <Text style={[styles.rating, { color: theme.colors.secondaryText }]}>
            {rating.toFixed(1)}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.price, { color: theme.colors.text }]}>
            ${price.toFixed(2)}
          </Text>
          
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]} 
            onPress={handleAddToCart}
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
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