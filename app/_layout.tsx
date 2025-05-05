import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';

export default function RootLayout() {
  useFrameworkReady();

  const { theme, isDarkMode } = useThemeStore();
  const { isAuthenticated, userType } = useAuthStore();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="auth" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(customer)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="business" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(delivery)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(admin)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </>
  );
}