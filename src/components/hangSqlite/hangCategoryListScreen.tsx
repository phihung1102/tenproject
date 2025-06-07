import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import {
  fetchCategories,
  fetchProductsByCategory,
  Product,
  Category,
} from './hangDatabase';
import { RootStackParamList } from './hangAppNavigatorProduct';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'CategoryList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryList'>;

const CategoryListScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(route.params.categoryId);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories();
      setCategories(data);
      const productData = await fetchProductsByCategory(selectedCategoryId);
      setProducts(productData);
    };
    load();
  }, [selectedCategoryId]);

  const handleCategoryPress = async (id: number) => {
    setSelectedCategoryId(id);
    const productData = await fetchProductsByCategory(id);
    setProducts(productData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Danh sách loại sản phẩm</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ 
            paddingBottom: 4,
            paddingTop: 4,
            display: 'flex',
            flexDirection: 'row',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item.id)}
            style={[
              styles.categoryButton,
              item.id === selectedCategoryId && styles.selectedCategory,
            ]}
          >
            <Text style={[
              styles.categoryText,
              item.id === selectedCategoryId && styles.selectedCategoryText
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { product: item })}
            style={styles.productCard}
          >
            <Image
              source={{ uri: item.img }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>💵 {item.price} VND</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 0,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#FF66B2',
  },
  categoryText: {
    color: '#000',
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});
