import React from "react";
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
  } from "react-native";

export default function ChooseObjectiveScreen({navigation}){
    return(
        <View style={page.container}>
            <Text>
                Game Screen
            </Text>
        </View>
    )
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