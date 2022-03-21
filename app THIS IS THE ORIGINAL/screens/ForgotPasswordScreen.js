import React from 'react';
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

function ForgotPasswordScreen({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/BGs/background2.png')}
        >
            <Image
                style={styles.logo}
                source={require('../assets/Logo/logo1.png')}
            ></Image>
            <View style={styles.inputContainer}></View>
            <Text style={styles.signintext}> Reset Password </Text>

            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='   Username or Email'
                placeholderTextColor='#808080'
                autoCapitalize='none'
            />

            <View style={styles.loginbuttonContainer}>
                <Text style={styles.logintext}>Send Request</Text>
                <Image
                    style={styles.loginButton}
                    source={require('../assets/Btn/bluepillbutton.png')}
                ></Image>

                {/* <Image onPress ={() => navigation.navigate('LandingScreen')} style={styles.loginButton} source={require("../assets/Btn/bluepillbutton.png")}></Image> */}
                {/* <View style={styles.loginButton}></View> */}
            </View>

            <View style={styles.signupbuttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('SigninScreen')}
                >
                    <Image
                        style={styles.signupButton}
                        source={require('../assets/Btn/orangepillbutton.png')}
                    ></Image>
                    <Text style={styles.notregisteredtext}>
                        {' '}
                        Try Logging-In Again ?{' '}
                    </Text>
                    <Text style={styles.signuptext}>Sign-In </Text>
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

        bottom: '-15%',
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

    inputContainer: {
        flex: 1,
    },
    loginButton: {},

    logintext: {
        zIndex: 999, // brings forward
        paddingLeft: '38%',
        color: 'white',
        top: '38%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginbuttonContainer: {
        flex: 2,
        top: '5%',
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
        top: '10%',
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

export default ForgotPasswordScreen;
