
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

//This component is used to calculate the dimensions of the device and set width of certain components accordingly e.g input box
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default function ChooseObjectiveScreen({navigation}){
    return(
      <ImageBackground
      style={{ resizeMode: "contain", flex: 1 }}
      source={require("../../assets/BGs/background2.png")}
      >
          <View style={page.container}>
            <View style={{flex:1,padding:10, width:"90%", height: "20%"}}>
                <View style={{flex:1,marginTop:20,justifyContent:"center",alignItems: "center"}}>
                <Text style={styles.logo}> Can you find?</Text>
                </View>
                <View style={{flex:1,margin:0,justifyContent:"center",alignItems: "center"}}>
                    <Text style={styles.logo}>00:00</Text>
                </View>
                <View style={{flex:8,marginTop:10,justifyContent:"center",alignItems: "center"}}>
                    <View style={{flex:1,flexDirection:"row", margin:0,justifyContent:"center",alignItems: "center"}}>
                      <View style={{flex:1, flexDirection:"column", margin:5, height: "100%", justifyContent:"center",alignItems: "center"}}>
                          <View style={{flex:4, flexDirection:"column", margin:5, height: "100%", width: "100%",justifyContent:"center",alignItems: "center"}}>
                              <Image
                                  source={require("../../assets/images/red-squirrel.jpg")}
                                  style={{
                                    height: "100%", 
                                    width: "100%", 
                                    borderTopLeftRadius: 15, 
                                    borderTopRightRadius: 15, 
                                  }}
                                />
                          </View>
                          <View style={styles.viewTitle}>
                              <Text style={styles.text}> Squirrel</Text>
                          </View>
                      </View>

                      <View style={{flex:1, flexDirection:"column", margin:5, height: "100%", justifyContent:"center",alignItems: "center"}}>
                          <View style={{flex:4, flexDirection:"column", margin:5, height: "100%", width:"100%", justifyContent:"center",alignItems: "center"}}>
                          <Image
                                  source={require("../../assets/images/tree.jpg")}
                                  style={{
                                    height: "100%", 
                                    width: "100%", 
                                    borderTopLeftRadius: 15, 
                                    borderTopRightRadius: 15, 
                                  }}                                />
                          </View>
                          <View style={styles.viewTitle}>
                              <Text style={styles.text}> Tree</Text>
                          </View>
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:"row", margin:0,justifyContent:"center",alignItems: "center"}}>
                      <View style={{flex:1, flexDirection:"column", margin:5, height: "100%", justifyContent:"center",alignItems: "center"}}>
                          <View style={{flex:4, flexDirection:"column", margin:5, height: "100%", width: "100%", justifyContent:"center",alignItems: "center"}}>
                          <Image
                                  source={require("../../assets/images/cat.jpg")}
                                  style={{
                                    height: "100%", 
                                    width: "100%", 
                                    borderTopLeftRadius: 15, 
                                    borderTopRightRadius: 15, 
                                  }}                                />
                          </View>
                          <View style={styles.viewTitle}>
                              <Text style={styles.text}> Cat</Text>
                          </View>
                      </View>

                      <View style={{flex:1, flexDirection:"column", margin:5, height: "100%",justifyContent:"center",alignItems: "center"}}>
                          <View style={{flex:4, flexDirection:"column", margin:5, height: "100%", width: "100%",justifyContent:"center",alignItems: "center"}}>
                          <Image
                                  source={require("../../assets/images/bird.jpg")}
                                  style={{
                                    height: "100%", 
                                    width: "100%", 
                                    borderTopLeftRadius: 15, 
                                    borderTopRightRadius: 15, 
                                  }}                                />

                          </View>
                          <View style={styles.viewTitle}>
                              <Text style={styles.text}> Bird</Text>
                          </View>
                      </View>
                    </View>

                    <View style={{flex:0.25,margin:0,justifyContent:"center",alignItems: "center"}}>
                      <Text style={styles.logo}>.  .  .  .</Text>
                    </View>

              </View>
              <View style={{alignItems: "center",justifyContent:"center",flex:1}}>
              </View>
          </View>

        </View>
    </ImageBackground>
    )
}

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


  