import React, { useState } from 'react';
// import axios from 'axios';
import fetch from 'node-fetch';

import {
    TextInput,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const inputValidation = () => {
        if (username.length == 0)
            setEmailError('Username or email is required');
        else setEmailError('');
        if (password.length == 0) setPasswordError('Password is required');
        else setPasswordError('');
    };

    function clearFields() {
        setUsername('');
        setPassword('');
    }

    async function Login() {
        //Email and password validation
        inputValidation(username, password);

        const data = {
            username: username,
            password: password,
        };

        const response = await fetch('http://localhost:3000/auth/sign-in', {
            method: post,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        console.log(res);

        // axios.post('http://localhost:3000/auth/sign-in', data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/BGs/background2.png')}
        >
            <View style={styles.inputContainer}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        width: '100%',
                        margin: 100,
                    }}
                >
                    <Text style={styles.logo}> Find & Play</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text style={styles.signintext}> Sign-In </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Username or Email'
                        placeholderTextColor='#fff'
                        autoCapitalize='none'
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />

                    {emailError.length > 0 ? (
                        <Text style={styles.inputValiation}>{emailError}</Text>
                    ) : null}

                    <TextInput
                        style={styles.input2}
                        underlineColorAndroid='transparent'
                        placeholder='Password'
                        placeholderTextColor='#fff'
                        autoCapitalize='none'
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />

                    {passwordError.length > 0 ? (
                        <Text style={styles.inputValiation}>
                            {passwordError}
                        </Text>
                    ) : null}
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        width: width * 0.6,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}></View>
                    <View style={{}}>
                        <Text
                            style={{
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            onPress={() => navigation.navigate('ResetPassword')}
                        >
                            Forgot Password ?{' '}
                        </Text>
                    </View>
                </View>

                <View style={styles.loginbuttonContainer}>
                    <View>
                        <Pressable
                            style={styles.loginButton}
                            onPress={() => Login(username, password)} //changed onclick to go to landingscreen
                        >
                            <Text style={styles.loginText}>Sign In</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.signupbuttonContainer}>
                    <Text
                        style={{ bottom: 10, fontWeight: 'bold', fontSize: 20 }}
                    >
                        Not registered?
                    </Text>

                    <Pressable style={styles.btnSignup}>
                        <Text
                            style={([styles.loginText], { fontSize: 15 })}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Create an account
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        resizeMode: 'contain',
        flex: 1,
    },
    logo: {
        //text css
        //fontSize: 120,
        fontSize: RFPercentage(10),
        top: '45%',
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        // //image css
        // top: "10%",
        // width: "100%",
        // height: "100%",
    },
    signintext: {
        // fontSize: 50,
        fontSize: RFPercentage(5),
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    forgotpasstext: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 190,
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
        width: width * 0.6,
        height: 50,
        borderColor: '#fff',
        borderWidth: 3,
        color: '#fff',
        borderRadius: 20,
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    input2: {
        marginBottom: 15,
        width: width * 0.6,
        height: 50,
        borderColor: '#fff',
        borderWidth: 3,
        color: '#fff',
        borderRadius: 20,
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    loginButton: {},

    logintext: {
        zIndex: 999, // brings forward
        paddingLeft: '43%',
        color: 'white',
        top: '45%',
        fontSize: 30,
        fontWeight: 'bold',
    },
    loginbuttonContainer: {
        flex: 1,
        width: width * 0.6,
        justifyContent: 'center',
    },

    signuptext: {
        zIndex: 999, // brings forward

        bottom: '58%',
        paddingLeft: '41%',
        fontWeight: 'bold',
        color: 'white',
    },
    notregisteredtext: {
        color: 'black',

        paddingLeft: '35%',
        bottom: '63%',
        fontSize: 12,
    },
    signupbuttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        justifyContent: 'center',
    },

    trialButton: {
        width: 100,
        height: 50,
        backgroundColor: '#fc5c65',
    },

    googlelogo: {
        width: 40,
        height: 40,

        bottom: 20,
    },
    googleText: {
        fontSize: 10,
        top: '-15%',
        fontWeight: 'bold',
    },

    googlelogoContainer: {
        flex: 2,
        top: '30%',
        height: 20,
        alignItems: 'center',
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#50A4FF',
        width: '100%',
        height: 60,
        shadowColor: 'rgba(46, 229, 157, 0.4)',
    },
    loginText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    btnSignup: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#FF6551',
        width: '70%',
        fontSize: 20,
        height: 60,
        shadowColor: 'rgba(46, 229, 157, 0.4)',
        fontSize: 20,
    },
    btnWithoutAccount: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#FFE551',
        width: '70%',
        height: 60,

        shadowColor: 'rgba(46, 229, 157, 0.4)',
    },
    checkbox: {
        alignSelf: 'center',
    },
    inputValiation: {
        alignContent: 'flex-start',
        left: 15,
        color: 'black',
        fontSize: 16,
    },
});
