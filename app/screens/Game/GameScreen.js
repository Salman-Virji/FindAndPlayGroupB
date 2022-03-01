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
  const pictures = [1,2,3];
function Card(props){
  return(
    <View style={page.card}><Text>{props.text}</Text></View>
  )
}
function CreateCards(){
  return(
    <View style={{flexDirection:'row'}}>
      {pictures.map(x=>{
        return <Card text={x} key={x}/>
      })}
    </View>
  )

}


export default function ChooseObjectiveScreen({navigation}){
    return(
        <View style={page.container}>
          <View style={{flex:1,backgroundColor:"#b0bec5",padding:10,width:"100%"}}>
            <View style={{flex:4,backgroundColor:"#eceff1",margin:20,justifyContent:"center",alignItems: "center"}}>
              <Text>
                Camera
              </Text>
            </View>
            <View style={{flex:2,alignItems: "center",justifyContent:"center"}}>
              <CreateCards />
            </View>
            <View style={{alignItems: "center",justifyContent:"center",flex:1}}>
              <TouchableOpacity
                style={page.button}
              >
                <Text>
                  Take Picture
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
    )
}

const page = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width:"50%"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1e140a',
      padding: 24,
    },
    text: {
      fontSize: 30,
      color: '#000'
    },
    camera:{
      justifyContent: 'center',
      margin:10,
      backgroundColor:'#eceff1'
    },
    card: {
      backgroundColor:'#eceff1',
      padding:10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      margin:10,
      flex:1,
      height:"100%"
    }
  });