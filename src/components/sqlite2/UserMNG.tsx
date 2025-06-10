import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, fetchUsers, User, logoutUser } from './database2';

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
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  },
  avatarPlaceholder: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  changeAvatarButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  value: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonGroup: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});