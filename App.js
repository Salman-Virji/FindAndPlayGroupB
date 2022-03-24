import React from "react";

// Part of React Navigation to create navigation container
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screen components to Navigation Container

import SigninScreen from "./app/screens/SigninScreen";

import RegistarScreenT from "./app/screens/RegisterscreenT";
import LandingScreen from "./app/screens/LandingScreen";


import ForgotPasswordTablet from "./app/screens/ForgotPasswordTablet";
import CreateGameScreen from "./app/screens/CreateGameScreen";
// Part of React Navigation to create a 'Stack' style navigation object
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordTablet"
          component={ForgotPasswordTablet}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegistarScreenT"
          component={RegistarScreenT}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGameScreen"
          component={CreateGameScreen}
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
