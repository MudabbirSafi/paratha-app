import { Colors } from './Colors';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
};

export const FontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: Colors.primary[600],
    secondary: Colors.secondary[500],
    background: Colors.white,
    card: Colors.white,
    text: Colors.neutral[900],
    secondaryText: Colors.neutral[600],
    border: Colors.neutral[200],
    notification: Colors.primary[500],
    success: Colors.success[500],
    warning: Colors.warning[500],
    error: Colors.error[500],
    icon: Colors.neutral[500],
    shadow: 'rgba(0, 0, 0, 0.1)',
    black: Colors.black,
  },
  spacing: Spacing,
  borderRadius: BorderRadius,
  fontSize: FontSize,
  fontWeight: FontWeight,
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: Colors.primary[500],
    secondary: Colors.secondary[400],
    background: Colors.warning,
    card: Colors.neutral[800],
    text: Colors.white,
    secondaryText: Colors.neutral[300],
    border: Colors.neutral[700],
    notification: Colors.primary[400],
    success: Colors.success[500],
    warning: Colors.warning[500],
    error: Colors.error[500],
    icon: Colors.neutral[400],
    shadow: 'rgba(0, 0, 0, 0.3)',
    black: Colors.black,
  },
  spacing: Spacing,
  borderRadius: BorderRadius,
  fontSize: FontSize,
  fontWeight: FontWeight,
};