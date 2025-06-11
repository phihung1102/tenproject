import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, fetchUsers, User, logoutUser } from './hDatabase2';

const UserMNG = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const userData = JSON.parse(loggedInUser);
          const users = await fetchUsers();
          const currentUser = users.find(u => u.id === userData.id);
          if (currentUser) {
            setUser(currentUser);
            setName(currentUser.name);
            setEmail(currentUser.email);
            setAvatar(currentUser.avatar || '');
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSelectAvatar = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response.didCancel || response.errorCode || !response.assets?.[0]?.uri) {
          Alert.alert('Lỗi', 'Không thể chọn ảnh');
        } else {
          setAvatar(response.assets[0].uri);
        }
      }
    );
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return;
    }

    try {
      await updateUser({
        id: user.id,
        name,
        email,
        password: password || user.password,
        role: user.role,
        avatar: avatar || user.avatar
      });

      const updatedUser = {
        id: user.id,
        name,
        email,
        role: user.role,
        avatar: avatar || user.avatar
      };
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
      setIsEditing(false);
      
      await logoutUser();
      
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại');
    }
};

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Thông tin cá nhân</Text>

      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        {isEditing && (
          <TouchableOpacity style={styles.changeAvatarButton} onPress={handleSelectAvatar}>
            <Text style={styles.changeAvatarButtonText}>Thay đổi ảnh</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tên:</Text>
        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Nhập tên"
          />
        ) : (
          <Text style={styles.value}>{name}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Nhập email"
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Vai trò:</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>

      {isEditing && (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Mật khẩu mới:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Để trống nếu không đổi"
            secureTextEntry
          />
          <Text style={styles.note}>Chỉ điền nếu muốn thay đổi mật khẩu</Text>
        </View>
      )}

      <View style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleUpdateProfile}>
              <Text style={styles.buttonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default UserMNG;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#FFF9F5', // nền kem nhẹ
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#5A3E2A', // nâu đậm
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0C4A0',
  },
  avatarPlaceholder: {
    backgroundColor: '#D4A373', // nâu sáng
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F2E2C4',
    borderRadius: 8,
  },
  changeAvatarButtonText: {
    color: '#5A3E2A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#5A3E2A',
  },
  value: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0C4A0',
    color: '#5A3E2A',
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E0C4A0',
    borderRadius: 10,
    backgroundColor: '#FFFDFB',
    color: '#5A3E2A',
  },
  note: {
    fontSize: 12,
    color: '#A67C52',
    marginTop: 5,
    fontStyle: 'italic',
  },
  buttonGroup: {
    marginTop: 25,
  },
  button: {
    backgroundColor: '#D4A373', // nâu sáng
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#A47148', // nâu đậm hơn
  },
  cancelButton: {
    backgroundColor: '#E9896A', // đỏ nhẹ
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
