import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, TextInput, Button, Alert} from 'react-native';
import Header from '../components/Header';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from 'react-native-simple-store';

const profileImg = require('../assets/Profile.png');

export default class ProfileScreen extends React.Component{
    props;
    copyIfDiscard = {}
    constructor(props){
        super(props);
        this.props = props;
    }
    state = {
        firstName:"",
        lastName: "",
        email: "",
        phone: "",
        orderStatus:false,
        passwordChanges:false,
        specialOffers:false,
        newsletter: false
    }
    componentDidMount(prevProps, prevState){
        (async () => {
            try {
              let user = await AsyncStorage.get('user');
              const newState = {...this.state,...user};
              this.copyIfDiscard = JSON.parse(JSON.stringify(newState));
                this.setState(newState);
            } catch (e) {
              // Handle error
              Alert.alert(e.message);
            }
          })();
    }
    discard = () => {
        this.setState(this.copyIfDiscard);
    }
    save = async () => {
        await AsyncStorage.update('user', this.state);
        Alert.alert("Your changes have been saved!")
    }
    delete = async () => {
        await AsyncStorage.delete('user');
        this.props.navigator.navigate('Home');
    }
    render(){
        const checkBoxProps = {
            size:25,
            fillColor:"#cbd2d9",
            unfillColor:"white",
            
            iconStyle:{ borderColor: "red", borderRadius:4, marginBottom:8 },
            innerIconStyle:{ borderWidth: 2, borderRadius: 4 },
            textStyle:{ fontFamily: "Markazi", textDecorationLine: "none", }
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} showProfile={true} showBack={true}/>
                <ScrollView style={{padding:16, flex:.9}}>
                    <View>
                        <Text style={styles.h2}>
                            Personal information
                        </Text>
                        <Image source={profileImg} style={{width: 75, height:75, borderRadius:100}} resizeMode="contain" />
                    </View>
                    <View style={{padding:16}}>
                        <Text>First name</Text>
                        <TextInput style={styles.textInput} onChangeText={(v)=>this.setState({...this.state, firstName:v})}>{this.state.firstName}</TextInput>
                        <Text>Last name</Text>
                        <TextInput style={styles.textInput} onChangeText={(v)=>this.setState({...this.state, lastName:v})}>{this.state.lastName}</TextInput>
                        <Text>Email</Text>
                        <TextInput style={styles.textInput} onChangeText={(v)=>this.setState({...this.state, email:v})}>{this.state.email}</TextInput>
                        <Text>Phone number</Text>
                        <TextInput style={styles.textInput} onChangeText={(v)=>this.setState({...this.state, phone:v})}>{this.state.phone}</TextInput>
                    </View>
                    <View style={{marginBottom:8, marginTop:0}}>
                        <Text style={styles.h2}>
                            Email notifications
                        </Text>
                        <BouncyCheckbox
                            text="Order statuses"
                            onPress={(v) => this.setState({...this.state, orderStatus:v})}
                            {...checkBoxProps}
                            isChecked={this.state.orderStatus}
                        />
                        <BouncyCheckbox
                            text="Password changes"
                            {...checkBoxProps}
                            onPress={(v) => this.setState({...this.state, passwordChanges:v})}
                            isChecked={this.state.passwordChanges}

                        />
                        <BouncyCheckbox
                            text="Special offers"
                            {...checkBoxProps}
                            onPress={(v) => this.setState({...this.state, specialOffers:v})}
                            isChecked={this.state.specialOffers}
                        />
                        <BouncyCheckbox
                            text="Newsletter"
                            {...checkBoxProps}
                            onPress={(v) => this.setState({...this.state, newsletter:v})}
                            isChecked={this.state.newsletter}
                        />
                    </View>
                    <Button title="Log out" color="#f4ce14" onPress={this.delete}></Button>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", height: 100, gap: 16}}>
                        <Button color="grey" title="Discard changes" onPress={this.discard} ></Button>
                        <Button color="#495e57" title="Save changes" onPress={this.save}></Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        flex:0.1,
        height:50,
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
    h2: {fontSize: 18, fontWeight:"bold", fontFamily: "Karla", color: "#344854", paddingBottom:8,},
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