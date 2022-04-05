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
    const Objectivesize = route.params;
    const [NumOfPlayers,SetPlayers]
}