import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { businessCategories, businessProducts } from '@/constants/mockdata';

const BusinessProducts = () => {
    return (
        <View style={styles.container}>
            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
                horizontal
                data={businessCategories}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryCard}>
                        <Image source={item.image} style={styles.categoryImage} />
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.categoriesContainer}
                showsHorizontalScrollIndicator={false}
            />

            {/* All Products */}
            <Text style={styles.sectionTitle}>All Products</Text>
            <FlatList
                data={businessProducts}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.wholesalePrice}>₹{item.wholesalePrice.toFixed(2)}</Text>
                                <Text style={styles.retailPrice}>₹{item.retailPrice.toFixed(2)}</Text>
                            </View>
                            <Text style={styles.stockText}>Stock: {item.stock}</Text>
                            <Text style={styles.minOrderText}>Min Order: {item.minOrderQuantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.productsContainer}
            />

            {/* Add Product Button */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add New Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        marginTop: 8,
    },
    categoriesContainer: {
        paddingBottom: 8,
    },
    categoryCard: {
        width: 100,
        marginRight: 12,
        alignItems: 'center',
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: 12,
        color: '#333',
    },
    productsContainer: {
        paddingBottom: 80,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    wholesalePrice: {
        fontWeight: 'bold',
        color: '#FF3A3A',
        marginRight: 8,
    },
    retailPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
        fontSize: 12,
    },
    stockText: {
        color: '#666',
        fontSize: 12,
    },
    minOrderText: {
        color: '#666',
        fontSize: 12,
    },
    editButton: {
        backgroundColor: '#4F46E5',
        padding: 8,
        borderRadius: 4,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF3A3A',
        padding: 16,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BusinessProducts;