import {
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import React, { useState } from "react";
function SignUp(username, password, email, navigation) {
  const body = {
    username: username,
    email: email,
    password: password,
  };
  if (username != "" || password != "") {
    var url = `http://10.0.0.168:3000/users/signup`;
    axios
      .post(url, body, navigation)
      .then(() => {
        navigation.navigate("SigninScreen");
      })
      .catch((err) => console.log(err));
  }
}

export default function RegisterScreenT({ navigation }) {
  // set use state hooks to track singup form input
  const [Username, SetUsername] = useState("Username");
  const [Email, SetEmail] = useState("Email");
  const [Password, SetPassword] = useState("Password");
  const [ConfirmPassword, SetConfirmPassword] = useState("Confirm Password");
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background2.png")}
    >
      {/* <Image
            style={styles.logo}
            source={require("../assets/Logo/logo1.png")}
          /> */}
      <Text style={styles.logo}> Find & Play</Text>

      <View
        style={{
          top: "10%",
          height: height * 0.8,
          width: width * 0.9,
          padding: 5,
          paddingTop: 5,
          justifyContent: "center",
          left: "15%",
        }}
      >
        <Text style={styles.SignupTxT}> Sign up</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => SetUsername(e)}
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Username"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => SetEmail(e)}
          placeholder="Email"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => SetPassword(e)}
          placeholder="Password"
          placeholderTextColor="#808080"
          autoCapitalize="none"
          placeholderTextColor="#fff"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => SetConfirmPassword(e)}
          placeholder="Confirm Password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />

        {/* <Text onPress={()=>SignUp(Username,Password,Email,navigation)} style = {styles.RegisterBtn}> Sign up</Text> */}
        <View style={styles.HomeView}>
          <Text  style={{
              bottom: 40,
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              textShadowColor: "rgba(0, 0, 0, 1)",
              textShadowOffset: { width: -1, height:1 },
              textShadowRadius: 10,
              left:"5%"
            }}>Already Have an Account? </Text>
          {/* <Text
            style={styles.HomeBtn}
            onPress={() => navigation.navigate("SigninScreen")}
          >
            Login
          </Text> */}
        </View>
      </View>

      {/* Sign up button */}
      <View style={styles.registerbuttonContainer}>
        <Pressable
          style={styles.RegisterBtn}
          onPress={() => SignUp(Username, Password, Email, navigation)}
        >
          <Text
            style={{
              bottom: 1,
              fontWeight: "bold",
              fontSize: 18,
              color: "white",
            }}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
            {/* Login button */}
      <View style={styles.loginbuttonContainer}>
        <Pressable
          style={styles.btnSignin}
          onPress={() => navigation.navigate("SigninScreen")} //navigates to signinscren
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  HomeBtn: {
    position: "relative",
    padding: 7,
    paddingLeft: 25,
    left: "10%",
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    backgroundColor: "#FF6551",
    borderRadius: 50,
    width: "20%",
  },
  HomeView: {
    position: "relative",
    left: "18%",
    top: "15%",
  },
  loginbuttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: 300,
    justifyContent: "center",
    bottom:"6%",
    left:"32%"
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
  SignupTxT: {
    position: "relative",
    left: "20%",
    top: "-15%",
    fontSize: 65,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  background: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  input: {
    marginBottom: 20,
    left: "5%",
    top: "-8%",
    width: width * 0.6,
    height: "6%",
    borderColor: "#fff",
    borderWidth: 3,
    color: "#fff",
    borderRadius: 20,
    fontSize: 25,
    paddingLeft: 17,
    paddingRight: 15,
    position: "relative",
  },

  registerbuttonContainer: {
    flex: 1,
    width: width * 0.6,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bottom: "21%",
    left: "20%",
  },
  RegisterBtn: {
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
  logo: {
    //text css
    fontSize: 120,
    top: "15%",
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    left: "10%",

    // image css
    // top: "10%",
    // width: "100%",
    // height: "100%",
    // resizeMode: "contain",
  },
});
