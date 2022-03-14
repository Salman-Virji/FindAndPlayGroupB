import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import CountdownTimer from './Timer/CountdownTimer';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ScrollView
} from "react-native";
import { CustomCamera } from './Components/CustomCamera';
import getImage from './GameImages';
import ChooseObjectiveCard from './Components/ChooseObjectiveCard';

export default function GameScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [objectives, setObjectives] = useState(tempObj);
  const [currentObjectiveId, setCurrentObjectiveId] = useState(null);
  const [startTime] = useState(Date.now());


  const cameraRef = useRef(null);

  

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          autoFocus: false,
          skipProcessing: true,
          aspect: [4, 3],
          quality: 1
        });
        return photo;
      } catch (e) {
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
      {showCamera ? (
        //WHEN CAMERA IS ON
        <CustomCamera  cameraRef={cameraRef} type={type} objectives={objectives.objectives} currentObjectiveId={currentObjectiveId} setType={setType} setShowCamera={setShowCamera} takePhoto={takePhoto} startTime={startTime}  />
      ) : (
        //WHEN CAMERA IS OFF
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFE551" }}>
          <View style={{ marginTop: 30, margin: 10 }}>
            <CountdownTimer countdownTimestampMs={startTime+ (60000 * GameData.timelimit)}/>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", flex: 5, overflow: "hidden", flexWrap: "wrap", maxHeight: Dimensions.get("window").width * 1.00, backgroundColor: "rgbar(255,0,0,0.1)" }}>
            <ScrollView style={{ flex: 1, height: "100%" }}
              scrollIndicatorInset={10}
              contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              {objectives.objectives.map(x => {
                if (x.picturetaken == null) { //return card w/ picture taken or not
                  return (
                    <TouchableOpacity
                      key={x.objectiveid}
                      style={styles.card}
                      onPress={() => {
                        setShowCamera(true)
                        setCurrentObjectiveId(x.objectiveid)
                      }}>
                      <ChooseObjectiveCard objective={x} source={getImage(x.referenceimage)} />
                    </TouchableOpacity>
                  )
                } else {
                  return (
                    <TouchableOpacity key={x.objectiveid} style={styles.card} disabled={true}>
                      <ChooseObjectiveCard objective={x} source={{ uri: x.picturetaken }} />
                    </TouchableOpacity>
                  )


                }

              })}
            </ScrollView>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255,0,0,0.1)", width: "100%" }}>
            <TouchableOpacity 
              style={styles.generic_button}
              onPress ={()=>{
                navigation.navigate("EndScreen",
                  {Data:tempObj}
                )

              }} //https://reactnavigation.org/docs/params/
              >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </>
  )
}

//COMBINE STYLESHEETS
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  generic_button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "50%"
  },
  card: {
    flexBasis: "40%",
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.33,
    height: Dimensions.get('window').width * 0.33,
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

const GameData = {
  "timelimit": 10, 
}

const tempObj =
  {  
    "timelimit": 10,   
    objectives: [  
      {
        "objectiveid": 123,
        "description": "Squirrel",
        "points": 10,
        "referenceimage": "squirrel",
        "picturetaken": null,
        "score": 0
      },
      {
        "objectiveid": 124,
        "description": "Tree",
        "points": 5,
        "referenceimage": "tree",
        "picturetaken": null,
        "score": 5
      },

      {
        "objectiveid": 125,
        "description": "Bird",
        "points": 8,
        "referenceimage": "bird",
        "picturetaken": null,
        "score": 0
      },
      {
        "objectiveid": 127,
        "description": "Cat",
        "points": 4,
        "referenceimage": "cat",
        "picturetaken": null,
        "score": 4
      },
      {
        "objectiveid": 129,
        "description": "Tele",
        "points": 4,
        "referenceimage": "cat",
        "picturetaken": null,
        "score": 4
      },
      {
        "objectiveid": 130,
        "description": "Bear",
        "points": 4,
        "referenceimage": "cat",
        "picturetaken": null,
        "score": 4
      },
      {
        "objectiveid": 131,
        "description": "Lion",
        "points": 4,
        "referenceimage": "cat",
        "picturetaken": null,
        "score": 4
      }
    ]
  }


