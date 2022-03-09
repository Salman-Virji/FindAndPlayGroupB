import { Camera } from 'expo-camera';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";

export function CustomCamera(type, cameraRef, setType, setShowCamera, takePhoto, objectives, currentObjectiveId) {
  return <Camera style={styles.camera} type={type} ref={cameraRef}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonContainer}
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
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => setShowCamera(false)}
      >
        <Text style={styles.text}> Hide Camera </Text>
      </TouchableOpacity>

    </View>

    <View style={{ flex: 5, alignItems: "center" }}>

    </View>

    <View style={{ alignItems: "center", justifyContent: "center", flex: 4 }}>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const r = await takePhoto();
          if (!r.cancelled) {
            for (var i = 0; i < objectives.length; i++) {
              if (objectives[i].objectiveid == currentObjectiveId) {
                objectives[i].picturetaken = r.uri;
              }
            }
            setShowCamera(false);
          }
        }}
      >
        <Text>
          Take Picture
        </Text>
      </TouchableOpacity>
    </View>
  </Camera>;
}
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
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "50%"
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: 'white',
  },
});