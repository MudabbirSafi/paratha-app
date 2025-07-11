import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';

export default function AuthLayout() {
  const { theme } = useThemeStore();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="business-register" />
      <Stack.Screen name="delivery-register" />
      <Stack.Screen name="delivery-partner" />
    </Stack>
  );
}