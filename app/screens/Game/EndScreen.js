import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions
  } from "react-native";

export default function EndScreen({route,navigation}){
    return(
        <View
            style={{flex: 1,justifyContent: 'center',}}
        ><Text>Karamveer's Stuff</Text>
        <Text>{JSON.stringify(route.params.Data)}</Text>
        </View>
    )
}