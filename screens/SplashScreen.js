import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';



export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#dee3e9",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 32,
    }
});