import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import CountdownTimer from './Timer/CountdownTimer';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,  
  ImageBackground, Image, TouchableOpacity
} from "react-native";
import { CustomCamera } from './Components/CustomCamera';
import { Audio } from 'expo-av';

export default function CelebrationScreen( navigation ) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(false);
  const [objectives, setObjectives] = useState(navigation.route.params.Data);
  const [currentObjectiveId, setCurrentObjectiveId] = useState(null);
  const [startTime] = useState(Date.now());

  const cameraRef = useRef(null);

  const [sound, setSound] = useState();

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
        <CustomCamera cameraRef={cameraRef} type={type} objectives={tempObj.objectives} currentObjectiveId={999} setType={setType} setShowCamera={setShowCamera} takePhoto={takePhoto}  playSound={playSound} />
      ) : (
        //WHEN CAMERA IS OFF
        <ImageBackground
        style={{ resizeMode: "contain", flex: 1 }}
         source={require("../../assets/BGs/celebrationbackground.png")}
        >
            <View style={page.container}>
              <View>
                <View style={styles.image_container}>
                  <Image source={getLocalImage(objectives.totalscore.score, objectives.maxscore.points)}
                                      style={{
                                        height: "100%", 
                                        width: "100%", 
                                        resizeMode:"contain",
                                        borderTopLeftRadius: 15, 
                                        borderTopRightRadius: 15, 
                                      }}                                />
  
                  </View>
                  <View style={styles.title}>
                    <Text style={styles.logo}>{objectives.teamname}</Text>
                  </View>
                  <View style={styles.timer}>
                      <Text style={styles.text}> Total Points: {objectives.totalscore.score} / {objectives.maxscore.points} </Text>
                  </View>
                  <View style={styles.objectives_container}>
                      <View style={styles.objectives_row}>
                          {tempObj.objectives[0].picturetaken==null ? ( 
                          <Image style={{ marginTop:-120, marginLeft:200, resizeMode:"contain", width: "110%", height:"60%"}} source={tempObj.objectives[0].referenceimage} />
                          ) : (
                          <Image style={{marginLeft:20, marginTop:-180, resizeMode:"contain", width: "100%", height:"50%"}} source={{uri:tempObj.objectives[0].picturetaken}} />
                          )}
                      </View>
                </View>
                <View style={styles.objectives_nav_container}>
                  <TouchableOpacity 
                    onPress={() => {
                      setShowCamera(true)
                      setCurrentObjectiveId("999")
                    }}
                    style={styles.cameraIcon}
                  >
                      <Image 
                          source={require("../../assets/icons/cameraicon.png")}
                          style={styles.cameraIcon} resizeMode="contain"
                      ></Image>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
      </ImageBackground>

      )}
    </>
  )
}
const getLocalImage = (totalscore, maxscore)=> {
  
  const percent = totalscore*100/maxscore;

  if (percent>=75) 
    return require("../../assets/images/gold.png");
  else if (percent <75 && percent >60) 
    return require("../../assets/images/silver.png");
  else if (percent<=60) 
    return require("../../assets/images/bronze.png");
}



const page = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 30,
    color: '#000'
  },
});

//COMBINE STYLESHEETS
const styles = StyleSheet.create({

  title: {
    flex:1,
    marginTop:20,
    justifyContent:"center",
    alignItems: "center"
  },

  timer: {
    flex:1,
    margin:0,
    justifyContent:"center",
    alignItems: "center"
  },

  objectives_container:{
    flex:8,
    marginTop:10,
    justifyContent:"center",
    alignItems: "center"
  },

  objectives_nav_container: {
    alignItems: "center",
    justifyContent:"center",
    flex:1
  },

  objectives_row: {
    flex:1,
    flexDirection:"row", 
    margin:0,
    justifyContent:"center",
    alignItems: "center"
  },

  single_objective:{
    flex:1, 
    flexDirection:"column", 
    height: "100%", 
    justifyContent:"center",
    alignItems: "center"
  },

  image_container:{
    flex:2, 
    marginTop:"20%",
  },

  logo: {
    //text css
    fontSize: 50,
    color: "blue",
    fontWeight: "bold",
    marginLeft: 30,
    //textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,

  },
  viewTitle: {
    flex:1, 
    flexDirection:"column", 
    margin:5, 
    marginTop:-15,
    height: "100%",
    width:"100%", 
    backgroundColor:"#50A4FF",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent:"center",
    alignItems: "center"  
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.05,
    color: "grey",
    fontWeight: "bold",
    marginLeft: 30,
     //textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowRadius: 10,
  },

  cameraIcon: {
    alignItems: "center", 
    width:40,
    marginTop: 25
  },
});

const tempObj =
{
  "teamname": "Funny team",
  "location": "Park",
  "totalscore": 55,
  "maxscore" : 55,
  "timelimit": 10,
  objectives: [{
    "objectiveid": 999,
    "referenceimage": require('../../assets/images/jumpingkids.png'),
    "picturetaken": null,
  }],
  
}


