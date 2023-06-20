import {StatusBar, StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native';
const logoImg = require('../assets/Logo.png');
const profileImg = require('../assets/Profile.png');

export default function Header(props) {
    return (
    <View style={styles.header}>
        <Image style={styles.logoImage} source={logoImg}/>
        {(props.showProfile)?
            <Pressable style= {{position:"absolute", right:4}} onPress={()=>props.navigation.navigate("Profile")}>
                <Image style={styles.imageProfile} source={profileImg}></Image>
            </Pressable>
            : null    
        }
        {(props.showBack) ?
            <Pressable style= {{...styles.buttonStyleActive}} onPress={()=>props.navigation.goBack()}>
                <Text style={{fontSize: 32,top:-8, color:"white", fontWeight:"bold"}}>&larr;</Text>
            </Pressable>
            : null    
        }
    </View>);

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#dee3e9",
        alignItems:'center',
        justifyContent:'center',
        flexDirection: "row",
        padding:8,
    },
    logoImage:{
        resizeMode: "contain"
    },
    imageProfile:{
        resizeMode: "cover",
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    buttonStyleActive:{
        backgroundColor: "#495e57",
        height: 40,
        width: 40,
        borderRadius: 100,
        alignItems:"center",
        position:"absolute", 
        left:8,
    },
})