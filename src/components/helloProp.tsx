import React from "react";
import { View, Text, StyleSheet} from "react-native";

type Props = {
    name: string;
    age: number;
};

const HelloProp: React.FC<Props> = ({name, age}) => {
    return(
        <View style={style.container}>
            <Text style={style.text}>👋 Xin chào!</Text>
            <Text style={style.text}>Tên: {name}</Text>
            <Text style={style.text}>Tuổi: {age}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#2F5597',
        borderRadius: 10,
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
        color: "white",
    },
});

export default HelloProp;

