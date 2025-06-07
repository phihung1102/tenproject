import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'

const Cha = () => {
    const [nameCon, setNameCon] = useState<string>('');
    const [ageCon, setAgeCon] = useState<number>();
    const [name, setName] = useState<string>('Hằng');
    const [age, setAge] = useState<number>(19);

    const handleDataFromChild = (name: string, age: number) => {
        setNameCon(name);
        setAgeCon(age);
    }

    return (
        <View style={styles.containerCha}>
            <Con sendDataToParent={handleDataFromChild} name={nameCon} age={ageCon!} />
            <Text style={styles.titleCha}>Component Cha</Text>
            <Text style={styles.labelCon}>Tên mới:</Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Nhập tên...'
                style={styles.inputCon}
            />
            <Text style={styles.labelCon}>Tuổi mới:</Text>
            <TextInput
                value={age?.toString()}
                onChangeText={(text) => setAge(Number(text))}
                placeholder='Nhập tuổi...'
                keyboardType='numeric'
                style={styles.inputCon}
            />
            <View style={styles.btnCon}>
                <Button title='Gửi' onPress={() => handleDataFromChild(name, age)} />
            </View>
            <Text style={styles.labelCha}>Tên: {nameCon}</Text>
            <Text style={styles.labelCha}>Tuổi: {ageCon}</Text>
        </View>
    )
}

type Props = {
    name: string,
    age: number,
    sendDataToParent: (name: string, age: number) => void
}

const Con = ({ name, age, sendDataToParent }: Props) => {
    const [newName, setNewName] = useState<string>('Hằng');
    const [newAge, setNewAge] = useState<number>(19);

    return (
        <View style={styles.containerCon}>
            <Text style={styles.titleCon}>Component Con</Text>
            <Text style={styles.labelCon}>Tên mới:</Text>
            <TextInput
                value={newName}
                onChangeText={(text) => setNewName(text)}
                placeholder='Nhập tên...'
                style={styles.inputCon}
            />
            <Text style={styles.labelCon}>Tuổi mới:</Text>
            <TextInput
                value={newAge?.toString()}
                onChangeText={(text) => setNewAge(Number(text))}
                placeholder='Nhập tuổi...'
                keyboardType='numeric'
                style={styles.inputCon}
            />
            <View style={styles.btnCon}>
                <Button title='Gửi' onPress={() => sendDataToParent(newName, newAge)} />
            </View>
            <Text style={styles.text}>Tên: {name}</Text>
            <Text style={styles.text}>Tuổi: {age}</Text>
        </View>
    )
}

export default Cha;

const styles = StyleSheet.create({
    containerCon: {
        padding: 15,
        backgroundColor: '#A78BFA',
        borderRadius: 15,
        marginTop: 20,
    },
    titleCon: {
        backgroundColor: '#EDE9FE',
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#4C1D95',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 10,
        marginBottom: 15,
    },
    labelCon: {
        color: '#F5F3FF',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600'
    },
    inputCon: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD6FE',
    },
    btnCon: {
        marginTop: 10,
        width: '60%',
        alignSelf: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },
    containerCha: {
        padding: 15,
        backgroundColor: '#F3E8FF',
        borderRadius: 15,
    },
    titleCha: {
        marginTop: 10,
        backgroundColor: '#E9D5FF',
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6B21A8',
        borderRadius: 10,
        marginBottom: 10,
    },
    labelCha: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 5,
        fontWeight: '600',
    },
    text: {
        color: '#FDF4FF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});
