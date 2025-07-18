import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/ui/CartItem';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatUtils';
import { ShoppingBag } from 'lucide-react-native';

export default function CartScreen() {
  const { theme } = useThemeStore() || { theme: null };
  const {
    items = [],
    getSubtotal,
    clearCart,
  } = useCartStore() || {
    items: [],
    getSubtotal: () => 0,
    clearCart: () => {},
  };

  // Safe check for getSubtotal
  const subtotal = typeof getSubtotal === 'function' ? getSubtotal() : 0;
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  // If theme is not available yet, render a minimal loading state
  if (!theme) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!items || items.length === 0) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme?.colors?.background },
        ]}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: theme?.colors?.text, fontWeight: '700' },
            ]}
          >
            Cart
          </Text>
        </View>

        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color={theme?.colors?.textSecondary} />
          <Text
            style={[
              styles.emptyText,
              { color: theme?.colors?.text, fontWeight: '700' },
            ]}
          >
            Your cart is empty
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              { color: theme?.colors?.textSecondary, fontWeight: '400' },
            ]}
          >
            Add some delicious parathas to get started
          </Text>
          <Button
            title="Start Shopping"
            onPress={() => router.push('/(tabs)')}
            variant="primary"
            style={styles.startShoppingButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.colors?.background }]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme?.colors?.text, fontWeight: '700' },
          ]}
        >
          Cart
        </Text>
        <Button
          title="Clear Cart"
          onPress={clearCart}
          variant="ghost"
          size="small"
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View
          style={[
            styles.itemsContainer,
            { borderTopColor: theme?.colors?.border },
          ]}
        >
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        <View
          style={[
            styles.summary,
            {
              backgroundColor: theme?.colors?.card,
            },
          ]}
        >
          <Text
            style={[
              styles.summaryTitle,
              { color: theme?.colors?.text, fontWeight: '600' },
            ]}
          >
            Order Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme?.colors?.textSecondary, fontWeight: '400' },
              ]}
            >
              Subtotal
            </Text>
            <Text
              style={[
                styles.summaryValue,
                { color: theme?.colors?.text, fontWeight: '500' },
              ]}
            >
              {formatCurrency(subtotal)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme?.colors?.textSecondary, fontWeight: '400' },
              ]}
            >
              Delivery Fee
            </Text>
            <Text
              style={[
                styles.summaryValue,
                { color: theme?.colors?.text, fontWeight: '500' },
              ]}
            >
              {formatCurrency(deliveryFee)}
            </Text>
          </View>

          <View
            style={[styles.divider, { backgroundColor: theme?.colors?.border }]}
          />

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.totalLabel,
                { color: theme?.colors?.text, fontWeight: '600' },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.totalValue,
                { color: theme?.colors?.primary, fontWeight: '700' },
              ]}
            >
              {formatCurrency(total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.checkoutContainer,
          { borderTopColor: theme?.colors?.border },
        ]}
      >
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.priceLabel,
              { color: theme?.colors?.textSecondary, fontWeight: '400' },
            ]}
          >
            Total
          </Text>
          <Text
            style={[
              styles.priceValue,
              { color: theme?.colors?.text, fontWeight: '500' },
            ]}
          >
            {formatCurrency(total)}
          </Text>
        </View>

        <Button
          title="Checkout"
          onPress={handleCheckout}
          variant="primary"
          style={styles.checkoutButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  itemsContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  summary: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 18,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
  },
  priceValue: {
    fontSize: 18,
  },
  checkoutButton: {
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  startShoppingButton: {
    paddingHorizontal: 24,
  },
});
