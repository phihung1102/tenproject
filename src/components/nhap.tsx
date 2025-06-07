import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'



const Dad = () => {
    const [nameSon, setNameSon] = useState<string>('Hùng');
    const [ageSon, setAgeSon] = useState<number>(20);

    const handleDataFromChild = (name:string, age:number) => {
        setNameSon(name);
        setAgeSon(age);
    }

    return (
    <View style={styles.containerDad}>
        <Text style={styles.titleDad}>Component Cha</Text>
        <Text style={styles.labelDad}>Tên: {nameSon}</Text>
        <Text style={styles.labelDad}>Tuổi: {ageSon}</Text>
        <Son sendDataToParent={handleDataFromChild} name={nameSon} age={ageSon}/>
    </View>
    )
}

type Props = {
    name: string,
    age: number,
    sendDataToParent: (name:string, age:number) => void
}

const Son = ({name, age, sendDataToParent} : Props) => {
    const [newName, setNewName] = useState<string>('Hùng');
    const [newAge, setNewAge] = useState<number>(20);

    return (
        <View  style={styles.containerSon}>
            <Text style={styles.titleSon}>Component Con</Text>
            <Text style={styles.labelSon}>Tên mới:</Text>
            <TextInput value={newName} onChangeText={(text)=>setNewName(text)} placeholder='Nhập tên...' style={styles.inputSon}></TextInput>
            <Text style={styles.labelSon}>Tuổi mới:</Text>
            <TextInput value={newAge?.toString()} onChangeText={(text)=>setNewAge(Number(text))} placeholder='Nhập tuổi...' keyboardType='numeric' style={styles.inputSon}></TextInput>
            <View style={styles.btnSon}>
                <Button title='Gửi' onPress={() => sendDataToParent(newName, newAge)}></Button>
            </View>
            <Text style={styles.text}>Tên con: {name}</Text>
            <Text style={styles.text}>Tuổi con: {age}</Text>
        </View>
    )
}

export default Dad;

const styles = StyleSheet.create({
    containerSon: {
        padding: 10,
        backgroundColor: '#004C99',
    },
    titleSon: {
        backgroundColor: '#CCE5FF',
        padding: 5,
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    labelSon: {
        color: 'white',
        fontSize: 18
    },
    inputSon: {
        width: '100%',
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    btnSon: {
        marginTop: 10,
        width: '50%',
        alignSelf: 'center'
    },
    containerDad: {
        padding: 10,
        backgroundColor: '#FFCC99',
    },
    titleDad: {
        backgroundColor: '#FFE5CC',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    labelDad: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
