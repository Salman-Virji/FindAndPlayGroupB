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
                Choose Objective Screen
            </Text>
            <Button
            onPress={()=>
              navigation.navigate('GameScreen')}
            title="Next"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
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