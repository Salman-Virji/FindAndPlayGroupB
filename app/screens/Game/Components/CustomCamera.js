import { Camera } from 'expo-camera';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  BackHandler
} from "react-native";
import CountdownTimer from '../Timer/CountdownTimer';
import { Audio } from 'expo-av';

export function CustomCamera({ type, cameraRef, setType, setShowCamera, currentObjectiveId, objectives, startTime }) {
  const [sound, setSound] = React.useState();
  
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/Sounds/116609__mrmccormack__mrm-oldshutter-nikon2020.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const backHandler = BackHandler.addEventListener("hardwareBackPress",()=>{
    setShowCamera(false);
    console.log("camera backhandler");
    backHandler.remove();
    return true;
  });
  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          autoFocus: false,
          skipProcessing: true,
          aspect: [4, 3],
          quality: 1
        });
        backHandler.remove();
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (<Camera style={styles.camera} type={type} ref={cameraRef}>
    <View style={styles.timerContainer}>
      <CountdownTimer countdownTimestampMs={startTime + (60000 * GameData.timelimit)} />
    </View>
    {/*
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setShowCamera(false)}>
        <Text style={styles.text}> Hide Camera </Text>
      </TouchableOpacity>
    </View>*/}

    <View style={{
      flex: 5,
      alignItems: "center"
    }}>

    </View>

    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 4
    }}>
      {/* CURRENTLY UNUSED CAMERA FLIP
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
      }}>
        <Text style={styles.text}> Flip </Text>
       </TouchableOpacity>*/}
      <TouchableOpacity style={styles.photoButton} onPress={async () => {
        playSound();
        const r = await takePhoto();
        if (!r.cancelled) {
          for (var i = 0; i < objectives.length; i++) {
            if (objectives[i].objectiveid == currentObjectiveId) {
              objectives[i].picturetaken = r.uri;
            }
          }
          setShowCamera(false);
        }
      }}>
      </TouchableOpacity>
    </View>
  </Camera>);
}

const GameData = {
  "timelimit": 10,
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 5,
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 10,
  },
  timerContainer: {
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
  photoButton: {
    borderRadius: 40,
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden',

  },
  innerCircle: {
    borderRadius: 35,
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: 'black'
  },
});