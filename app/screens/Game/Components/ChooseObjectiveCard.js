import { Center } from "native-base";
import React, { Component } from "react";
import getImage from "../GameImages";
//import React from "react";
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
    ProgressViewIOSComponent,
  } from "react-native";

//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
 
export class ChooseObjectiveCard extends Component {
  
  constructor(props) {
    super(props);
    // this.state = {
    //   text : props.text
    // };
    }

  render() {
      return (
            <View style={{flex:1, width:"100%"}}>
                  <View style={styles.single_objective}>
                      <View style={styles.image_container}>
                          <Image
                              source={this.props.source}
                              //source={require('../../assets/images/red-squirrel.jpg')}
                              style={{
                              height: "100%", 
                              width: "100%",
                              borderTopLeftRadius: 15, 
                              borderTopRightRadius: 15, 
                              }}
                          />
                      </View>
                      <View style={styles.viewTitle}>
                          <Text style={styles.text}> {this.props.objective.description}</Text>
                      </View>
                  </View>
              </View>
      );
    }
}
export default ChooseObjectiveCard;
  
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


  const styles = StyleSheet.create({

    title: {
      flex:1,
      marginTop:20,
      justifyContent:"center",
      alignItems: "center"
    },

    timer: {
      flex:1,
      margin:0,
      justifyContent:"center",
      alignItems: "center"
    },

    objectives_container:{
      flex:8,
      marginTop:10,
      justifyContent:"center",
      alignItems: "center"
    },

    objectives_nav_container: {
      alignItems: "center",
      justifyContent:"center",
      flex:1
    },

    objectives_row: {
      flex:1,
      flexDirection:"row", 
      margin:0,
      justifyContent:"center",
      alignItems: "center"
    },

    single_objective:{
      flex:1, 
      flexDirection:"column", 
      height: "100%", 
      justifyContent:"center",
      alignItems: "center"
    },

    image_container:{
      flex:4, 
      flexDirection:"column", 

      height: "100%", 
      width: "100%",
      justifyContent:"center",
      alignItems: "center"

    },

    logo: {
      //text css
      fontSize: 50,
      color: "white",
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 1)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
  
    },
    viewTitle: {
      flex:1, 
      flexDirection:"column", 
      margin:5, 
      marginTop:-15,
      height: "100%",
      width:"100%", 
      backgroundColor:"#50A4FF",
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      justifyContent:"center",
      alignItems: "center"  
    },
    text: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
       textShadowColor: "rgba(0, 0, 0, 1)",
      // textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
  });
  
  
  