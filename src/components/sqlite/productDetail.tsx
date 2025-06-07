import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigatorProduct';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CategorySelect from './CategorySelect';
import { fetchCategories, Category } from './database';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp  = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

const ProductDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { product } = route.params;
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(product.categoryId);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    load();
  }, []);

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
    navigation.navigate('Category', { categoryId: id });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.img }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>💵 Giá: {product.price}$</Text>
      <Text style={styles.category}>📦 Loại: {product.categoryName}</Text>
      <Text style={styles.text}>Xem thêm các loại sản phẩm:</Text>
      <CategorySelect
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={handleSelectCategory}
      />
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
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    margin: 5,
  },
});

