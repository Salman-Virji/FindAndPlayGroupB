import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,ImageBackground
} from 'react-native';





const { width } = Dimensions.get('screen');
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.5;



function logged(){
    console.log("rip")
}

function Btn({color, btnText, onClick, item}) {
    return (
      <TouchableOpacity onPress={() => onClick != null? onClick({item}) : logged} >
        <View style={[styles.buttonContainer,{backgroundColor: `${color}` }]}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </View>
      </TouchableOpacity>
    )
  }

function FlatButton({item}) {
  const [points, setPoints] = useState(`Points not set!`)

  function makeGreen({item}){
    if(item.hasSet == false){
       //alert('Accepted')
       item.score = item.points
       item.hasSet = true;
       updatePoints()
    }
}
function makeRed({item}){
    if(item.hasSet == false){
       //alert('Declined')
       item.score = 0
       item.hasSet = true;
       updatePoints()
    }
}

  function updatePoints(){
    setPoints(`${item.score}/${item.points}`)
  }
    return (
      <View>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>{points}</Text>
        </View>
        <View>
            <Btn color={"#51A0F8"} btnText="Accept" item={item} onClick={makeGreen} />
            <Btn color={"#FF624E"} btnText="Decline" item={item} onClick={makeRed} />
            
        </View>
      </View>
    )
}
function confrimWheel({items}) {

  console.log(items.length)

  function finishGame(){
    let count = 0;
    let points = 0;
    let score = 0;
    items.forEach(item =>{
      if(item.hasSet == true){
        count++
        points = points + item.points;
        score = score + item.score;
      }})

      if(count == items.length){
        alert('Game Over!')
        alert(`You got ${score}/${points}!`)
      }else{
        alert('Finish Accepting or Declining objectives!')
      }
    
  }

    return (
  
      <SafeAreaView style={styles.container}>
        <StatusBar hidden/>
       
        <View>
        <ImageBackground   style={{ resizeMode: "contain", flex: 1 }} source={require("../../../assets/BGs/background2.png")}>
          <FlatList
          data={items}
          keyExtractor={(item) => item.description}
          horizontal
          pagingEnabled
          renderItem={({item}) => {
            return (
            <View style={{justifyContent: 'center', alignItems: 'center', width}}>
              <View style={styles.cardContainer}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.textDescription}>{item.description}</Text>
                  </View>
                  <Image
                    source={item.picturetaken != null? item.picturetaken : item.referenceimage} 
                    style={{
                      width: imageWidth,
                      resizeMode: 'cover',
                      borderRadius: 15,
                      marginBottom: 20,
                      padding: 50,
                      backgroundColor: 'black'
                    }} 
                  />
                  <FlatButton item={item}/>
                  
                </View>
            
            </View>
            
            
            );
          }}
        />
       
        <View>
        <TouchableOpacity onPress={() => finishGame()} style={styles.buttonFinish} >
        <View style={{padding: 20, borderRadius: 5}}>
          <Text style={styles.finishText}>Finish</Text>
        </View>
      </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>


      </SafeAreaView>
  
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    cardContainer:{
      backgroundColor: '#FEE14E',
       borderRadius: 20, 
       padding: 15
    },
    textDescription:{
      paddingBottom: 50, 
      fontSize: 35,
       fontWeight: 'bold'
    },
    buttonGreen: {
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'black',
        margin:15
    
    },
    buttonRed: {
        borderRadius: 8,
        padding: 15,
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#000',
        fontSize:25,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform:'uppercase'
    },
    buttonFinish:{
      backgroundColor: '#228B22', 
      borderRadius: 10, 
      margin: 75, 
      padding: 25, 
      alignItems: 'center',
      paddingHorizontal:7,
      paddingVertical:7,
      elevation:10
     
    },
    finishText:{
      fontSize:35,
      fontWeight: 'bold', 
      color: 'black',
      textTransform:'uppercase'
    },
    buttonContainer:{
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 20, 
      borderRadius: 5,
      margin:10,
      paddingHorizontal:3,
      paddingVertical:3,
      elevation:2,
      textTransform:'uppercase',
    }
   
  });
  
  export default confrimWheel