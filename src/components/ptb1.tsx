import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

const Ptb1 = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState('');

    const solveEquation = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if(isNaN(numA) || isNaN(numB)){
            setResult('Vui lòng nhập đúng số!');
            return;
        }

        if(numA === 0){
            if(numB === 0){
                setResult('Pt vô số nghiệm.');
            }else{
                setResult('Pt vô nghiệm.');
            }
        }else{
            const x = -numB/numA;
            setResult(`Pt có nghiệm x = ${(x).toFixed(2)}`);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Giải phương trình bậc 1: ax + b = 0</Text>
            <TextInput style={styles.input} placeholder="Nhập a" keyboardType="numeric" value={a} onChangeText={setA}/>
            <TextInput style={styles.input} placeholder="Nhập b" keyboardType="numeric" value={b} onChangeText={setB}/>
            <Button title="Giải" onPress={solveEquation}/>
            {result !== '' && <Text style={styles.result}>{result}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 12,
    },
    result: {
      marginTop: 16,
      fontSize: 16,
      color: '#007b00',
      textAlign: 'center',
    },
  });
  
export default Ptb1;