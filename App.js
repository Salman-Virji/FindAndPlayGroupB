import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Group2B from './app/screens';

const Stack = createNativeStackNavigator();

export default function App() {
    const [validToken, setValidToken] = React.useState(false);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {validToken ? (
                    <>
                        {/* PROTECTED */}
                        <Stack.Screen
                            name='Protected'
                            component={Group2B.ProtectedScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        {/* SIGN IN */}
                        <Stack.Screen
                            name='SignIn'
                            component={Group2B.SignInScreen}
                            options={{ headerShown: false }}
                        />

                        {/* SIGN UP */}
                        <Stack.Screen
                            name='SignUp'
                            component={Group2B.SignUpScreen}
                            options={{ headerShown: false }}
                        />

                        {/* RESET PASSWORD */}
                        <Stack.Screen
                            name='ResetPassword'
                            component={Group2B.ResetPasswordScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
