import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';
import { mockProducts } from '@/constants/MockData';
import { Input } from '@/components/ui/Input';
import { ProductCard } from '@/components/ui/ProductCard';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { Product } from '@/types';

export default function SearchScreen() {
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(mockProducts);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = mockProducts.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const navigateToProductDetail = (productId: string) => {
    // In a real app, navigate to the product detail screen
    console.log(`Navigate to product: ${productId}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, fontFamily: 'Poppins-Bold' },
          ]}
        >
          Search
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for  Parathas.... "
          leftIcon={<SearchIcon size={20} color={theme.colors.icon} />}
          rightIcon={
            searchQuery ? (
              <X size={20} color={theme.colors.icon} onPress={clearSearch} />
            ) : undefined
          }
        />
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.colors.textSecondary,
                fontFamily: 'Poppins-Medium',
              },
            ]}
          >
            No results found for "{searchQuery}"
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              {
                color: theme.colors.textSecondary,
                fontFamily: 'Poppins-Regular',
              },
            ]}
          >
            Try different keywords or check for typos
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCardContainer}>
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                businessPrice={item.businessPrice}
                image={item.image}
                rating={item.rating}
                isBestseller={item.isBestseller}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCardContainer: {
    marginBottom: 16,
  },
});
