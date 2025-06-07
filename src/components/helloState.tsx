import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native";


const HelloState = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number | null>(null);
    
    const handlePress = () => {
        if (name.trim() === '' || age === null) {
            Alert.alert('Lỗi', 'Vui lòng nhập thông tin!');
          } else {
            Alert.alert('👋 Xin chào', `Tôi tên là ${name}, năm nay ${age} tuổi!`);
          }          
    };

    return(
        <View style={style.container}>
            <Text style={style.label}>Tên:</Text>
            <TextInput style={style.input} value={name} onChangeText={setName} placeholder="Nhập tên của bạn..."/>

            <Text style={style.label}>Tuổi:</Text>
            <TextInput
                style={style.input}
                value={age !== null ? age.toString() : ''}
                onChangeText={(text) => {
                    const parsed = parseInt(text);
                    if (!isNaN(parsed)) setAge(parsed);
                    else setAge(null);
                }}
                placeholder="Nhập tuổi của bạn..."
                keyboardType="numeric"
            />


            <View style={style.button}>
                <Button title="Nhấn vào tôi" onPress={handlePress} />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#0080FF',
        borderRadius: 10,
        padding: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
        color: "white",
    },
    input: {
        textAlign: "center",
        width: '80%',
        backgroundColor: "white",
        alignSelf: "center",
        marginBottom: 8,
        color: "black",
    },
    button: {
        width: '40%',
        alignSelf: "center",
    },
});

export default HelloState;

