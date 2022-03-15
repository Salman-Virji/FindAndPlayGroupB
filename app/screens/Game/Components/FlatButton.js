import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native-web'

function makeGreen(){
    //if(item.hasSet == false){
    //    item.score = item.points
    //    item.hasSet = true;
    //}
}
function makeRed(){
    //if(item.hasSet == false){
    //    item.score = 0
    //    item.hasSet = true;
    //}
}

function Btn({color, texts, onClick}) {
    return (
      <TouchableOpacity>
        <View style={color}>
          <Text style={styles.buttonText}>{texts}</Text>
        </View>
      </TouchableOpacity>
    )
  }

function FlatButton({item}) {
if(item.hasSet == true && item.score > 0){
  return (
    <Btn color={buttonGreen}/>
  )
} if(item.hasSet == true && item.score == 0){
    return (
      <Btn color={buttonRed}/>
    )
}else{
    return (
        <View>
            <Btn color={styles.buttonGreen} texts="Accept"/>
            <Btn color={styles.buttonRed} texts="Decline"/>
        </View>
    )
}
}

const styles = StyleSheet.create({
    buttonGreen: {
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'green',
    },
    buttonRed: {
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default FlatButton