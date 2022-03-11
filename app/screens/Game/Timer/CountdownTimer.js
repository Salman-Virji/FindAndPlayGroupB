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
  

const defaultRemainingTime = {
    seconds: '01',
    minutes: '00',
    hours: '00',
    days: '00', 
}
var finished = false;

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    function checkTimeup() {
        if (remainingTime.minutes==0 && remainingTime.seconds==0 && finished==false) {
            finished = true;
            console.log("time is up");
        }
    }

    return(
        <View>
            {/* <Text>{remainingTime.days}</Text>
            <Text>days</Text>
            <Text className="two-numbers">{remainingTime.hours}</Text>
            <Text>hours</Text> */}
            {checkTimeup()}
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