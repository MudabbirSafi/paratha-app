import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';

export default function OnboardingLayout() {
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
      <Stack.Screen name="index" options={{ gestureEnabled: false }} />
    </Stack>
  );
}