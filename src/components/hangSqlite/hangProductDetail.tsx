import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './hangAppNavigatorProduct';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category, fetchCategories } from './hangDatabase';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

const ProductDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { product } = route.params;
  const navigation = useNavigation<DetailScreenNavigationProp>();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.img }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>💵 Giá: {product.price}$</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CategoryList', { categoryId: product.categoryId })}>
        <Text style={styles.category}>📦 Loại: {product.categoryName}</Text>
      </TouchableOpacity>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>📂 Các loại sản phẩm khác:</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('CategoryList', { categoryId: item.id })}
            >
              <Text style={styles.categoryButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e8b57',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  categoriesContainer: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryList: {
    paddingBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
});