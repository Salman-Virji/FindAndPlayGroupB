import { Camera } from 'expo-camera';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import CountdownTimer from '../Timer/CountdownTimer';

export function CustomCamera({ type, cameraRef, setType, setShowCamera, takePhoto, currentObjectiveId, objectives, startTime }) {
  return (<Camera style={styles.camera} type={type} ref={cameraRef}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
      }}>
        <Text style={styles.text}> Flip </Text>
        <CountdownTimer countdownTimestampMs={startTime+ (60000 * GameData.timelimit)}/>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setShowCamera(false)}>
        <Text style={styles.text}> Hide Camera </Text>
      </TouchableOpacity>

    </View>

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
      <TouchableOpacity style={styles.photoButton} onPress={async () => {
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
        <Text>
          Take Picture
        </Text>
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
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "50%"
  }
});