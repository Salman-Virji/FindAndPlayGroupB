import React, { useState, useEffect, useRef } from 'react';
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownTimerUtils';
import {
    Button,
    InputEvent,
    Image,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableOpacityBase,
    Alert,
  } from "react-native";
  

// const defaultRemainingTime = {
//     seconds: '00',
//     minutes: '00',
//     hours: '00',
//     days: '00', 
// }
const defaultRemainingTime = {

}
var finished = false;

const CountdownTimer = ({countdownTimestampMs,navigation,gameObject}) => {
    
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(countdownTimestampMs));

        }, 1000);
        if (remainingTime.minutes==0 && remainingTime.seconds==0 && finished==false) {
            navigation.navigate("EndScreen",
            { Data: gameObject.objectives })
        }
        return () => clearInterval(intervalId);
    },[remainingTime]);
    return(
        
        (remainingTime.seconds!="NaN" || remainingTime.seconds==null) ? (
            <View>
                <Text style={styles.logo}> {remainingTime.minutes}:{remainingTime.seconds} </Text>
                <Text></Text>
            </View>

        ):(
            <></>
        )
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