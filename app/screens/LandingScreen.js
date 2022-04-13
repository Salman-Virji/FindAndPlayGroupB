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

function LandingScreen({ route ,navigation }) {
  const [Isvisible, setVisibility] = useState(false);
  const GameLobby = route.params.GameLobby;
  console.log("lobby at landing ", GameLobby , "\n Objectives array :", GameLobby.objectives);
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
                {/*passing props for image and fact*/}

                <FunFact
                  factImage={require("../assets/factSlides/tiger.jpg")}
                  funFact="Tigers are the largest cat species in the world reaching up to 3.3 meters in length and weighing up to 670 pounds!"
                />

                <FunFact
                  factImage={require("../assets/factSlides/chimpanzee.jpg")}
                  funFact="Humans and chimpanzees share 95 to 98 percent of the same DNA."
                />

                <FunFact
                  factImage={require("../assets/factSlides/elephant.jpg")}
                  funFact="Elephants use their trunks to suck up water to drink, it can contain up to 8 litres of water. They also use their trunks as a snorkel when swimming."
                />
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
            navigation.navigate("GameScreen",{ GameLobby: GameLobby })
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
