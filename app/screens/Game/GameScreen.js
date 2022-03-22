import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import CountdownTimer from './Timer/CountdownTimer';
import {
  Text,
  TouchableOpacity,
  View, ImageBackground
} from "react-native";
import { CustomCamera } from './Components/CustomCamera';
import getImage from './GameImages';
import { ObjectiveSelect } from './Components/ObjectiveSelect';
import { styles } from './Styles/styles';


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

  //Updates
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
        <CustomCamera
          cameraRef={cameraRef} type={type}
          objectives={objectives.objectives}
          currentObjectiveId={currentObjectiveId}
          setType={setType}
          setShowCamera={setShowCamera}
          takePhoto={takePhoto}
          startTime={startTime} />
      ) : (
        //WHEN CAMERA IS OFF
        <ImageBackground
          style={{ resizeMode: "contain", flex: 1 }}
          source={require("../../assets/BGs/background2.png")}
        >
          <View style={{ marginTop: 30, margin: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
            {/* calling the timer */}
            <CountdownTimer countdownTimestampMs={startTime + (60000 * GameData.timelimit)} />
          </View>
            <ObjectiveSelect gameObject={tempObj} setShowCamera={setShowCamera} setCurrentObjectiveId={setCurrentObjectiveId} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            {/*Temp Button*/}
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




