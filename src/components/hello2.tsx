import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';

const Hello2 = () => {
  const [name, setName] = useState('');

  const handlePress = () => {
    if (name.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên!');
    } else {
      Alert.alert('Thông báo', `Hello ${name}!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập tên của bạn:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên ở đây"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.button}>
        <Button title="Nhấn vào tôi" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    color: '#333',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: 200,
  },
});

export default Hello2;
