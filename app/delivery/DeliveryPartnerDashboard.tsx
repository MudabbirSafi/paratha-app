import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const mockOrders = [
  {
    id: '001',
    business: 'safi Paratha - Lulu Mall',
    customer: {
      name: 'Ayaan Sheikh',
      phone: '9876543210',
    },
    deliveryAddress: 'Bandra West, Mumbai',
    status: 'On the Way',
    remarks: '',
    paymentMethod: 'UPI',
    paymentCollected: true,
    orderTime: '12:45 PM',
    eta: '20 mins',
    totalAmount: 380,
    items: [
      { id: 'i1', name: 'malabar Paratha', quantity: 2, unitPrice: 90 },
      { id: 'i2', name: 'wheat Paratha', quantity: 1, unitPrice: 70 },
      { id: 'i3', name: 'puri', quantity: 1, unitPrice: 30 },
    ],
  },
  {
    id: '002',
    business: 'Safi Paratha - Food Bazaar',
    customer: {
      name: 'Fatima Khan',
      phone: '9988776655',
    },
    deliveryAddress: 'Koregaon Park, Pune',
    status: 'Pending',
    remarks: '',
    paymentMethod: 'Cash on Delivery',
    paymentCollected: false,
    orderTime: '1:10 PM',
    eta: '35 mins',
    totalAmount: 290,
    items: [
      { id: 'i1', name: 'Malabar Paratha', quantity: 2, unitPrice: 80 },
      { id: 'i2', name: 'puri', quantity: 1, unitPrice: 50 },
    ],
  },
  {
    id: '003',
    business: 'Za Paratha - D Mart',
    customer: {
      name: 'Rizwan Shaikh',
      phone: '9090909090',
    },
    deliveryAddress: 'Charminar, Hyderabad',
    status: 'Completed',
    remarks: 'Delivered successfully',
    paymentMethod: 'Paytm',
    paymentCollected: true,
    orderTime: '11:25 AM',
    eta: 'Delivered',
    totalAmount: 420,
    items: [
      { id: 'i1', name: 'chapati', quantity: 1, unitPrice: 150 },
      { id: 'i2', name: 'malabar paratha', quantity: 1, unitPrice: 50 },
      { id: 'i3', name: 'chapati', quantity: 2, unitPrice: 60 },
    ],
  },
];

const DeliveryPartnerDashboard = () => {
  const { theme, themeMode, setThemeMode } = useThemeStore();
  const { logout } = useAuthStore();

  const [orders, setOrders] = useState(mockOrders);

  const handleMarkDelivered = (orderId: string) => {
    const updated = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: 'Completed',
            eta: 'Delivered',
            remarks: 'Delivered on time',
            paymentCollected: true,
          }
        : order
    );
    setOrders(updated);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    logout().catch((error) => {
      console.error('Logout error:', error);
    });
    // You can add navigation to login screen or clear user session
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>📦 Delivery Dashboard</Text>

      {orders.map((order) => (
        <View key={order.id}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text
                style={[
                  styles.status,
                  order.status === 'Completed'
                    ? styles.statusCompleted
                    : order.status === 'On the Way'
                    ? styles.statusOngoing
                    : styles.statusPending,
                ]}
              >
                {order.status}
              </Text>
            </View>

            <Text style={styles.business}>🏢 {order.business}</Text>
            <Text style={styles.section}>
              👤 {order.customer.name} - {order.customer.phone}
            </Text>
            <Text style={styles.section}>📍 {order.deliveryAddress}</Text>
            <Text style={styles.section}>
              🕒 Ordered: {order.orderTime} | ETA: {order.eta}
            </Text>
            <Text style={styles.section}>
              💳 Payment: {order.paymentMethod}
            </Text>
            <Text style={styles.section}>
              ✅ Payment Collected: {order.paymentCollected ? 'Yes' : 'No'}
            </Text>

            <Text style={styles.itemsTitle}>🛒 Order Items:</Text>
            {order.items.map((item) => (
              <Text key={item.id} style={styles.item}>
                • {item.name} x{item.quantity} = ₹
                {item.unitPrice * item.quantity}
              </Text>
            ))}

            <Text style={styles.total}>
              💰 Total Amount: ₹{order.totalAmount}
            </Text>
            <Text style={styles.remarks}>
              📝 Remarks: {order.remarks || 'None'}
            </Text>

            {order.status !== 'Completed' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleMarkDelivered(order.id)}
              >
                <Text style={styles.buttonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.error,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            alignItems: 'center',
            width: '100%',
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#101827',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#101827',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderId: {
    fontWeight: '600',
    fontSize: 16,
    color: '#ffffff',
  },
  status: {
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  statusCompleted: {
    color: '#16a34a',
  },
  statusPending: {
    color: '#f97316',
  },
  statusOngoing: {
    color: '#3b82f6',
  },
  business: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  section: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 4,
  },
  itemsTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  item: {
    fontSize: 13,
    color: '#ffffff',
    marginLeft: 10,
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  remarks: {
    fontSize: 13,
    color: '#ffffff',
    marginTop: 6,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#1e40af',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default DeliveryPartnerDashboard;
