import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import CountdownTimer from './Timer/CountdownTimer';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ScrollView, 
  ImageBackground
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
        <CustomCamera cameraRef={cameraRef} type={type} objectives={objectives.objectives} currentObjectiveId={currentObjectiveId} setType={setType} setShowCamera={setShowCamera} takePhoto={takePhoto} startTime={startTime} />
      ) : (
        //WHEN CAMERA IS OFF
        <ImageBackground
        style={{ resizeMode: "contain", flex: 1 }}
        source={require("../../assets/BGs/background2.png")}
        >
          <View style={{ marginTop: 30, margin: 10, justifyContent: "center", alignItems: "center", width: "100%"}}>
            {/* calling the timer */}
            <CountdownTimer countdownTimestampMs={startTime + (60000 * GameData.timelimit)} />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", flex: 5, overflow: "hidden", flexWrap: "wrap", maxHeight: Dimensions.get("window").width * 1.00, backgroundColor: "rgbar(255,0,0,0.1)" }}>
            <ScrollView style={{ flex: 1, height: "100%" }}
              scrollIndicatorInset={10}
              contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              {objectives.objectives.map(x => {
                return (
                  x.picturetaken == null ?
                    <TouchableOpacity
                      key={x.objectiveid}
                      style={styles.card}
                      onPress={() => {
                        setShowCamera(true)
                        setCurrentObjectiveId(x.objectiveid)
                      }}>
                      <ChooseObjectiveCard objective={x} source={x.referenceimage} />
                    </TouchableOpacity> :
                    <TouchableOpacity
                      key={x.objectiveid}
                      style={styles.card}
                      >
                      <ChooseObjectiveCard objective={x} source={{uri:x.picturetaken}} />
                    </TouchableOpacity>

                )
              }
              )
              }
            </ScrollView>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(255,0,0,0.1)", width: "100%" }}>
            <TouchableOpacity
              style={styles.generic_button}
              onPress={() => {
                navigation.navigate("EndScreen",
                  { Data: tempObj.objectives }
                )

              }} //https://reactnavigation.org/docs/params/
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
  objectives: [{
    "objectiveid": 123,
    "description": "Squirrel",
    "points": 10,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 0,
    "hasSet": false
  },
  {
    "objectiveid": 124,
    "description": "Tree",
    "points": 5,
    "referenceimage": require('../../assets/images/tree.jpg'),
    "picturetaken": null,
    "score": 5,
    "hasSet": false
  },

  {
    "objectiveid": 125,
    "description": "Bird",
    "points": 8,
    "referenceimage": require('../../assets/images/bird.jpg'),
    "picturetaken": null,
    "score": 0,
    "hasSet": false
  },
  {
    "objectiveid": 127,
    "description": "Cat",
    "points": 4,
    "referenceimage": require('../../assets/images/cat.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 129,
    "description": "Tele",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 130,
    "description": "Bear",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  },
  {
    "objectiveid": 131,
    "description": "Lion",
    "points": 4,
    "referenceimage": require('../../assets/images/red-squirrel.jpg'),
    "picturetaken": null,
    "score": 4,
    "hasSet": false
  }]
}


