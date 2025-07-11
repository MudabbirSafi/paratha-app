import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import { currentBusiness, businessAnalytics, businessOrders, businessPromotions } from '@/constants/mockData';
import BusinessProductsPage from './BusinessProducts';

const BusinessDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <BusinessProductsPage />
      {/* Business Header
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {currentBusiness.name}</Text>
                <Text style={styles.businessType}>{currentBusiness.businessType}</Text>
            </View>

            {/* Quick Stats */}
      {/* <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>₹{businessAnalytics.totalSales.toFixed(2)}</Text>
                    <Text style={styles.statLabel}>Total Sales</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{businessAnalytics.customerGrowth}%</Text>
                    <Text style={styles.statLabel}>Customer Growth</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{businessOrders.length}</Text>
                    <Text style={styles.statLabel}>Recent Orders</Text>
                </View>
            </View> */}

      {/* Recent Orders */}
      {/* <Text style={styles.sectionTitle}>Recent Orders</Text>
            {businessOrders.slice(0, 3).map(order => (
                <View key={order.id} style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Order #{order.id}</Text>
                        <Text style={[styles.orderStatus,
                        order.status === 'Completed' ? styles.statusCompleted : styles.statusProcessing]}>
                            {order.status}
                        </Text>
                    </View>
                    <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
                    <Text style={styles.orderTotal}>₹{order.total.toFixed(2)}</Text>
                    <Text style={styles.orderCustomer}>{order.customer.name}</Text>
                </View>
            ))} */}

      {/* Active Promotions */}
      {/* <Text style={styles.sectionTitle}>Active Promotions</Text>
            {businessPromotions.filter(promo => promo.isActive).map(promo => (
                <View key={promo.id} style={styles.promoCard}>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                    <Text style={styles.promoDesc}>{promo.description}</Text>
                    <Text style={styles.promoPeriod}>
                        {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                    </Text>
                    <TouchableOpacity style={styles.promoButton}>
                        <Text style={styles.promoButtonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            ))} */}

      {/* Quick Actions
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Add New Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Create Promotion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>View Inventory</Text>
                </TouchableOpacity>
            </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101827',
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  businessType: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 24,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontWeight: 'bold',
  },
  statusCompleted: {
    color: '#10B981',
  },
  statusProcessing: {
    color: '#F59E0B',
  },
  orderDate: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  orderCustomer: {
    color: '#666',
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  promoDesc: {
    color: '#666',
    marginBottom: 4,
  },
  promoPeriod: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: '#FF3A3A',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BusinessDashboard;
