import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getUserType } from '@/utils/api';
import { View, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/store/themeStore';

export default function Index() {
  const { isAuthenticated, userType, isRehydrating } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const handleInitialNavigation = async () => {
      try {
        // Add a small delay to ensure the layout is mounted
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (isAuthenticated) {
          // User is logged in, navigate based on user type
          const userRole = await getUserType();
          if (userRole === 'admin') {
            router.replace('/admin/users-list');
          } else if (userRole === 'delivery') {
            router.replace('/delivery/DeliveryPartnerDashboard');
          } else if (userRole === 'business') {
            router.replace('/(tabs)');
          } else {
            router.replace('/(tabs)');
          }
        } else {
          // User is not logged in, go to onboarding
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to onboarding if there's an error
        router.replace('/onboarding');
      }
    };

    // Only navigate when not rehydrating
    if (!isRehydrating) {
      handleInitialNavigation();
    }
  }, [isAuthenticated, userType, isRehydrating]);

  // Show loading indicator while determining navigation
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
