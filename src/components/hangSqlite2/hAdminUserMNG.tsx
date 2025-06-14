import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { updateUser, fetchUsers, User, deleteUser } from './hDatabase2';

const UserMNG = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      fetchUsers().then(setUsers);
    }
    loadData();
  }, []);

  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    setRole(user.role);
    setModalVisible(true);
  }

  const handleConfirmRole = async () => {
    if (selectedUser) {
      const updated = { ...selectedUser, role: role };
      const success = await updateUser(updated);
      if (success) {
        const load = await fetchUsers();
        setUsers(load);
      }
      setModalVisible(false);
    }
  }

  const handleDeleteUser = (user: User) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa người dùng ${user.name}?`,
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { 
          text: "Xóa", 
          onPress: async () => {
            const success = await deleteUser(user.id);
            if (success) {
              const updatedUsers = await fetchUsers();
              setUsers(updatedUsers);
              Alert.alert("Thành công", "Đã xóa người dùng thành công");
            } else {
              Alert.alert("Lỗi", "Không thể xóa người dùng");
            }
          },
          style: "destructive"
        }
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Quản lý người dùng</Text>

      <View>
        {(users.map((user) => (
          user.role !== 'admin' ? (
            <View key={user.id} style={styles.userCard}>
              <Image 
                style={styles.image} 
                source={{ uri: user.avatar || 'https://via.placeholder.com/150' }}
                defaultSource={{ uri: 'https://via.placeholder.com/150' }}
              />
              <View style={styles.info}>
                <View style={styles.infoRow}>
                  <Text style={styles.text}>ID: {user.id}</Text>
                  <Text style={styles.text}>Tên: {user.name}</Text>
                </View>
                <Text style={styles.text}>Email: {user.email}</Text>
                <View style={styles.roleContainer}>
                  <Text style={styles.text}>Vai trò: {user.role}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.changeRoleButton]} 
                      onPress={() => handleRoleChange(user)}
                    >
                      <Text style={styles.buttonText}>Đổi vai trò</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.deleteButton]} 
                      onPress={() => handleDeleteUser(user)}
                    >
                      <Text style={styles.buttonText}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : null
        )))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Chọn vai trò cho {selectedUser?.name}</Text>
            
            <Pressable
              style={[styles.roleOption, role === 'technician' && styles.selectedOption]}
              onPress={() => setRole('technician')}
            >
              <Text>Kỹ thuật viên</Text>
            </Pressable>
            
            <Pressable
              style={[styles.roleOption, role === 'user' && styles.selectedOption]}
              onPress={() => setRole('user')}
            >
              <Text>Người dùng</Text>
            </Pressable>
            
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirmRole}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#FFF9F5',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5A3E2A',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userCard: {
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
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#E0C4A0',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row', 
    gap: 20,
  },
  text: {
    fontSize: 16,
    color: '#5A3E2A',
  },
  roleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  changeRoleButton: {
    backgroundColor: '#D4A373',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: '#E0C4A0',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5A3E2A',
  },
  roleOption: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: '#E0C4A0',
    borderRadius: 8,
    backgroundColor: '#FFFDFB',
  },
  selectedOption: {
    backgroundColor: '#FCEEDC',
    borderColor: '#D4A373',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#C2B8AE',
  },
  confirmButton: {
    backgroundColor: '#D4A373',
  },
});

export default UserMNG;