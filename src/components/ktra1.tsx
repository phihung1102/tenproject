import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

const Ktra1 = () => {
    type Danhbas = {
            id: string,
            name: string,
            number: string, 
        }

    const [users, setUsers] = React.useState<Danhbas[]>([
            {
                id: '1',
                name: 'Hung',
                number: '0817423628',
            },
            {
                id: '2',
                name: 'Hang',
                number: '0919564317',
            },
            {
                id: '3',
                name: 'Thanh',
                number: '0919564317',
            },
            {
                id: '4',
                name: 'Khoa',
                number: '0919564317',
            },
        ]);
        const [name, setName] = useState<string>('');
        const [number, setNumber] = useState<string>('');
        const [search, setSearch] = useState<string>('');
        const [editingID, setEditingId] = useState<string | null>('');

        const handleAddorEdit = () => {
            if(name.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập tên!'); return;}
            if(number.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập tên!'); return;}
            if(editingID){
                const updated = users.map((u) => u.id === editingID ? {...u, name, number} : u);
                setUsers(updated);
                setEditingId('');
            }else{
                const newUser: Danhbas = {
                    id: (users.length + 1).toString(),
                    name,
                    number,
                };
                setUsers([...users, newUser]);
            }
            setName('');
            setNumber('');
        }

        const handleEdit = (id:string) => {
            const user = users.find(p => p.id === id);
            if(user){
                setName(user.name);
                setNumber(user.number);
                setEditingId(id);
            }
        }

        const handleDelete = (id:string) => {
            setUsers(users.filter(p => p.id !== id));
        }

        const handleSearch = users.filter(u => u.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>DANH BẠ</Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Tên'
                style={styles.textinput}
            />
            <TextInput
                value={number}
                onChangeText={(text) => setNumber(text)}
                placeholder='Số diện thoại'
                style={styles.textinput}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddorEdit}>
                <Text style={styles.buttonText}>{editingID ? 'Cập nhật' : 'Thêm'}</Text>
            </TouchableOpacity>
            <TextInput
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder='Tìm kiếm'
                style={styles.textinputS}
            />
            <View style={styles.users}>
                {search === '' ? 
                    <>
                        {users.map((user) => (
                            <View key={user.id} style={styles.userCard}>
                                <Text style={styles.phone}>💬</Text>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.text}>{user.number}</Text>
                                </View>
                                <View style={styles.icon}>
                                    <TouchableOpacity onPress={() => handleEdit(user.id)}>
                                        <Text style={{ fontSize: 20 }}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(user.id)}>
                                        <Text style={{ fontSize: 20 }}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </> : <>
                        {handleSearch.map((user) => (
                            <View key={user.id} style={styles.userCard}>
                                <Text style={styles.phone}>💬</Text>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.text}>{user.number}</Text>
                                </View>
                                <View style={styles.icon}>
                                    <TouchableOpacity onPress={() => handleEdit(user.id)}>
                                        <Text style={{ fontSize: 20 }}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(user.id)}>
                                        <Text style={{ fontSize: 20 }}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </>
                }
            </View>
        </ScrollView>
    )
}

export default Ktra1

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: '#F1F0F5 '
    },
    header: {
        marginTop: 20,
        fontSize: 32,
        color: '#D41478',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textinput: {
        padding: 10,
        backgroundColor: '#FFDADA',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FF66B2',
        marginBottom: 10,
    },
    textinputS: {
        padding: 10,
        backgroundColor: '#FFDFF9',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FF66B2',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#D41478',
        padding: 8,
        borderRadius: 20,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    users: {
        display: 'flex',
        gap: 10,
    },
    userCard: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        gap: 40,
        alignItems: 'center',
        backgroundColor: '#FFF2F4',
        borderRadius: 20,
        elevation: 5,
    },
    phone: {
        fontSize: 24,
    },
    info: {
        display: 'flex',
        gap: 5,
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginLeft: 80,
    },
    text: {
        fontSize: 14,
    },
    name: {
        color: '#D41478',
        fontWeight: 'bold',
        fontSize: 16,
    },
})