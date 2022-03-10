import { Center, Switch } from "native-base";
import React, { useState } from "react";

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
  Pressable,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function FormCheck(title,category,timeLimit,difficulty,setFormStatus,playerCount,objective,navigation,Host)
{
  if(title == "" || category =="" || timeLimit =="" || difficulty =="" || playerCount =="" || objective =="")
  {
    setFormStatus(true);
    return;
  }
  setFormStatus(false);
  createLobby(title,timeLimit,category,difficulty,playerCount,objective,r,navigation,Host);
}


function createLobby(title,timeLimit,category,difficulty,playerCount,objective,navigation,Host)
{
  console.log("Before crash\n");
  console.log("\n host name before sending");
  console.log("after crash \n");
  navigation.navigate('gamelobby',{title:title,timeLimit:timeLimit,category:category,difficulty:difficulty,code:r,Host:Host.Username});
}


function CreateGame({ navigation,route }) {
  const Host = route.params;
  const [title,setTitle] = useState("Team Name");
  const [location,setLocation] = useState("Location");
  const [category,setCategory] = useState("");
  const [playerCount,setPlayerCount] = useState("Player Count");
  const [Settingobjective,setingObjectives] = useState(true);
  const [Objective1, SetObjective1]= useState({ Objective:"Objective 1",PointValue:5});
  const [Objective2, SetObjective2]= useState({ Objective:"Objective 2",PointValue:5});
  const [Objective3, SetObjective3]= useState({ Objective:"Objective 3",PointValue:5});
  const [Objective4, SetObjective4]= useState({ Objective:"Objective 4",PointValue:5});
  const [timeLimit,setTimeLimit] = useState("Time Limit");
  const [difficulty,setDifficulty] = useState("");
  const [formFilled,setFormStatus] = useState(false);
  console.log(Settingobjective);

  function toggleLocation(){
    if(location == "Location")
    {
      setLocation(location => location = "School Yard")
    }
    if(location == "School Yard")
    {
      setLocation(location => location = "Nature Park")
    }
    if(location == "Nature Park")
    {
      setLocation(location => location = "Playground")
    }
    if(location == "Playground")
    {
      setLocation(location => location = "Location")
    }
    
  }
  function toggleTimeLimit(){
    if(timeLimit == "Time Limit")
    {
      setTimeLimit(timeLimit => timeLimit = "10 mins")
    }
    if(timeLimit == "10 mins")
    {
      setTimeLimit(timeLimit => timeLimit = "30 mins")
    }
    if(timeLimit == "30 mins")
    {
      setTimeLimit(timeLimit => timeLimit = "1 Hour")
    }
    if(timeLimit == "1 Hour")
    {
      setTimeLimit(timeLimit => timeLimit = "Time Limit")
    }
    
  }
 function checkPlayerCount(){
    if(playerCount == "Player Count")
    setPlayerCount(playerCount => playerCount = "1 Player")
    if(playerCount =="1 Player"){
      setPlayerCount(playerCount => playerCount = "2 Players")
    }
    if(playerCount =="2 Players"){
      setPlayerCount(playerCount => playerCount = "3 Players")
    }
    if(playerCount =="3 Players"){
      setPlayerCount(playerCount => playerCount = "4 Players")
    }
    else if (playerCount =="4 Players"){
      setPlayerCount(playerCount => playerCount = "Player Count")
    }

 }
 function ChangePoints(Change,objectivenumber)
 {
   switch(objectivenumber)
    {
      case 1:
        var curval = Objective1.PointValue;
          switch(Change)
          {
            case "+":
              SetObjective1(Prev => ({
                ...Prev,
                PointValue:curval+5
              }));
              break;
            case "-":
              SetObjective1(Prev => ({
                ...Prev,
                PointValue:curval-5
              }));
              break;
          }
          case 2:
            var curval = Objective1.PointValue;
            switch(Change)
            {
              case "+":
                SetObjective2(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
                break;
              case "-":
                SetObjective2(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
                break;
            }
          case 3:
            var curval = Objective1.PointValue;
            switch(Change)
            {
              case "+":
                SetObjective3(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
                break;
              case "-":
                SetObjective3(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
                break;
            }
          case 4:
            var curval = Objective1.PointValue;
            switch(Change)
            {
              case "+":
                SetObjective4(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
                break;
              case "-":
                SetObjective4(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
                break;
            }
    }
 }

  return (

    
    <ImageBackground
      style={{ resizeMode: "contain", flex: 1 }}
      source={require("../assets/BGs/background2.png")}
    >
      

      {/* //Logout button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("SigninScreen")}
        style={{
          width: 250,
          height: 250,
          position: "absolute",
          top: 80,
          left: 50,
        }}
      >
         {/* //Logout button image */}
        <Image source={require("../assets/icons/Logout.png")} style={{
          width: 100,
          height: 100,
          position: "absolute",
          top: 5,
          
        }}/>
      </TouchableOpacity>

         {/* Create game header */}
      <View>
        <Text
          style={{
            fontSize: 60,
            fontWeight: "bold",
            position: "absolute",
            top: 220,
            left: 220,
            color: "#fff",
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          }}
        >
          Create Game
        </Text>
      </View>

      

       {/* Check if the form is  filled */}
      {formFilled? <Text style={styles.hiddenTxt}> please fill out all fields to create a game</Text> : <Text></Text>}

      {/* Team Name Input */}
      <TextInput
          onChangeText={(e) => setTitle(e)}
          value={title}
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Title"

       style={{
          position: "absolute",
          top: "30%",
          borderWidth: 3,
          // width: 350,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }}
      />
      {/* Location selector */}
      
      <TextInput   
        
        value={location}
        underlineColorAndroid="transparent"
        placeholder={location}
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: "36%",
          borderWidth: 3,
          // width: 350,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }
        
      }
      
      
      />
      <Pressable
              style={styles.btnSendrequest3}
              onPress= {() =>toggleLocation()  } 
              
            >
              
      </Pressable>

          {/* Time Limit selector */}
        <TextInput
          onChangeText={(e) => setTimeLimit(e)}
          value={timeLimit}
          placeholder={timeLimit}
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
       style={{
          position: "absolute",
          top: "42%",
          borderWidth: 3,
          // width: 350,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }}
      />
      <Pressable
              style={styles.btnSendrequest1}
              onPress= {() =>toggleTimeLimit()  } 
              
            >
              
      </Pressable>
      {/* Player Count selector */}
      {/* <Pressable onPress ={setPlayerCount === "2", console.log(playerCount)} > */}
      
            
      <TextInput   
        //onChangeText={(e) => setPlayerCount (e)}  
        value={playerCount}
        underlineColorAndroid="transparent"
        placeholder={playerCount}
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: "48%",
          borderWidth: 3,
          // width: 350,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }
        
      }
      
      />
      <Pressable
              style={styles.btnSendrequest}
              onPress= {() =>checkPlayerCount()  } 
              
            >
              <Text > hi </Text>
      </Pressable>

      {/* objective Count selector */}
     
      <TextInput 
        value="Objectives"
        underlineColorAndroid="transparent"
        placeholder="Objective"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: "56%",
          borderWidth: 3,
          // width: 350,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }
      }       
      />
        <Pressable
              style={styles.btnSendrequest4}
              onPress = {() => Settingobjective? setingObjectives(false) : setingObjectives(true) } 
            >
              <Text>V</Text></Pressable>
      {Settingobjective?
        <View style={styles.ObjectiveContainer}>
          <View style={styles.ObjectiveInputView}>
            <TextInput style={styles.ObjectiveInput} placeholder={Objective1.Objective} value={Objective1.Objective} />
            <Pressable >
              <Text style={styles.PointDecrease}> -</Text >
            </Pressable>

            <Text style={styles.ObjectivePointInput}> {Objective1.PointValue.toString()}</Text>   
            
            <Pressable>
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            <Pressable style={styles.ObjectiveCompleted} >
            <Text></Text>
            </Pressable>
            </View>
           
            <View style={styles.ObjectiveInputView}>
            <TextInput style={styles.ObjectiveInput} placeholder={Objective2.Objective} value={Objective2.Objective} />
            <Pressable >
              <Text  style={styles.PointDecrease}>-</Text>
            </Pressable>
            <Text style={styles.ObjectivePointInput}> {Objective2.PointValue.toString()}</Text>   
            <Pressable >
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            <Pressable style={styles.ObjectiveCompleted}>
            <Text></Text>
            </Pressable>
            </View>

            <View style={styles.ObjectiveInputView}>
            <TextInput style={styles.ObjectiveInput} placeholder={Objective3.Objective} value={Objective3.Objective} />
            <Pressable >
              <Text  style={styles.PointDecrease} >-</Text>
            </Pressable>
            <Text style={styles.ObjectivePointInput}> {Objective3.PointValue.toString()}</Text>   
            <Pressable>
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            <Pressable style={styles.ObjectiveCompleted}>
            <Text></Text>
            </Pressable>
            </View>

            <View style={styles.ObjectiveInputView}>
            <TextInput style={styles.ObjectiveInput} placeholder={Objective4.Objective} value={Objective4.Objective} />
            
            <Pressable >
              <Text style={styles.PointDecrease}>-</Text>
            </Pressable>
            <Text style={styles.ObjectivePointInput}> {Objective4.PointValue.toString()}</Text>   
            <Pressable>
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            <Pressable style={styles.ObjectiveCompleted}> 
              <Text></Text>
            </Pressable>
            </View>
          
        </View>:null
      }

      <View
        style={{
          position: "absolute",
          top: "56%",
          left: 160,
          borderColor: "black",
          width: 300,
          zIndex: 3,
          fontSize: 20,
        }}
      >
        <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={() =>FormCheck(title,category,difficulty,timeLimit,r,setFormStatus,navigation,Host)}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
      </View>
        {/* Difficulty selector
      <TextInput
      onChangeText={(e) => setDifficulty (e)}  
      value={difficulty}
        underlineColorAndroid="transparent"
        placeholder="Difficulty"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: 640,
          borderWidth: 3,
          width: width * 0.6,
          alignItems: "center",
          textAlign: "center",
          padding: 12,
          left: 160,
          fontSize: 30,
          borderRadius: 20,
          fontSize: 20,
          borderRadius: 20,
          borderColor: "#fff",
          borderRadius: 20,
          color: "#fff",
        }}
      /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ObjectiveCompleted:{
    margin:5,
    alignItems:"center",
    top:"3%",
    flex:0.2,
    backgroundColor:"#fff",
    borderRadius:25
  },
  ObjectiveInputView:{
    borderWidth: 1,
    borderRadius:25,
    borderColor:"#fff",
    flexDirection:"row",
    alignItems:"flex-start",
    marginLeft:20,
    fontSize:RFPercentage(5),
    position:"relative",
    width:"80%"
  },
  PointIncreas:{
    flex:1,
    top:"-10%",
    margin:5,
    fontSize:RFPercentage(2),
    position:"relative",
  },
  PointDecrease:{
    flex:1,
    top:"-20%",
    margin:5,
    fontSize:RFPercentage(2),
    position:"relative",
  },
  ObjectiveInput:{
    margin:5,
    flex:1.5,
    fontSize:RFPercentage(1.5),
    position:"relative",
    zIndex:5
  },
  ObjectivePointInput:{
    flex:0.5,
    fontSize:RFPercentage(2),
    position:"relative",
    width:"5%"
  },
  ObjectiveContainer:{
    flexDirection:"column",
    borderColor:"#fff",
    alignItems:"stretch",
    justifyContent:"center",
    height:"auto",
    width:"auto",
    padding:20,
    borderWidth: 5,
    borderTopWidth:0,
    borderRadius:25,
    position:"relative", 
    top:"43%",
    width: width * 0.4,
    left:"30%",
    zIndex:5
  },
  btnSendrequest4: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    width: "10%",
    fontSize: 20,
    height: 0,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 40,
    left:"40%",
    top:"42%",
    zIndex:4
  },
  btnSendrequest3: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#50A4FF",
    width: "10%",
    fontSize: 20,
    height: 0,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
    left:"20%",
    top:425,
  },
  btnSendrequest1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#30A4FF",
    width: "10%",
    fontSize: 20,
    height: 0,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    fontSize: 20,
    left:"20%",
    top:445,
  },
 btnSendrequest: {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 25,
  paddingHorizontal: 32,
  borderRadius: 30,
  elevation: 5,
  backgroundColor: "#50A4FF",
  width: "10%",
  fontSize: 20,
  height: 0,
  shadowColor: "rgba(46, 229, 157, 0.4)",
  fontSize: 20,
  left:"20%",
  top:475,
},

  hiddenTxt:{
    left:"16%",
    top:"25%",
    fontSize:30,
    color:"#fff"
  },
  background: {
    position: "absolute",
    top: 200,
  },
  texts: {
    fontSize: 30,
  },

  // start game button
  button: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "lightblue",
    borderRadius: 20,
    width: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 400,
    elevation: 3,
    backgroundColor: "#50A4FF",
  },
 
  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutBtnContainer: {
    zIndex: 999,
    position: "absolute",
    top: 65,
    left: 30,
    alignItems: "center",
    backgroundColor: "#FFE551",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default CreateGame;
