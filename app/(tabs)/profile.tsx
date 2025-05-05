import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { userData, orderHistory } from '@/constants/MockData';
import { formatDateTime } from '@/utils/formatUtils';
import { LogOut, ChevronRight, MapPin, CreditCard, User as UserIcon, Moon, Sun, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const { theme, isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };
  
  const defaultAddress = userData.addresses.find(addr => addr.isDefault);
  const defaultPayment = userData.paymentMethods.find(method => method.isDefault);
  
  const menuItems = [
    {
      icon: <UserIcon size={20} color={theme.colors.primary} />,
      title: 'Edit Profile',
      onPress: () => console.log('Edit Profile pressed'),
    },
    {
      icon: <MapPin size={20} color={theme.colors.primary} />,
      title: 'Addresses',
      onPress: () => console.log('Addresses pressed'),
    },
    {
      icon: <CreditCard size={20} color={theme.colors.primary} />,
      title: 'Payment Methods',
      onPress: () => console.log('Payment Methods pressed'),
    },
    {
      icon: isDarkMode ? 
        <Sun size={20} color={theme.colors.primary} /> : 
        <Moon size={20} color={theme.colors.primary} />,
      title: isDarkMode ? 'Light Mode' : 'Dark Mode',
      onPress: toggleTheme,
    },
    {
      icon: <Bell size={20} color={theme.colors.primary} />,
      title: 'Notifications',
      onPress: () => console.log('Notifications pressed'),
    },
    {
      icon: <HelpCircle size={20} color={theme.colors.primary} />,
      title: 'Help & Support',
      onPress: () => console.log('Help & Support pressed'),
    },
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'Poppins-Bold' }]}>
          Profile
        </Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.userInitial, { fontFamily: 'Poppins-SemiBold' }]}>
              {user?.name?.charAt(0) || 'G'}
            </Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
              {user?.name || 'Guest'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
              {user?.email || 'guest@example.com'}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
            Quick Access
          </Text>
          
          <View style={styles.quickAccessContainer}>
            <Card style={styles.quickAccessCard}>
              <Text style={[styles.quickAccessLabel, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                Default Address
              </Text>
              <Text 
                style={[styles.quickAccessValue, { color: theme.colors.text, fontFamily: 'Poppins-Medium' }]}
                numberOfLines={1}
              >
                {defaultAddress ? `${defaultAddress.address}, ${defaultAddress.city}` : 'No address set'}
              </Text>
            </Card>
            
            <Card style={styles.quickAccessCard}>
              <Text style={[styles.quickAccessLabel, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                Payment Method
              </Text>
              <Text 
                style={[styles.quickAccessValue, { color: theme.colors.text, fontFamily: 'Poppins-Medium' }]}
                numberOfLines={1}
              >
                {defaultPayment ? `${defaultPayment.type} •••• ${defaultPayment.lastFour}` : 'No payment method'}
              </Text>
            </Card>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
            Settings
          </Text>
          
          <Card style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index < menuItems.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                  },
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={[styles.menuItemText, { color: theme.colors.text, fontFamily: 'Poppins-Medium' }]}>
                    {item.title}
                  </Text>
                </View>
                <ChevronRight size={20} color={theme.colors.icon} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
            Recent Orders
          </Text>
          
          {orderHistory.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={[styles.orderId, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
                  Order #{order.id}
                </Text>
                <Badge
                  label={order.status}
                  variant={order.status === 'Delivered' ? 'success' : 'primary'}
                  size="sm"
                />
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={[styles.orderDate, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                  {formatDateTime(order.date)}
                </Text>
                <Text style={[styles.orderAmount, { color: theme.colors.text, fontFamily: 'Poppins-SemiBold' }]}>
                  ${order.total.toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <Text 
                    key={item.id} 
                    style={[styles.orderItemText, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}
                    numberOfLines={1}
                  >
                    {item.quantity}x {item.name}
                    {index < order.items.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </View>
            </Card>
          ))}
        </View>
        
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={20} color={theme.colors.primary} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitial: {
    fontSize: 24,
    color: 'white',
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    flex: 1,
    marginRight: 8,
  },
  quickAccessLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  quickAccessValue: {
    fontSize: 14,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
  orderCard: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
  },
  orderAmount: {
    fontSize: 16,
  },
  orderItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  orderItemText: {
    fontSize: 14,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 16,
  },
});