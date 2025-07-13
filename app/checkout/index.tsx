import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { useAddressStore } from '@/store/addressStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';

import { MapPin, CreditCard, ChevronRight } from 'lucide-react-native';

export default function CheckoutScreen() {
  const { theme } = useThemeStore();
  const { items, getSubtotal } = useCartStore();
  const { addresses, loadAddresses } = useAddressStore();
  const { isAuthenticated } = useAuthStore();

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState({
    type: 'Credit Card',
    lastFour: '1234',
    expiryDate: '12/25',
  });

  const subtotal = getSubtotal();
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'Please log in to continue with checkout.',
        [
          {
            text: 'Login',
            onPress: () => router.replace('/auth/login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => router.back(),
          },
        ]
      );
      return;
    }

    loadAddresses();
  }, [loadAddresses, isAuthenticated]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddress || addresses[0]);
    }
  }, [addresses]);

  const handleProceedToPayment = () => {
    router.push('/checkout/payment');
  };

  const handleAddressPress = () => {
    router.push('/addresses');
  };

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  if (!selectedAddress) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Checkout
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No addresses found. Please add an address to continue.
          </Text>
          <Button
            title="Add Address"
            onPress={handleAddressPress}
            variant="primary"
            style={styles.addAddressButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Checkout
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Delivery Address
          </Text>

          <TouchableOpacity onPress={handleAddressPress}>
            <Card style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <MapPin size={20} color={theme.colors.primary} />
                <Text
                  style={[styles.addressType, { color: theme.colors.text }]}
                >
                  {selectedAddress.type}
                </Text>
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>

              <Text style={[styles.address, { color: theme.colors.text }]}>
                {selectedAddress.address}
              </Text>
              <Text
                style={[
                  styles.addressDetails,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {selectedAddress.city}, {selectedAddress.state}{' '}
                {selectedAddress.zipCode}
              </Text>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Payment Method
          </Text>

          <Card style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <CreditCard size={20} color={theme.colors.primary} />
              <Text style={[styles.paymentType, { color: theme.colors.text }]}>
                {selectedPayment.type} •••• {selectedPayment.lastFour}
              </Text>
            </View>

            <Text
              style={[
                styles.paymentExpiry,
                { color: theme.colors.textSecondary },
              ]}
            >
              Expires {selectedPayment.expiryDate}
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Order Summary
          </Text>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                ₹{subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Delivery Fee
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                ₹{deliveryFee.toFixed(2)}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: theme.colors.border }]}
            />

            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
                Total
              </Text>
              <Text
                style={[styles.totalValue, { color: theme.colors.primary }]}
              >
                ₹{total.toFixed(2)}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <View style={styles.totalContainer}>
          <Text style={[styles.footerTotal, { color: theme.colors.text }]}>
            ₹{total.toFixed(2)}
          </Text>
          <Text
            style={[styles.footerLabel, { color: theme.colors.textSecondary }]}
          >
            Total Amount
          </Text>
        </View>

        <Button
          title="Proceed to Payment"
          onPress={handleProceedToPayment}
          variant="primary"
          style={styles.proceedButton}
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  addAddressButton: {
    minWidth: 200,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  addressCard: {
    padding: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
  },
  paymentCard: {
    padding: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  paymentExpiry: {
    fontSize: 14,
  },
  summaryCard: {
    padding: 16,
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
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: '700',
  },
  footerLabel: {
    fontSize: 12,
  },
  proceedButton: {
    flex: 1,
    marginLeft: 16,
  },
});
