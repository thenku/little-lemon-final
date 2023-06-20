import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {StyleSheet, View, Text, Alert} from "react-native";
import AsyncStorage from 'react-native-simple-store';
import * as Font from 'expo-font';
import fonts from '../utils/fonts'

import Onboarding from "../screens/Onboarding";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: "bold",
  }
})
const clearStorage = async () => {
  const keys = (await AsyncStorage.keys());
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    await AsyncStorage.delete(key);
  }
}
const RootNavigator = () => {
  const [isOnboardingCompleted, setOnboardingCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  //  clearStorage();
  
  let user;
  React.useEffect(() => {
    (async () => {
      try {
        user = await AsyncStorage.get('user');
        await Font.loadAsync(fonts);

        setIsLoading(false);
        if(user){
          setOnboardingCompleted(true);
        }
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  if (isLoading) {
   return <SplashScreen />;
  }else if(!user && isOnboardingCompleted){
      setOnboardingCompleted(false);
  }
  return (
    <Stack.Navigator>
      {!isOnboardingCompleted ? 
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}} />
      : null}
              <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
              <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};
 
export default RootNavigator;
