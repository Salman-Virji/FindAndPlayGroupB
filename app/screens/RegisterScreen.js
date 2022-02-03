import React, { useState } from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { TextInput,Form } from 'react-native';
import Popup from '../components/Popup';

function VerifyFormFilled(Username,Password,Email,ConfirmPassword)
{
    console.log(Username)
    console.log(Password)
    console.log(Email)
    console.log(ConfirmPassword)
}
export default function RegisterScreen({navigation}) {
    const [Username ,SetUsername] = useState("Username");
    const [Email ,SetEmail] = useState("Email");
    const [Password ,SetPassword] = useState("Password");
    const [ConfirmPassword ,SetConfirmPassword] = useState("Confirm Password");
    return (
        
        <ImageBackground style={styles.background} source={require("../assets/BGs/background2.png")}>
         <Image style={styles.logo} source={require("../assets/Logo/logo1.png")}></Image>
          <View style={styles.Signup} >
           <TextInput style = {styles.input}
                    onChangeText={(e) => SetUsername(e)}
                    underlineColorAndroid = "transparent"
                    placeholderTextColor = "#808080"
                    autoCapitalize = "none"
                    placeholder = "Username"
               /> 
               <TextInput style = {styles.input}
               onChangeText={(e) => SetEmail(e)}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#808080"
                autoCapitalize = "none"
            />
                    <TextInput style = {styles.input}
                onChangeText={(e) => SetPassword(e)}                       
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
                <TextInput style = {styles.input}
               onChangeText={(e) => SetConfirmPassword(e)}
               underlineColorAndroid = "transparent"
               placeholder = "Confirm Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
               <Text onPress={VerifyFormFilled(Username,Password,Email,ConfirmPassword)} style = {styles.RegisterBtn}> Register </Text>
               <Image style={styles.RegisterBtnBk} source={require("../assets/Btn/bluepillbutton.png")}></Image>
                </View>
                <View style={styles.googlelogoContainer}>
              <Image  style={styles.googlelogo} source={require("../assets/Btn/circlegoogle.png")}></Image>
              <Text style={styles.googleText}>Sign in with Google</Text>
           </View>
            <View  style={styles.trialButton}>
                    
                <Text  onPress ={() => navigation.navigate('SigninScreen')}>Click to go back to sign in </Text>
            </View>


        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 350,
    height: 100,
   
    bottom: "47%"
    

  },
    background: {
        resizeMode:"contain", 
      flex: 1,
      justifyContent:"flex-end",
      alignItems: "center",
     
    },

    trialButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fc5c65",
      },
      input :{
      
        margin: 15,
        width:330,
        height: 40,
        top:"5%",
        borderColor: 'black',
        borderWidth: 1,
       
        backgroundColor: "white",
        borderRadius: 15,
        
      },
      Signup :{
        
        top:"3%",
            flex: 1, 
             
           
      }, googlelogo: {
        width: 40,
        height: 40,
       
        bottom: 20,
        
       
      },
      googleText:{
        fontSize:10,
        top:"-5%",
        fontWeight:"bold",
       
      },

      googlelogoContainer: {
        flex: 2,
        top: "35%",
        height: 20,
        alignItems: "center",
         

      },
      RegisterBtn :{
        zIndex: 999, // brings forward 
        paddingLeft:"33%",
        color:"white",
        top:"25%",
        fontSize: 20,
        fontWeight:"bold",
      },
      RegisterBtnBk:{
          top:"-10%"
      }
})

