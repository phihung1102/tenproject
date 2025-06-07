import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { Category, fetchCategories, fetchProductsByCategory, Product } from './database'
import { RouteProp, useRoute } from '@react-navigation/native'
import CategorySelect from './CategorySelect'

type CategoryListRouteParams = {
    categoryId: number;
};

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectCategoryId, setSelectCategoryId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const route = useRoute<RouteProp<{ params: CategoryListRouteParams }, 'params'>>();
    const initialCategoryId = route.params?.categoryId ?? null;

    useEffect(() => {
        const loadCategories = async () => {
          const data = await fetchCategories();
          setCategories(data);
          if(initialCategoryId !== null){
              const filteredProducts = await fetchProductsByCategory(initialCategoryId);
              setProducts(filteredProducts);
          }
        };
        loadCategories();
    }, []);

    const handleCategoryPress = async (categoryId: number) => {
        setSelectCategoryId(categoryId);
        const filteredProducts = await fetchProductsByCategory(categoryId);
        setProducts(filteredProducts);
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerCate}>
            <CategorySelect
                categories={categories}
                selectedCategoryId={selectCategoryId}
                onSelect={handleCategoryPress}
            />
        </View>

        <View style={styles.productList}>
            {products.map((item) => (
                <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.img }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>💵 {item.price}$</Text>
                </View>
            ))}
        </View>


    </ScrollView>
  )
}

export default CategoryList

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginRight: 8,
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    categoryText: {
        color: '#333',
        fontWeight: '600',
    },
    productList: {
        paddingTop: 20,
    },
    productCard: {
        backgroundColor: '#f5f5f5',
        marginBottom: 12,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        color: '#2e8b57',
    },
    containerCate: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})