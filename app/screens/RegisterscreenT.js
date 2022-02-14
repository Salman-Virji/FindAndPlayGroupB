
import {
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import React, { useState } from 'react';
function VerifyFormFilled(Username,Password,Email,ConfirmPassword)
{
    console.log(Username)
    console.log(Password)
    console.log(Email)
    console.log(ConfirmPassword)
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
               <Text onPress={()=>VerifyFormFilled(Username,Password,Email,ConfirmPassword)} style = {styles.RegisterBtn}> Sign up</Text>
               <View style={styles.HomeView}>
               <Text style={{fontSize:25}} >Already Have an Account? </Text>
               <Text style={styles.HomeBtn}   onPress ={() => navigation.navigate('SigninScreenT')}>Login</Text>
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
    left:"20%",
    top:"10%"
    
    
  },
  SignupTxT: {
    position:"relative",
      left:"25%",
      top:"-15%",
      fontSize:50,
      color:"white",
      fontWeight:"bold",
  },
    background: {
        resizeMode:"contain", 
        width:"100%",
        height:"100%"
    },
      input :{
          fontSize:40,
        paddingLeft:10,
        marginTop:"5%",
        width:"80%",
        height: "7%",
        top:"-16%",
        color:"white",
        borderColor: 'white',
        borderWidth: 1,    
        borderRadius: 15,   
      },
      RegisterBtn :{
        zIndex: 999, // brings forward 
        left:"25%",
        width:"25%",
        height:"7%",
        top:"-13%",
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

