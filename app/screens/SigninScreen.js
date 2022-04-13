/** @Added By Backend Team - 22nd March */
//import BackendQuery from "../config/Axios";

//Installing expo checkbox as react native doesn't provide checkbox out of the box anymore.
import Checkbox from "expo-checkbox";
import React, { useState } from "react";

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
} from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AuthContext } from "../contexts/AuthContext";
import { Loading } from "./LoadingScreen";
//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box

const { width } = Dimensions.get("window");

function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("faizan"); // For testing
  const [password, setPassword] = useState("123456"); // For testing
  const [message, setMessage] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [validMsg, setValidmsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  return (
    //Setting background
    <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background2.png")}
    >
      {/* //View is like a div in html */}
      <View style={styles.inputContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
            margin: 100,
          }}
        >
          <Text style={styles.logo}> Find & Play</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* To use text we have to use Text component */}
          <Text style={styles.signintext}> Sign-In </Text>

          {/* TextInput is like input box */}

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username or Email"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />

          {emailError.length > 0 ? (
            <Text style={styles.inputValiation}>{emailError}</Text>
          ) : null}

          <TextInput
            style={styles.input2}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            value={password}
            secureTextEntry={false}
            onChangeText={(e) => setPassword(e)}
          />

          {passwordError.length > 0 ? (
            <Text style={styles.inputValiation}>{passwordError}</Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: "row",
            width: width * 0.6,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}></View>
          <View style={{}}>
            <Text
              style={{
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              Forgot Password ?{" "}
            </Text>
          </View>
        </View>
        <Text> {validMsg} </Text>
        <View style={styles.loginbuttonContainer}>
          <View>
            {/* Pressable makes the area Pressable */}
            <Pressable
              style={styles.loginButton}
              onPress={async () => {
                try {
                  let validate = true;
                  if (username.length == 0) {
                    validate = false;
                    setEmailError("Username or email is required");
                  } else setEmailError("");

                  if (password.length == 0) {
                    validate = false;
                    setPasswordError("Password is required");
                  } else setPasswordError("");

                  if (validate == false)
                    throw new Error("Username or password is incorrect");
                  setLoading(true);
                  await login(username, password);
                } catch (e) {
                  setLoading(false);
                  console.log(e);
                  Alert.alert("Error => " + e);
                }
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.signupbuttonContainer}>
          <Text style={{ bottom: 10, fontWeight: "bold", fontSize: 20 }}>
            Not registered?
          </Text>

          <Pressable style={styles.btnSignup}>
            <Text
              style={([styles.loginText], { fontSize: 15 })}
              onPress={() => {
                try {
                  setLoading(true);
                  navigation.navigate("RegisterScreen");
                  setLoading(false);
                } catch (e) {
                  setLoading(false);
                  Alert.alert("Error=> " + e);
                }
              }}
            >
              Create an account
            </Text>
          </Pressable>
         
        </View>
      </View>
      <Loading loading={loading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "contain",
    flex: 1,
  },
  logo: {
    //text css
    //fontSize: 120,
    fontSize: RFPercentage(10),
    top: "45%",
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
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
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  forgotpasstext: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 190,
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
    width: width * 0.6,
    height: 50,
    borderColor: "#fff",
    borderWidth: 3,
    color: "#fff",
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input2: {
    marginBottom: 15,
    width: width * 0.6,
    height: 50,
    borderColor: "#fff",
    borderWidth: 3,
    color: "#fff",
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginButton: {},

  logintext: {
    zIndex: 999, // brings forward
    paddingLeft: "43%",
    color: "white",
    top: "45%",
    fontSize: 30,
    fontWeight: "bold",
  },
  loginbuttonContainer: {
    flex: 1,
    width: width * 0.6,
    justifyContent: "center",
  },

  signuptext: {
    zIndex: 999, // brings forward

    bottom: "58%",
    paddingLeft: "41%",
    fontWeight: "bold",
    color: "white",
  },
  notregisteredtext: {
    color: "black",

    paddingLeft: "35%",
    bottom: "63%",
    fontSize: 12,
  },
  signupbuttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    justifyContent: "center",
  },

  trialButton: {
    width: 100,
    height: 50,
    backgroundColor: "#fc5c65",
  },

  googlelogo: {
    width: 40,
    height: 40,

    bottom: 20,
  },
  googleText: {
    fontSize: 10,
    top: "-15%",
    fontWeight: "bold",
  },

  googlelogoContainer: {
    flex: 2,
    top: "30%",
    height: 20,
    alignItems: "center",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#50A4FF",
    width: "100%",
    height: 60,
    shadowColor: "rgba(46, 229, 157, 0.4)",
  },
  loginText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  btnSignup: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#FF6551",
    width: "70%",
    fontSize: 20,
    height: 60,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
  },
  btnWithoutAccount: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#FFE551",
    width: "70%",
    height: 60,

    shadowColor: "rgba(46, 229, 157, 0.4)",
  },
  checkbox: {
    alignSelf: "center",
  },
  inputValiation: {
    alignContent: "flex-start",
    left: 15,
    color: "black",
    fontSize: 16,
  },
});

export default SigninScreen;
