//Installing expo checkbox as react native doesn't provide checkbox out of the box anymore.
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import axios from "axios";

//Importing whatever components are required from react native
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
} from "react-native";

//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("pass");
  const [message, setMessage] = useState("");
  const [isSelected, setSelection] = useState(false);

  function clearFields() {
    setUsername("");
    setPassword("");
  }

  function Login() {
    const body = {
      username: username,
      password: password,
    };

    var url = `http://10.0.0.180:3000/users/login`; //Replace by your IP address

    axios
      .post(url, body, navigation)
      .then((res) => {
        console.log(res.data);
        clearFields();
        setMessage(res.data.msg);

        if (res.data.status == true) {
          navigation.navigate("LandingScreen", res.data);
        }
      })
      .catch((err) => console.log("error"));
  }

  function SignUp() {
    const body = {
      username: username,
      password: password,
    };
    if (username != "" || password != "") {
      var url = `http://10.0.0.180:3000/users/signup`; //Replace by your IP address
      axios
        .post(url, body)
        .then(() => {
          clearFields();
          setMessage("Username is taken");
        })
        .catch((err) => console.log("err"));
    } else {
      console.log("Empty space");
    }
  }

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
          <Image
            style={styles.logo}
            source={require("../assets/Logo/logo1.png")}
          />
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
            placeholder="   Username or Email"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
          <TextInput
            style={styles.input2}
            underlineColorAndroid="transparent"
            placeholder="   Password"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: width * 0.6,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              style={styles.checkbox}
              value={isSelected}
              onValueChange={setSelection}
              //color={true ? "#4630EB" : undefined}
            />
            <Text
              style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}
            >
              {" "}
              Remember me!
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("ForgotPasswordTablet")}
            >
              Forgot Password ?{" "}
            </Text>
          </View>
        </View>
        <View style={styles.loginbuttonContainer}>
          <View>
            {/* Pressable makes the area Pressable */}
            <Pressable
              style={styles.loginButton}
              onPress={() => navigation.navigate("LandingScreen")} //changed onclick to go to landingscreen
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={styles.btnWithoutAccount}
              onPress={() => navigation.navigate("LandingScreen")} //changed onclick to go to landingscreen
            >
              <Text style={([styles.loginText], { color: "black" })}>
                Continue without account
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.signupbuttonContainer}>
          <Text style={{ bottom: 10, fontWeight: "bold", fontSize: 20 }}>
            Not registered?
          </Text>

          <Pressable
            style={styles.btnSignup}
            onPress={() => console.log("Pressed")}
          >
            <Text
              style={([styles.loginText], { fontSize: 15 })}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Continue without account
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "contain",
    flex: 1,
  },
  logo: {
    top: "10%",
    width: "100%",
    height: "100%",
  },
  signintext: {
    fontSize: 50,

    color: "white",
    fontWeight: "bold",
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
});

export default SigninScreen;
