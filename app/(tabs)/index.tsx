import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import {
  mockProducts,
  mockCategories,
  mockPromotions,
} from '@/constants/MockData';
import { ProductCard } from '@/components/ui/ProductCard';
import { PromotionCard } from '@/components/ui/PromotionCard';
import { CategoryButton } from '@/components/ui/CategoryButton';
import { Input } from '@/components/ui/Input';
import { Search, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const bestsellerProducts = mockProducts.filter(
    (product) => product.isBestseller
  );

  const filteredProducts = selectedCategory
    ? mockProducts.filter((product) => product.categoryId === selectedCategory)
    : mockProducts;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handlePromotionPress = (promoId: string) => {
    router.push(`Promotion pressed: ${promoId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <View>
          <Image
            source={{
              uri: 'https://goodhealthy.co.in/wp-content/uploads/2023/01/Good-Healthy-Logo-2-768x768.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* <Text style={[styles.name, { color: theme.colors.text, fontFamily: 'Poppins-Bold' }]}>
            {user?.name || 'Guest'}
          </Text> */}
        </View>
        <Bell size={24} color={theme.colors.text} />
      </View>

      <View style={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for Parathas..."
          leftIcon={<Search size={20} color={theme.colors.icon} />}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Promotions */}
        <View style={styles.sectionContainer}>
          <FlatList
            data={mockPromotions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PromotionCard
                title={item.title}
                description={item.description}
                image={item.image}
                color={item.color}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
            snapToInterval={width - 16}
            decelerationRate="fast"
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, fontWeight: '600' },
            ]}
          >
            Categories
          </Text>
          <FlatList
            data={mockCategories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryButton
                name={item.name}
                image={item.image}
                isSelected={selectedCategory === item.id}
                onPress={() => handleCategoryPress(item.id)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Bestsellers */}
        {!selectedCategory && (
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text, fontWeight: '600' },
              ]}
            >
              Bestsellers
            </Text>
            <FlatList
              data={bestsellerProducts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  isBestseller={item.isBestseller}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
            />
          </View>
        )}

        {/* All Foods or Filtered by Category */}
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, fontWeight: '600' },
            ]}
          >
            {selectedCategory
              ? mockCategories.find((c) => c.id === selectedCategory)?.name ||
                'Products'
              : 'All Parathas'}
          </Text>
          <View style={styles.gridContainer}>
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                rating={item.rating}
                isBestseller={item.isBestseller}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    paddingBottom: 24,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  promotionsContainer: {
    paddingLeft: 16,
  },
  categoriesContainer: {
    paddingLeft: 16,
  },
  productsContainer: {
    paddingLeft: 16,
    gap: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
});
