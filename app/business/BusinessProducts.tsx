import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import { businessProducts } from '@/constants/mockData';

const { width } = Dimensions.get('window');

const BusinessProductsPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>📦 Business Catalog</Text>

      {/* businessProducts.map(product => (
                <View key={product.id} style={styles.card}>
                    <Image source={{ uri: product.image }} style={styles.image} />

                    <View style={styles.details}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productDesc}>{product.description}</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.priceRetail}>Retail ₹{product.retailPrice}</Text>
                            <Text style={styles.priceWholesale}>Wholesale ₹{product.wholesalePrice}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.stock}>Stock: {product.stock}</Text>
                            <Text style={styles.rating}>⭐ {product.rating}</Text>
                        </View>

                        <Text style={styles.sectionLabel}>Ingredients:</Text>
                        <View style={styles.chipContainer}>
                            {product.ingredients.map((item, i) => (
                                <View key={i} style={styles.chip}>
                                    <Text style={styles.chipText}>{item}</Text>
                                </View>
                            ))}
                        </View>

                        <Text style={styles.sectionLabel}>Nutrition (per serving):</Text>
                        <View style={styles.nutritionRow}>
                            <Text style={styles.nutrition}>🔥 {product.nutritionInfo.calories} kcal</Text>
                            <Text style={styles.nutrition}>💪 {product.nutritionInfo.protein}g protein</Text>
                            <Text style={styles.nutrition}>🍞 {product.nutritionInfo.carbs}g carbs</Text>
                            <Text style={styles.nutrition}>🥑 {product.nutritionInfo.fat}g fat</Text>
                        </View>

                        <TouchableOpacity style={styles.orderButton} activeOpacity={0.7}>
                            <Text style={styles.orderButtonText}>🚚 Order Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )) */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
    padding: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#ffff',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: width * 0.5,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffff',
  },
  productDesc: {
    fontSize: 14,
    color: '#ffff',
    marginVertical: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  priceRetail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffff',
  },
  priceWholesale: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  stock: {
    fontSize: 13,
    color: '#dc2626',
  },
  rating: {
    fontSize: 13,
    color: '#f59e0b',
  },
  sectionLabel: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 6,
    color: '#ffffff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#e2e8f0',
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: '#334155',
  },
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 10,
  },
  nutrition: {
    fontSize: 13,
    backgroundColor: '#fef9c3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    color: '#92400e',
  },
  orderButton: {
    marginTop: 14,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BusinessProductsPage;
