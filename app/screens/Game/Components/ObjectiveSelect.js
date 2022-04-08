import React from 'react';
import {
  Dimensions, TouchableOpacity,
  View, ScrollView
} from "react-native";
import ChooseObjectiveCard from './ChooseObjectiveCard';
import { styles } from '../Styles/styles';
export function ObjectiveSelect({ gameObject, setShowCamera, setCurrentObjectiveId, playSound }) {
  
  return (<View style={{
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
    overflow: "hidden",
    flexWrap: "wrap",
    maxHeight: Dimensions.get("window").width * 1.00,
    backgroundColor: "rgbar(255,0,0,0.1)"
  }}>
    <ScrollView style={{
      flex: 1,
      height: "100%"
    }} scrollIndicatorInset={10} contentContainerStyle={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {gameObject.objectives.map(x => {
        return (
          x.picturetaken == null ?
            <TouchableOpacity key={x.objectiveid} style={styles.card} onPress={() => {
              setShowCamera(true);
              setCurrentObjectiveId(x.objectiveid);
              playSound("button");
              }}>
              <ChooseObjectiveCard objective={x} source={x.referenceimage} />
            </TouchableOpacity>
          : <TouchableOpacity key={x.objectiveid} style={styles.card} onPress={()=>{
            setShowCamera(true);
            console.log("@");
            setCurrentObjectiveId(x.objectiveid);}}>
              <ChooseObjectiveCard objective={x} source={{uri: x.picturetaken}}/>
            </TouchableOpacity>
            );
      })}
    </ScrollView>
  </View>);
}
