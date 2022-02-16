import React from 'react'

// Part of React Navigation to create navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing screen components to Navigation Container
import SigninScreen from './app/screens/SigninScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LandingScreen from './app/screens/LandingScreen';
import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen';
import SigninScreenT from "./app/screens/SigninScreenT";
import ForgotPasswordTablet from "./app/screens/ForgotPasswordTablet";

// Part of React Navigation to create a 'Stack' style navigation object
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SigninScreenT" //For testing, change from SigninScreenT to SigninScreen
          component={SigninScreenT} //For testing, change from SigninScreenT to SigninScreen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordTablet"
          component={ForgotPasswordTablet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninScreen" //For testing, change from SigninScreen to SigninScreenT
          component={SigninScreen} //For testing, change from SigninScreen to SigninScreenT
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;