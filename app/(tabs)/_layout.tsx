import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useCartStore } from '@/store/cartStore';
import { Chrome as Home, Search, ShoppingBag, User } from 'lucide-react-native';

export default function TabLayout() {
  const { theme } = useThemeStore();
  const { getItemCount } = useCartStore();

  // Customize tab bar styles
  const tabBarStyle = {
    backgroundColor: theme.colors.background,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
  };

  const renderTabBarIcon = (
    iconName: React.ComponentType<any>,
    color: string,
    size: number
  ) => {
    const Icon = iconName;
    return <Icon size={size} color={color} />;
  };

  const cartItemCount = getItemCount();

  const renderCartIcon = (color: string) => (
    <View style={styles.cartIconContainer}>
      {renderTabBarIcon(ShoppingBag, color, 24)}
      {cartItemCount > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.badgeText}>
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: tabBarStyle,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => renderTabBarIcon(Home, color, 24),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => renderTabBarIcon(Search, color, 24),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => renderCartIcon(color),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => renderTabBarIcon(User, color, 24),
        }}
      />

      {/* Hide product details from tab bar */}
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
