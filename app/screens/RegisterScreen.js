import React from 'react';
import {Image,TextInput,TouchableOpacity, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

function RegisterScreen({navigation}) {
    return (
        <ImageBackground style={styles.background} source={require("../assets/BGs/background2.png")}>
            
            
            <View style={styles.inputContainer}>
         
            <Text style={styles.createaccounttext}>Create Account </Text>
        
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "   Username "
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
               <TextInput style = {styles.input2}
               underlineColorAndroid = "transparent"
               placeholder = "   Email"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />

               <TextInput style = {styles.input3}
               underlineColorAndroid = "transparent"
               placeholder = "   Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />
               <TextInput style = {styles.input4}
               underlineColorAndroid = "transparent"
               placeholder = "   Re-enter Password"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               />

</View>

  
           <View style={styles.googlelogoContainer}>
              <Image  style={styles.googlelogo} source={require("../assets/Btn/circlegoogle.png")}></Image>
              <Text style={styles.googleText}>Sign in with Google</Text>
           </View>
           <Image style={styles.logo} source={require("../assets/Logo/logo1.png")}></Image>
           
           
           
           <View  style={styles.loginbuttonContainer}  >
              <TouchableOpacity activeOpacity = { .6 } onPress ={() => navigation.navigate('SigninScreen')}>
               <Text style={styles.logintext} >Sign-up</Text>
                <Image style={styles.loginButton} source={require("../assets/Btn/bluepillbutton.png")}></Image>
                
             
              {/* <Image onPress ={() => navigation.navigate('LandingScreen')} style={styles.loginButton} source={require("../assets/Btn/bluepillbutton.png")}></Image> */}
              {/* <View style={styles.loginButton}></View> */}
              
              </TouchableOpacity>
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
  logo: {
    flex: 1,
    width: 350,
    height: 100,
   
    bottom: "40%"
    

  },
  signuptext:{
    flex: 1,
    
    top:"50%",
    fontSize:30,
    color:"white",
    fontWeight:"bold",
    
    

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
  input2 :{
    
    margin: 15,
    width:330,
    height: 40,
    top:"-10%",
    borderColor: 'black',
    borderWidth: 1,
   
    backgroundColor: "white",
    borderRadius: 15,
    
  },
  input3 :{
    
    margin: 15,
    width:330,
    height: 40,
    top:"-25%",
    borderColor: 'black',
    borderWidth: 1,
   
    backgroundColor: "white",
    borderRadius: 15,
    
  },
  input4 :{
    
    margin: 15,
    width:330,
    height: 40,
    top:"-40%",
    borderColor: 'black',
    borderWidth: 1,
   
    backgroundColor: "white",
    borderRadius: 15,
    
  },
  inputContainer:{
   
   flex: 1, 
   top:"25%",
    
  },
  loginButton:{
    
    
   
    
  },
  
    logintext:{
       zIndex: 999, // brings forward 
       paddingLeft:"43%",
       color:"white",
       top:"45%",
       fontSize: 20,
       fontWeight:"bold",
      
    },
    loginbuttonContainer:{
      
    
      flex: 2,
       top: "-15%",
       
      
      
    },


    createaccounttext: {
      zIndex: 999, // brings forward 
      paddingLeft:"30%",
      bottom:"-15%",
      fontWeight:"bold",
      color:"white",
      fontSize:20,
    },
   
    

   
    googlelogo: {
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
      top: "70%",
      height: 20,
      alignItems: "center",
       

    }
})

export default RegisterScreen;