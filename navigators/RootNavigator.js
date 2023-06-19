import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {StyleSheet, View, Text, Alert} from "react-native";
import AsyncStorage from 'react-native-simple-store';

import Onboarding from "../screens/Onboarding";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: "bold",
  }
})

const RootNavigator = () => {
  const [isOnboardingCompleted, setOnboardingCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.get('user');
        setIsLoading(false);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

   if (isLoading) {
     // We haven't finished reading from AsyncStorage yet
     return <SplashScreen />;
    }
  return (
    <Stack.Navigator>
      {isOnboardingCompleted ? (
           //  Onboarding completed, user is signed in
            <Stack.Screen name="Profile" component={ProfileScreen} />
          ) : (
           //  User is NOT signed in
            <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}} />
          )}

    </Stack.Navigator>
  );
};
 
export default RootNavigator;
