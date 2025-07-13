import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { mockProducts } from '@/constants/MockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types';

import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Star, Minus, Plus, ChevronLeft } from 'lucide-react-native';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useThemeStore();
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p: Product) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Product not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    addItem(product.id, quantity);
    // await showAddToCartNotification(product.name);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    router.push('/checkout');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: theme.colors.card }]}
          >
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {product.name}
            </Text>
            {product.isBestseller && (
              <Badge label="Bestseller" variant="secondary" size="sm" />
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Star
              size={20}
              color={theme.colors.secondary}
              fill={theme.colors.secondary}
            />
            <Text style={[styles.rating, { color: theme.colors.text }]}>
              {product.rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviews, { color: theme.colors.secondary }]}>
              ({product.reviews} reviews)
            </Text>
          </View>

          <Text style={[styles.description, { color: theme.colors.secondary }]}>
            {product.description}
          </Text>

          <View style={[styles.section, { borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Ingredients
            </Text>
            <View style={styles.ingredients}>
              {product.ingredients.map((ingredient: string, index: number) => (
                <Badge
                  key={index}
                  label={ingredient}
                  variant="primary"
                  size="sm"
                  style={styles.ingredient}
                />
              ))}
            </View>
          </View>

          <View style={[styles.section, { borderColor: theme.colors.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Nutrition Information
            </Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text
                  style={[styles.nutritionValue, { color: theme.colors.text }]}
                >
                  {product.nutritionInfo.calories}
                </Text>
                <Text
                  style={[
                    styles.nutritionLabel,
                    { color: theme.colors.secondary },
                  ]}
                >
                  Calories
                </Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text
                  style={[styles.nutritionValue, { color: theme.colors.text }]}
                >
                  {product.nutritionInfo.protein}g
                </Text>
                <Text
                  style={[
                    styles.nutritionLabel,
                    { color: theme.colors.secondary },
                  ]}
                >
                  Protein
                </Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text
                  style={[styles.nutritionValue, { color: theme.colors.text }]}
                >
                  {product.nutritionInfo.carbs}g
                </Text>
                <Text
                  style={[
                    styles.nutritionLabel,
                    { color: theme.colors.secondary },
                  ]}
                >
                  Carbs
                </Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text
                  style={[styles.nutritionValue, { color: theme.colors.text }]}
                >
                  {product.nutritionInfo.fat}g
                </Text>
                <Text
                  style={[
                    styles.nutritionLabel,
                    { color: theme.colors.secondary },
                  ]}
                >
                  Fat
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, { color: theme.colors.secondary }]}>
            Price
          </Text>
          <Text style={[styles.price, { color: theme.colors.text }]}>
            ₹{(product.price * quantity).toFixed(2)}
          </Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              { backgroundColor: theme.colors.card },
            ]}
            onPress={() => handleQuantityChange(-1)}
          >
            <Minus size={20} color={theme.colors.text} />
          </TouchableOpacity>

          <Text style={[styles.quantity, { color: theme.colors.text }]}>
            {quantity}
          </Text>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              { backgroundColor: theme.colors.card },
            ]}
            onPress={() => handleQuantityChange(1)}
          >
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            variant="outline"
            style={styles.cartButton}
          />
          <Button
            title="Buy Now"
            onPress={handleBuyNow}
            variant="primary"
            style={styles.buyButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    borderTopWidth: 1,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredient: {
    marginRight: 8,
    marginBottom: 8,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cartButton: {
    flex: 1,
  },
  buyButton: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});
