import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Layout2 = () => {
  return (
    <View  style={styles.container}>
        
        <View style={styles.header}>
            <View style={styles.logo}>
                <Image source={require('../../assets/logo/avatar1.jpg')}
                    style={styles.logoImg}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.hd}>
                <Image source={require('../../assets/banner/bn.jpg')}
                        style={styles.bnImg}
                        resizeMode='contain'
                />
            </View>
        </View>

        <View style={styles.body}>
            <View style={styles.side}>
                <Text style={styles.text}>Side</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>🦍Content</Text>
            </View>
        </View>

        <View style={styles.footer}>
            <Text style={styles.text}>Footer</Text>
        </View>
    </View>
  )
}

export default Layout2;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    logo: {
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: 70,
        height: 70,
    },
    hd: {
        flex: 4,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bnImg: {
        width: '100%',
    },
    body: {
        flex: 5,
        flexDirection: 'row',
    },
    side: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 4,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'blue',
        
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    }
})