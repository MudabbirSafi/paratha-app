import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react-native';

export default function SuccessScreen() {
  const { theme } = useThemeStore();

  const handleContinueShopping = () => {
    router.replace('/(tabs)');
  };

  const handleViewOrders = () => {
    // Navigate to orders screen (you can implement this later)
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={theme.colors.primary} />
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Payment Successful!
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your order has been placed successfully. We'll notify you when your
          delicious parathas are ready!
        </Text>

        <View style={styles.orderInfo}>
          <Text
            style={[styles.orderLabel, { color: theme.colors.textSecondary }]}
          >
            Order ID
          </Text>
          <Text style={[styles.orderValue, { color: theme.colors.text }]}>
            #{Date.now().toString().slice(-8)}
          </Text>
        </View>

        <View style={styles.estimatedTime}>
          <Text
            style={[
              styles.estimatedLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Estimated Delivery Time
          </Text>
          <Text
            style={[styles.estimatedValue, { color: theme.colors.primary }]}
          >
            25-35 minutes
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          variant="primary"
          style={styles.continueButton}
          leftIcon={<ShoppingBag size={20} color="white" />}
        />

        <Button
          title="View Orders"
          onPress={handleViewOrders}
          variant="outline"
          style={styles.ordersButton}
          leftIcon={<Home size={20} color={theme.colors.primary} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  orderInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  orderLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  orderValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  estimatedTime: {
    alignItems: 'center',
  },
  estimatedLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  estimatedValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    gap: 12,
  },
  continueButton: {
    marginBottom: 8,
  },
  ordersButton: {
    marginBottom: 8,
  },
});
