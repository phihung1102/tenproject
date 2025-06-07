import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchProducts, addProduct, deleteProduct, updateProduct, initDatabase, fetchCategories, Category,searchProducts } from './hangDatabase';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { Product } from './hangDatabase';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './hangAppNavigatorProduct';

type QlspSqliteNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HangQlspSqlite = () => {

    const [products, setProducts] = React.useState<Product[]>([]);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number>();
    const [editingID, setEditingID] = useState<number | null>(null);
    const [imageUri, setImageUri] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [results, setResult] = useState<Product []>([]);
    const navigation = useNavigation<QlspSqliteNavigationProp>();


    useEffect(() => {
        const loadData = async () => {
            await initDatabase();
            const data = await fetchProducts();
            const data2 = await fetchCategories();
            setProducts(data);
            setCategories(data2);
        };
        loadData();
    }, []);

    const handleAdd = async () => {
        if(name.trim() === '') return Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm!');
        if(price.trim() === '') return Alert.alert('Lỗi', 'Vui lòng nhập giá sản phẩm!');
        const parsedPrice = parseFloat(price);
        if(isNaN(parsedPrice) || parsedPrice <= 0) return Alert.alert('Lỗi', 'Giá sản phẩm phải là số dương!'); 
        if(!imageUri) return Alert.alert('Lỗi', 'Vui lòng chọn ảnh cho sản phẩm!');
        if(!category) return Alert.alert('Lỗi', 'Vui lòng chọn loại sản phẩm!');

        if(editingID !== null){
            await updateProduct({
                id: editingID,
                name,
                price: parsedPrice,
                img: imageUri,
                categoryId: category,
            });
            setEditingID(null);
        } else {
            await addProduct({
                name,
                price: parsedPrice,
                img: imageUri,
                categoryId: category,
            });
        }
        const updated = await fetchProducts();
        setProducts(updated);
        setName('');
        setPrice('');
        setImageUri('');
        setCategory(1);
    };


    const handleEdit = (product: Product) => {
        setName(product.name);
        setPrice(product.price.toString());
        setImageUri(product.img);
        setEditingID(product.id);
        setCategory(product.categoryId);
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        const updated = await fetchProducts();
        setProducts(updated);
    }

    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 1 },
            (response: ImagePickerResponse) => {
                if(response.didCancel || response.errorCode || !response.assets?.[0]?.uri){
                    Alert.alert('Lỗi', 'Không thể chọn ảnh');
                } else {
                    setImageUri(response.assets[0].uri);
                }
            }
        );
    };
    useEffect(()=> {
        const searchbyName = async()=> {
            if(searchText.trim() !=='') {
                const data = await searchProducts(searchText); 
                setResult(data);
            }
            else {
                setResult([]);
            }
        }
        searchbyName();
    },[searchText])
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Quản lý sản phẩm</Text>

            <View style={styles.textinput}>
                <TextInput
                    value={name}
                    onChangeText={(text)=>setName(text)}
                    placeholder='Tên sản phẩm'
                    style={styles.input}
                />
                <TextInput
                    value={price}
                    onChangeText={(text)=>setPrice(text)}
                    keyboardType='numeric'
                    placeholder='Giá sản phẩm'
                    style={styles.input}
                />
                <Picker
                    selectedValue={category}
                    onValueChange={(item) => setCategory(Number(item))}
                    style={styles.input}
                >
                    <Picker.Item label="Chọn loại sản phẩm" value={undefined} />
                    {categories.map((cate) => (
                        <Picker.Item key={cate.id} label={cate.name} value={cate.id} />
                    ))}
                </Picker>
                <TouchableOpacity style={styles.button} onPress={selectImage}>
                    <Text style={styles.buttonText}>Chọn hình ảnh</Text>
                </TouchableOpacity>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginVertical: 10 }} />
                )}

                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>
                        {editingID ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    placeholder='Tìm kiếm'
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.input}
                />
            </View>

            <View style={styles.products}>
                {(results.length > 0 ? results : products).map((product) => (
                <View key={product.id} style={styles.productCard}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', {product})}>
                        <Image style={styles.image} source={{ uri: product.img }} />
                    </TouchableOpacity>
                    <View style={styles.info}>
                    <Text style={styles.text}>Tên: {product.name}</Text>
                    <Text style={styles.text}>Giá: {product.price}VND</Text>
                    <Text style={styles.text}>Loại: {product.categoryName}</Text>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => handleDelete(product.id)}>
                        <Text style={styles.text}>✖️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(product)}>
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

export default HangQlspSqlite


const styles = StyleSheet.create({
    scrollContainer: {

    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textinput: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        color: 'gray',
        borderColor: '#FF66B2',
    },
    products: {
        padding: 10,
    },
    productCard: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        marginBottom: 5,
        borderColor: '#FF66B2',
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        display: 'flex',
        gap: 10,
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    text: {
        fontSize: 16,
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#ff758c',
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonText: {
        padding: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})