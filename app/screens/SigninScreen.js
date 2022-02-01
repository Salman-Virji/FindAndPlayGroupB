import React from 'react';
import {TextInput,Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
//import { TextInput, TouchableOpacity } from 'react-native-web';




 function SigninScreen( {navigation}) {
  
    return (
       <ImageBackground  style={styles.background} source={require("../assets/BGs/background1.png")}>
         <View style={styles.inputContainer}></View>
         <Text style={styles.signintext}> Sign-In </Text>
         <Text style={styles.forgotpasstext}> Forgot Password ? </Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "   Username or Email"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
               <TextInput style = {styles.input2}
               underlineColorAndroid = "transparent"
               placeholder = "   Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
           <View style={styles.googlelogoContainer}>
              <Image  style={styles.googlelogo} source={require("../assets/Btn/smallgoogle2.png")}></Image>
              <Text style={styles.googleText}>Sign in with Google</Text>
           </View>
           <Image style={styles.logo} source={require("../assets/Logo/logo1.png")}></Image>
           <View style={styles.loginbuttonContainer}>
              <View style={styles.loginButton}></View>
              <Text onPress ={() => navigation.navigate('LandingScreen')} style  = {styles.logintext}> Login </Text>
           </View>
          
           
           
           <View style={styles.signupbuttonContainer} >
           <Text> Not Registered ? </Text> 
                <Text  onPress ={() => navigation.navigate('RegisterScreen')} style = {styles.signuptext}> Sign Up </Text>
                <View style={styles.signupButton}></View>
           </View>
          

       </ImageBackground>
    );
}

const styles = StyleSheet.create({
      background: {
      resizeMode:"contain", 
      flex: 1,
      justifyContent:"flex-end",
      alignItems: "center",
     
    },
    signintext:{
      zIndex: 999,
      bottom:500,
      fontSize:30,
      color:"white",
      fontWeight:"bold",
      

    },
    forgotpasstext:{
      zIndex: 999,
      paddingLeft:190,
      bottom:380,
      fontSize:10,
      color:"black",
      fontWeight:"bold",
      

    },
    input :{
      margin: 15,
      width:330,
      height: 40,
      bottom:450,
      borderColor: 'black',
      borderWidth: 1,
      position:"absolute",
      backgroundColor: "white",
      borderRadius: 20,
      
    },
    input2 :{
      margin: 15,
      width:330,
      height: 40,
      bottom:380,
      borderColor: 'black',
      borderWidth: 1,
      position:"absolute",
      backgroundColor: "white",
      borderRadius: 20,
      
    },
    inputContainer:{
      position: "absolute",
      flex: 2,
      
    },
    loginButton: {
        width: '50%',
        height: 45,
        bottom:200,
        backgroundColor: "#0096FF",
        borderRadius: 30,
        borderWidth: 1,
        
       
      },
      logintext:{
        zIndex: 999, // brings forward 
        position: "absolute",
        bottom:215,
      },
      loginbuttonContainer:{
        position: "absolute",
        alignItems: "center",
        top: 700,
        width:400,
      },

      signupButton: {
        width: '30%',
        height: 40,
        backgroundColor: "#FF6551",
        borderRadius: 30,
        borderWidth: 1,
        

       
      },
      signuptext: {
        zIndex: 999, // brings forward 
        position: "absolute",
        top:30,
      },
      signupbuttonContainer: {
        
        position: "absolute",
        alignItems: "center",
        top: 700,
        width:400,

    },

      trialButton: {
        width: 100,
        height: 50,
        backgroundColor: "#fc5c65",

       
      },
      logo: {
        width: 400,
        height: 100,
        position: "absolute",
        top: 60

       
        

       
      },
      googlelogo: {
        width: 40,
        height: 40,
        position: "absolute",
        bottom: 20,
        
       
      },
      googleText:{
        fontSize:10,
        position: "absolute",
      },

      googlelogoContainer: {
        
        height: 20,
          position: "absolute",
          alignItems: "center",
          top: 650,

      }
})

export default SigninScreen;