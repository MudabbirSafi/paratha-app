import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';

export default function CheckoutLayout() {
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
      <Stack.Screen name="index" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="success" />
    </Stack>
  );
}