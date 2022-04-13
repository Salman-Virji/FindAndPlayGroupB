import React, { useState } from "react";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FunFact from "./FunFactsComponent";
import imageArray from "../assets/images.js";

function LandingScreen({ route, navigation }) {
  const [Isvisible, setVisibility] = useState(false);
  const GameLobby = route.params.GameLobby;
  const { newImages } = imageArray();
  console.log(
    "lobby at landing ",
    GameLobby,
    "\n Objectives array :",
    GameLobby.objectives
  );
  // -- useState variables
  //   const [img, setImg] = useState({Value:" ",Index:0});
  //   var obj =[];
  //   var factArray=[];
  //--Empty Array to hold images and facts taken from json file images.js--

  // -- go through each object in the images.js file and push it to the corresponding array
  // for (const [key , value] of Object.entries(images)){
  //  console.log(`${key} ${value.fact}`);

  //   obj.push(value.referenceimage)
  //  obj.push(value.fact)
  //   // factArray.push(value.fact)
  // }

  // -- set state on image
  // function setimg(){
  //   var i = Math.floor(Math.random()*obj.length*1)

  //   console.log("--------")

  //   setImg({ Value: obj[i], Index: 0} )
  //   //setImg({ Fact: factArray[i], Index: 0 } )
  // }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background1.png")}
    >
      {/*FACTS banner*/}
      <View style={styles.funFactContainer}>
        <Text style={styles.funFactContainerText}>Fun Facts</Text>
      </View>

      {/*Facts*/}
      <View>
        <ScrollView
          style={{ marginTop: 470 }}
          scrollEventThrottle={16 /*allows for a smooth scroll*/}
        >
          <View style={{ backgroundColor: "#FF6551" }}>
            <View style={{ height: 580, width: 670, margin: 30 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {/* passing random facts to FunFact Component */}
                {newImages.map((e) => {
                  return (
                    <FunFact
                      key={e.fact}
                      factImage={e.referenceimage}
                      funFact={e.fact}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>

      <View>
        {/*play button*/}
        <TouchableOpacity
          onPress={() =>
            //setimg() -- function call to set image state
            navigation.navigate("GameScreen", { GameLobby: GameLobby })
          }
        >
          <Image source={require("../assets/icons/Play.png")} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    resizeMode: "contain",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  //fact title styling
  funFactContainer: {
    zIndex: 2,
    position: "absolute",
    bottom: 990,
    alignItems: "center",
    backgroundColor: "#FFE551",
    paddingLeft: 145,
    paddingRight: 145,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
  },

  funFactContainerText: {
    fontWeight: "bold",
    fontSize: 45,
  },
});
export default LandingScreen;