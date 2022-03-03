import React, { useState } from 'react';
import {
  Button, InputEvent
  , Image, ImageBackground,
  StyleSheet, Text,
  TouchableOpacity,
  View, TextInput
} from 'react-native';

export default function JoinGame({navigation,route}) {
    const [code,setCode] = useState("");
    const Player = route.params;
  return (

    
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
          }} >Join Game</Text>

          <TextInput
          onChange={(e) => setCode(e)}
          value={code}
            underlineColorAndroid="transparent"
            placeholder="Game Code"
            placeholderTextColor="#808080"
            autoCapitalize="none"
            style={{
              position: 'absolute',
              top:600,
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
        </TouchableOpacity>


          {/* 
<ImageBackground source={require('./assets/splash.png')}>

</ImageBackground> */}



          <View style={{
            position: 'absolute',
            top: 450,
            left: 250,

            borderColor: 'black',
            width: 300,
            zIndex: 3,
            fontSize: 30,

          }} >

            <TouchableOpacity activeOpacity={0.95} style={styles.button2}>
              <Text style={styles.text}>JOIN</Text>
            </TouchableOpacity>
          </View>
      </View>
      </ImageBackground>
      );
    
}

      const styles = StyleSheet.create({
        background:{

        position:'absolute',
      top:200


    },
      texts:{
        fontSize:30

    },
    loutoutBtnText:{
      fontSize:20,
      fontWeight:'normal',
      color:"#000000"
  }, logoutBtnContainer:{ 
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

      button: {
        flexDirection: 'row',
      height: 50,
      backgroundColor: 'yellow',
      borderRadius:20,

      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      elevation:3,
  },
      button2: {
        flexDirection: 'row',
        top:"135%",
      height: "70%",
      backgroundColor: 'lightblue',
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
},
      text: {
        fontSize: 40,
      padding:10,

      fontWeight: 'bold',
  }

})

 