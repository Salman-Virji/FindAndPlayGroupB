import React from 'react';
import {ImageBackground, StyleSheet, Text, View } from 'react-native';

function LandingScreen({navigation}) {
    return (
        <ImageBackground style={styles.background} source={require("../assets/BGs/splitcolorbg.png")}>
        <View  style={styles.trialButton}>
            <Text  onPress ={() => navigation.navigate('SigninScreen')}>Click to go back to sign in </Text>
        </View>


    </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        resizeMode:"contain", 
      flex: 1,
      justifyContent:"flex-end",
      alignItems: "center",
     
    },

    trialButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fc5c65",

       
      },
})
export default LandingScreen;