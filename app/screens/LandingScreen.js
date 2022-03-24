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
import FunFact from "./FunFacts";

function LandingScreen({ navigation, route }) {
  const [Isvisible, setVisibility] = useState(false);
  const Username = route.params;

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/BGs/background1.png")}
    >
      {/* conditional rendering for popup to ask user if they want to create a game or join one */}
      {Isvisible ? (
        <View
          style={{
            position: "absolute",
            top: "25%",
            width: "60%",
            height: "30%",
            border: 2,
            borderRadius: 30,
            zIndex: 999,
            backgroundColor: "#50A4FF",
            bordercolor: "black ",
            elevation: 50,
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              textAlign: "center",
              top: "25%",
              left: "20%",
              width: "60%",
              fontSize: 25,
              margin: 10,
              border: 10,
              borderColor: "#000000",
            }}
            onPress={() =>
              navigation.navigate("CreateGameScreen", {
                Username: Username.Username,
              })
            }
          >
            <Text
              style={{
                textAlign: "center",
                left: "10%",
                width: "60%",
                fontSize: 25,
              }}
            >
              {" "}
              Create a game
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              textAlign: "center",
              left: "20%",
              top: "30%",
              width: "60%",
              fontSize: 25,
              margin: 10,
              border: 2,
              borderColor: "#000000",
            }}
            onPress={() =>
              navigation.navigate("JoinGame", { Username: Username })
            }
          >
            <Text
              style={{
                textAlign: "center",
                left: "10%",
                width: "60%",
                fontSize: 25,
              }}
            >
              {" "}
              Join a game
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              textAlign: "center",
              left: "20%",
              top: "40%",
              width: "60%",
              fontSize: 25,
              margin: 10,
              border: 2,
              borderColor: "#000000",
            }}
            onPress={() => setVisibility(false)}
          >
            <Text
              style={{
                textAlign: "center",
                left: "10%",
                width: "60%",
                fontSize: 25,
              }}
            >
              {" "}
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}

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
                  factImage={require("../assets/factSlides/penguin2.jpg")}
                  funFact="The black and white “tuxedo” look donned by most penguin species is a clever camouflage called countershading."
                />

                <FunFact
                  factImage={require("../assets/factSlides/penguin2.jpg")}
                  funFact="The giant Galapagos tortoise species is known to live for a good 150 years!"
                />

                <FunFact
                  factImage={require("../assets/factSlides/penguin2.jpg")}
                  funFact="Tigers are the worlds largest cat species, they can weigh upto 680 pounds!"
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
            Username.Username
              ? setVisibility(true)
              : navigation.navigate("JoinGame")
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
