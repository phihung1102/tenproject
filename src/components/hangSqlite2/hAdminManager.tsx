import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './hAppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductMNG' | 'UserMNG' | 'CategoryMNG'>;

const Admin = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang Quản Trị</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserMNG')}>
          <Text style={styles.buttonText}>Quản lý người dùng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CategoryMNG')}>
          <Text style={styles.buttonText}>Quản lý loại sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductMNG')}>
          <Text style={styles.buttonText}>Quản lý sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#FFF9F5', // Nền màu kem nhạt ấm áp
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#5A3E2A', // Màu nâu đậm
    fontFamily: 'sans-serif-medium',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonGroup: {
    gap: 20,
  },
  button: {
    backgroundColor: '#D4A373', // Màu nâu ấm
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
