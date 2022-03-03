
import React, { useState } from 'react';

import {
  Button,
  InputEvent,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";


export default function JoinGame({navigation}) {
    const [code,setCode] = useState("")

  return (
    <ImageBackground
      style={{ resizeMode: "contain", flex: 1 }}
      source={require("../assets/BGs/background2.png")}
    >
      <View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 60,
              position: "absolute",
              top: 200,
              left: 240,
              zIndex: 2,
            }}
          >
            Join Game
          </Text>

    
    <ImageBackground style={{ resizeMode: "contain", flex: 1 }}
     source={require("../assets/BGs/background2.png")} >
     
    
    

      <View
      >
          <Text style={{
            fontSize: 100,
            position: 'absolute',
            top: 250,
            left: "20%",
            fontWeight: "bold",
            color: "#fff",

          <TextInput
          onChange={(e) => setCode(e)}
          value={code}
            underlineColorAndroid="transparent"
            placeholder="Game Code"
            placeholderTextColor="#808080"
            autoCapitalize="none"
            style={{

              position: "absolute",
              top: 300,

              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              width: "80%",
              alignItems: 'center',
              textAlign: 'center',
              padding: 12,
              left: "10%",
              fontSize: 40,
              borderRadius: 20


            }}
          />
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
       
          <Image
            source={require("../assets/icons/Logout.png")}
            style={{
              width: 150,
              height: 150,
              position: "absolute",
              top: 80,
              left: 50,
            }}
          />

          {/* 
<ImageBackground source={require('./assets/splash.png')}>

</ImageBackground> */}


          <Image
            source={require("../assets/icons/Play.png")}
            style={{
              width: 150,
              height: 150,
              position: "absolute",
              top: 1000,
              right: 330,
            }}
          />

          <Image
            source={require("../assets/icons/Feed.png")}
            style={{
              width: 150,
              height: 150,
              position: "absolute",
              top: 1000,
              right: 50,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: 450,
              left: 250,

              borderColor: "black",
              width: 300,
              zIndex: 3,
              fontSize: 30,
            }}
          >
            <TouchableOpacity activeOpacity={0.95} style={styles.button2}>
              <Text style={styles.text}>JOIN</Text>
            </TouchableOpacity>
          </View>

      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 200,
  },
  texts: {
    fontSize: 30,
  },

  button: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "yellow",
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    elevation: 3,
  },
  button2: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "lightblue",
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    elevation: 3,
  },
  text: {
    fontSize: 20,
    padding: 10,

    fontWeight: "bold",
  },
});

