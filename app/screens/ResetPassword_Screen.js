import React, { useState } from 'react';
import base_url from './axios';

import {
    TextInput,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen({ navigation }) {
    const [validMsg, setValidmsg] = useState('');
    const [email, setEmail] = useState('');

    function clearFields() {
        setEmail('');
    }

    function showValidationMsg() {
        if (email != '' || email != ' ') {
            setValidmsg(
                ' If this is a valid account you will get a email to reset your account'
            );
        }
        if (email == ' ') {
            setValidmsg('Please enter a valid email or Email');
        }
    }

    function ResetPassord() {
        const body = {
            email: email,
        };

        console.log(body);

        base_url
            .post('/reset-password', body, navigation)
            .then((res) => {
                console.log(res.data);

                if (res.data.status == true) {
                    console.log(username);
                    navigation.navigate('SignIn', {
                        email: email,
                    });
                }
            })
            .catch((err) => console.log(err));
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
                    {/* Reset password Header  */}
                    <Text style={styles.resetpasstext}> Reset Password </Text>

                    {/* email or password input box  */}
                    <TextInput
                        editable={true}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Email'
                        value={email}
                        placeholderTextColor='#fff'
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                {/* Reset password message  */}
                <Text style={styles.resetpassmsg}>{validMsg}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        width: width * 0.6,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={styles.loginbuttonContainer}>
                        {/* Send request button  */}
                        <Pressable
                            style={styles.btnSendrequest}
                            onPress={() => ResetPassord()}
                        >
                            <Text
                                style={{
                                    bottom: 1,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: 'white',
                                }}
                            >
                                Send Request
                            </Text>
                        </Pressable>
                    </View>
                </View>
                {/* login button and try again text  */}
                <View style={styles.loginbuttonContainer}>
                    <Text
                        style={{
                            bottom: 10,
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'white',
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10,
                        }}
                    >
                        Try Again?
                    </Text>

                    <Pressable
                        style={styles.btnSignin}
                        onPress={() => navigation.navigate('SignIn')} //navigates to signinscren
                    >
                        <Text
                            style={{
                                bottom: 1,
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: 'white',
                            }}
                        >
                            Go To Sign In
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
        fontSize: 120,
        top: '45%',
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,

        // image css
        // top: "10%",
        // width: "100%",
        // height: "100%",
        // resizeMode: "contain",
    },
    resetpasstext: {
        fontSize: 50,
        bottom: '15%',
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    logintext: {
        zIndex: 999, // brings forward
        paddingLeft: '43%',
        color: 'white',
        top: '25%',
        fontSize: 30,
        fontWeight: 'bold',
    },
    loginbuttonContainer: {
        flex: 1,
        width: width * 0.6,
        justifyContent: 'center',
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

    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        bottom: '5%',
    },
    loginButton: {},
    resetpassmsg: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
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
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        justifyContent: 'center',
        bottom: '-11%',
    },
    btnSendrequest: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#50A4FF',
        width: '70%',
        fontSize: 20,
        height: 60,
        shadowColor: 'rgba(46, 229, 157, 0.4)',
        fontSize: 20,
    },
    btnSignin: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#FF6551',
        width: '70%',
        fontSize: 20,
        height: 60,
        shadowColor: 'rgba(46, 229, 157, 0.4)',
        fontSize: 20,
        bottom: '2%',
    },
});
