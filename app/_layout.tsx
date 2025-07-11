import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';

import React, { useEffect, useCallback } from 'react';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';

import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const { theme, isDarkMode } = useThemeStore();
  const { rehydrateAuth, isRehydrating } = useAuthStore();

  useEffect(() => {
    rehydrateAuth();
  }, [rehydrateAuth]);

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && !isRehydrating) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isRehydrating]);

  if ((!fontsLoaded && !fontError) || isRehydrating) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="auth" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="business" options={{ gestureEnabled: false }} />
        <Stack.Screen name="delivery" options={{ gestureEnabled: false }} />
        <Stack.Screen name="checkout" options={{ gestureEnabled: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}
