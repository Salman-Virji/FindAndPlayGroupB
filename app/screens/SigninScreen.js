/** @Added By Backend Team - 22nd March */
import BackendQuery from '../config/Axios';

//Installing expo checkbox as react native doesn't provide checkbox out of the box anymore.
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';

//Importing whatever components are required from react native
import {
    TextInput,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions,
} from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box

const { width } = Dimensions.get('window');

function SigninScreen({ navigation }) {
    const [username, setUsername] = useState('arianne'); // For testing
    const [password, setPassword] = useState('testing1'); // For testing
    const [message, setMessage] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [validMsg, setValidmsg] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    /** @Added By Backend Team - 22nd March */
    const Login = async () => {
        const body = {
            username: username,
            password: password,
        };
        try {
            /** @TODO  -------------------------------- */
            /** @TODO Handle form validation before POST */
            /** @TODO  -------------------------------- */

            await requestSignIn(body);
        } catch (error) {
            Alert.alert('Sign In Error', `Input Error, try again!`);
        }
    };

    /** @Added By Backend Team - 22nd March */
    const requestSignIn = async (body) => {
        try {
            const response = await BackendQuery.post(
                '/auth/sign-in',
                body,
                navigation
            );

            if (response.status == 200) {
                const { session_id } = response.data;

                console.log(`Session ID: ${session_id}`);

                /** @TODO  -------------------------------- */
                /** @TODO Set Local Storage with session_id */
                /** @TODO  -------------------------------- */

                setUsername('');
                setPassword('');

                navigation.navigate('LandingScreen', {
                    username: username,
                });
            }
        } catch (error) {
            const { error: errorIssue } = error.response.data;

            console.log(`Error found => ${errorIssue})`);

            Alert.alert(
                'Cannot Authenticate Username or Password',
                `${errorIssue}`
            );
            setUsername('');
            setPassword('');
        }
    };

    /*

        // function showValidationMsg() { // function creates error username is readonly
    //   if(username = " ",username="" ||( password = " ", password ="")){
    //     setValidmsg=("Please enter a valid Username or Password");
    //   }
    // }

    const inputValidation = () => {
            if (username.length == 0)
                setEmailError('Username or email is required');
            else setEmailError('');
            if (password.length == 0) setPasswordError('Password is required');
            else setPasswordError('');
        };


    async function Login() {
        //Email and password validation
        inputValidation(username, password);

        const body = {
            username: username,
            password: password,
        };

        const url = `http://{{ IPADDRESSNUMBERS }}/auth/sign-in`; //Replace by your IP address

        await axios
            .post(url, body, navigation)
            .then((res) => {
                //clearFields(); //Commented this one for better user experience cause everything empty fields are being handled in input validation
                // setMessage(res.data.msg);

        if (res.status == 200) {
            console.log(res.session_id);
            // Set Local Storage with session_id
            navigation.navigate('LandingScreen', {
                username: username,
            });
        }
            })
            .catch((err) => {
                console.log(err.session_id);
            });
    }
*/

    return (
        //Setting background
        <ImageBackground
            style={styles.background}
            source={require('../assets/BGs/background2.png')}
        >
            {/* //View is like a div in html */}
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
                    {/* <Image
            style={styles.logo}
            source={require("../assets/Logo/logo1.png")}
          /> */}
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    {/* To use text we have to use Text component */}
                    <Text style={styles.signintext}> Sign-In </Text>

                    {/* TextInput is like input box */}

                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='Username or Email'
                        placeholderTextColor='#fff'
                        autoCapitalize='none'
                        value={username}
                        onChangeText={(e) => setUsername(e)}
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
                        secureTextEntry={false}
                        onChangeText={(e) => setPassword(e)}
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
                    <View style={{ flexDirection: 'row' }}>
                        {/* Removing the remeber me checkbox*/}

                        {/* <Checkbox
              style={styles.checkbox}
              value={isSelected}
              onValueChange={setSelection}
              //color={true ? "#4630EB" : undefined}
            /> */}
                        {/*             
            <Text
              style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}
            >
              {" "}
              Remember me!
            </Text> */}
                    </View>
                    <View style={{}}>
                        <Text
                            style={{
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                            onPress={() =>
                                navigation.navigate('ForgotPasswordTablet')
                            }
                        >
                            Forgot Password ?{' '}
                        </Text>
                    </View>
                </View>
                <Text> {validMsg} </Text>
                <View style={styles.loginbuttonContainer}>
                    <View>
                        {/* Pressable makes the area Pressable */}
                        <Pressable
                            style={styles.loginButton}
                            onPress={() => Login(username, password)} //changed onclick to go to landingscreen
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </Pressable>
                    </View>

                    {/*Got rid of continue without account as per new deisgnw*/}
                    {/* <View style={{ alignItems: "center" }}>
            <Pressable
              style={styles.btnWithoutAccount}
              onPress={() =>
                navigation.navigate("LandingScreen", { Username: null })
              } //changed onclick to go to landingscreen
            >
              <Text style={([styles.loginText], { color: "black" })}>
                Continue without account
              </Text>
            </Pressable>
          </View> */}
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
                            onPress={() =>
                                navigation.navigate('RegistarScreenT')
                            }
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

export default SigninScreen;
