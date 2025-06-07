import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from './hangDatabase';
import ProductDetail from './hangProductDetail';
import QlspSqlite from './hangQLSP';
import CategoryListScreen from './hangCategoryListScreen';

export type RootStackParamList = {
    Home: undefined;
    Detail: { product: Product };
    CategoryList: { categoryId: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const HangAppNavigatorProduct = () => {

    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={QlspSqlite} options={{ title: 'Danh sách sản phẩm'}} />
            <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Chi tiết sản phẩm'}} />
            <Stack.Screen name="CategoryList" component={CategoryListScreen} options={{ title: 'Danh sách theo loại' }} />
        </Stack.Navigator>
    )
}

export default HangAppNavigatorProduct