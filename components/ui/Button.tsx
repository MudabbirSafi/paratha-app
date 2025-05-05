import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const { theme } = useThemeStore();
  
  const buttonStyles = [
    styles.button,
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    // Variant-specific styles
    variant === 'primary' && { backgroundColor: theme.colors.primary },
    variant === 'secondary' && { backgroundColor: theme.colors.secondary },
    variant === 'outline' && { 
      backgroundColor: 'transparent', 
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    variant === 'ghost' && { 
      backgroundColor: 'transparent',
    },
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    // Variant-specific text styles
    variant === 'primary' && { color: 'white' },
    variant === 'secondary' && { color: 'black' },
    variant === 'outline' && { color: theme.colors.primary },
    variant === 'ghost' && { color: theme.colors.primary },
    disabled && { color: theme.colors.secondaryText },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : theme.colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
  },
  smButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  mdButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 44,
  },
  lgButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});