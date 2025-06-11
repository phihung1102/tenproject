import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';
import { Product, productDetail, fetchRelatedProducts } from './database2';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      const productData = await productDetail(id);
      setProduct(productData);
      
      if (productData && productData.categoryId) {
        const related = await fetchRelatedProducts(productData.categoryId, id);
        setRelatedProducts(related);
      }
    }
    load();
  }, [id]);

  if (!product) {
    return <Text style={styles.loading}>Đang tải chi tiết...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: product.img }} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.categoryName}</Text>
        <Text style={styles.price}>{product.price}$</Text>
      </View>

      {/* Phần sản phẩm cùng loại */}
      {relatedProducts.length > 0 && (
        <View style={styles.relatedContainer}>
          <Text style={styles.relatedTitle}>Sản phẩm cùng loại</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relatedProducts.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.relatedCard}
                onPress={() => navigation.replace('ProductDetail', { id: item.id })}
              >
                <Image 
                  source={{ uri: item.img }} 
                  style={styles.relatedImage} 
                  resizeMode="cover"
                />
                <Text style={styles.relatedName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.relatedPrice}>{item.price}$</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  loading: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
    color: '#495057',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#e9ecef',
    resizeMode: 'cover',
  },
  info: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#343a40',
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#d62828',
    textAlign: 'center',
  },
  relatedContainer: {
    width: '100%',
    marginTop: 10,
    paddingBottom: 20,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
    color: '#343a40',
    paddingHorizontal: 10,
  },
  relatedCard: {
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  relatedImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f1f3f5',
  },
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#343a40',
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d62828',
  },
});
