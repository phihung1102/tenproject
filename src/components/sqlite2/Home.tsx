import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { initDatabase } from './database2';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logoutUser } from './database2';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTab'>;

const Home = () => {
    const [user, setUser] = useState<{id: number, name: string, role: string } | null>(null);
    const navigation = useNavigation<NavigationProp>();
    
    useEffect(() => {
        const loadUser = async () => {
            await initDatabase();
            const userData = await AsyncStorage.getItem('loggedInUser');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        loadUser();
    }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.imgBn} source={require('../../../assets/banner/bn2.jpg')}/>

        <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn2}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn2}>Danh mục</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn2}>Sản phẩm</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {},
    imgBn: {
        width: '100%',
        height: 120,
    },
    ctnLogin: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        flex: 3,
        fontSize: 16,
        fontWeight: '500',
        padding: 10,
        backgroundColor: '#6600CC',
        color: 'white',
    },
    buttonLg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8000',
        padding: 5,
    },
    textBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#CCE5FF',
    },
    btn: {
        width: '30%',
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#0080FF',
        borderRadius: 20,
    },
    textBtn2: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        
    }
})