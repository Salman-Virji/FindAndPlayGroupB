import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';




 function SigninScreen( {navigation}) {
  
    return (
       <ImageBackground  style={styles.background} source={require("../assets/BGs/background1.png")}>
           <View style={styles.googlelogoContainer}>
          
           <Image  style={styles.googlelogo} source={require("../assets/Logo/googlelogo.png")}></Image>
           <Text >Sign in with Google</Text>
           </View>
           
           
           <Image style={styles.logo} source={require("../assets/Logo/logo1.png")}></Image>
           <View style={styles.loginButton}></View>
           
           <View  style={styles.trialButton}>
             <Text onPress ={() => navigation.navigate('RegisterScreen')}>Click to Page switch to RegisterScreen test</Text>
           </View>
           <View style={styles.signupButton}></View>

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
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: "#0096FF",
        
       
      },
      signupButton: {
        width: '100%',
        height: 70,
        backgroundColor: "#fc5c65",

       
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
        top: 30

       
        

       
      },
      googlelogo: {
        width: 100,
        height: 100,
        position: "absolute",
        bottom: 20,
       
      },

      googlelogoContainer: {
        
          position: "absolute",
          alignItems: "center",
          top: 300,

      }
})

export default SigninScreen;