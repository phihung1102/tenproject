import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './hAppNavigator';
import { logoutUser } from './hDatabase2';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTab'>;

const Logout = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const logout = async () => {
        await logoutUser();
        navigation.navigate('MainTab');
    };
    logout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Đang đăng xuất...</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});
