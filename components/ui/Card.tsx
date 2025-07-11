import { useThemeStore } from '@/store/themeStore';
import { globalStyles } from '@/utils/styles';

import React from 'react';

import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
}) => {
  const { theme } = useThemeStore();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        ...globalStyles.shadows.sm,
      },
      elevated: {
        ...globalStyles.shadows.lg,
      },
      outlined: {
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
    };

    // Padding styles
    const paddingStyles: Record<string, ViewStyle> = {
      none: {},
      small: {
        padding: theme.spacing.sm,
      },
      medium: {
        padding: theme.spacing.md,
      },
      large: {
        padding: theme.spacing.lg,
      },
    };

    const flattenedStyle = StyleSheet.flatten(style);

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...paddingStyles[padding],
      ...flattenedStyle,
    };
  };

  return <View style={getCardStyle()}>{children}</View>;
};
