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
import DoubleClick from "react-native-double-tap"
import { Audio } from 'expo-av';


export default function GameScreen({route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [objectives, setObjectives] = useState(tempObj);
  const [currentObjectiveId, setCurrentObjectiveId] = useState(null);
  const [teacherToggle,setTeacherToggle] = useState(false);
  const [startTime] = useState(Date.now());
  const cameraRef = useRef(null);
  const [sound, setSound] = useState();
  const GameLobby = route.params.GameLobby;
  // sets new gamelobby object to be stored in state
  if(objectives != GameLobby)
  {
     setObjectives(GameLobby);
     console.log(" new object passed in \n", GameLobby, 
     "/n" , "Temp object initially present :\n" , tempObj )
  }
  console.log(" new object passed in \n", GameLobby, 
  "/n" , "Temp object initially present :\n" , tempObj , 
  "/n" , "hopefully the new state switched :\n", objectives);
  async function playSound(type) {
    console.log('Loading Sound');
    console.log(type);
    if(type == "button")
    {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/Sounds/546974__finix473__ui-click.wav')
     );
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync()
    }
    else
    {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/Sounds/116609__mrmccormack__mrm-oldshutter-nikon2020.wav')
    );
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync()
    }
     }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : "";
  }, [sound]);  

  //Updates permissions
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
          startTime={startTime}
          playSound = {playSound}
          />
      ) : (
        //WHEN CAMERA IS OFF
        <ImageBackground
          style={{ resizeMode: "contain", flex: 1 }}
          source={require("../../assets/BGs/background2.png")}
        >
          <View 
            style ={{ marginTop: 30, margin: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
            {/* calling the timer */}
            {/*Doubletap to show continue button*/}
            <DoubleClick
            doubleTap={() => {
              setTeacherToggle(true);
            }}
            >
              <CountdownTimer countdownTimestampMs={startTime + (60000 * tempObj.timelimit)} navigation={navigation} gameObject={tempObj} />
            </DoubleClick>
          </View>
            <ObjectiveSelect 
              gameObject={tempObj} 
              setShowCamera={setShowCamera} 
              setCurrentObjectiveId={setCurrentObjectiveId} 
              playSound = {playSound}
              />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            {/*Temp Button*/}
            {teacherToggle?
            <TouchableOpacity
              style={styles.generic_button}
              onPress={() => {
                navigation.navigate("EndScreen",
                  { Data: tempObj }
                )

              }} //https://reactnavigation.org/docs/params/
            >
              <Text>Confirm</Text>
            </TouchableOpacity>:<></>}
          </View>
        </ImageBackground>
      )}
    </>
  )
}

const tempObj =
{
  "timelimit": 10,
  "teamname": "Team1",
  "maxscore": 0,
  "totalscore": 0,
  "location": "Park",
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




