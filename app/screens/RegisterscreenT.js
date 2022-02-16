
import {
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import axios from 'axios';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import React, { useState } from 'react';
function SignUp(username,password,email,navigation) {
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
            navigation.navigate('SigninScreen');
          })
          .catch((err) => console.log(err));
  }
}

export default function RegisterScreenT({navigation}) {
  // set use state hooks to track singup form input
    const [Username ,SetUsername] = useState("Username");
    const [Email ,SetEmail] = useState("Email");
    const [Password ,SetPassword] = useState("Password");
    const [ConfirmPassword ,SetConfirmPassword] = useState("Confirm Password");
    return (
        
        <ImageBackground style={styles.background} source={require("../assets/BGs/background2.png")}>
              <Image
            style={styles.logo}
            source={require("../assets/Logo/logo1.png")}
          />
         
          <View style={{
              top:"10%",
            height:height*0.8,  
            width: width *0.9 ,
            padding:5,
            paddingTop:5,
            justifyContent: "center",
            left:"15%"
          }} >
             <Text style= {styles.SignupTxT}> Sign up</Text>
           <TextInput style = {styles.input}
                    onChangeText={(e) => SetUsername(e)}
                    placeholderTextColor = "#808080"
                    underlineColorAndroid="transparent"
                    autoCapitalize = "none"
                    placeholder = "Username"
                    placeholderTextColor="#fff"
               /> 
               <TextInput style = {styles.input}
               onChangeText={(e) => SetEmail(e)}
                placeholder = "Email"
                placeholderTextColor = "#808080"
                autoCapitalize = "none"
                placeholderTextColor="#fff"
            />
                    <TextInput style = {styles.input}
                onChangeText={(e) => SetPassword(e)}                       
               placeholder = "Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               placeholderTextColor="#fff"
               secureTextEntry={true}
               />
                <TextInput style = {styles.input}
               onChangeText={(e) => SetConfirmPassword(e)}
               placeholder = "Confirm Password"
               placeholderTextColor = "#808080"
               secureTextEntry={true}
               autoCapitalize = "none"
               placeholderTextColor="#fff"
               />
               <Text onPress={()=>SignUp(Username,Password,Email,navigation)} style = {styles.RegisterBtn}> Sign up</Text>
               <View style={styles.HomeView}>
               <Text style={{fontSize:25}} >Already Have an Account? </Text>
               <Text style={styles.HomeBtn}   onPress ={() => navigation.navigate('SigninScreen')}>Login</Text>
               </View>
                </View> 
               
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
  HomeBtn:{
    position:"relative",
    padding:7,
    paddingLeft:25,
    left:"10%",
    color:"white",
    fontSize: 35,
    fontWeight:"bold",
    backgroundColor:"#FF6551",
    borderRadius:50,
    width:"20%",
  },
  HomeView:{
    position:"relative",
    left:"18%",
    top:"15%"
    
    
  },
  SignupTxT: {
    position:"relative",
      left:"20%",
      top:"-15%",
      fontSize:65,
      color: "white",
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 1)",
      textShadowOffset: { width: -1, height:1 },
      textShadowRadius: 10,
  },
    background: {
        resizeMode:"contain", 
        width:"100%",
        height:"100%"
    },
    input: {
      marginBottom: 20,
      left:"5%",
      top:"-8%",
      width: width * 0.6,
      height:"6%",
      borderColor: "#fff",
      borderWidth: 3,
      color: "#fff",
      borderRadius: 20,
      fontSize: 25,
      paddingLeft: 17,
      paddingRight: 15,
      position:"relative"
    },
      RegisterBtn :{
        zIndex: 999, // brings forward 
        left:"24%",
        top:"-5%",
        width:"25%",
        height:"7%",
        paddingLeft:7,
        paddingTop:5,
        color: "#fff",
        fontSize: 40,
        fontWeight:"bold",
        backgroundColor:"#50a4ff",
        borderRadius:50
      },
      logo: {
          top:"7%",
        width:"90%",
        left:"5%",
        height:"12%"
      },
})

