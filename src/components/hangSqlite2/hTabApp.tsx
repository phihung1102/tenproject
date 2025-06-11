import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Home from './hHome'
import Login from './hLogin'
import Register from './hRegister'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from './hLogout'
import Admin from './hAdminManager'
import UserMNG from './hUserMNG'

const Tab = createBottomTabNavigator();

const TabApp = () => {
  const [user, setUser] = useState< {name: string, role: string} | null >(null);
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('loggedInUser');
        setUser(userData ? JSON.parse(userData) : null);
      };
    loadUser();

    const interval = setInterval(loadUser, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0080FF',
          tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen 
        name="HomeTab"
        component={Home}
        options={{ title: 'Home', 
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>🏡</Text>
            ),
          }}
      />
      { user ? (
        <>
        <Tab.Screen
          name="Quanly"
          component={user.role === 'admin' ? Admin : UserMNG }
          options={{ title: 'Quanly',
            tabBarIcon: ({ color, size}) => (
              <Text style={{ fontSize: size, color }}>👤</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Logout"
          component={Logout}
          options={{ title: 'Logout',
            tabBarIcon: ({ color, size}) => (
              <Text style={{ fontSize: size, color }}>↩️</Text>
            ),
          }}
        />
        </>
      ) : (
        <>
        <Tab.Screen 
          name="Login"
          component={Login}
          options={{ title: 'Login', 
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🔒</Text>
              ),
            }}
        />
        <Tab.Screen 
          name="Register"
          component={Register}
          options={{ title: 'Register', 
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>®️</Text>
              ),
            }}
        />
        </>
      )}
        
    </Tab.Navigator>
  )
}

export default TabApp