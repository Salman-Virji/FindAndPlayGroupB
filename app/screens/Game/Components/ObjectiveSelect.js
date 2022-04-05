import React from 'react';
import {
  Dimensions, TouchableOpacity,
  View, ScrollView
} from "react-native";
import ChooseObjectiveCard from './ChooseObjectiveCard';
import { styles } from '../Styles/styles';
import { Audio } from 'expo-av';

export function ObjectiveSelect({ gameObject, setShowCamera, setCurrentObjectiveId }) {
  const [sound, setSound] = React.useState();
  
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../../assets/Sounds/546974__finix473__ui-click.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);  

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
              playSound();
              setShowCamera(true);
              setCurrentObjectiveId(x.objectiveid);
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
