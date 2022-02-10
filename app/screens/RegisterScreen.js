import React, { useState } from 'react';
import axios from 'axios';
import {
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function clearFields() {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function SignUp() {
        const body = {
            username: username,
            email: email,
            password: password,
        };
        if (username != '' || password != '') {
            var url = `http://10.0.0.168:3000/users/signup`;
            axios
                .post(url, body, navigation)
                .then(() => {
                    navigation.goBack();
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/BGs/background2.png')}
        >
            <View style={[styles.inputContainer, { flexDirection: 'column' }]}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        style={[styles.logo]}
                        source={require('../assets/Logo/logo1.png')}
                    ></Image>
                </View>
                <View
                    style={{
                        flex: 2,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Text style={styles.createaccounttext}>
                        Create Account{' '}
                    </Text>

                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='   Username '
                        placeholderTextColor='#808080'
                        autoCapitalize='none'
                        value={username}
                        onChangeText={(e) => setUsername(e)}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='   Email'
                        placeholderTextColor='#808080'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />

                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='   Password'
                        placeholderTextColor='#808080'
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                    />
                    {/*
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   Re-enter Password"
            placeholderTextColor="#808080"
            autoCapitalize="none"
            onChangeText ={e => setPassword(e)}
          />
          */}
                </View>
                <View style={[styles.loginbuttonContainer, { flex: 1 }]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={SignUp}>
                        {/*} onPress={()=>{navigation.navigate('SigninScreen')}} */}

                        <Text style={styles.logintext}>Sign-up</Text>

                        <Image
                            style={styles.loginButton}
                            source={require('../assets/Btn/bluepillbutton.png')}
                        ></Image>
                    </TouchableOpacity>

                    {/* <Image onPress ={() => navigation.navigate('LandingScreen')} style={styles.loginButton} source={require("../assets/Btn/bluepillbutton.png")}></Image> */}
                    {/* <View style={styles.loginButton}></View> */}
                </View>
                <View style={[styles.googlelogoContainer, { flex: 1 }]}>
                    <Image
                        style={styles.googlelogo}
                        source={require('../assets/Btn/circlegoogle.png')}
                    ></Image>
                    <Text style={styles.googleText}>Sign in with Google</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        resizeMode: 'contain',
    },
    signuptext: {
        flex: 1,
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },

    input: {
        width: 330,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,

        backgroundColor: 'white',
        borderRadius: 15,
    },
    inputContainer: {
        flex: 1,
        top: '5%',
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
    loginbuttonContainer: { top: -30 },

    createaccounttext: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },

    googlelogo: {
        width: 40,
        height: 40,

        bottom: 20,
    },
    googleText: {
        fontSize: 10,
        top: '-5%',
        fontWeight: 'bold',
    },

    googlelogoContainer: {
        alignItems: 'center',
    },
});

//export default RegisterScreen;
