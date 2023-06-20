import {StatusBar, StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native';

export default function ListItem({id, image, name, description, price}) {
    return (
    <View style={styles.row} >
        {/* <View>
            <Text style={{fontWeight: "bold"}}>{name}</Text>
            <Text>{description}</Text>
            <Text>{price}</Text>
        </View> */}
        <Image style={styles.image} source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}/>
        
       
    </View>);

}

const styles = StyleSheet.create({
    row: {
        alignItems:'center',
        justifyContent:'center',
        flexDirection: "row",
        padding:8,
    },
    image:{
        resizeMode: "cover",
        height: 50,
        width: 50,
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