import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { globalStyles } from '@/utils/styles';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  error,
  leftIcon,
  rightIcon,
  style,
  inputStyle,
  onFocus,
  onBlur,
}) => {
  const { theme } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: theme.spacing.md,
    };

    return {
      ...baseStyle,
      ...style,
    };
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: multiline ? 'flex-start' : 'center',
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.card,
      minHeight: multiline ? 80 : 48,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: multiline ? theme.spacing.sm : 0,
    };

    // Get global input configuration
    const inputConfig = globalStyles.components.inputConfig;

    // Border color based on state and global config
    let borderColor = 'transparent';
    if (error && inputConfig.showErrorBorder) {
      borderColor = theme.colors.error;
    }

    // Disabled state
    const disabledStyle: ViewStyle = disabled
      ? {
          backgroundColor: theme.colors.surface,
          opacity: 0.6,
        }
      : {};

    return {
      ...baseStyle,
      borderColor,
      ...disabledStyle,
    };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      ...globalStyles.typography.body1,
      color: theme.colors.text,
      textAlignVertical: multiline ? 'top' : 'center',
    };

    // Disabled text style
    const disabledTextStyle: TextStyle = disabled
      ? {
          color: theme.colors.textSecondary,
        }
      : {};

    // Web-specific style to remove default outline
    const webStyle = Platform.OS === 'web' ? { outline: 'transparent' } : {};

    return {
      ...baseStyle,
      ...disabledTextStyle,
      ...inputStyle,
      ...(webStyle as any),
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      ...globalStyles.typography.label,
      color: error ? theme.colors.error : theme.colors.text,
      marginBottom: theme.spacing.xs,
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      ...globalStyles.typography.caption,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    };
  };

  const getIconStyle = (): ViewStyle => {
    return {
      marginHorizontal: theme.spacing.sm,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}

      <View style={getInputContainerStyle()}>
        {leftIcon && <View style={getIconStyle()}>{leftIcon}</View>}

        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={getIconStyle()}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.colors.iconSecondary} />
            ) : (
              <Eye size={20} color={theme.colors.iconSecondary} />
            )}
          </TouchableOpacity>
        )}

        {rightIcon && !secureTextEntry && (
          <View style={getIconStyle()}>{rightIcon}</View>
        )}
      </View>

      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};
