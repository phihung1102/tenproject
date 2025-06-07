import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'

const Demo = () => {
    type Products = {
        id: string,
        name: string,
        price: number,
        image: ImageSourcePropType,
    }

    const [products, setProducts] = React.useState<Products[]>([
        {
            id: '1',
            name: 'Bánh nướng dâu tây',
            price: 655000,
            image: require('../../assets/shop/banh1.jpg'),
        },
        {
            id: '2',
            name: 'Bánh Matcha',
            price: 435000,
            image: require('../../assets/shop/banh2.jpg'),
        },
    ]);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [editingID, seteditingID] = useState<string | null>('');

    const handleAdd = () => {
        if(name.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm!'); return;}
        if(price.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập giá sản phẩm!'); return;}
        const parsedPrice = parseFloat(price);
        if(isNaN(parsedPrice)) {Alert.alert('Lỗi', 'Giá sản phẩm phải là số!'); return;}
        if(parsedPrice <= 0) {Alert.alert('Lỗi', 'Giá sản phẩm phải lớn hơn 0!'); return;}

        if(editingID){
            const updated = products.map((p) => p.id === editingID ? {...p, name, price: Number(parsedPrice)} : p);
            setProducts(updated);
            seteditingID('');
        } else {
            const newProduct: Products = {
                id: (products.length + 1).toString(),
                name,
                price: Number(price),
                image: require('../../assets/shop/banh3.jpg'),
            };
            setProducts([...products, newProduct]);
        }

        setName('');
        setPrice('');
    };


    const handleEdit = (id:string) => {
        const product = products.find(p => p.id === id);
        if(product){
            setName(product.name);
            setPrice(product.price.toString());
            seteditingID(id);
        }
    }

    const handleDelete = (id:string) => {
        setProducts(products.filter(p => p.id !== id));
    }
    
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
                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>
                        {editingID ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.products}>
                {products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        <Image style={styles.image} source={product.image}/>
                        <View style={styles.info}>
                            <Text style={styles.text}>Tên: {product.name}</Text>
                            <Text style={styles.text}>Giá: {product.price}$</Text>
                            <View style={styles.icon}>
                                <TouchableOpacity onPress={() => handleDelete(product.id)}>
                                    <Text style={styles.text}>✖️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleEdit(product.id)}>
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

export default Demo

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
        borderColor: 'gray',
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        color: 'gray',
    },
    products: {
        padding: 10,
    },
    productCard: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
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
        backgroundColor: '#3399FF',
        borderRadius: 5,
    },
    buttonText: {
        padding: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})