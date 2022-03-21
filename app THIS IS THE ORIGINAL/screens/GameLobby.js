import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import axios from "axios";

//Importing whatever components are required from react native
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
  KeyboardAvoidingView,
} from "react-native";
import { render } from "react-dom";

function findLobby(code)
{
  // get request for db searching for game if joining instead of creating
}

function GetPlayers(code)
{
  //get request to pull current list of players
}

export default function Lobby({navigation,route})
{
  const lobby = route.params
  console.log("in lobby\n", lobby.title,lobby.difficulty,lobby.code,lobby.category,lobby.timeLimit,lobby.Host);
    return(
      <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background2.png")}
      
    >
      <View style={styles.LobbyTitleContainer} >
      <Text style={styles.LobbyName}> {lobby.title}</Text>
      <Text style={styles.LobbyCode}> Game Code :{lobby.code}</Text>
      </View>
      <View style={styles.LobbyDetailscontainer}>
        
        <Text style={styles.LobbyDetails}> Category :{lobby.category}</Text>
        <Text style={styles.LobbyDetails}> Difficulty :{lobby.difficulty}</Text>
        <Text style={styles.LobbyDetails}> Time Limit :{lobby.timeLimit}</Text>
        
      </View>
      <View style={styles.PlayerListContainer}>
        <Text style={{fontSize:45}}>In This Lobby:</Text>
        <Text style={{fontSize:25}}> Host : {lobby.Host}</Text>
        {
          /* once db is connected to lobby table add for each loop to display all joined players*/ 
        }
      </View>
      <View style={styles.BtnContainer}>
        <Pressable 
        style ={{

        }}>
              <Text style ={{
            marginTop:"10%",
            borderRadius:30,
            fontSize:30,
            textAlign:'center',
          bottom:"10%",
          width:"80%",
          backgroundColor:"#50a4ff",

        }}> Launch Game </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("LandingScreen",{Username:lobby.Host})} >
          <Text style ={{
            left:"5%",
            marginTop:"5%",
            borderRadius:30,
            fontSize:30,
            textAlign:'center',
          bottom:"10%",
          width:"70%",
          backgroundColor:"#ffe551",

        }}> Cancel </Text>
        </Pressable>  
        </View>
      <Image source={require('../assets/icons/Settings.png')} style={{
            width: 150,
            height: 150,
            position: 'absolute',
            top: 80,
            right: 50
          }

          } />
         <TouchableOpacity onPress ={() => navigation.navigate('SigninScreen')} style ={styles.logoutBtnContainer}>
            <Image
                source={require('../assets/icons/logoutIcon.png')} 
            /> 
            <Text onPress ={() => navigation.navigate('SigninScreen')} style = {styles.loutoutBtnText} > Logout </Text>
        </TouchableOpacity>
    
    </ImageBackground>
    );

}

const styles = StyleSheet.create({
  BtnContainer:{
    left:"25%",
    position:'absolute',
    bottom:"10%",
    height:"20%",
    width:"60%",
    zIndex:3
  },
  PlayerListContainer:{
    paddingTop:"8%",
    paddingLeft:"3%",
    width:"40%",
    left:"50%",
    top:"-15%",
  },
  loutoutBtnText:{
    fontSize:20,
    fontWeight:'normal',
    color:"#000000"
}, 
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
  elevation: 24,
},
  background: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  LobbyTitleContainer:{
    height:"20%",
    top:"20%"
  }, 
  LobbyCode:{
    left:"25%",
    padding:5,
    fontSize: 40,
    color:'#fff'
  },
  LobbyName:{ 
    left:"15%",
    padding:5,
    fontSize: 60,
    color:'#fff'},
  LobbyDetailscontainer: {
    paddingTop:"8%",
    paddingLeft:"3%",
    width:"40%",
    left :"5%",
    top:"15%",
    height:"25%",
    backgroundColor:'#50a4ff',
    borderRadius:50
  },
  LobbyDetails : {
    padding:5,
    fontSize: 30,
    color:'#fff'
  }
});
