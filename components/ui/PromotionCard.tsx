import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Card } from './Card';
import { Button } from './Button';

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  image,
  color,
  onPress,
}) => {
  const { theme } = useThemeStore();
  
  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: color, width: width - 32 }
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button 
            title="Order Now" 
            onPress={onPress}
            variant="primary"
            size="sm"
            style={styles.button}
          />
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginRight: 16,
  },
  content: {
    flexDirection: 'row',
    height: 160,
  },
  textContainer: {
    flex: 3,
    padding: 16,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
    opacity: 0.9,
  },
  button: {
    alignSelf: 'flex-start',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});