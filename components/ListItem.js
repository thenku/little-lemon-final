import {StatusBar, StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native';

export default function ListItem({id, image, name, description, price}) {
    return (
    <View style={styles.parent} key={id}>
        <Text style={{fontWeight: "bold",}}>{name}</Text>
        <View style={styles.row}>
            <View style={{flexShrink:1, alignItems:'flex-start', flex:1}}>
                <Text>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <View>
                <Image style={styles.image} source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}/>
                {/* <Image style={styles.image} source={{uri: `https://github.com/thenku/little-lemon-final/tree/master/assets/${image}?raw=true`}}/> */}
            </View>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    row: {
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection: "row",
    },
    parent:{
        alignItems:'stretch',
        flex:1,
        flexDirection: "column",
        padding:0,
        paddingBottom:12,
    },
    image:{
        resizeMode: "cover",
        height: 60,
        alignSelf:"stretch",
        aspectRatio:1,
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
    price:{
        paddingTop:4,
        fontSize: 18
    }
})