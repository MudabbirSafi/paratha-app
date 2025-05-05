import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useThemeStore } from '@/store/themeStore';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}) => {
  const { theme } = useThemeStore();
  
  const getBackgroundColor = () => {
    switch(variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.primary;
    }
  };
  
  const badgeStyles = [
    styles.badge,
    styles[`${size}Badge`],
    { backgroundColor: getBackgroundColor() },
    style,
  ];
  
  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    textStyle,
  ];
  
  return (
    <View style={badgeStyles}>
      <Text style={textStyles}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  smBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  mdBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
});