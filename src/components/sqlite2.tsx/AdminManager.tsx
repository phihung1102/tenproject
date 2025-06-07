import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Admin = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quản lý người dùng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quản lý loại sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
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
    backgroundColor: '#F2F8FF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0055AA',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonGroup: {
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0077CC',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
