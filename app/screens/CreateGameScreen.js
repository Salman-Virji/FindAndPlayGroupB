import { Center, Switch } from "native-base";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
 Alert,
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
import { Dimensions,Picker } from "react-native";
//import { Picker } from "@react-native-picker/picker";
//import BouncyCheckbox from "react-native-bouncy-checkbox";
import myjson from './myjson.json'



const { width, height } = Dimensions.get("window");


function CreateGame({ navigation,route }) {
  const Host = route.params;
  const [title,setTitle] = useState("");
  const [playerCount,setPlayerCount] = useState(0);
  const [Settingobjective,setingObjectives] = useState(false);
  const [Objective1, SetObjective1]= useState({ Objective:"",PointValue:5,Checked:false});
  const [Objective2, SetObjective2]= useState({ Objective:"",PointValue:5,Checked:false});
  const [Objective3, SetObjective3]= useState({ Objective:"",PointValue:5,Checked:false});
  const [Objective4, SetObjective4]= useState({ Objective:"",PointValue:5,Checked:false});
  const [timeLimit,setTimeLimit] = useState({Value:"time limit",Index:null});
  const [location,setLocation] = useState({Value:"Location",Index:null});
  const [formFilled,setFormStatus] = useState(false);

  
  //---Empty Array to hold objectives taken from json file myjson.json---
  var Objectives = ["Select an Objective"
    
  ]

  for (const [key , value] of Object.entries(myjson)){
   // console.log(`${key} ${value.description}`);

    Objectives.push(value.description)
  }

  //---------------------------------------------------------------------



  
  
/*

  function to bundle game lobby info as a json object and send it to the next page for group b3

*/
function createLobby()
{console.log(Objective1.Objective );
  var timeInMin;
  if(timeLimit.Value == "time limit" || location.Value == "Location" || title == "" || playerCount == 0 ||(Objective1.Objective == "Objective 1" & Objective2.Objective == "Objective 2" & Objective3.Objective == "Objective 3" & Objective4.Objective == "Objective 4"  ))
 {
  Alert.alert(
                "incomplete",
                "please complete all fields",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ]
                    );
                    return;
 }
 
  if(timeLimit.Value == "2:00")
  {
      timeInMin = 120;
  }
  else if(timeLimit.Value == "1:30")
  {
    timeInMin = 90;
  }
  else if(timeLimit.Value == "1:00")
  {
    timeInMin = 60;
  }
  else
  {
    timeInMin = 30;
  }
  var gameLobby ={
    "gameid": 1,  
    "teamname": title,
    "timelimit": timeInMin, 
    "totalscore": Objective1.PointValue+Objective2.PointValue+Objective3.PointValue+Objective4.PointValue,
    "location": "Park",
    "playercount": playerCount,
    "objectives": 
        [ 
           
             ]
        }

  if(Objective1.Objective != "")
  {
    gameLobby.objectives.push({  
      
      
      "objectiveid":gameLobby.objectives.length +1 ,
      "description": Objective1.Objective,
      "points": Objective1.PointValue,
      "referenceimage": "",
      "picturetaken": null,
      "score": 0,
      "hasSet": Objective1.Checked
    
    });
  }
  if(Objective2.Objective != "")
  {
    gameLobby.objectives.push({  
      
      
      "objectiveid":gameLobby.objectives.length +1 ,
      "description": Objective2.Objective,
      "points": Objective2.PointValue,
      "referenceimage": "",
      "picturetaken": null,
      "score": 0,
      "hasSet": Objective2.Checked
     
    });
  }
  if(Objective3.Objective != "")
  {
    gameLobby.objectives.push({  
      
     
      "objectiveid":gameLobby.objectives.length +1 ,
      "description": Objective3.Objective,
      "points": Objective3.PointValue,
      "referenceimage": "",
      "picturetaken": null,
      "score": 0,
      "hasSet": Objective3.Checked
      
    });
  }
  if(Objective4.Objective != "")
  {
    gameLobby.objectives.push({  
      
      
      "objectiveid":gameLobby.objectives.length +1 ,
      "description": Objective4.Objective,
      "points": Objective4.PointValue,
      "referenceimage": "",
      "picturetaken": null,
      "score": 0,
      "hasSet": Objective4.Checked
      }
    );
  }
  for(var i=0;i< gameLobby.objectives.length ;i++)
  {
    console.log(" #" + i+ " " + gameLobby.objectives[i].description);
  }

  console.log( " array contains " + gameLobby.objectives.length + " elements");
  //navigation.navigate("",{GameLobby:gameLobby})
}

  //Location option toggle 
  function toggleLocation(change){
          //example string array
          var Locations =["Schoolyard","Nature Park","Playground"]
          if(location.Index == null)
          {
            setLocation({Value:Locations[0],Index:0});
          }
          else
          {
            var newIndex = location.Index+1;
            // checks if it is at the end of the array and loops if needed
            if(newIndex >=3)
            {
              if(change == '+')
              {
                newIndex = 0;
                setLocation({Value:Locations[0],Index:0});
              }
             else{
              newIndex = location.Index-1;
              setLocation({Value:Locations[newIndex],Index:newIndex});
             }
            }
            else{
              if(change == '+')
              {
                setLocation({Value:Locations[newIndex],Index:newIndex});
              }
             else{
              newIndex = location.Index-1;
               // checks if it is at the start of the array and loops if needed
              if(newIndex <0)
              {
                setLocation({Value:Locations[2],Index:2})
              }
              else{
                setLocation({Value:Locations[newIndex],Index:newIndex});
              }

             }
              
            }
          }  
          console.log("after setting : " , location.Value,"\n",location.Index);
          
        }
  //Time Limit option toggle 
  function toggleTimeLimit(change){

          var TimeLimits =["0:30","1:00","1:30","2:00"]
          if(timeLimit.Index == null)
          {
            setTimeLimit({Value:TimeLimits[0],Index:0});

          }
          else
          {
            var newIndex = timeLimit.Index+1;
            // checks if it is at the end of the array and loops if needed
            if(newIndex >=4)
            {
              if(change == '+')
              {
                newIndex = 0;
                setTimeLimit({Value:TimeLimits[0],Index:0});
              }
             else{
              newIndex = timeLimit.Index-1;
              setTimeLimit({Value:TimeLimits[newIndex],Index:newIndex});
             }
            }
            else{
              if(change == '+')
              {
                setTimeLimit({Value:TimeLimits[newIndex],Index:newIndex});
              }
             else{
              newIndex = timeLimit.Index-1;
              // checks if it is at the start of the array and loops if needed
              if(newIndex <0)
              {
                setTimeLimit({Value:TimeLimits[3],Index:3})
              }
              else{
                setTimeLimit({Value:TimeLimits[newIndex],Index:newIndex});
              }
             }
              
            }
          }  
          console.log("after setting : " , timeLimit.Value,"\n",timeLimit.Index);
        }
  //Player count option toggle 
 function checkPlayerCount(change)
 {
            /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
    if(change =='+')
    {
      setPlayerCount(playerCount+1);
    }
    else{
      if(playerCount >0)
      {
        setPlayerCount(playerCount-1);
      }
      else
      {
        setPlayerCount(0);
      }
    }
  }
 var teamName = "";
 function teamNameHandler(teamName){
   setTitle(title=>title = teamName)
 }

 // passes in a string value to indicate increment or decrement and a intiger for which objective is being changed
 function ChangePoints(objectivenumber,Change)
 {
   //uses passed in int to match to corresponding json object
   switch(objectivenumber)
    {
      case 1:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective1.PointValue;
          switch(Change)
          {
            
            case "+":
              if(curval<90){
                SetObjective1(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
              }
              break;
            case "-":
              if(curval>5){
                SetObjective1(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
              }
              
              break;
          }
          break;
          case 2:
            /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
            var curval = Objective2.PointValue;
            switch(Change)
            {
              case "+":
              if(curval<90){
                SetObjective2(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
              }
              break;
            case "-":
              if(curval>5){
                SetObjective2(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
              }
              
              break;
            }
            break;
          case 3:
            /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
            var curval = Objective3.PointValue;
            switch(Change)
            {
              case "+":
              if(curval<95){
                SetObjective3(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
              }
              break;
            case "-":
              if(curval>5){
                SetObjective3(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
              }
              
              break;
            }
            break;
          case 4:
            /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
            var curval = Objective4.PointValue;
            switch(Change)
            {
              case "+":
              if(curval<90){
                SetObjective4(Prev => ({
                  ...Prev,
                  PointValue:curval+5
                }));
              }
              break;
            case "-":
              if(curval>5){
                SetObjective4(Prev => ({
                  ...Prev,
                  PointValue:curval-5
                }));
              }
              
              break;
            }
            break;
    }
 }
 // passes in an integer to represent which objective it is and uses a ternary statement to change the is chekced value
 function IsChecked(objectivenumber)
 {
   // matches passed in int to corresponding json object
   switch(objectivenumber)
    {
          case 1:
            /* uses a ternary statement to check if the corresponding json objects
             boolean value is true or false 
            and sets it to the opposite*/
            Objective1.Checked?  SetObjective1(Prev => ({
              ...Prev,
              Checked:false
            })):      SetObjective1(Prev => ({
              ...Prev,
              Checked:true
            }));        
            break;
          case 2:
             /* uses a ternary statement to check if the corresponding json objects
             boolean value is true or false 
            and sets it to the opposite*/
            Objective1.Checked?  SetObjective2(Prev => ({
              ...Prev,
              Checked:false
            })):      SetObjective2(Prev => ({
              ...Prev,
              Checked:true
            }));        
            break;
          case 3:
             /* uses a ternary statement to check if the corresponding json objects
             boolean value is true or false 
            and sets it to the opposite*/
            Objective1.Checked?  SetObjective3(Prev => ({
              ...Prev,
              Checked:false
            })):      SetObjective3(Prev => ({
              ...Prev,
              Checked:true
            }));        
            break;
          case 4:
             /* uses a ternary statement to check if the corresponding json objects
             boolean value is true or false 
            and sets it to the opposite*/
            Objective1.Checked?  SetObjective4(Prev => ({
              ...Prev,
              Checked:false
            })):      SetObjective4(Prev => ({
              ...Prev,
              Checked:true
            }));        
            break;
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


      {/* Team Name Input */}
      
      <TextInput
          onChangeText={(teamName) => setTitle(teamName)}
         
          value={title}
          placeholderTextColor="#fff"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Team name"

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
        editable = {false}
        value={location.Value}
        underlineColorAndroid="transparent"
        placeholder={location.Value}
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

      <Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn1}

           />
 
      <Pressable
      
              style={styles.arrowbtn1}
              onPress= {() =>toggleLocation('+')  } 
              
            >
              
      </Pressable>
      <Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn11}

/>
      <Pressable
      
              style={styles.arrowbtn11}
              onPress= {() =>toggleLocation('-') } 
              
            >
              
      </Pressable>

          {/* Time Limit selector */}
        <TextInput
        editable = {false}
          onChangeText={(e) => setTimeLimit(e)}
          value={timeLimit.Value}
          placeholder={timeLimit.Value}
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

<Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn2}/>
      <Pressable
              style={styles.arrowbtn2}
              onPress= {() =>toggleTimeLimit('+')  } 
              
            >
              
      </Pressable>
      {/* Player Count selector */}
      {/* <Pressable onPress ={setPlayerCount === "2", console.log(playerCount)} > */}
      
      <Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn22}/>
      <Pressable
              style={styles.arrowbtn22}
              onPress= {() =>toggleTimeLimit('-')  } 
              
            >
              
      </Pressable>
      <TextInput   
        //onChangeText={(e) => setPlayerCount (e)} 
        editable = {false} 
        value={playerCount.toString()}
        underlineColorAndroid="transparent"
        placeholder={playerCount.toString()}
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

<Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn3}

/>
      <Pressable
              style={styles.arrowbtn3}
              onPress= {() =>checkPlayerCount("+")  } 
              
            >
              
      </Pressable>
      <Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn33}

/>
      <Pressable
              style={styles.arrowbtn33}
              onPress= {() =>checkPlayerCount("-")  } 
              
            >
              
      </Pressable>
      {/* objective Count selector */}
     
      <TextInput 
        editable={false}
        value="Objectives"
        underlineColorAndroid="transparent"
        placeholder="Objective"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        
        style={{
          position: "absolute",
          top: "54%",
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
      <Image source={require('../assets/Btn/arrowbutton.png')} style={styles.arrowbtn4}

/>
        <Pressable
              style={styles.arrowbtn4}
              onPress = {() => Settingobjective? setingObjectives(false) : setingObjectives(true) } 
            >
              </Pressable>
              {// dropdown menu when its rendered
              }
      {Settingobjective?
        <View style={styles.ObjectiveContainer}>
          <View style={styles.ObjectiveInputView}>
            {// input for objective
            }
            <Picker
            style={
              styles.ObjectiveInput
            }
              selectedValue={Objective1.Objective}
              onValueChange= {(itemValue,ItemIndex) => SetObjective1(Prev => ({
                ...Prev,
                  Objective:itemValue
              }))}>
              {Objectives.map((val,index) => {
                   return (<Picker.Item label={val} value ={ "find a " + val}/>)
                   })
                   }
            </Picker>
            {/*<TextInput style={styles.ObjectiveInput}
                      placeholder="objective"
                       placeholderTextColor="#fff"
                       value={Objective1.Objective}
                       onChangeText={(e) => SetObjective1(Prev => ({
                        ...Prev,
                          Objective:e
                      }))
                    
                    }
                      /> */}
            <Pressable onPress={()=>ChangePoints(1,"-")}>
            {// display and buttons for adjusting point value
            }
            {
              // button for decreasing point value
            }
              <Text style={styles.PointDecrease}> -</Text >
            </Pressable >
                {// changes and stores point value of the objectives
                }
            <Text style={styles.ObjectivePointInput}> {Objective1.PointValue.toString()}</Text>   
            {
              // button for increasing point value
            }
            <Pressable onPress={()=>ChangePoints(1,"+")}>
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            {// checkbox for objectives
            }
            <BouncyCheckbox style={styles.ObjectiveCompleted} onPress={() => IsChecked(1)} isChecked={Objective1.Checked}>
            <Text></Text>
            </BouncyCheckbox>
            </View>
           
            <View style={styles.ObjectiveInputView}>
                {// input for objective
            }
             <Picker
            style={
              styles.ObjectiveInput
            }
              selectedValue={Objective2.Objective}
              onValueChange= {(itemValue,ItemIndex) => SetObjective2(Prev => ({
                ...Prev,
                  Objective:itemValue
              }))}>
              {Objectives.map((val,index) => {
                   return (<Picker.Item label={val} value ={ "find a " + val}/>)
                   })
                   }
            </Picker>
             {// display and buttons for adjusting point value
            }
            {
              // button for decreasing point value
            }
            <Pressable  onPress={()=>ChangePoints(2,"-")}>
              {// changes and stores point value of the objectives
                }
              <Text  style={styles.PointDecrease}>-</Text>
            </Pressable>

              {// changes and stores point value of the objectives
                }
            <Text style={styles.ObjectivePointInput}> {Objective2.PointValue.toString()}</Text>   
            <Pressable onPress={()=>ChangePoints(2,"+")}>

            {
              // button for increasing point value
            }
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
            {// checkbox for objectives
            }
            <BouncyCheckbox style={styles.ObjectiveCompleted}
           onPress={() => IsChecked(2)} isChecked={Objective2.Checked}
            >
            <Text></Text>
            </BouncyCheckbox>
            </View>

            <View style={styles.ObjectiveInputView}>
              {// input for objective
            }
             <Picker
            style={
              styles.ObjectiveInput
            }
              selectedValue={Objective3.Objective}
              onValueChange= {(itemValue,ItemIndex) => SetObjective3(Prev => ({
                ...Prev,
                  Objective:itemValue
              }))}>
              {Objectives.map((val,index) => {
                   return (<Picker.Item label={val} value ={ "find a " + val}/>)
                   })
                   }
            </Picker>
               {// display and buttons for adjusting point value
            }
            {
              // button for decreasing point value
            }
            <Pressable onPress={()=>ChangePoints(3,"-")}>
              <Text  style={styles.PointDecrease} >-</Text>
            </Pressable>
            {// changes and stores point value of the objectives
                }
            <Text style={styles.ObjectivePointInput}> {Objective3.PointValue.toString()}</Text>   
            <Pressable onPress={()=>ChangePoints(3,"+")}>
            {
              // button for increasing point value
            }
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable>
              {// checkbox for objectives
            }
            <BouncyCheckbox style={styles.ObjectiveCompleted}
              onPress={() => IsChecked(3)} isChecked={Objective3.Checked}
            >
            <Text></Text>
            </BouncyCheckbox>
            </View>

            <View style={styles.ObjectiveInputView}>
               {// input for objective
            }
            <Picker
            style={
              styles.ObjectiveInput
            }
              selectedValue={Objective4.Objective}
              onValueChange= {(itemValue,ItemIndex) => SetObjective4(Prev => ({
                ...Prev,
                  Objective:itemValue
              }))}>
              {Objectives.map((val,index) => {
                   return (<Picker.Item label={val} value ={ "find a " + val}/>)
                   })
                   }
            </Picker>
              {// display and buttons for adjusting point value
            }
            {
              // button for decreasing point value
            }
            <Pressable onPress={()=>ChangePoints(4,"-")}  >
              <Text style={styles.PointDecrease}>-</Text>
            </Pressable>
             {// changes and stores point value of the objectives
                }
            <Text style={styles.ObjectivePointInput}> {Objective4.PointValue.toString()}</Text>   
            {
              // button for increasing point value
            }
            <Pressable onPress={()=>ChangePoints(4,"+")}  >
              <Text style={styles.PointIncreas}>+</Text>
            </Pressable  >
            {// checkbox for objectives
            }
            <BouncyCheckbox style={styles.ObjectiveCompleted} onPress={() => IsChecked(4)} isChecked={Objective4.Checked}> 
              <Text></Text>
            </BouncyCheckbox>
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
        <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={() =>createLobby()}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
      </View>
       
    </ImageBackground>
  );
    }

const styles = StyleSheet.create({

  arrowbtn4:{ //timelimitbutton
    zIndex:3,
    width: 40,
    height: 40,
    position: 'absolute',
    top: "55%",
    right: "22%",
    transform: [{ rotate: "90deg" }],
  },
  arrowbtn3:{ //timelimitbutton
    width: 40,
    height: 40,
    position: 'absolute',
    top: "48.8%",
    right: "22%"
  },
  arrowbtn33:{ //timelimitbutton
    width: 40,
    height: 40,
    position: 'absolute',
    top: "48.8%",
    left: "22%",
    transform: [{ rotate: "180deg" }],
  },
  arrowbtn2:{ //timelimitbutton
    width: 40,
    height: 40,
    position: 'absolute',
    top: "42.8%",
    right: "22%"
  },
  arrowbtn22:{ //timelimitbutton
    width: 40,
    height: 40,
    position: 'absolute',
    top: "42.8%",
    left: "22%",
    transform: [{ rotate: "180deg" }],
  },
  arrowbtn1:{ //location button
    width: 40,
    height: 40,
    position: 'absolute',
    top: "36.7%",
    right: "22%"
  },
  arrowbtn11:{ //location button2
    width: 40,
    height: 40,
    transform: [{ rotate: "180deg" }],
    position: 'absolute',
    bottom: "59.7%",
    left: "22%"
  },
  ObjectiveCompleted:{
    margin:5,
    left:"-5%",
    alignItems:"center",
    top:"10%",
    flex:0.2,
    backgroundColor:"#fff",
    borderRadius:25
  },
  ObjectiveInputView:{
    padding:0,
    margin:1,
    borderWidth: 1,
    borderRadius:25,
    borderColor:"#fff",
    flexDirection:"row",
    alignItems:"flex-start",
    marginLeft:20,
    fontSize:RFPercentage(5),
    position:"relative",
    width:"90%"
  },
  PointIncreas:{
    flex:1,
    top:"0%",
    margin:5,
    left:"-75%",
    fontSize:RFPercentage(2),
    position:"relative",
  },
  PointDecrease:{
    flex:1,
    top:"2%",
    margin:5,
    fontSize:RFPercentage(2),
    position:"relative",
  },
  ObjectiveInput:{
    flex:1.5,
    fontSize:RFPercentage(1.5),
    position:"relative",
    zIndex:5
  },
  ObjectivePointInput:{
    top:"2%",
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
    top:"58.5%",
    width: width * 0.5,
    left:"25%",
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