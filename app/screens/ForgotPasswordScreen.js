import React, { useState, Component } from "react";
import axios from "axios";

import {
  TextInput,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  View,
} from "react-native";

import { Dimensions } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Loading } from "./LoadingScreen";
const { width, height } = Dimensions.get("window");

function ForgotPasswordScreen({ navigation }) {
  const [validMsg, setValidmsg] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmailError] = useState("");
  const { forgotPassword } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background2.png")}
    >
      <View style={styles.inputContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
            margin: 100,
          }}
        >
          {/* Find and play logo */}
          <Text style={styles.logo}> Find & Play</Text>
          {/* <Image
            
            source={require("../assets/Logo/logo1.png")}
          /> */}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Reset password Header  */}
          <Text style={styles.resetpasstext}> Reset Password </Text>

          {/* email or password input box  */}
          <TextInput
            editable={true}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Provide your email address"
            value={username}
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={(e) => setUsername(e)}
          />
        </View>
        {/* Reset password message  */}

        <Text style={styles.resetpassmsg}>
          {validMsg}
          {/* {" "}
          If this is a valid account you will get a email reset{" "} */}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: width * 0.6,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.loginbuttonContainer}>
            {/* Send request button  */}
            <Pressable
              style={styles.btnSendrequest}
              onPress={async () => {
                try {
                  if (username.length == 0) {
                    throw new Error("Email is required");
                  }

                  await forgotPassword(username);
                } catch (e) {
                  Alert.alert("Error =>" + e);
                }
              }}
            >
              <Text
                style={{
                  bottom: 1,
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
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
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              textShadowColor: "rgba(0, 0, 0, 1)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            Try Again?
          </Text>

          <Pressable
            style={styles.btnSignin}
            onPress={() => {
              try {
                setLoading(true);
                navigation.navigate("SigninScreen");
              } catch (e) {
                setLoading(false);
                Alert.alert("Error=> " + e);
              }
            }} //navigates to signinscren
          >
            <Text
              style={{
                bottom: 1,
                fontWeight: "bold",
                fontSize: 18,
                color: "white",
              }}
            >
              Login
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
    fontSize: 120,
    top: "45%",
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
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
    bottom: "15%",
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  logintext: {
    zIndex: 999, // brings forward
    paddingLeft: "43%",
    color: "white",
    top: "25%",
    fontSize: 30,
    fontWeight: "bold",
  },
  loginbuttonContainer: {
    flex: 1,
    width: width * 0.6,
    justifyContent: "center",
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

  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: "5%",
  },
  loginButton: {},
  resetpassmsg: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
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
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    justifyContent: "center",
    bottom: "-11%",
  },
  btnSendrequest: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#50A4FF",
    width: "70%",
    fontSize: 20,
    height: 60,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
  },
  btnSignin: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#FF6551",
    width: "70%",
    fontSize: 20,
    height: 60,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
    bottom: "2%",
  },
});

export default ForgotPasswordScreen;
