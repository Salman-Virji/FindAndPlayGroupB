import React, { useState, useEffect,useRef } from 'react';
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
  Alert,
} from "react-native";
const pictures = [1, 2, 3];

function Card(props) {
  return (
    <View style={page.card}><Text>{props.text}</Text></View>
  )
}
function CreateCards() {
  return (
    <View style={{ flexDirection: 'row' }}>
      {pictures.map(x => {
        return <Card text={x} key={x} />
      })}
    </View>
  )

}


export default function GameScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null); 

  const takePhoto = async () => {
    if(cameraRef){
      console.log("Taking Photo");
      try{
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing:true,
          aspect:[4,3],
          quality:1
        });
        return photo;
      }catch(e){
        console.log(e);
      }
    }
  };


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
  return (
    <>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
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
        <View style={{ flex: 5, alignItems: "center" }}>
          <CreateCards />
        </View>

        <View style={{ alignItems: "center", justifyContent: "center", flex: 4 }}>
          <TouchableOpacity
            style={page.button}
            onPress = {async()=>{
              const r = await takePhoto();
              Alert.alert("DEBUG",JSON.stringify(r));
            }}
          >
            <Text>
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </>
  )
}

const page = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "50%"
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
    backgroundColor: '#eceff1',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    flex: 1,
    height: "100%"
  }
});
//COMBINE STYLESHEETS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 5,
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    flex: 20,
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
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
});