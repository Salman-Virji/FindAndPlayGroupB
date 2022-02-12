import React, {useState} from 'react';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import {TextInput,Image, ImageBackground, Pressable, StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity } from 'react-native';


function LandingScreen({navigation}) {
    return (
        <ImageBackground style={styles.background} source={require("../assets/BGs/background1.png")}>
        
            {/* touchableOpacity buttons */} 

            {/*settings button*/}
        <TouchableOpacity  style ={styles.settingBtnContainer}>
            <Image
                source={require('../assets/icons/settings2.png')} 
            />
            <Text style = {styles.loutoutBtnText}>Settings</Text> 
        </TouchableOpacity>

            {/*logout button*/}
        <TouchableOpacity onPress ={() => navigation.navigate('SigninScreenT')} style ={styles.logoutBtnContainer}>
            <Image
                source={require('../assets/icons/logoutIcon.png')} 
            /> 
            <Text onPress ={() => navigation.navigate('SigninScreenT')} style = {styles.loutoutBtnText}>Logout</Text>
        </TouchableOpacity>

             {/*FACTS banner*/}
        <View style = {styles.funFactContainer}>
             <Text style = {styles.funFactContainerText}>Fun Facts</Text>  
         </View>

             {/*facts image/details*/}
         <View style = {styles.factCard}>
            <Image
                source={require('../assets/factSlides/penguin2.jpg')}
                style ={styles.factImg} 
            /> 
            <Text style={styles.factText}>
                Did you know..
                {"\n"}
                {"\n"}
                The black and white “tuxedo” look donned by most penguin species is a clever camouflage called countershading.</Text>
         </View>

            {/*profile/play/feed buttons*/}

            {/*profile button*/}
        <View style = {styles.profilePlayFeedContainer}>

            <TouchableOpacity style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/profileIcon.png')} 
            />
                <Text style={styles.ppfText}>Profile</Text>
            </TouchableOpacity>

            {/*play button*/}  
            <TouchableOpacity style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/controllerIcon.png')} 
            />
                <Text style={styles.ppfText}>Play</Text>
            </TouchableOpacity>

             {/*feed button*/}
            <TouchableOpacity style={styles.ppfBtnImg}>
            <Image
                source={require('../assets/icons/feedIcon.png')} 
            />
                <Text style={styles.ppfText}>Feed</Text>
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

    
   //fact title styling
    funFactContainer:{
        zIndex: 999, 
        position: "absolute",
        bottom:990,
        alignItems:"center",
        backgroundColor: "#FFE551",
        paddingLeft:145,
        paddingRight:145,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:20
      },

    funFactContainerText:{
        fontWeight:"bold",
        fontSize:45,
    },

     //text styling for ppf (profile play feed)
    ppfText:{
        zIndex: 999, 
        alignItems:"center",
        borderRadius:20,
        marginRight:40,
        marginLeft:40,
        fontSize:25,
        color:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    profilePlayFeedContainer:{
        zIndex: 999, 
        position: "absolute",
        bottom:25,
        alignItems:"center",
        flexDirection:"row",
    },

    //logout button
    logoutBtnContainer:{ 
        zIndex: 999, 
        position:'absolute',
        top:65,
        left:30,
        alignItems:"center",
        backgroundColor: "#FFE551",
        padding:15,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    loutoutBtnText:{
        fontSize:20,
        fontWeight:'normal',
        color:"#000000"
    },

    //settings button 
    settingBtnContainer:{ 
        zIndex: 999, 
        position:'absolute',
        top:65,
        right:30,
        alignItems:"center",
        backgroundColor: "#FFE551",
        padding:15,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

   ppfBtnImg:{ //ppf (profile play feed) button styling 
    zIndex: 999, 
    bottom:25,
    alignItems:"center",
    backgroundColor: "#50A4FF",
    padding:15,
    borderRadius:20,
    marginRight:40,
    marginLeft:40,
    fontSize:30,
    color:"#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
   },

   factCard:{ //styling for fact card, might need to change this when functionality is added
    zIndex: 999, 
    bottom:450,
    alignItems:"center",
    backgroundColor: "#50A4FF",
    padding:0,
    borderRadius:100,
    width:700,
    height:500,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 30,
   },

   //styling for image
   factImg:{ 
       borderRadius:20,
       width:700,
       height:245,
       borderRadius: 150 / 2,
       overflow: "hidden",
       borderWidth: 7,
       borderColor: "black",
       borderRadius:100, 
       shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
   },
   
//TODO: make container for factsText and add attributes for aligning, centering text
   factText:{
    zIndex: 999, 
    alignItems:"center",
    position:'absolute',
    top:260,
    paddingLeft:70,
    paddingRight:70,
    fontWeight:'bold',
    fontSize:30,
    color:"#FFFFFF",
    shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
   },

})
export default LandingScreen;