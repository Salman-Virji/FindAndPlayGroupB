import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { CustomCamera } from './Components/CustomCamera';

<<<<<<< HEAD
import ChooseObjectiveCard from './ChooseObjectiveCard';

function Card(props) {

  return (
    <TouchableOpacity
      style={page.card}
    >
    </TouchableOpacity>

  )
}
=======
>>>>>>> 5ad54603cea6f71c3dd231133004fa58fdc791d5

export default function GameScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [objectives, setObjectives] = useState(tempObj);
  const [currentObjectiveId, setCurrentObjectiveId] = useState(null);


  const cameraRef = useRef(null);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          autoFocus:false,
          skipProcessing:true,
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
        CustomCamera(type, cameraRef, setType, setShowCamera, takePhoto, objectives, currentObjectiveId)
      ) : (
        //WHEN CAMERA IS OFF
        <View style={{flex:1,justifyContent: "center",alignItems: "center",backgroundColor: "#1f1f1f"}}>
          <View style={{justifyContent: "center",alignContent: "center",flex:1,flexDirection: "row", flexWrap: "wrap"}}>
            {objectives.map(x => {
              if (x.picturetaken == null) { //return card w/ picture taken or not
                return (
                    <>
                  <TouchableOpacity
                    key={x}
                    style={page.card}
                    onPress={() => {
                      setShowCamera(true)
                      setCurrentObjectiveId(x.objectiveid)
                    }}>
                    <ChooseObjectiveCard text={x.description} source={x.referenceimage} key={x.objectiveid}/>
                  </TouchableOpacity>
                  </>
                )
              } else {
                return (
                  <TouchableOpacity key={x.objectiveid} style={page.card} disabled={true}>
                    <ImageBackground source={{uri:x.picturetaken}} resizeMode="cover" style={{flex:1,justifyContent: "center",width:"100%",height:"100%"}}>
                      <Text>{x.description}</Text>
                    </ImageBackground>
                    {/* <ChooseObjectiveCard text={x.description} source={{x.}}></ChooseObjectiveCard> */}
                  </TouchableOpacity>
                )


              }

            })}
          </View>
          <TouchableOpacity style={page.button}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}
<<<<<<< HEAD
const onPressFunction=() => {
  setShowCamera(true)
  setCurrentObjectiveId(x.objectiveid)
}

=======
>>>>>>> 5ad54603cea6f71c3dd231133004fa58fdc791d5
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
    backgroundColor: '#8C92AC',
    margin: 1,
    flexBasis: "33%",
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.33,
    height: Dimensions.get('window').width * 0.33,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
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
});

const tempObj =
  [
    {
      "objectiveid": 123,
      "description": "Squirrel",
      "points": 10,
      referenceimage: "squirrel",
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
      "objectiveid": 126,
      "description": "Cat",
      "points": 4,
      "referenceimage": "cat",
      "picturetaken": null,
      "score": 4
    }
  ]


