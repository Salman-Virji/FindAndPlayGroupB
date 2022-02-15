import React, { useState } from 'react';
import axios from 'axios';
import {
    TextInput,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

function SigninScreen({ navigation }) {
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('pass');
    const [message, setMessage] = useState('');

    function clearFields() {
        setUsername('');
        setPassword('');
    }

    function Login() {
        const body = {
            username: username,
            password: password,
        };

        var url = `http://10.0.0.168:3000/users/login`;

        axios
            .post(url, body, navigation)
            .then((res) => {
                console.log(res.data);
                clearFields();
                setMessage(res.data.msg);

                if (res.data.status == true) {
                    navigation.navigate('LandingScreen', res.data);
                }
            })
            .catch((err) => console.log('error'));
    }

    function SignUp() {
        const body = {
            username: username,
            password: password,
        };
        if (username != '' || password != '') {
            var url = `http://10.0.0.168:3000/users/signup`;
            axios
                .post(url, body)
                .then(() => {
                    clearFields();
                    setMessage('Username is taken');
                })
                .catch((err) => console.log('err'));
        } else {
            console.log('Empty space');
        }
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/BGs/background1.png')}
        >
            <View style={styles.inputContainer}></View>
            <Text style={styles.signintext}> Sign-In </Text>
            <Text
                style={styles.forgotpasstext}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
            >
                {' '}
                Forgot Password ?{' '}
            </Text>

            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='   Username or Email'
                placeholderTextColor='#808080'
                autoCapitalize='none'
                value={username}
                onChangeText={(e) => setUsername(e)}
            />
            <TextInput
                style={styles.input2}
                underlineColorAndroid='transparent'
                placeholder='   Password'
                placeholderTextColor='#808080'
                autoCapitalize='none'
                value={password}
                onChangeText={(e) => setPassword(e)}
            />

            <View style={styles.googlelogoContainer}>
                <Image
                    style={styles.googlelogo}
                    source={require('../assets/Btn/circlegoogle.png')}
                ></Image>
                <Text style={styles.googleText}>Sign in with Google</Text>
            </View>
            <Image
                style={styles.logo}
                source={require('../assets/Logo/logo1.png')}
            ></Image>

            <View style={styles.loginbuttonContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={Login}>
                    {/*onPress ={() => navigation.navigate('LandingScreen')} */}

                    <Text style={styles.logintext}>Log-In</Text>
                    <Image
                        style={styles.loginButton}
                        source={require('../assets/Btn/bluepillbutton.png')}
                    ></Image>

                    {/* <Image onPress ={() => navigation.navigate('LandingScreen')} style={styles.loginButton} source={require("../assets/Btn/bluepillbutton.png")}></Image> */}
                    {/* <View style={styles.loginButton}></View> */}
                </TouchableOpacity>
            </View>

            <View style={styles.signupbuttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Image
                        style={styles.signupButton}
                        source={require('../assets/Btn/orangepillbutton.png')}
                    ></Image>
                    <Text style={styles.notregisteredtext}>
                        {' '}
                        Not Registered ?{' '}
                    </Text>
                    <Text style={styles.signuptext}>Sign up </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        resizeMode: 'contain',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        width: 350,
        height: 100,

        bottom: '47%',
    },
    signintext: {
        flex: 1,
        zIndex: 999,
        top: '15%',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    forgotpasstext: {
        flex: 1,
        zIndex: 999,
        paddingTop: 0,
        paddingLeft: 190,
        top: '28%',
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        margin: 15,
        width: 330,
        height: 40,
        top: '5%',
        borderColor: 'black',
        borderWidth: 1,

        backgroundColor: 'white',
        borderRadius: 15,
    },
    input2: {
        margin: 15,
        width: 330,
        height: 40,
        top: '2%',
        borderColor: 'black',
        borderWidth: 1,

        backgroundColor: 'white',
        borderRadius: 15,
    },
    inputContainer: {
        flex: 1,
    },
    loginButton: {},

    logintext: {
        zIndex: 999, // brings forward
        paddingLeft: '43%',
        color: 'white',
        top: '45%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginbuttonContainer: {
        flex: 2,
        top: '-23%',
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
        flex: 2,

        alignItems: 'center',
        top: '-3%',
        width: 400,
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
});

export default SigninScreen;
