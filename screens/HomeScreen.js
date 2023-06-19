import * as React from 'react';
import {StatusBar, StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const img = require('../assets/Logo.png');
const heroImage = require('../assets/hero.png');
const profileImg = require('../assets/Profile.png');


export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
                <Image style={styles.image} source={img}/>
                <Pressable style= {{position:"absolute", right:0}} onPress={()=>navigation.navigate("Profile")}>
                       <Image style={styles.imageProfile} source={profileImg}></Image>
                </Pressable>
            </View>
            <View style={styles.body}>
                <Text style={styles.h1}>
                    Little Lemon
                </Text>
                <View style={{flexDirection: "row", gap:4, justifyContent: "space-between", alignItems: "flex-start"}}>
                    <View>
                        <Text style={styles.h2}>
                        Chicago
                        </Text>
                        <Text style={styles.p}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist
                        </Text>
                    </View>
                    <Image style={styles.imageRight} source={heroImage} />
                </View>
               
            </View>
            <View style={{flex:.5, padding:16}}>
                <View>
                    <Text style={{fontSize: 18, fontWeight:"bold"}}>ORDER FOR DELIVERY!</Text>
                </View>
                <ScrollView>

                </ScrollView>
            </View>
            
        </View>
    )
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
        justifyContent:'center',
        flexDirection: "row",
        padding:4,
    },
    body: {
        flex: 0.4,
        padding:16,
        backgroundColor: "#495E57",
    },
    h1: {
        color: "#f5ba12",
        fontSize: 48,
        fontFamily: "Markazi",
    },
    h2: {
        color: "white",
        fontSize: 32,
        fontFamily: "Markazi",
        top: -16,
    },
    p: {
        fontSize:16,
        fontFamily: "Karla",
        color: "white",
        width: 200,
    },
    textInput:{
        fontSize:24,
        fontFamily: "Karla",
        backgroundColor:"white",
        borderRadius: 8,
        borderColor:"#344854",
        borderWidth:2,
        marginTop: 8,
        marginBottom: 8,
    },
    footer: {
        flex:.2,
        paddingRight:16,
        paddingLeft:16,
        alignItems:"flex-end",
        justifyContent: "center",
        backgroundColor: "#f1f4f7"
    },
    button: {
        backgroundColor: "#cbd2d9",
        padding:8,
        paddingRight: 16,
        paddingLeft:16,
        borderRadius: 8,
    },
    buttonTxt: {
        fontSize:24,
        fontFamily: "Karla",
    },
    image:{
        resizeMode: "contain"
    },
    imageProfile:{
        resizeMode: "cover",
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    imageRight:{
        resizeMode: "cover",
        height: 115,
        width: 115,
        borderRadius: 16,
    }
})