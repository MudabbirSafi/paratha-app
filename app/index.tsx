import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getUserType } from '@/utils/api';

export default function Index() {
  const { isAuthenticated, userType } = useAuthStore();

  useEffect(() => {
    const handleInitialNavigation = async () => {
      if (isAuthenticated) {
        // User is logged in, navigate based on user type
        const userRole = await getUserType();
        if (userRole === 'admin') {
          router.replace('/admin/users-list');
        } else if (userRole === 'delivery') {
          router.replace('/delivery/DeliveryPartnerDashboard');
        } else if (userRole === 'business') {
          router.replace('/business/BusinessDashboard');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        // User is not logged in, go to onboarding
        router.replace('/onboarding');
      }
    };

    handleInitialNavigation();
  }, [isAuthenticated, userType]);

  // Return null while determining navigation
  return null;
}
