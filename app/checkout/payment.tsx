import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  CreditCard,
  Smartphone,
  DollarSign,
  Check,
  ArrowLeft,
  Lock,
} from 'lucide-react-native';

export default function PaymentScreen() {
  const { theme } = useThemeStore();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Pay with Visa, Mastercard, or other cards',
      icon: <CreditCard size={24} color={theme.colors.primary} />,
    },
    {
      id: 'upi',
      title: 'UPI Payment',
      subtitle: 'Pay using UPI apps like Google Pay, PhonePe',
      icon: <Smartphone size={24} color={theme.colors.primary} />,
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      subtitle: 'Pay when you receive your order',
      icon: <DollarSign size={24} color={theme.colors.primary} />,
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and navigate to success
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      Alert.alert(
        'Payment Failed',
        'There was an error processing your payment. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Payment
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Select Payment Method
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <Card
                style={[
                  styles.paymentMethodCard,
                  selectedPaymentMethod === method.id && {
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                  },
                ]}
              >
                <View style={styles.paymentMethodHeader}>
                  <View style={styles.paymentMethodIcon}>{method.icon}</View>
                  <View style={styles.paymentMethodInfo}>
                    <Text
                      style={[
                        styles.paymentMethodTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      {method.title}
                    </Text>
                    <Text
                      style={[
                        styles.paymentMethodSubtitle,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {method.subtitle}
                    </Text>
                  </View>
                  {selectedPaymentMethod === method.id && (
                    <View
                      style={[
                        styles.checkIcon,
                        { backgroundColor: theme.colors.primary },
                      ]}
                    >
                      <Check size={16} color="white" />
                    </View>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPaymentMethod === 'card' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Card Details
            </Text>
            <Card style={styles.cardDetailsCard}>
              <Input
                label="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
              />
              <Input
                label="Card Holder Name"
                value={cardHolder}
                onChangeText={setCardHolder}
                placeholder="John Doe"
                autoCapitalize="words"
              />
              <View style={styles.cardRow}>
                <Input
                  label="Expiry Date"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholder="MM/YY"
                  style={styles.halfInput}
                />
                <Input
                  label="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  style={styles.halfInput}
                />
              </View>
            </Card>
          </View>
        )}

        {selectedPaymentMethod === 'upi' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              UPI Details
            </Text>
            <Card style={styles.cardDetailsCard}>
              <Input
                label="UPI ID"
                value={upiId}
                onChangeText={setUpiId}
                placeholder="user@upi"
                autoCapitalize="none"
              />
            </Card>
          </View>
        )}

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
        <View style={styles.securityInfo}>
          <Lock size={16} color={theme.colors.textSecondary} />
          <Text
            style={[styles.securityText, { color: theme.colors.textSecondary }]}
          >
            Secure payment powered by SSL
          </Text>
        </View>
        <Button
          title={isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
          onPress={handlePayment}
          variant="primary"
          disabled={isProcessing}
          style={styles.payButton}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentMethodCard: {
    marginBottom: 12,
    padding: 16,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetailsCard: {
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
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
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
  },
  payButton: {
    width: '100%',
  },
});
