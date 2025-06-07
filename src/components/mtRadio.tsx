import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const MtRadio = () => {
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [result, setResult] = useState<string>('');
    const [operation, setOperation] = useState('add');

    const operations = [
        { label: "Cộng", value: "add"},
        { label: "Trừ", value: "subtract"},
        { label: "Nhân", value: "multiply"},
        { label: "Chia", value: "divide"},
        { label: "So sánh", value: "compare"},
    ];

    const calculate = () => {
        switch (operation){
            case 'add':
                setResult(`Kết quả: ${a + b}`);
                break;
            case 'subtract':
                setResult(`Kết quả: ${a - b}`);
                break;
            case 'multiply':
                setResult(`Kết quả: ${a * b}`);
                break;
            case 'divide':
                setResult(`Kết quả: ${b !== 0 ? (a / b).toFixed(2) : 'Không thể chia cho 0.'}`);
                break;
            case 'compare':
                if(a > b){
                    setResult(`Kết quả: ${a} > ${b}`);
                }else if(a < b){
                    setResult(`Kết quả: ${a} < ${b}`);
                }else{
                    setResult(`Kết quả: ${a} = ${b}`);
                }
                break;
            default:
                setResult("Phép toán không hợp lệ. Vui lòng chọn lại!");
        }
    };



  return (
    <View style={styles.container}>
        <Text style={styles.title}>Máy tính</Text>
        <TextInput
        style={styles.input}
        value={a.toString()}
        keyboardType='numeric'
        placeholder='Nhập số a'
        onChangeText={(text) => setA(Number(text))}
        />
        <TextInput
        style={styles.input}
        value={b.toString()}
        keyboardType='numeric'
        placeholder='Nhập số b'
        onChangeText={(text) => setB(Number(text))}
        />
        <Text style={styles.label}>Chọn phép toán</Text>
        <View style={styles.radioContainer}>
            {operations.map((op) => (
                <TouchableOpacity
                key={op.value}
                style={styles.radioOption}
                onPress={() => setOperation(op.value)}>
                    <View style={[styles.radioCircle, operation === op.value && styles.selectedRadio]}></View>
                    <Text style={styles.radioLabel}>{op.label}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
                <Text style={styles.calculateText}>Tính</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.result}>{result}</Text>
    </View>
  )
}

export default MtRadio;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexGrow: 1,
      },
      title: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: 'bold',
      },
      input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
      },
      label: {
        fontSize: 18,
        marginVertical: 10,
      },
      radioContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%',
        marginTop: 10,
      },
      radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2196F3',
        marginRight: 10,
      },
      selectedRadio: {
        backgroundColor: '#2196F3',
      },
      radioLabel: {
        fontSize: 16,
        color: '#000',
      },      
      calculateButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
      },
      calculateText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      result: {
        fontSize: 18,
        marginTop: 20,
        color: '#333',
      },
})