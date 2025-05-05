import { create } from 'zustand';
import { Appearance, ColorSchemeName } from 'react-native';
import { LightTheme, DarkTheme } from '@/constants/Theme';

interface ThemeStore {
  theme: typeof LightTheme | typeof DarkTheme;
  colorScheme: ColorSchemeName;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorSchemeName) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  // Get initial color scheme from device
  const initialColorScheme = Appearance.getColorScheme();
  
  return {
    theme: initialColorScheme === 'dark' ? DarkTheme : LightTheme,
    colorScheme: initialColorScheme,
    isDarkMode: initialColorScheme === 'dark',
    
    toggleTheme: () => {
      set((state) => {
        const newIsDarkMode = !state.isDarkMode;
        return {
          theme: newIsDarkMode ? DarkTheme : LightTheme,
          isDarkMode: newIsDarkMode,
          colorScheme: newIsDarkMode ? 'dark' : 'light',
        };
      });
    },
    
    setColorScheme: (scheme) => {
      set({
        theme: scheme === 'dark' ? DarkTheme : LightTheme,
        colorScheme: scheme,
        isDarkMode: scheme === 'dark',
      });
    },
  };
});

// Subscribe to appearance changes
Appearance.addChangeListener(({ colorScheme }) => {
  useThemeStore.getState().setColorScheme(colorScheme);
});