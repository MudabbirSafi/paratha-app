import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { userData } from '@/constants/MockData';
import { MapPin, CreditCard, ChevronRight } from 'lucide-react-native';

export default function CheckoutScreen() {
  const { theme } = useThemeStore();
  const { items, getSubtotal } = useCartStore();
  
  const [selectedAddress, setSelectedAddress] = useState(userData.addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(userData.paymentMethods[0]);
  
  const subtotal = getSubtotal();
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;
  
  const handleProceedToPayment = () => {
    router.push('/checkout/payment');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
          
          <Card style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <MapPin size={20} color={theme.colors.primary} />
              <Text style={[styles.addressType, { color: theme.colors.text }]}>
                {selectedAddress.type}
              </Text>
            </View>
            
            <Text style={[styles.address, { color: theme.colors.text }]}>
              {selectedAddress.address}
            </Text>
            <Text style={[styles.addressDetails, { color: theme.colors.secondaryText }]}>
              {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
            </Text>
          </Card>
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
            
            <Text style={[styles.paymentExpiry, { color: theme.colors.secondaryText }]}>
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
              <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>
                Delivery Fee
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
                ${deliveryFee.toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <View style={styles.totalContainer}>
          <Text style={[styles.footerTotal, { color: theme.colors.text }]}>
            ${total.toFixed(2)}
          </Text>
          <Text style={[styles.footerLabel, { color: theme.colors.secondaryText }]}>
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