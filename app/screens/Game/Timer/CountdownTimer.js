import React, { useState, useEffect, useRef } from 'react';
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownTimerUtils';
import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
  
const defaultRemainingTime = {}
var finished = false;
//Component responsible for the timer. 
//Update the timer each second and automatically call next screen 
const CountdownTimer = ({countdownTimestampMs, navigation, tempObj}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
     useEffect(() => {
        const intervalId = setInterval(() => {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdownTimestampMs));
        }, 1000); //set the timer to refresh each second
        if (remainingTime.minutes==0 && remainingTime.seconds==0 ) {
          //Constantly check if the time is up. When it is, call the confirmation screen  
          navigation.navigate("EndScreen",{ Data: tempObj.objectives })
        }
        return () => clearInterval(intervalId);
    },[remainingTime]);


    return(
        <View>
            <Text style={styles.logo}> {remainingTime.minutes}:{remainingTime.seconds} </Text>
            <Text></Text>
        </View>
    );

}

const styles = StyleSheet.create({
    logo: {
      //text css
      fontSize: 50,
      color: "white",
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 1)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
  
    },

  });
export default CountdownTimer;