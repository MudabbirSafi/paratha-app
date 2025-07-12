import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Fast Food Delivered Fast',
    description:
      'Order delicious fast food with just a few taps and have it delivered to your door in minutes.',
    image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
  },
  {
    id: '2',
    title: 'Find Your Favorites',
    description:
      "Discover our wide selection of burgers, pizzas, and more. There's something for everyone!",
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
  },
  {
    id: '3',
    title: 'Easy Ordering & Payment',
    description:
      'Simple checkout process and multiple payment options make ordering a breeze.',
    image: 'https://images.pexels.com/photos/6697274/pexels-photo-6697274.jpeg',
  },
];

export default function OnboardingScreen() {
  const { theme } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to auth screen when finished
      router.replace('/auth/login');
    }
  };

  const handleSkip = () => {
    router.replace('/auth/login');
  };

  const renderItem = ({ item }: { item: (typeof onboardingData)[0] }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.secondary }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: theme.colors.primary }]}>
          Skip
        </Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => {
            const animatedDotStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * Dimensions.get('window').width,
                index * Dimensions.get('window').width,
                (index + 1) * Dimensions.get('window').width,
              ];

              const width = interpolate(
                scrollX.value,
                inputRange,
                [8, 20, 8],
                'clamp'
              );

              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.5, 1, 0.5],
                'clamp'
              );

              return {
                width,
                opacity,
                backgroundColor: theme.colors.primary,
              };
            });

            return (
              <Animated.View
                key={index.toString()}
                style={[styles.dot, animatedDotStyle]}
              />
            );
          })}
        </View>

        <Button
          title={
            currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'
          }
          onPress={handleNext}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    borderRadius: 12,
  },
});
