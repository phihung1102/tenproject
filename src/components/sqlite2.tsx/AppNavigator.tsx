import React from 'react'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabApp from './TabApp'

export type RootStackParamList = {
    MainTab: undefined;
    Login: undefined;
    Register: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName='MainTab' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MainTab' component={TabApp} options={{title: 'Home'}}/>
        <Stack.Screen name='Login' component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name='Register' component={Register} options={{title: 'Register'}}/>
    </Stack.Navigator>
  )
}

export default AppNavigator;