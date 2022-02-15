import React from "react";

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
} from "react-native";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

function ForgotPasswordTablet({ navigation }) {
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
          {/* Reset password Header  */}
          <Text style={styles.resetpasstext}> Reset Password </Text>

          {/* email or password input box  */}
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="   Username or Email"
            placeholderTextColor="#fff"
            autoCapitalize="none"
          />
        </View>
        {/* Reset password message  */}

        <Text style={styles.resetpassmsg}>
          {" "}
          If this is a valid account you will get a email reset{" "}
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
              onPress={() => console.log("Send Request Pressed")}
            >
              <Text
                style={{
                  bottom: 1,
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "black",
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
            }}
          >
            Try Again?
          </Text>

          <Pressable
            style={styles.btnSignin}
            onPress={() => navigation.navigate("SigninScreenT")}
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
    resizeMode: "contain",
  },
  resetpasstext: {
    fontSize: 50,
    bottom: "15%",
    color: "white",
    fontWeight: "bold",
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
    width: width * 0.6,
    justifyContent: "center",
  },

  input: {
    marginTop: 55,
    width: width * 0.6,
    height: 40,
    bottom: "30%",
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    borderRadius: 15,
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
  },
  btnSendrequest: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#FFE551",
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
    backgroundColor: "#50A4FF",
    width: "70%",
    fontSize: 20,
    height: 60,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
  },
});

export default ForgotPasswordTablet;
