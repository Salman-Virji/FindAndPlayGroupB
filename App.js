import React from "react";

// Part of React Navigation to create navigation container
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screen components to Navigation Container
import SigninScreen from "./app/screens/SigninScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LandingScreen from "./app/screens/LandingScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import CreateGameScreen from "./app/screens/CreateGameScreen";
import { SplashScreen } from "./app/screens/SplashScreen";
import { AuthContext } from "./app/contexts/AuthContext";
import { useAuth } from "./app/contexts/useAuth";

// Part of React Navigation to create a 'Stack' style navigation object
const Stack = createNativeStackNavigator();

function App() {

  const { auth, state } = useAuth();

  function renderScreens() {
    if (state.loading) {
      return (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      );
    }
    return state.user ? (
      <>
        <Stack.Screen

          name="CreateGameScreen"
          component={CreateGameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />

      </>
    ) : (
      <>
      <Stack.Screen
        name="CreateGameScreen"
        component={CreateGameScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  }
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <Stack.Navigator>{renderScreens()}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default App;
