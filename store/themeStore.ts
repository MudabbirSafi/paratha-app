import { LightTheme, DarkTheme } from '@/constants/Theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Appearance, ColorSchemeName } from 'react-native';

// Global Brand Colors
export const BRAND_COLORS = {
  primary: '#FF6B35', // Orange - Main brand color
  primaryLight: '#FF8A65',
  primaryDark: '#E55A2B',
  secondary: '#2E7D32', // Green - Secondary brand color
  secondaryLight: '#4CAF50',
  secondaryDark: '#1B5E20',
  accent: '#FFC107', // Yellow - Accent color
  accentLight: '#FFD54F',
  accentDark: '#FF8F00',
  dark: '#101827', // Dark blue-gray color
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
    thin: 'Poppins-Thin',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

// Border Radius Scale
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// Shadow Scale
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

interface ThemeColors {
  // Brand Colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  dark: string;

  // Semantic Colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // UI Colors
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  icon: string;
  iconSecondary: string;
  divider: string;
  overlay: string;
}

interface Theme {
  colors: ThemeColors;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
  isDarkMode: boolean;
}

interface ThemeStore {
  theme: Theme;
  colorScheme: ColorSchemeName;
  isDarkMode: boolean;
  themeMode: 'system' | 'light' | 'dark'; // User preference
  setThemeMode: (mode: 'system' | 'light' | 'dark') => void;
  // Deprecated, use setThemeMode instead
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  // Internal use
  _updateFromSystem: (scheme: ColorSchemeName) => void;
}

const createTheme = (isDarkMode: boolean): Theme => {
  const colors: ThemeColors = isDarkMode
    ? {
      // Dark Theme Colors
      primary: BRAND_COLORS.primary,
      primaryLight: BRAND_COLORS.primaryLight,
      primaryDark: BRAND_COLORS.primaryDark,
      secondary: BRAND_COLORS.secondary,
      secondaryLight: BRAND_COLORS.secondaryLight,
      secondaryDark: BRAND_COLORS.secondaryDark,
      accent: BRAND_COLORS.accent,
      accentLight: BRAND_COLORS.accentLight,
      accentDark: BRAND_COLORS.accentDark,
      dark: BRAND_COLORS.dark,
      success: BRAND_COLORS.success,
      warning: BRAND_COLORS.warning,
      error: BRAND_COLORS.error,
      info: BRAND_COLORS.info,
      background: BRAND_COLORS.dark,
      surface: '#1E1E1E',
      card: '#2D2D2D',
      border: '#404040',
      text: '#FFFFFF',
      textSecondary: '#B3B3B3',
      textTertiary: '#808080',
      icon: '#FFFFFF',
      iconSecondary: '#B3B3B3',
      divider: '#404040',
      overlay: 'rgba(0, 0, 0, 0.5)',
    }
    : {
      // Light Theme Colors
      primary: BRAND_COLORS.primary,
      primaryLight: BRAND_COLORS.primaryLight,
      primaryDark: BRAND_COLORS.primaryDark,
      secondary: BRAND_COLORS.secondary,
      secondaryLight: BRAND_COLORS.secondaryLight,
      secondaryDark: BRAND_COLORS.secondaryDark,
      accent: BRAND_COLORS.accent,
      accentLight: BRAND_COLORS.accentLight,
      accentDark: BRAND_COLORS.accentDark,
      dark: BRAND_COLORS.dark,
      success: BRAND_COLORS.success,
      warning: BRAND_COLORS.warning,
      error: BRAND_COLORS.error,
      info: BRAND_COLORS.info,
      background: '#FAFAFA',
      surface: '#FAFAFA',
      card: '#FFFFFF',
      border: '#E1E5E9',
      text: '#1A1A1A',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      icon: '#374151',
      iconSecondary: '#6B7280',
      divider: '#E5E7EB',
      overlay: 'rgba(0, 0, 0, 0.3)',
    };

  return {
    colors,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
    isDarkMode,
  };
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themeMode: 'dark',
      isDarkMode: true,
      theme: createTheme(true),
      colorScheme: 'dark',

      setThemeMode: (mode) => {
        const systemScheme = Appearance.getColorScheme();
        const isDark =
          mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
        set({
          themeMode: mode,
          isDarkMode: isDark,
          theme: createTheme(isDark),
          colorScheme: isDark ? 'dark' : 'light',
        });
      },

      _updateFromSystem: (scheme) => {
        if (get().themeMode === 'system') {
          const isDark = scheme === 'dark';
          set({
            isDarkMode: isDark,
            theme: createTheme(isDark),
            colorScheme: scheme,
          });
        }
      },

      // Deprecated methods, kept for compatibility but should be phased out
      toggleTheme: () => {
        const currentIsDark = get().isDarkMode;
        get().setThemeMode(currentIsDark ? 'light' : 'dark');
      },
      setTheme: (isDark) => {
        get().setThemeMode(isDark ? 'dark' : 'light');
      },
      setColorScheme: (scheme: ColorSchemeName) => {
        // This is now handled by _updateFromSystem
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Subscribe to system appearance changes
Appearance.addChangeListener(({ colorScheme }) => {
  useThemeStore.getState()._updateFromSystem(colorScheme);
});