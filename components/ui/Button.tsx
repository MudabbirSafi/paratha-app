import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { globalStyles } from '@/utils/styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const { theme } = useThemeStore();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      ...globalStyles.shadows.sm,
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        minHeight: 36,
      },
      medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        minHeight: 44,
      },
      large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: theme.colors.primary,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      destructive: {
        backgroundColor: theme.colors.error,
        borderWidth: 0,
      },
    };

    // Width style
    const widthStyle: ViewStyle = fullWidth ? { width: '100%' } : {};

    // Disabled style
    const disabledStyle: ViewStyle = disabled
      ? {
          backgroundColor: theme.colors.textTertiary,
          borderColor: theme.colors.textTertiary,
          opacity: 0.6,
        }
      : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...widthStyle,
      ...disabledStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...globalStyles.typography.button,
      textAlign: 'center' as const,
    };

    // Variant text colors
    const variantTextColors: Record<string, TextStyle> = {
      primary: {
        color: 'white',
      },
      secondary: {
        color: 'white',
      },
      outline: {
        color: theme.colors.primary,
      },
      ghost: {
        color: theme.colors.primary,
      },
      destructive: {
        color: 'white',
      },
    };

    // Size text styles
    const sizeTextStyles: Record<string, TextStyle> = {
      small: {
        ...globalStyles.typography.buttonSmall,
      },
      medium: {
        ...globalStyles.typography.button,
      },
      large: {
        ...globalStyles.typography.h6,
      },
    };

    // Disabled text style
    const disabledTextStyle: TextStyle = disabled
      ? {
          color: theme.colors.textSecondary,
        }
      : {};

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextColors[variant],
      ...disabledTextStyle,
      ...textStyle,
    };
  };

  const getIconStyle = (): ViewStyle => {
    const sizeIconSpacing: Record<string, ViewStyle> = {
      small: { marginHorizontal: theme.spacing.xs },
      medium: { marginHorizontal: theme.spacing.sm },
      large: { marginHorizontal: theme.spacing.md },
    };

    return sizeIconSpacing[size];
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' ||
            variant === 'ghost' ||
            variant === 'destructive'
              ? theme.colors.primary
              : 'white'
          }
        />
      ) : (
        <>
          {leftIcon && <View style={getIconStyle()}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <View style={getIconStyle()}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};
