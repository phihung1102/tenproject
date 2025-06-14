import { StyleSheet, Text, TextInput, View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addProduct, updateProduct, deleteProduct, fetchCategories, Category, fetchProducts, Product } from './hDatabase2';
import { Picker } from '@react-native-picker/picker';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

const ProductMNG = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imgUri, setImgUri] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingID, setEditingID] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories().then(setCategories);
      await fetchProducts().then(products => {
        // Sắp xếp sản phẩm theo id giảm dần (mới nhất lên đầu)
        const sortedProducts = [...products].sort((a, b) => b.id - a.id);
        setProducts(sortedProducts);
      });
    };
    loadData();
  }, []);

  const handleAddProduct = async () => {
    if(name.trim() === '') return Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm!');
    if(price.trim() === '') return Alert.alert('Lỗi', 'Vui lòng nhập giá sản phẩm!');
    const parsedPrice = parseFloat(price);
    if(isNaN(parsedPrice) || parsedPrice <= 0) return Alert.alert('Lỗi', 'Giá sản phẩm phải là số dương!'); 
    if(!imgUri) return Alert.alert('Lỗi', 'Vui lòng chọn ảnh cho sản phẩm!');
    if(!categoryId) return Alert.alert('Lỗi', 'Vui lòng chọn loại sản phẩm!');

    if(editingID !== null){
      await updateProduct({
          id: editingID,
          name,
          price: parsedPrice,
          img: imgUri,
          categoryId: categoryId,
      });
      setEditingID(null);
    } else {
      await addProduct({
          name,
          price: parsedPrice,
          img: imgUri,
          categoryId: categoryId,
      });
    }
    
    // Cập nhật và sắp xếp lại danh sách
    const updated = await fetchProducts();
    setProducts([...updated].sort((a, b) => b.id - a.id));
    
    // Reset form
    setName('');
    setPrice('');
    setImgUri('');
    setCategoryId(null);
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price.toString());
    setImgUri(product.img);
    setEditingID(product.id);
    setCategoryId(product.categoryId);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn chắc chắn muốn xóa sản phẩm này?',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Đồng ý',
          onPress: async () => {
            await deleteProduct(id);
            const updated = await fetchProducts();
            setProducts([...updated].sort((a, b) => b.id - a.id));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }

  const handleSelectedImg = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1 },
      (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorCode || !response.assets?.[0]?.uri){
          Alert.alert('Lỗi', 'Không thể chọn ảnh');
        } else {
          setImgUri(response.assets[0].uri);
        }
      }
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Quản lý sản phẩm</Text>

      <TextInput
        value={name}
        onChangeText={(t)=>setName(t)}
        placeholder='Nhập tên sản phẩm'
        style={styles.textInput}
      />

      <TextInput
        value={price}
        onChangeText={(t)=>setPrice(t)}
        placeholder='Nhập giá sản phẩm'
        keyboardType='numeric'
        style={styles.textInput}
      />

      <View style={styles.pickerCtn}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(i)=>setCategoryId(i)}
          style={styles.picker}
        >
          <Picker.Item label='Chọn loại sản phẩm' value={undefined}/>
          {categories.map((cate) => (
            <Picker.Item key={cate.id} label={cate.name} value={cate.id}/>
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSelectedImg}>
        <Text style={styles.buttonText}>Chọn hình ảnh</Text>
      </TouchableOpacity>
      {imgUri && (
        <Image source={{ uri: imgUri }} style={{ width: 100, height: 100, marginVertical: 10 }} />
      )}
      

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>
            {editingID ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </Text>
      </TouchableOpacity>
      {editingID !== null && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => {
            setEditingID(null);
            setName('');
            setPrice('');
            setImgUri('')
            setCategoryId(null);
          }}
        >
          <Text style={styles.buttonText}>Hủy chỉnh sửa</Text>
        </TouchableOpacity>
      )}

      <View style={styles.products}>
        {products.map((pro) => (
          <View key={pro.id} style={styles.proCard}>
            <Image style={styles.image} source={{ uri: pro.img }} />
            <View style={styles.info}>
              <View style={{ flexDirection: 'row', gap: 20, }}>
                <Text style={styles.text}>ID: {pro.id}</Text>
                <Text style={styles.text}>Tên: {pro.name}</Text>
              </View>
              <Text style={styles.text}>Giá: {pro.price}$</Text>
              <Text style={styles.text}>Loại: {pro.categoryName}</Text>
              <View style={styles.icon}>
                  <TouchableOpacity onPress={() => handleDelete(pro.id)}>
                      <Text style={styles.text}>✖️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEdit(pro)}>
                      <Text style={styles.text}>✏️</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </View>
        ))}
      </View>

    </ScrollView>
  );
};

export default ProductMNG;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#FFF9F5',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5A3E2A',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E0C4A0',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFDFB',
    paddingLeft: 16,
    color: '#5A3E2A',
    fontSize: 16,
  },
  pickerCtn: {
    borderWidth: 1.5,
    borderColor: '#E0C4A0',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#FFFDFB',
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
    color: '#5A3E2A',
  },
  button: {
    backgroundColor: '#D4A373',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  products: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E0C4A0',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 6,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#5A3E2A',
  },
});