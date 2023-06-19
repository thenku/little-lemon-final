import * as React from 'react';
import {Button, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from 'react-native-simple-store';
import { SafeAreaView } from 'react-native-safe-area-context';

const img = require('../assets/Logo.png');


export default function Onboarding({navigation}) {
    const [isButtonDisabled, setButtonDisabled ] = React.useState(true);
    const [firstName, setInput1] = React.useState("");
    const [email, setInput2] = React.useState("");

    const toggleNextBtn = (v1 = "",v2 = "") =>{
        if(v1.length > 0 && v2.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }
    const checkInput1 = (v) => {
        setInput1(v);
        toggleNextBtn(v, email);
    }
    const checkInput2 = (v) => {
        setInput2(v);
        toggleNextBtn(v, firstName);
    }

    const onNextPress = () => {
        AsyncStorage.save('user', {firstName, email}).then(()=>{
            navigation.navigate('Home')
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={img}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Let us get to know you</Text>
                <View>
                    <Text style={styles.bodyText}>First Name</Text>
                    <TextInput style={styles.textInput} onChangeText={checkInput1}>{firstName}</TextInput>
                    <Text style={styles.bodyText}>Email</Text>
                    <TextInput style={styles.textInput} onChangeText={checkInput2}>{email}</TextInput>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable onPress={onNextPress} style={(isButtonDisabled ? styles.button : {...styles.button ,backgroundColor: "#495e57"})} disabled={isButtonDisabled}>
                    <Text style={(isButtonDisabled ? styles.buttonTxt : {...styles.buttonTxt ,color: "white"})}>Next</Text>
                </Pressable>
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
        justifyContent: "space-between",
        padding:24,
        backgroundColor: "#cbd2d9",
    },
    bodyText: {
        textAlign: "center",
        fontSize:24,
        fontFamily: "Karla",
        color: "#344854"
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
    }
})