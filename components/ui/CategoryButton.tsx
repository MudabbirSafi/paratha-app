import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';

interface CategoryButtonProps {
  name: string;
  image: ImageSourcePropType;
  isSelected?: boolean;
  onPress: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  name,
  image,
  isSelected = false,
  onPress,
}) => {
  const { theme } = useThemeStore();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? theme.colors.primary
            : theme.isDarkMode
              ? theme.colors.card
              : theme.colors.neutral?.[100] || theme.colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <Text
        style={[
          styles.text,
          { color: isSelected ? 'white' : theme.colors.text },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    minWidth: 80,
  },
  imageContainer: {
    marginBottom: 4,
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
