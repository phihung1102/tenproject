import { StyleSheet, Text, TextInput, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addCategory, deleteProduct, fetchCategories, Category, deleteCategory, updateCategory } from './hDatabase2';

const CategoryMNG = () => {
  const [name, setName] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingID, setEditingID] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories().then(setCategories);
    };
    loadData();
  }, []);

  const handleAddCategory = async () => {
    if(name.trim() === '') return Alert.alert('Lỗi', 'Vui lòng nhập tên loại sản phẩm!');

    if(editingID !== null){
      await updateCategory({
          id: editingID,
          name,
      });
      setEditingID(null);
    } else {
      await addCategory({
          name,
      });
    }
    const updated = await fetchCategories();
    setCategories(updated);
    setName('');
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setEditingID(category.id);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn chắc chắn muốn xóa loại sản phẩm này?',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Đồng ý',
          onPress: async () => {
            await deleteCategory(id);
            await fetchCategories().then(setCategories);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Quản lý loại sản phẩm</Text>

      <TextInput
        value={name}
        onChangeText={(t)=>setName(t)}
        placeholder='Nhập tên loại sản phẩm'
        style={styles.textInput}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>
            {editingID ? 'Cập nhật loại sản phẩm' : 'Thêm loại sản phẩm'}
        </Text>
      </TouchableOpacity>
      {editingID !== null && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => {
            setEditingID(null);
            setName('');
          }}
        >
          <Text style={styles.buttonText}>Hủy chỉnh sửa</Text>
        </TouchableOpacity>
      )}

      <View style={styles.categories}>
        {categories.map((cate) => (
          <View key={cate.id} style={styles.cateCard}>
            <View style={styles.info}>
              <View style={{ flexDirection: 'row', gap: 20, }}>
                <Text style={styles.text}>ID: {cate.id}</Text>
                <Text style={styles.text}>Loại: {cate.name}</Text>
              </View>
              <View style={styles.icon}>
                  <TouchableOpacity onPress={() => handleDelete(cate.id)}>
                      <Text style={styles.text}>✖️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEdit(cate)}>
                      <Text style={styles.text}>✏️</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </View>
        ))}
      </View>

    </ScrollView>
  );
};

export default CategoryMNG;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#FFF9F5', // nền kem nhẹ
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5A3E2A', // nâu đậm
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E0C4A0', // viền nâu nhạt
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFDFB',
    paddingLeft: 16,
    color: '#5A3E2A',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D4A373', // nâu sáng
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categories: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  cateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E0C4A0',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 6,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#5A3E2A',
  },
});
