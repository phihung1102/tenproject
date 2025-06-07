import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product, Category } from './database';
import ProductDetail from './productDetail';
import QlspSqlite from './qlspSqlite';
import CategoryList from './categoryList';

export type RootStackParamList = {
    Home: undefined;
    Detail: { product: Product };
    Category: {categoryId: number};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigatorProduct = () => {

    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={QlspSqlite} options={{ title: 'Danh sách sản phẩm'}} />
            <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Chi tiết sản phẩm'}} />
            <Stack.Screen name="Category" component={CategoryList} options={{ title: 'Danh sách loại sản phẩm'}} />
        </Stack.Navigator>
    )
}

export default AppNavigatorProduct