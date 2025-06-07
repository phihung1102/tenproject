import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

const Kiemtralan1= () => {
    type Danhbacute = {
            id: string,
            name: string,
            number: string, 
        }

    const [users, setUsers] = React.useState<Danhbacute[]>([
            {
                id: '1',
                name: 'Hang',
                number: '0000000000',
                
            },
            {
                id: '2',
                name: 'Hung',
                number: '1111111111',
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
                const newUser: Danhbacute = {
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
            <Text style={styles.header}>📒 Danh Bạ Cute</Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='🌸 Nhập Tên'
                style={styles.textinput}
            />
            <TextInput
                value={number}
                onChangeText={(text) => setNumber(text)}
                placeholder='📱Nhập số điện thoại'
                style={styles.textinput}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddorEdit}>
                <Text style={styles.buttonText}>{editingID ? 'Cập nhật' : '➕ THÊM'}</Text>
            </TouchableOpacity>
            <TextInput
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder='🔍Tìm kiếm...'
                style={styles.textinputS}
            />
            <View style={styles.users}>
                {search === '' ? 
                    <>
                        {users.map((user) => (
                            <View key={user.id} style={styles.userCard}>
                                
                                <View style={styles.info}>
                                    <Text style={styles.name}>👤 {user.name} - {user.number}</Text>
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
                                
                                <View style={styles.info}>
                                    <Text style={styles.name}>👤 {user.name} - {user.number}</Text>
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

export default Kiemtralan1

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: '#fff0f5'
    },
    header: {
        marginTop: 20,
        fontSize: 32,
        color: '#ff3399',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    textinput: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FF66B2',
        marginBottom: 10,
    },
    textinputS: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ff69b3',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff69b3',
        padding: 8,
        borderRadius: 10,
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
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        gap: 40,
        alignItems: 'center',
        backgroundColor: '#ffe1e1',
        borderRadius: 15,
        elevation: 5,
    },
    phone: {
        fontSize: 24,
    },
    info: {
        flex: 3,
        gap: 5,
        
    },
    icon: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,

    },
    text: {
        fontSize: 14,
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
})