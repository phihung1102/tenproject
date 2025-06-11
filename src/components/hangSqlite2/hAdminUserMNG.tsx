import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { updateUser, fetchUsers, User } from './hDatabase2';

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


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Quản lý người dùng</Text>

      <View>
        {(users.map((user) => (
          user.role !== 'admin' ? (
            <View key={user.id} style={styles.userCard}>
              <Image style={styles.image} source={{ uri: user.avatar || 'https://www.google.com.vn/search?q=avatar+default&sca_esv=ea7b27f3c7f5bbf6&udm=2&sxsrf=AE3TifP4PifukxTEcYoOjrBzF6X3zX4p2g%3A1749568986566&ei=2k1IaJqvIqCOvr0P7fHpqQQ&oq=avatar+d%C3%A8&gs_lp=EgNpbWciCmF2YXRhciBkw6gqAggAMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKSMUjUNwEWL0TcAN4AJABAZgBWaABsQWqAQE4uAEByAEA-AEBmAIKoAKDBcICBxAjGCcYyQLCAgYQABgHGB7CAgUQABiABMICBBAAGB7CAgoQABiABBhDGIoFwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAZgDAIgGAZIHAjEwoAepLLIHATe4B_QEwgcFMC40LjbIByQ&sclient=img#vhid=bhXONIl2bblF7M&vssid=mosaic' }}
                defaultSource={{ uri: 'https://www.google.com.vn/search?q=avatar+default&sca_esv=ea7b27f3c7f5bbf6&udm=2&sxsrf=AE3TifP4PifukxTEcYoOjrBzF6X3zX4p2g%3A1749568986566&ei=2k1IaJqvIqCOvr0P7fHpqQQ&oq=avatar+d%C3%A8&gs_lp=EgNpbWciCmF2YXRhciBkw6gqAggAMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKSMUjUNwEWL0TcAN4AJABAZgBWaABsQWqAQE4uAEByAEA-AEBmAIKoAKDBcICBxAjGCcYyQLCAgYQABgHGB7CAgUQABiABMICBBAAGB7CAgoQABiABBhDGIoFwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAZgDAIgGAZIHAjEwoAepLLIHATe4B_QEwgcFMC40LjbIByQ&sclient=img#vhid=bhXONIl2bblF7M&vssid=mosaic' }}
              />
              <View style={styles.info}>
                <View style={{ flexDirection: 'row', gap: 20, }}>
                  <Text style={styles.text}>ID: { user.id }</Text>
                  <Text style={styles.text}>Tên: {user.name}</Text>
                </View>
                <Text style={styles.text}>Email: {user.email}</Text>
                <View style={styles.roleContainer}>
                  <Text style={styles.text}>Vai trò: {user.role}</Text>
                  <TouchableOpacity style={styles.changeRoleButton} onPress={() => handleRoleChange(user)}>
                    <Text style={styles.changeRoleText}>Đổi vai trò</Text>
                  </TouchableOpacity>
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

export default UserMNG;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#FFF9F5', // nền kem
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDFB', // nền nhẹ hơn
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E0C4A0', // viền nâu nhạt
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
  text: {
    fontSize: 16,
    color: '#5A3E2A', // chữ nâu đậm
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  changeRoleButton: {
    backgroundColor: '#D4A373', // nâu sáng
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  changeRoleText: {
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
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
