import * as React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header } from 'react-native/Libraries/NewAppScreen';


const img = require('../assets/Logo.png');

export default function Onboarding({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={img}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Let us get to know you</Text>
            </View>
            <View style={styles.footer}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: '#495E57',
    },
    header: {
        flex:0.1,
        backgroundColor: "#dee3e9",
        alignItems:'center',
        justifyContent:'center'
    },
    body: {
        flex: 0.7,
        padding:24,
        backgroundColor: "#cbd2d9",
    },
    bodyText: {
        textAlign: "center",
        fontSize:24,
        fontFamily: 

    },
    footer: {
        flex:.2,
        backgroundColor: "#f1f4f7"
    },
    image:{
        resizeMode: "contain"
    }
})