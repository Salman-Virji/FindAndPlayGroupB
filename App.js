import React from "react";

// Part of React Navigation to create navigation container
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screen components to Navigation Container
import SigninScreen from "./app/screens/SigninScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import RegistarScreenT from "./app/screens/RegisterscreenT";
import LandingScreen from "./app/screens/LandingScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import ForgotPasswordTablet from "./app/screens/ForgotPasswordTablet";
import CreateGameScreen from "./app/screens/CreateGameScreen";
import ChooseObjectiveScreen from "./app/screens/Game/ChooseObjectiveScreen";
import GameScreen from "./app/screens/Game/GameScreen";
import EndScreen from "./app/screens/Game/EndScreen";
// Part of React Navigation to create a 'Stack' style navigation object
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* MOVE GAME SCREEN TO ITS OWN STACK NAVIGATOR*/}
      <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="EndScreen"
          component={EndScreen}
          options={{ headerShown: false }}
        />
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
          name="RegisterScreen"
          component={RegisterScreen}
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
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGameScreen"
          component={CreateGameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseObjectiveScreen"
          component={ChooseObjectiveScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
