
import React from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Button
  } from "react-native";

//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default function CelebrationScreen({navigation}){

  
  return(
      <ImageBackground
      style={{ resizeMode: "contain", flex: 1 }}
       source={require("../../assets/BGs/background2.png")}
      >
          <View style={page.container}>
            <View style={{flex:1,padding:10, width:"90%", height: "20%"}}>
                <View style={styles.title}>
                  <Text style={styles.logo}>{tempObj.teamname}</Text>
                </View>
                <View style={styles.timer}>
                    <Text style={styles.text}>Total Points: {tempObj.totalscore} / {tempObj.maxscore}</Text>
                </View>
                <View style={styles.objectives_container}>
                    <View style={styles.objectives_row}>
                          <View style={styles.image_container}>
                            <Image
                                    source={getLocalImage()}
                                    style={{
                                      height: "100%", 
                                      width: "100%", 
                                      resizeMode:"contain",
                                      borderTopLeftRadius: 15, 
                                      borderTopRightRadius: 15, 
                                    }}                                />
                          </View>
                    </View>
              </View>
              <View style={styles.objectives_nav_container}>
                <Text style={styles.text}>Capture</Text>
              </View>
          </View>
        </View>
    </ImageBackground>
    )
}

const getLocalImage = ()=> {
  
  const percent = tempObj.totalscore*100/tempObj.maxscore;

  if (percent>=75) 
    return require("../../assets/images/gold.png");
  else if (percent <75 && percent >60) 
    return require("../../assets/images/silver.png");
  else if (percent<=60) 
    return require("../../assets/images/bronze.png");
}


const tempObj =
{
  "timelimit": 0.2,
  "timespent": "",
  "teamname": "Funny team",
  "location": "Park",
  "totalscore": 55,
  "maxscore" : 55,
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
      margin:5, height: "100%", 
      justifyContent:"center",
      alignItems: "center"
    },

    image_container:{
      flex:4, 
      flexDirection:"column", 
      margin:5, 
      height: "100%", 
      width: "100%",
      justifyContent:"center",
      alignItems: "center"

    },
    logo: {
      //text css
      fontSize: 50,
      color: "white",
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 1)",
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
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
       textShadowColor: "rgba(0, 0, 0, 1)",
      textShadowRadius: 10,
    },
  });


  