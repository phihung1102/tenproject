import React from 'react'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabApp from './TabApp'
import ProductMNG from './AdminProductMNG'
import UserMNG from './AdminUserMNG'
import CategoryMNG from './AdminCategoryMNG'
import ProductDetail from './ProductDetail'

export type RootStackParamList = {
    MainTab: undefined;
    Login: undefined;
    Register: undefined;
    ProductMNG: undefined;
    UserMNG: undefined;
    CategoryMNG: undefined;
    ProductDetail: { id: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName='MainTab' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MainTab' component={TabApp} options={{title: 'Home'}}/>
        <Stack.Screen name='Login' component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name='Register' component={Register} options={{title: 'Register'}}/>
        <Stack.Screen name='ProductMNG' component={ProductMNG} options={{title: 'ProductMNG'}}/>
        <Stack.Screen name='UserMNG' component={UserMNG} options={{title: 'UserMNG'}}/>
        <Stack.Screen name='CategoryMNG' component={CategoryMNG} options={{title: 'CategoryMNG'}}/>
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{title: 'ProductDetail'}}/>
    </Stack.Navigator>
  )
}

export default AppNavigator;