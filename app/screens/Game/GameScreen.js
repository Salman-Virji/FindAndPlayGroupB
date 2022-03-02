import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
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
    TouchableOpacityBase,
  } from "react-native";
  const pictures = [1,2,3];
function Card(props){
  return(
    <View style={page.card}><Text>{props.text}</Text></View>
  )
}
function CreateCards(){
  return(
    <View style={{flexDirection:'row'}}>
      {pictures.map(x=>{
        return <Card text={x} key={x}/>
      })}
    </View>
  )

}


export default function GameScreen({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
    return(
        <View style={page.container}>
          <View style={{flex:1,backgroundColor:"#b0bec5",padding:10,width:"100%"}}>
            <View style={{flex:4,backgroundColor:"#eceff1",margin:20,justifyContent:"center",alignItems: "center"}}>
            <>
              <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </>
            </View>
            <View style={{flex:2,alignItems: "center",justifyContent:"center"}}>
              <CreateCards />
            </View>
            <View style={{alignItems: "center",justifyContent:"center",flex:1}}>
              <TouchableOpacity
                style={page.button}
              >
                <Text>
                  Take Picture
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
    )
}

const page = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width:"50%"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1e140a',
      padding: 24,
    },
    text: {
      fontSize: 30,
      color: '#000'
    },
    card: {
      backgroundColor:'#eceff1',
      padding:10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      margin:10,
      flex:1,
      height:"100%"
    }
  });
  //COMBINE STYLESHEETS
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      width:198,
      height:264
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: 'white',
    },
  });