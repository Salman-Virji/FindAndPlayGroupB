import { Center, Switch, ZStack } from "native-base";
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
  ScrollView,
  Pressable,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions, Picker } from "react-native";
//import { Picker } from "@react-native-picker/picker";
//import BouncyCheckbox from "react-native-bouncy-checkbox";
import myjson from "./myjson.js";
import { AuthContext } from "../contexts/AuthContext";
import { Loading } from "./LoadingScreen.js";

const { width, height } = Dimensions.get("window");

function CreateGame({ navigation, route }) {
  const Host = route.params;
  const [title, setTitle] = useState("");
  const [playerCount, setPlayerCount] = useState({
    Value: "Player Count",
    Index: null,
  });
  const [Settingobjective, setingObjectives] = useState(false);
  const [Objective1, SetObjective1] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
    
  });
  const [Objective2, SetObjective2] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective3, SetObjective3] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective4, SetObjective4] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective5, SetObjective5] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective6, SetObjective6] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
    Image:null
  });
  const [Objective7, SetObjective7] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective8, SetObjective8] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective9, SetObjective9] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [Objective10, SetObjective10] = useState({
    Objective: "",
    PointValue: 5,
    Checked: false,
  });
  const [timeLimit, setTimeLimit] = useState({
    Value: "Time Limit",
    Index: null,
  });
  const [location, setLocation] = useState({ Value: "Location", Index: null });
  const [formFilled, setFormStatus] = useState(false);
  const [objectiveCounter, setObjectiveCounter] = useState({
    Value: "Objective Count",
    Index: 0,
    size: 0,
    First: true,
  });
  const [picker1, setPicker1] = useState(false);
  const [picker2, setPicker2] = useState(false);
  const [picker3, setPicker3] = useState(false);
  const [picker4, setPicker4] = useState(false);
  const [picker5, setPicker5] = useState(false);
  const [picker6, setPicker6] = useState(false);
  const [picker7, setPicker7] = useState(false);
  const [picker8, setPicker8] = useState(false);
  const [picker9, setPicker9] = useState(false);
  const [picker10, setPicker10] = useState(false);

  const [pickerText1, setPickerText1] = useState("gray");
  const [pickerText2, setPickerText2] = useState("gray");
  const [pickerText3, setPickerText3] = useState("gray");
  const [pickerText4, setPickerText4] = useState("gray");
  const [pickerText5, setPickerText5] = useState("gray");
  const [pickerText6, setPickerText6] = useState("gray");
  const [pickerText7, setPickerText7] = useState("gray");
  const [pickerText8, setPickerText8] = useState("gray");
  const [pickerText9, setPickerText9] = useState("gray");
  const [pickerText10, setPickerText10] = useState("gray");
  const { logout } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  //---Empty Array to hold objectives taken from json file myjson.json---
  var Objectives = ["Pick a Objective"];
  var ImgArr =[];
  

  for (const [key, value] of Object.entries(myjson)) {
    // console.log(`${key} ${value.description}`);

    Objectives.push(value.description);
    ImgArr.push(value.referenceimage)
  }

  //---------------------------------------------------------------------

  /*

  function to bundle game lobby info as a json object and send it to the next page for group b3

*/
var imgref;

function getImg(){
  
  if(Objective1.Objective="Squirrel"){
    imgref = ImgArr[0];
  }
  if(Objective1.Objective="Tree"){
    imgref = ImgArr[1];
  }
  if(Objective1.Objective="Bird"){
    imgref = ImgArr[2];
  }
  if(Objective1.Objective="Cat"){
    imgref = ImgArr[3];
  }
  if(Objective1.Objective="Tele"){
    imgref = ImgArr[4];
  }
  if(Objective1.Objective="Bear"){
    imgref = ImgArr[5];
  }
  if(Objective1.Objective="Lion"){
    imgref = ImgArr[6];
  }
  //Objective 2
  if(Objective2.Objective="Squirrel"){
    imgref = ImgArr[0];
  }
  if(Objective2.Objective="Tree"){
    imgref = ImgArr[1];
  }
  if(Objective2.Objective="Bird"){
    imgref = ImgArr[2];
  }
  if(Objective2.Objective="Cat"){
    imgref = ImgArr[3];
  }
  if(Objective2.Objective="Tele"){
    imgref = ImgArr[4];
  }
  if(Objective2.Objective="Bear"){
    imgref = ImgArr[5];
  }
  if(Objective2.Objective="Lion"){
    imgref = ImgArr[6];
  }
  
  }

  function createLobby() {

    
    var timeInMin;
    if (
      timeLimit.Value == "Time Limit" ||
      location.Value == "Location" ||
      title == "" ||
      playerCount == 0 ||
      (Objective1.Objective == "") &
        (Objective2.Objective == "") &
        (Objective3.Objective == "") &
        (Objective4.Objective == "")
    ) {
      Alert.alert("incomplete", "please complete all fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    if (timeLimit.Value == "2 Hours") {
      timeInMin = 120;
    } else if (timeLimit.Value == "1:30 Hours") {
      timeInMin = 90;
    } else if (timeLimit.Value == "1 Hours") {
      timeInMin = 60;
    } else {
      timeInMin = 30;
    }
    var gameLobby = {
      gameid: 1,
      teamname: title,
      timelimit: timeInMin,
      maxscore:
        0,
      TotalScore:0,
      location: location.Value,
      playercount: playerCount.Value,
      objectives: [],
    };
    if (Objective1.Objective != "" && objectiveCounter.size >= 1) {
      var imgref
      if(Objective1.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective1.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective1.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective1.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective1.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective1.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective1.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective1.Objective,
        points: Objective1.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective1.Checked,
        
      });
     
    }
    if (Objective2.Objective != "" && objectiveCounter.size >= 2) {
      if(Objective2.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective2.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective2.Objective="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective2.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective2.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective2.Objective="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective2.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective2.Objective,
        points: Objective2.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective2.Checked,
      });
    }
    if (Objective3.Objective != "" && objectiveCounter.size >= 3) {
      if(Objective3.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective3.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective3.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective3.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective3.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective3.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective3.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective3.Objective,
        points: Objective3.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective3.Checked,
      });
    }
    if (Objective4.Objective != "" && objectiveCounter.size >= 4) {
      var imgref
      if(Objective4.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective4.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective4.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective4.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective4.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective4.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective4.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective4.Objective,
        points: Objective4.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective4.Checked,
      });
    }
    if (Objective5.Objective != "" && objectiveCounter.size >= 5) {
      var imgref
      if(Objective5.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective5.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective5.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective5.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective5.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective5.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective5.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective5.Objective,
        points: Objective5.PointValue,
        referenceimage:imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective5.Checked,
      });
    }
    if (Objective6.Objective != "" && objectiveCounter.size >= 6) {
      var imgref
      if(Objective6.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective6.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective6.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective6.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective6.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective6.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective6.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective6.Objective,
        points: Objective6.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective6.Checked,
      });
    }
    if (Objective7.Objective != "" && objectiveCounter.size >= 7) {
      var imgref
      if(Objective7.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective7.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective7.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective7.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective7.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective7.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective7.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective7.Objective,
        points: Objective7.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective7.Checked,
      });
    }
    if (Objective8.Objective != "" && objectiveCounter.size >= 8) {
      var imgref
      if(Objective8.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective8.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective8.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective8.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective8.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective8.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective8.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective8.Objective,
        points: Objective8.PointValue,
        referenceimage:imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective8.Checked,
      });
    }
    if (Objective9.Objective != "" && objectiveCounter.size >= 9) {
      var imgref
      if(Objective9.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective9.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective9.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective9.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective9.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective9.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective9.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective9.Objective,
        points: Objective9.PointValue,
        referenceimage: imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective9.Checked,
      });
    }
    if (Objective10.Objective != "" && objectiveCounter.size >= 10) {
      var imgref
      if(Objective10.Objective=="Squirrel"){
        imgref = ImgArr[0];
      }
      if(Objective10.Objective=="Tree"){
        imgref = ImgArr[1];
      }
      if(Objective10.Objective=="Bird"){
        imgref = ImgArr[2];
      }
      if(Objective10.Objective=="Cat"){
        imgref = ImgArr[3];
      }
      if(Objective10.Objective=="Dog"){
        imgref = ImgArr[4];
      }
      if(Objective10.Objective=="Bear"){
        imgref = ImgArr[5];
      }
      if(Objective10.Objective=="Lion"){
        imgref = ImgArr[6];
      }
      gameLobby.objectives.push({
        objectiveid: gameLobby.objectives.length + 1,
        description: Objective10.Objective,
        points: Objective10.PointValue,
        referenceimage:imgref,
        picturetaken: null,
        score: 0,
        hasSet: Objective10.Checked,
      });
    }
    
    for (var i = 0; i < gameLobby.objectives.length; i++) {
     // console.log("\n #" + (i + 1) + " " + gameLobby.objectives[i].description);
      gameLobby.maxscore += gameLobby.objectives[i].points;
    }

    //console.log(" array contains " + gameLobby.objectives.length + " elements");
    navigation.navigate("LandingScreen", { GameLobby: gameLobby });
  }

  //Location option toggle
  function toggleLocation(change) {
    //example string array
    var Locations = ["Schoolyard", "Nature Park", "Playground"];
    if (location.Index == null) {
      setLocation({ Value: Locations[0], Index: 0 });
    } else {
      var newIndex = location.Index + 1;
      // checks if it is at the end of the array and loops if needed
      if (newIndex >= 3) {
        if (change == "+") {
          newIndex = 0;
          setLocation({ Value: Locations[0], Index: 0 });
        } else {
          newIndex = location.Index - 1;
          setLocation({ Value: Locations[newIndex], Index: newIndex });
        }
      } else {
        if (change == "+") {
          setLocation({ Value: Locations[newIndex], Index: newIndex });
        } else {
          newIndex = location.Index - 1;
          // checks if it is at the start of the array and loops if needed
          if (newIndex < 0) {
            setLocation({ Value: Locations[2], Index: 2 });
          } else {
            setLocation({ Value: Locations[newIndex], Index: newIndex });
          }
        }
      }
    }
   // console.log("after setting : ", location.Value, "\n", location.Index);
  }
  //Time Limit option toggle
  function toggleTimeLimit(change) {
    var TimeLimits = ["30 Mins", "1 Hour", "1:30 Hours", "2 Hours"];
    if (timeLimit.Index == null) {
      setTimeLimit({ Value: TimeLimits[0], Index: 0 });
    } else {
      var newIndex = timeLimit.Index + 1;
      // checks if it is at the end of the array and loops if needed
      if (newIndex >= 4) {
        if (change == "+") {
          newIndex = 0;
          setTimeLimit({ Value: TimeLimits[0], Index: 0 });
        } else {
          newIndex = timeLimit.Index - 1;
          setTimeLimit({ Value: TimeLimits[newIndex], Index: newIndex });
        }
      } else {
        if (change == "+") {
          setTimeLimit({ Value: TimeLimits[newIndex], Index: newIndex });
        } else {
          newIndex = timeLimit.Index - 1;
          // checks if it is at the start of the array and loops if needed
          if (newIndex < 0) {
            setTimeLimit({ Value: TimeLimits[3], Index: 3 });
          } else {
            setTimeLimit({ Value: TimeLimits[newIndex], Index: newIndex });
          }
        }
      }
    }
    //console.log("after setting : ", timeLimit.Value, "\n", timeLimit.Index);
  }
  //Player count option toggle
  //Player count option toggle
  function checkPlayerCount(change) {
    /*
            uses the passed string value to determine what actions to take with edge cases for max and min
          */
    var Players = ["1 Player", "2 Players", "3 Players", "4 Players"];
    if (playerCount.Index == null) {
      setPlayerCount({ Value: Players[0], Index: 0 });
    } else {
      var newIndex = playerCount.Index + 1;
      if (newIndex >= 4) {
        if (change == "+") {
          newIndex = 0;
          setPlayerCount({ Value: Players[0], Index: 0 });
        } else {
          newIndex = playerCount.Index - 1;
          setPlayerCount({ Value: Players[newIndex], Index: newIndex });
        }
      } else {
        if (change == "+") {
          setPlayerCount({ Value: Players[newIndex], Index: newIndex });
        } else {
          newIndex = playerCount.Index - 1;
          // checks if it is at the start of the array and loops if needed
          if (newIndex < 0) {
            setPlayerCount({ Value: Players[3], Index: 3 });
          } else {
            setPlayerCount({ Value: Players[newIndex], Index: newIndex });
          }
        }
      }
    }
    
  }

  var teamName = "";
  function teamNameHandler(teamName) {
    setTitle((title) => (title = teamName));
  }
  function setPicker(change) {
    /*
            uses the passed string value to determine what actions to take with edge cases for max and min
          */

    var Objectivecount = [
      "1 Objective",
      "2 Objective",
      "3 Objective",
      "4 Objective",
      "5 Objective",
      "6 Objective",
      "7 Objective",
      "8 Objective",
      "9 Objective",
      "10 Objective",
    ];

    if (objectiveCounter.Index == 0 && objectiveCounter.First == true) {
      setObjectiveCounter({
        Value: Objectivecount[0],
        Index: 0,
        size: 1,
        First: false,
      });
    } else {
      var newIndex = objectiveCounter.Index + 1;
   
      if (newIndex >= 10) {
        if (change == "+") {
         
          setObjectiveCounter({
            Value: Objectivecount[0],
            Index: 0,
            size: 1,
            First: false,
          });
        } else {
          newIndex = objectiveCounter.Index - 1;
          setObjectiveCounter({
            Value: Objectivecount[newIndex],
            Index: newIndex,
            size: newIndex + 1,
            First: false,
          });
        }
      } else {
        if (change == "+") {
        
          setObjectiveCounter({
            Value: Objectivecount[newIndex],
            Index: newIndex,
            size: newIndex + 1,
            First: false,
          });
        } else {
          newIndex = objectiveCounter.Index - 1;
          // checks if it is at the start of the array and loops if needed
          if (newIndex < 0) {
            setObjectiveCounter({
              Value: Objectivecount[3],
              Index: 3,
              size: 4,
              First: false,
            });
          } else {
            setObjectiveCounter({
              Value: Objectivecount[newIndex],
              Index: newIndex,
              size: newIndex - 1,
              First: false,
            });
          }
        }
      }
    }

    //enabling and disabling pickers
    if (objectiveCounter.Value == "Objective Count") {
      setPicker1(true);
      setPicker2(false);
      setPicker3(false);
      setPicker4(false);
      setPicker5(false);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("gray");
      setPickerText3("gray");
      setPickerText4("gray");
      setPickerText5("gray");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "1 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(false);
      setPicker4(false);
      setPicker5(false);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("gray");
      setPickerText4("gray");
      setPickerText5("gray");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    }
    if (objectiveCounter.Value == "2 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(false);
      setPicker5(false);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("gray");
      setPickerText5("gray");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "3 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(false);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("gray");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "4 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "5 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(true);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("white");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "6 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(true);
      setPicker7(true);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("white");
      setPickerText7("white");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "7 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(true);
      setPicker7(true);
      setPicker8(true);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("white");
      setPickerText7("white");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "8 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(true);
      setPicker7(true);
      setPicker8(true);
      setPicker9(true);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("white");
      setPickerText7("white");
      setPickerText8("white");
      setPickerText9("white");
      setPickerText10("gray");
    } else if (objectiveCounter.Value == "9 Objective") {
      setPicker1(true);
      setPicker2(true);
      setPicker3(true);
      setPicker4(true);
      setPicker5(true);
      setPicker6(true);
      setPicker7(true);
      setPicker8(true);
      setPicker9(true);
      setPicker10(true);

      setPickerText1("white");
      setPickerText2("white");
      setPickerText3("white");
      setPickerText4("white");
      setPickerText5("white");
      setPickerText6("white");
      setPickerText7("white");
      setPickerText8("white");
      setPickerText9("white");
      setPickerText10("white");
    } else if (objectiveCounter.Value == "10 Objective") {
      setPicker1(true);
      setPicker2(false);
      setPicker3(false);
      setPicker4(false);
      setPicker5(false);
      setPicker6(false);
      setPicker7(false);
      setPicker8(false);
      setPicker9(false);
      setPicker10(false);

      setPickerText1("white");
      setPickerText2("gray");
      setPickerText3("gray");
      setPickerText4("gray");
      setPickerText5("gray");
      setPickerText6("gray");
      setPickerText7("gray");
      setPickerText8("gray");
      setPickerText9("gray");
      setPickerText10("gray");
    }

    

    //settting text color for the pickers
  }
  // passes in a string value to indicate increment or decrement and a intiger for which objective is being changed
  function ChangePoints(objectivenumber, Change) {
    //uses passed in int to match to corresponding json object
    switch (objectivenumber) {
      case 1:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective1.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective1((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective1((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
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
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective2((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective2((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
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
        switch (Change) {
          case "+":
            if (curval < 95) {
              SetObjective3((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective3((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
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
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective4((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective4((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 5:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective5.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective5((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective5((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 6:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective6.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective6((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective6((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 7:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective7.PointValue;
        switch (Change) {
          case "+":
            if (curval < 95) {
              SetObjective7((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective7((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 8:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective8.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective8((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective8((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 9:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective9.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective9((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective9((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
      case 10:
        /*
              uses the passed string value to determine what actions to take with edge cases for max and min
            */
        var curval = Objective10.PointValue;
        switch (Change) {
          case "+":
            if (curval < 90) {
              SetObjective10((Prev) => ({
                ...Prev,
                PointValue: curval + 5,
              }));
            }
            break;
          case "-":
            if (curval > 5) {
              SetObjective10((Prev) => ({
                ...Prev,
                PointValue: curval - 5,
              }));
            }

            break;
        }
        break;
    }
  }
  // passes in an integer to represent which objective it is and uses a ternary statement to change the is chekced value

  return (

    
    <ImageBackground
      style={{ resizeMode: "contain", flex: 1 }}
      source={require("../assets/BGs/background2.png")}
    >
      {/* //Logout button */}
      <TouchableOpacity
        onPress={async () => {
          try {
            setLoading(true);
            await logout();
          } catch (e) {
            setLoading(false);
            Alert.alert(e);
          }
        }}
        style={{
          width: 250,
          height: 250,
          position: "absolute",
          top: 80,
          left: 50,
        }}
      >
        {/* //Logout button image */}
        <Image
          source={require("../assets/icons/Logout.png")}
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            top: 5,
          }}
        />
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
        placeholder="Team Name"
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
        editable={false}
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
        }}
      />

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn1}
      />

      <Pressable
        style={styles.arrowbtn1}
        onPress={() => toggleLocation("+")}
      ></Pressable>
      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn11}
      />
      <Pressable
        style={styles.arrowbtn11}
        onPress={() => toggleLocation("-")}
      ></Pressable>

      {/* Time Limit selector */}
      <TextInput
        editable={false}
        onChangeText={(e) => setTimeLimit(e)}
        value={timeLimit.Value}
        placeholder="Time Limit" //{timeLimit.Value}
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

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn2}
      />
      <Pressable
        style={styles.arrowbtn2}
        onPress={() => toggleTimeLimit("+")}
      ></Pressable>
      {/* Player Count selector */}
      {/* <Pressable onPress ={setPlayerCount === "2", console.log(playerCount)} > */}

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn22}
      />
      <Pressable
        style={styles.arrowbtn22}
        onPress={() => toggleTimeLimit("-")}
      ></Pressable>
      <TextInput
        onChangeText={(e) => setPlayerCount(e)}
        editable={false}
        value={playerCount.Value}
        underlineColorAndroid="transparent"
        placeholder={playerCount.Value}
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
        }}
      />

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn3}
      />
      <Pressable
        style={styles.arrowbtn3}
        onPress={() => checkPlayerCount("+")}
      ></Pressable>
      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn33}
      />
      <Pressable
        style={styles.arrowbtn33}
        onPress={() => checkPlayerCount("-")}
      ></Pressable>
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
          top: "59%",
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
      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn4}
      />

      {/* Objective Count selector */}
      {/* <Pressable onPress ={setPlayerCount === "2", console.log(playerCount)} > */}

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn22}
      />
      {/* <Pressable
        style={styles.arrowbtn22}
        onPress={() => toggleTimeLimit("-")}
      ></Pressable> */}
      <TextInput
        onChangeText={(e) => setPicker(e)}
        editable={false}
        value={objectiveCounter.Value}
        underlineColorAndroid="transparent"
        placeholder={objectiveCounter.Value}
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: "53.5%",
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

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn5}
      />
      <Pressable
        style={styles.arrowbtn5}
        onPress={() => setPicker("+")}
      ></Pressable>
      {/* <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn55}
      />
      <Pressable
        style={styles.arrowbtn55}
        onPress={() => setPicker("-")}
      ></Pressable> */}
      {/* objective Count selector */}




 {/* Objective Count selector */}
      {/* <Pressable onPress ={setPlayerCount === "2", console.log(playerCount)} > */}

      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn22}
      />
      {/* <Pressable
        style={styles.arrowbtn22}
        onPress={() => toggleTimeLimit("-")}
      ></Pressable> */}
      <TextInput
        editable={false}
        value="Objectives"
        underlineColorAndroid="transparent"
        placeholder="Objective"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        style={{
          position: "absolute",
          top: "59%",
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
      <Image
        source={require("../assets/Btn/arrowbutton.png")}
        style={styles.arrowbtn4}
      />
      <Pressable
        style={styles.arrowbtn4}
        onPress={() =>
          Settingobjective ? setingObjectives(false) : setingObjectives(true)
        }
      ></Pressable>
      {
        // dropdown menu when its rendered
      }
      {Settingobjective ? (
        <View
          style={{
            position: "relative",
            height: "20%",
            top: "63.5%",
            width: width * 0.5,
            left: "25%",
            paddingBottom: 10,
          }}
        >
          <ScrollView style={styles.ObjectiveContainer}>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker1} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText1,
                    position: "relative",
                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective1.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective1((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>

              <Pressable
                onPress={() => ChangePoints(1, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                {
                  // display and buttons for adjusting point value
                }
                {
                  // button for decreasing point value
                }
                <Text style={styles.PointDecrease}> -</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective1.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                onPress={() => ChangePoints(1, "+")}
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker2} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText2,
                    position: "relative",
                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective2.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective2((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(2, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                {
                  // changes and stores point value of the objectives
                }
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>

              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective2.PointValue.toString()}
              </Text>
              <Pressable
                onPress={() => ChangePoints(2, "+")}
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
              >
                {
                  // button for increasing point value
                }
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>

            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker3} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText3,
                    position: "relative",
                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective3.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective3((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                }}
                onPress={() => ChangePoints(3, "-")}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective3.PointValue.toString()}
              </Text>
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                  zIndex: 5,
                }}
                onPress={() => ChangePoints(3, "+")}
              >
                {
                  // button for increasing point value
                }
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker4} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText4,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective4.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective4((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(4, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective4.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(4, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker5} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText5,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective5.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective5((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(5, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective5.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(5, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker6} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText6,
                    position: "relative",
                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective6.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective6((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(6, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective6.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(6, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker7} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText7,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective7.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective7((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(7, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective7.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(7, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker8} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText8,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective8.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective8((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(8, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective8.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(8, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker9} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText9,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective9.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective9((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(9, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective9.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(9, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
            <View style={styles.ObjectiveInputView}>
              {
                // input for objective
              }
              <Picker
                enabled={picker10} //enable or disable the picker
                style={
                  {
                    flex: 1.5,
                    fontSize: RFPercentage(1.5),
                    color: pickerText10,
                    position: "relative",

                    zIndex: 5,
                  }

                  // styles.ObjectiveInput
                }
                selectedValue={Objective10.Objective}
                onValueChange={(itemValue, ItemIndex) =>
                  SetObjective10((Prev) => ({
                    ...Prev,
                    Objective: itemValue,
                  }))
                }
              >
                {Objectives.map((val, index) => {
                  return (
                    <Picker.Item
                      key={val}
                      label={val}
                      value={ val}
                    />
                  );
                })}
              </Picker>
              {
                // display and buttons for adjusting point value
              }
              {
                // button for decreasing point value
              }
              <Pressable
                onPress={() => ChangePoints(10, "-")}
                style={{
                  zIndex: 5,
                }}
              >
                <Text style={styles.PointDecrease}>-</Text>
              </Pressable>
              {
                // changes and stores point value of the objectives
              }
              <Text style={styles.ObjectivePointInput}>
                {" "}
                {Objective10.PointValue.toString()}
              </Text>
              {
                // button for increasing point value
              }
              <Pressable
                style={{
                  zIndex: 5,
                  top: "-1%",
                  margin: 5,
                  left: "-45%",
                  fontSize: RFPercentage(2),
                  position: "relative",
                }}
                onPress={() => ChangePoints(10, "+")}
              >
                <Text style={styles.PointIncreas}>+</Text>
              </Pressable>
              {
                // checkbox for objectives
              }
            </View>
          </ScrollView>
        </View>
      ) : null}

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
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.button}
          onPress={() => createLobby()}
        >
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
      </View>
      <Loading loading={loading} />
    </ImageBackground>
  );
    }

const styles = StyleSheet.create({
  arrowbtn4: {
    //timelimitbutton
    zIndex: 3,
    width: 40,
    height: 40,
    position: "absolute",
    top: "60%",
    right: "22%",
    transform: [{ rotate: "90deg" }],
  },
  arrowbtn3: {
    //timelimitbutton
    width: 40,
    height: 40,
    position: "absolute",
    top: "48.8%",
    right: "22%",
  },
  arrowbtn33: {
    //timelimitbutton
    width: 40,
    height: 40,
    position: "absolute",
    top: "48.8%",
    left: "22%",
    transform: [{ rotate: "180deg" }],
  },
  arrowbtn5: {
    //objective count
    width: 40,
    height: 40,
    position: "absolute",
    top: "54.2%",
    right: "22%",
  },
  arrowbtn55: {
    //objective count
    height: 40,
    width: 40,
    position: "absolute",
    top: "54.2%",
    left: "22%",
    transform: [{ rotate: "180deg" }],
  },
  arrowbtn2: {
    //timelimitbutton
    width: 40,
    height: 40,
    position: "absolute",
    top: "42.8%",
    right: "22%",
  },
  arrowbtn22: {
    //timelimitbutton
    width: 40,
    height: 40,
    position: "absolute",
    top: "42.8%",
    left: "22%",
    transform: [{ rotate: "180deg" }],
  },
  arrowbtn1: {
    //location button
    width: 40,
    height: 40,
    position: "absolute",
    top: "36.7%",
    right: "22%",
  },
  arrowbtn11: {
    //location button2
    width: 40,
    height: 40,
    transform: [{ rotate: "180deg" }],
    position: "absolute",
    bottom: "59.7%",
    left: "22%",
  },
  ObjectiveCompleted: {
    margin: 5,
    left: "-5%",
    alignItems: "center",
    top: "10%",
    flex: 0.2,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  ObjectiveInputView: {
    top: "0%",
    padding: 0,
    margin: 1,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 20,
    fontSize: RFPercentage(5),
    position: "relative",
    height: "9%",
    width: "90%",
  },
  PointIncreas: {
    flex: 1,
    top: "0%",
    margin: 5,
    fontSize: RFPercentage(2),
    position: "relative",
  },
  PointDecrease: {
    flex: 1,
    top: "2%",
    margin: 5,
    fontSize: RFPercentage(2),
    position: "relative",
  },
  ObjectiveInput: {
    flex: 1.5,
    fontSize: RFPercentage(1.5),
    position: "relative",
    zIndex: 5,
  },
  ObjectivePointInput: {
    top: "2%",
    flex: 0.5,
    fontSize: RFPercentage(2),
    position: "relative",
    width: "5%",
  },
  ObjectiveContainer: {
    height: "100%",
    flexDirection: "column",
    borderColor: "#fff",
    padding: 20,
    borderWidth: 5,
    borderTopWidth: 0,
    borderRadius: 25,
    zIndex: 5,
    margin: 5,
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
    left: "40%",
    top: "42%",
    zIndex: 4,
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
    left: "20%",
    top: 425,
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
    left: "20%",
    top: 445,
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
    left: "20%",
    top: 475,
  },

  hiddenTxt: {
    left: "16%",
    top: "25%",
    fontSize: 30,
    color: "#fff",
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