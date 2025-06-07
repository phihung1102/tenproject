import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Layout1 = () => {


  return (
    <View style={styles.container}>
        <View style={styles.ctn1}>
            <Text style={styles.text}>Vùng 1</Text>
        </View>
        <View style={styles.ctn2}>
            <Text style={styles.text}>Vùng 2</Text>
        </View>
        <View style={styles.ctn3}>
            <Text style={styles.text}>Vùng 3</Text>
        </View>
    </View>
  )
}

export default Layout1

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%', 
    },
    ctn1: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctn2: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctn3: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    }
})