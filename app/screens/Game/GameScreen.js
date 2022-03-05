import React, { useState, useEffect, useRef } from 'react';
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
    <TouchableOpacity
      style={page.card}

    >

    </TouchableOpacity>

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
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [objectiveId,setObjectiveId] = useState(null);
  const cameraRef = useRef(null);

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("Taking Photo");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
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
              style={page.button}
              onPress={async () => {
                const r = await takePhoto();
                if (!r.cancelled) {
                  setImage(r.uri);
                  Alert.alert("Photo taken for objective "+objectiveId)
                  setShowCamera(false);
                }
              }}
            >
              <Text>
                Take Picture
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        ) : (
          //WHEN CAMERA IS OFF
          
        <View style={{flex:1,justifyContent: "center",alignItems:"center"}}>
          {image&&(
            <Image
              source={{uri:image}}
              style={{width:200,height:200}}
            />
          )}
        <View style={{flex:1,justifyContent: "center",alignItems:"center",flexDirection:"row"}}>
            {objectives.map(x=>{
              return(
                <TouchableOpacity
                  style={page.card}
                  onPress={()=>{
                    setShowCamera(true)
                    setObjectiveId(x.objectiveid)
                    }}>
                
                  <Text>{x.description}</Text>
                </TouchableOpacity>
              )
            })}
        </View>
        </View>
      )}
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
    justifyContent: 'center',
    margin:10

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

const objectives =
[ 
    {
        "objectiveid": 123, 
        "description": "Squirrel", 
        "points": 10,
        "referenceimage": "url", 
        "picturetaken": "",
        "score": 0
    },
    {
        "objectiveid": 124, 
        "description": "Tree", 
        "points": 5,
        "referenceimage": "url", 
        "picturetaken": "url",
        "score": 5
    }, 

        {
        "objective_id": 125, 
        "description": "Rock", 
        "points": 8,
        "referenceimage": "url", 
        "picturetaken": "url",
        "score": 0
    }, 
    {
        "objectiveid": 126, 
        "description": "Lake", 
        "points": 4,
        "referenceimage": "url", 
        "picturetaken": "url",
        "score": 4
    }
]