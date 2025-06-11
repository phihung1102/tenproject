import React from 'react'
import Home from './hHome'
import Login from './hLogin'
import Register from './hRegister'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabApp from './hTabApp'
import ProductMNG from './hAdminProductMNG'
import UserMNG from './hAdminUserMNG'
import CategoryMNG from './hAdminCategoryMNG'
import ProductDetail from './hProductDetail'

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

const HAppNavigator = () => {
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

export default HAppNavigator;